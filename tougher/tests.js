'use strict';
var SiteMapService = require("./services/SiteMapService");

// used as a scratch pad during development

var endsWithStr = SiteMapService.endsWith("testing", "ing");
console.log("endsWithStr: " + endsWithStr);

var extractDomainStr = SiteMapService.extractDomain("http://ant.thought.so");
console.log("extractDomainStr: " +extractDomainStr);

var isCrawlableLinkFalse = SiteMapService.isCrawlableLink("http://ant.thought.so/#something");
console.log("isCrawlableLinkFalse: " +isCrawlableLinkFalse);

var isCrawlableLinkTrue = SiteMapService.isCrawlableLink("http://ant.thought.so/something");
console.log("isCrawlableLinkTrue: " +isCrawlableLinkTrue);

var stripTrailingSlashStr = SiteMapService.stripTrailingSlash("http://ant.thought.so/something/");
console.log("stripTrailingSlash: " +stripTrailingSlashStr);

