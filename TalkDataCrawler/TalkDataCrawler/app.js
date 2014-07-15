var DwxCrawler = require('./dwxCrawler'),
    fs = require("fs"),
    dwxCrawler,
    crawlerConfig = {
        host: 'www.developer-week.de',
        initialPath: '/Programm',
        discoverRegex: [
            /(\shref\s?=\s?)['"](\/Programm\/Veranstaltung\/\(event\)\/[^4"']+)/ig
        ],
        userAgent: 'DWX 2014 TalkDataCrawler (by Johannes Hoppe)'
    }

dwxCrawler = new DwxCrawler(crawlerConfig);
dwxCrawler.on('complete', function(talks) {

    fs.writeFile("talks.js", JSON.stringify(talks), 'utf8', console.log);
});

dwxCrawler.start();