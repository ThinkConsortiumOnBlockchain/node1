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


  if(url.indexOf("/contractCreate") !=-1)  {

if(req.method == 'POST') {
       var jsonString = "";
       req.on('data', function (data) {
            jsonString += data;
        });

       req.on('end', function(){
        console.log(jsonString);
        console.log('ff')


           try{
              console.log('trying');
var solc = require('solc');
//'contract x { function g() {} }'

console.log('solcd');
var input = jsonString;
//console.log(string);
var output = solc.compile(input, 1);

console.log(output);
 // 1 activates the optimiser
for (var contractName in output.contracts) {
    // code and ABI that are needed by web3
    res.end('0x' + output.contracts[contractName].bytecode);
    console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface));
}

return;
}

catch(err){

  res.end("error: "+err);
  return;
}


       // res.end(jsonString);
       })
           





         


            // Use request.post here



return;



  var query = require('url').parse(req.url,true).query;
console.log(query)

if(!req.body.code){

              res.end("Send code");

              return;

    }

try{
var solc = require('solc');
//'contract x { function g() {} }'
var input = query.code;
var output = solc.compile(input, 1);
console.log(output);
 // 1 activates the optimiser
for (var contractName in output.contracts) {
    // code and ABI that are needed by web3
    res.end('0x' + output.contracts[contractName].bytecode);
    console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface));
}

return;
}

catch(err){

  res.send("error: "+err);
  return;
}
}



}

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
          // toAddr = "0x"+toAddr;
            
            

            var privateKey = new Buffer(privKey, 'hex')

 // var Tx = require('ethereumjs-tx')

  var Web3 = require('web3');
var web3 = new Web3();
var amo = Number(query.amount.replace(" ", ""));

var amo1 = "0x"+ decimalToHexString(amo);
  //var amount = web3.toHex(query.nonce);

  var amount = amo1;


//var web3 = new Web3();

/*

var amount1 = parseInt(query.amount);
//var amount = decimalToHexString(amount1);
           var  amount = web3.toHex(amount1);
*/


             //var amount = web3.toHex(query.amount);
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


var rawTx = {"nonce":"0x"+decimalToHexString(nonce),"gasPrice":"0x098bca5a00","gasLimit":"0x5dc0","to":"0x"+toAddr,"value":amount,"data":"", "chainId":1};
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

             res.end( "<br><br>amount = "+ amount+ "<br><br>query amount="+query.amount);

             return;





  }






  if(url.indexOf("/contractTrans") !=-1)  {


  var query = require('url').parse(req.url,true).query;
console.log(query)
  

 if(!query.byteCode){

              res.end("send byteCode");

              return;

            }

            res.send(query.byteCode);
            return;



            if(!query.nonce){

              res.end("Send nonce");

              return;

            }

            if(!query.privKey){

              res.end("Send privKey");

              return;

            }

            

           var privKey = query.privKey;

          

           var byteCode = query.byteCode;
            var nonce= parseInt(query.nonce);
           
            
            

            var privateKey = new Buffer(privKey, 'hex')

 // var Tx = require('ethereumjs-tx')


var web3 = new Web3();

/*

var amount1 = parseInt(query.amount);
//var amount = decimalToHexString(amount1);
           var  amount = web3.toHex(amount1);
*/


            
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

var gasLimit = web3.toHex(1000000);
var gasPrice = web3.toHex(150000);


var amount=0;

//originalNonce = 0;


var rawTx = {"nonce":"0x0"+nonce,"gasPrice":"0x04e3b29200","gasLimit":gasLimit,"value":amount,"data":byteCode};
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










function decimalToHexString(number)
{
    if (number < 0)
    {
        number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
}



function processPost(request, response, callback) {
  var querystring = require('qs');

    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            request.post = querystring.parse(queryData);
            callback();
        });

    } else {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
    }
}
