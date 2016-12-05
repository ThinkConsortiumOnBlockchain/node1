//strict"use strict";

const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      Tx = require('ethereumjs-tx'),
      Web3 = require('web3'),

      env          = process.env;


let server = http.createServer(function (req, res) {
  let url = req.url;
  if (url == '/') {
    url += 'index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring


  if(url.indexOf("/sign") !=-1)  {


  var query = require('url').parse(req.url,true).query;
console.log(query)
  


            if(!query.nonce){

              res.send("Send nonce");

              return;

            }

            if(!query.privKey){

              res.end("Send privKey");

              return;

            }

           var privKey = query.privKey;

            if(!query.amount){

              res.end("Send amount");

              return;

            }

             if(!query.toAddr){

              res.end("Send toAddr");

              return;

            }

            var nonce= parseInt(query.nonce);
           var toAddr = query.toAddr;
            
            

            var privateKey = new Buffer(privKey, 'hex')

 // var Tx = require('ethereumjs-tx')


var web3 = new Web3();
var amount = parseInt(amount);
             amount = web3.toHex(query.amount);
           // console.log(privateKey)
          // privateKey = 'e57042a93a121cfccb15a7d642b7a17041e2df3652d7e6e8527a5c9a9f103f7a';
/*
var tx = new Tx()

tx.nonce = 0
tx.gasPrice = 21000
tx.gasLimit = 1000000
tx.value = 100000
tx.to= '0x1C7334b9A63ec26f54d8F9431496d1C44bC368f1';
tx.data= '';


console.log(tx);


*/


//originalNonce = 0;


var rawTx = {"nonce":"0x0"+nonce,"gasPrice":"0x04e3b29200","gasLimit":"0x5208","to":"0x"+toAddr,"value":amount,"data":""};
/*
            var rawTx = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000', 
  gasLimit: '0x2710',
  to: '0x1C7334b9A63ec26f54d8F9431496d1C44bC368f1', 
  value: 1000, 
  data: '0x00'
}

*/

          var tx = new Tx(rawTx);
           tx.sign(privateKey);
           console.log(tx.serialize());
           var serializedTx = tx.serialize().toString('hex')

          // res.send(serializedTx);

             res.end(serializedTx);

             return;





  }






















  if (url == '/health') {
    res.writeHead(200);
    res.end();
  } else if (url == '/info/gen' || url == '/info/poll') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
  } else {
    fs.readFile('./static' + url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        let ext = path.extname(url).slice(1);
        res.setHeader('Content-Type', contentTypes[ext]);
        if (ext === 'html') {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        res.end(data);
      }
    });
  }
});

server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
