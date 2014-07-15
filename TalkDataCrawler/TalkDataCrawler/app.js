var DwxCrawler = require('./dwxCrawler'),
    dwxCrawler,
    crawlerConfig = {};

dwxCrawler = new DwxCrawler(crawlerConfig);
dwxCrawler.on('complete', function(talks) {

    console.log(talks);
});
