var express = require('express');
var cors = require('cors');
var request = require('request');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());


  // POST REST endpoint - query params may or may not be populated
  hello.post('/', function(req, res) {
    console.log(new Date(), 'In create route POST /');
    var url = 'http://' + process.env.FUSE_ADDRESS + '/flights';
    
		request({ url: url, method: 'POST', body: req.body  }, function(error, response, body) {
      if (error) {
        res.status(500).send(error);
      } else if (response.statusCode == 200) {
        res.type('json').send(body);
      } else {
        res.status(500).send('unexpected http response code ' + response.statusCode);
      }
		});
  });

  return hello;
}

module.exports = helloRoute;

