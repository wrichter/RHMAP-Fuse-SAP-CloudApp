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
    
    var body = {
            "@xmlns:BAPI_FLCUST_CREATEFROMDATA":"http://sap.fusesource.org/rfc/NPL/BAPI_FLCUST_CREATEFROMDATA",
            "@TEST_RUN":"",
            "CUSTOMER_DATA":{
              "@CUSTNAME": req.body,
              "@FORM":"",
              "@STREET":"From FH",
              "@POBOX":"",
              "@POSTCODE":"",
              "@CITY":"",
              "@COUNTR":"",
              "@COUNTR_ISO":"",
              "@REGION":"",
              "@PHONE":"",
              "@EMAIL":"",
              "@CUSTTYPE":"P",
              "@DISCOUNT":"000",
              "@LANGU":"",
              "@LANGU_ISO":""
            },
            "EXTENSION_IN":[],
            "RETURN":[]
          }
    
		request({ url: url, method: 'POST', body: body , json: true }, function(error, response, body) {
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

