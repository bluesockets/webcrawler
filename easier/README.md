Easier Web Crawler
==================

This feels like cheating. I took an off the shelf solution and wrapped it in this project. It took about 5 minutes to slap together and I think that although it may complete the objective, it defeats the spirit of the assignment, so I'm going to use the output of this framework as something to compare against the crawler I'm going to write.
 
*Update:*

It turns out this crawler craps out on pages that have url encoded double quotes in the name. So although useful, it has some bugs and I'm not sure what kind of usage limits and boundaries exist, where it breaks.
 
 
## Usage

Assuming Node 5+, run npm install and then the site generator command:

```
$ npm install .

$ node_modules/sitemap-generator/cli.js --filename=<sitemap output filename> <domain to crawl>
```

example:

```
$ node_modules/sitemap-generator/cli.js --filename=sitemap.txt wiprodigital.com 
```

"--filename" will output the site map to whatever filename you pass in