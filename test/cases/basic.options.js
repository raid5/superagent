
require('./../common');

var agent = require('superagent')
  , express = require('express')
  , app = express.createServer();

app.get('/search', function(req, res){
  res.end(req.query.q);
});

app.listen(3000, function(){
  var req = agent.request('GET', {
      host: 'localhost'
    , port: 3000
    , path: '/search?q=something'
  });

  req.on('response', function(res){
    var buf = '';
    res.statusCode.should.equal(200);
    res.on('data', function(chunk){ buf += chunk; });
    res.on('end', function(){
      buf.should.equal('something');
      app.close();
    });
  });

  req.end();
});
