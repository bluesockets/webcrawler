'use strict';
var phantom = require('x-ray-phantom'),
    Xray = require('x-ray'),
    jsdom = require("jsdom"),
    async = require('async');

var x = Xray();

var crawl = function(siteMap, url, callback) {

    url = stripTrailingSlash(url);

    extract(url, function(data) {
        siteMap[url] = data;

        async.eachSeries(data.anchors, function(nextUrl, asyncCallback) {

            nextUrl = stripTrailingSlash(nextUrl);

            var hasAlreadyBeenCrawledBool = hasAlreadyBeenCrawled(siteMap, nextUrl);
            var isValidCrawlDomainBool = isValidCrawlDomain(siteMap, nextUrl);
            var isCrawlableLinkBool = isCrawlableLink(nextUrl);

            if (!hasAlreadyBeenCrawledBool && isValidCrawlDomainBool && isCrawlableLinkBool) {
                console.log("crawling: " + nextUrl);
                crawl(siteMap, nextUrl, function() {
                    asyncCallback()
                });
            } else {
                asyncCallback();
            }

        }, function(err) {
            callback(err, siteMap)
        });


    });

};

var extract = function(url, callback) {

    try {

        x(url, {
            anchors: ['a@href'],
            images: ['img@src'],
            scripts: ['script@src'],
            links: ['link@href'],
            meta: ['meta@content'],
            iframes: ['iframe@src']
        })(function(err, data) {

            if (err) {
                console.log("ERROR: " + err.stack);
            }

            /**
             * remote all null values
             */
            data.anchors = data.anchors.filter(function(val, pos) { return val != null && (data.anchors.indexOf(val) == pos);}).join(",").split(",");
            data.images = data.images.filter(function(val) { return val != null; }).join(",").split(",");
            data.scripts = data.scripts.filter(function(val) { return val != null; }).join(",").split(",");
            data.links = data.links.filter(function(val) { return val != null; }).join(",").split(",");
            data.meta = data.meta.filter(function(val) { return (val != null && (val.indexOf("http://") == 0 || val.indexOf("http://") == 0)); }).join(",").split(",");
            data.iframes = data.iframes.filter(function(val) { return val != null; }).join(",").split(",");

            callback(data);

        });

    } catch(err) {
        console.log("ERROR: " + err.message);
        var data = {
            error:err.message,
            anchors: []
        };
        callback(data);
    }

};


var isValidCrawlDomain = function(siteMap, testUrl) {

    if(siteMap.length == 0) {
        return true;
    }

    var validAnchorDomain = extractDomain(Object.keys(siteMap)[0]);
    var testAnchorDomain =  extractDomain(testUrl);


    return (testAnchorDomain != '' && validAnchorDomain === testAnchorDomain);
};

var extractDomain = function(url) {
    var document = jsdom.jsdom(null);
    var anchorElement = document.createElement("a");
    anchorElement.href = url;
    var domainArray = anchorElement.hostname.split(".");
    while(domainArray.length > 2) {
        domainArray.shift();
    }
    var domain = domainArray.join('.');
    return domain.replace("http://","");
};

var isCrawlableLink = function(url) {
    return (url.indexOf("#") < 0) && (url.indexOf(" ") < 0);
};

var hasAlreadyBeenCrawled  = function(siteMap, url) {
    return (url in siteMap);
};

var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var stripTrailingSlash = function(url) {
    if(endsWith(url,"/")) {
        url = url.substr(0, url.length-1);
    }
    return url;
};

module.exports = {
    crawl: crawl,
    endsWith: endsWith,
    extractDomain: extractDomain,
    isCrawlableLink: isCrawlableLink,
    stripTrailingSlash: stripTrailingSlash
};


