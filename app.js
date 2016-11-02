
var casper = require('casper').create();
var fs = require('fs');

function getLinks() {
  var links = document.querySelectorAll('.folder li a');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href')
    });
}

function getCharacters() {
  var characters = document.querySelectorAll('.folder');
  var result = [];

  var characterNames = Array.prototype.map.call(document.querySelectorAll('.folderlabel'), function (e) {
    return e.textContent.trim();
  });

  var characterTropes = Array.prototype.map.call(characters, function (e) {
      return Array.prototype.map.call(e.querySelectorAll('li a'), function (e2) {
        return e2.innerHTML;
      });
  });

  for (var i = 0;i < characterNames.length;++i) {
    result.push({
      name: characterNames[i],
      tropes: characterTropes[i]
    });
  }

  return result;
}


casper.start('http://tvtropes.org/pmwiki/pmwiki.php/Characters/AnimeAndManga');

casper.then(function () {
    links = this.evaluate(getLinks);
});

casper.then(function() {

  characters = [];

  for(var i = 0;i < 1;++i) {
      casper.thenOpen(links[i]).then(function () {
        var newChars = casper.evaluate(getCharacters);

        //console.log(JSON.stringify(newChars));
        characters = characters.concat(newChars);
      });

  }
});

casper.run(function () {
  console.log(JSON.stringify(characters));
  //fs.write("C:\Users\Alex\Documents\My Projects\tvtropes\characters.json", JSON.stringify(characters));
  casper.done();
});
