var express = require('express');
var cors = require('cors');
var request = require('request');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());


  // GET REST endpoint - query params may or may not be populated
  hello.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var url = 'http://' + process.env.FUSE_ADDRESS + '/flights';
    console.log(new Date(), 'calling URL', url);
    
		request({ url: url }, function(error, response, body) {
		  if (error) {
		    res.status(500).send(error);
		  } else if (response.statusCode = 200) {
		    res.send(body);
		  } else {
		    res.status(500).send('unexpected http response code ' + response.statusCode);
		  }
		});
    

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  return hello;
}

module.exports = helloRoute;
