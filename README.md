# Performance matters - (web-app-from-scratch - nodeJS version)

## repo for performance matters 

### About
This repo is a server side version of [this Rijksmuseum project](https://github.com/olli208/web-app-from-scratch). Using expressroutes.js I tried to make a minimal version of that app. It gets 10 art pieces from the Rijksmuseum API And the user can search the Rijksmuseum collection.

The app works offline after the page loads once. With the help of a Service Worker we make it possible to serve cached pages (previosly visited) to the user without an internet connection. When the user is offline and a visits a page not in the cache, He will get an offline page with a message and a list of pages from the cache.

#### Job Stories
- When I am on a vacation, I want to be able to see artPieces, even with no connection.
- When I have no connection, I want the app to tell me which art Pieces I have access to, So that I can check them out.
- When I have no connection, I want be warned by the app, so I know that the app has limited functionality.

#### Features
- search for artworks via Rijksmuseum API
- See description of art piece.
- check previosly seen art pieces offline via a Service Worker.

### Clone the App
Get the repo on your computer:
```
git clone https://github.com/olli208/minor-bt-eind.git

```

### Run the App
When you have [NODE](https://nodejs.org/en/) & [NPM](https://www.npmjs.com/) on your computer run the following command:
```
npm start
```
Then go to 
> http://localhost:3000/

### Build
To build run the following command:
```
npm run build
```
[Browserfy](http://browserify.org/) makes a build.js file with all the dependencies needed.

### Dependencies
```
{
    "body-parser": "1.15.2",
    "ejs": "^2.5.6",
    "express": "4.14.0",
    "handlebars": "^4.0.6",
    "nunjucks": "3.0.0",
    "request": "^2.81.0",
    "routie": "0.0.1"
  }
```

## Performance optimizations
### Tested with GPRS(500ms, 50kb/s) 
I used the slowest internet possible in the Chrome Dev Tools settings to see how this simple app works (and IF it works).

#### Without any optimizations
![Without optimizations](audit/before.png)
> Finish: 17.58s || DOMContentLoaded: 17.63s

### Gzip
An easy optimization is enabling gzip in the sever.js file using a module [compression](https://www.npmjs.com/package/compression).

#### With Gzip
![With Gzip](audit/sw.png)
> Finish: 17.09s || DOMContentLoaded: 7.72s

The improvement is noticeable, and it's worth it to enable gzip on your server. It's easy to do and doesn't take a long time to set up.

### Critical CSS 
Generated via [criticalpathcssgenerator](https://jonassebastianohlsson.com/criticalpathcssgenerator/). Which makes te head look like:
```
<head>
    ...

    <title>Single Page Web App</title>

    <!--Critical CSS: -->
    <style>
        *{padding:0;margin:0;box-sizing:border-box;font-family:Roboto,sans-serif}body{width:100%;display:flex;flex-direction:column;background:#5f9ea0}
    </style>

    ...
</head>
```

#### With Critical CSS
![with Critical CSS](audit/crit-css.png)
> Finish: 15.95s || DOMContentLoaded: 6.82s

> The critical path is the path to render a web page - what's needed before that can happen. CSS Stylesheets block rendering. Until the browser has requested, received, downloaded and parsed your stylesheets, the page will remain blank. By reducing the amount of CSS the browser has to go through, and by inlining it on the page (removing the HTTP request), we can get the page to render much, much faster.
- Jonasse Bastian Ohlsson

When usign a slow connection we get a faster page load and we see the important CSS first, before anything else. Like gzip it's easy to do and it just adds style element in the head.

## Sources 
- [una](https://una.im/save-offline/#%F0%9F%92%81)
- [How to Setup a Basic Service Worker (with Caching](https://www.youtube.com/watch?v=BfL3pprhnms)
- [
Replacing The User Story With The Job Story](https://jtbd.info/replacing-the-user-story-with-the-job-story-af7cdee10c27)
- [jbmoelker](https://github.com/jbmoelker/workshop-cmd-pwa/tree/exercise-11-use-cached-page/src)
- [Rijksmuseum API reference](https://rijksmuseum.github.io/)


TO DO:
- 

ISSUES :
- 
