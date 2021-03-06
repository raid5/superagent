
require('./../common');

var agent = require('superagent')
  , express = require('express')
  , app = express.createServer();

agent.should.have.property('version');

app.get('/', function(req, res){
  res.end('Hello');
});

app.listen(3000, function(){
  var req = agent.request('GET', 'http://localhost:3000');

  req.on('response', function(res){
    var buf = '';
    res.statusCode.should.equal(200);
    res.on('data', function(chunk){ buf += chunk; });
    res.on('end', function(){
      buf.should.equal('Hello');
      app.close();
    });
  });

  req.end();
});
