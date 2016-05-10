Tougher Web Crawler
===================

This solution required a little more work. Given that the first solution took so little time, I spent quite a bit more time on this one. The problem with most web crawlers, the first one I tried as well is that they won't take dynamic content into account. To render dynamic content like ajax or things like that, a real browser needs to be used like Phantomjs that can render the javascript, so this is what I'm attempting here. It's than a plain old crawler, but it's more accuarate. With this in hand, we can go slay google!

*Update*

I attempted to use phantomjs but it appears to have a memory leak and crashes on some very large crawls so it's unreliable. I have therefore removed that configuration so it only renders static and not the dynamic content. It's unfortunate that I can't offer the the phantonjs configuration as a general solution, but for smaller crawls it should work. I did some quick research on how to get past the crashing but I could not figure out a reliable solution - even if I was able to bump memory it's no guarantee that it would not run out of memory again in the future. 



## Usage

Assuming Node 5+ installed on the host environment, run npm install and then the crawl script:

```
$ npm install .

$ node script.js <url> <outputFilePath>
```

example:

```
$ node script.js http://ant.thought.so /tmp/sitemap.json
```

The crawler has very limited input validation - it checks that two parameters are passed in but does not check for a valid url or local file save location.

The result is saved in json format:

```
    {
        url-1: {
             "anchors": [
                  "http://wiprodigital.com/",
                  "http://www.wiprodigital.com/#top",
                  "http://www.wiprodigital.com/#section-our-story",
                  "http://www.wiprodigital.com/#section-the-is",
                  ...
            ],
            "images": [
                  "http://11689-presscdn-0-83.pagely.netdna-cdn.com/wp-content/uploads/2016/04/Screen-Shot-2016-04-29-at-1.48.57-PM-300x168.png",
                  "http://11689-presscdn-0-83.pagely.netdna-cdn.com/wp-content/uploads/wpcf7_captcha/1194637162.png",
                  ...
            ],
            "scripts": [
                "http://11689-presscdn-0-83.pagely.netdna-cdn.com/wp-content/themes/wipro-digital-child/templates/js/vendor/jquery-1.11.1.min.js",
                "http://11689-presscdn-0-83.pagely.netdna-cdn.com/wp-content/themes/wipro-digital-child/templates/js/main.js",
                "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js",
                ...
            ],
            "links": [
                "http://wiprodigital.com/xmlrpc.php",
                "http://gmpg.org/xfn/11",
                ...
            ],
            "meta": [
                "http://wiprodigital.com/",
                "http://wiprodigital.com",
                ...
            ],
            "iframes": [
              "http://player.vimeo.com/video/122033650"
            ]
        },
        etc...
      
    }
```

## Formatting

Please note that the "links" element under the url means the "link" elemcnt under the <head> tag and "anchors" refers to the clickable links - the "a" tags.