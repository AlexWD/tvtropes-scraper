
var casper = require('casper').create();

function getLinks() {
  var links = document.querySelectorAll('.folder li a');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href')
    });
}

casper.start('http://tvtropes.org/pmwiki/pmwiki.php/Characters/AnimeAndManga');

casper.then(function () {
    links = this.evaluate(getLinks);
});

casper.run(function () {
    for(var i in links) {
        console.log(links[i]);
    }
    casper.done();
});
