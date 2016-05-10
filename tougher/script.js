'use strict';
var SiteMapService = require("./services/SiteMapService"),
    jsonfile = require('jsonfile');

/**
 * assumes that a complete, functional url is passed in.
 */
var url = process.argv[2];
var outputFile = process.argv[3];


if(url == null || outputFile == null) {
    console.log("A site url parameter was not passed in. Use this format: 'node script.js <url> <outputFile>'. Here's an example invocation: 'node script.js http://ant.thought.so /tmp/sitemap.json'");
    process.exit(1);
}

console.log("crawling: " +  url);

var siteMap = {};
SiteMapService.crawl(siteMap, url, function(err, completedSiteMap) {
    if(err != null) {
        console.log("error crawling: ", err.message);
    }

    jsonfile.writeFile(outputFile, completedSiteMap, function (err) {
        console.error(err);
        process.exit(0);
    });

});
