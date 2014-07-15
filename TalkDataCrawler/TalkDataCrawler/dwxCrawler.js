var Simplecrawler = require("simplecrawler"),
    extend = require("extend"),
    util = require("util"),
    events = require("events"),
    cheerio = require("cheerio");

function Crawler(config) {

    this.config = config;
    this.talks = [];

    this._crawler = new Simplecrawler(this.config.host);
    extend(this._crawler, config);
   
    this._crawler.on("fetchcomplete", this._fetchcomplete.bind(this));
    
    this._crawler.on("complete", function() {
        this.emit("complete", this.talks);
    }.bind(this)); 

}

util.inherits(Crawler, events.EventEmitter);

Crawler.prototype._fetchcomplete = function(queueItem, responseBuffer) {

    var html = responseBuffer.toString();
    var $ = cheerio.load(html);
    var title = $(".container h2").first().text();
    var description = $(".container P").first().text();
    
    if (!title) {
        return;
    }

    this.talks.push({
        title: title,
        description: description
    });
}

Crawler.prototype.start = function () {
    this._crawler.start();
}

module.exports = Crawler;

