var express = require('express'),
    jade = require('jade'),
    woothee = require('woothee'),
    app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

function htmlEscape(s){
  s=s.replace(/&/g,'&amp;');
  s=s.replace(/>/g,'&gt;');
  s=s.replace(/</g,'&lt;');
  return s;
}

app.get('/', function(req, res){
  var agent = req.query.a || req.get('User-Agent');
  var agente = htmlEscape(agent);
  var parsed = null;
  console.log(req.query);
  console.log(parsed);
  if (req.query.a) {
    parsed = woothee.parse(req.query.a);
  }
  res.render('index', { agent: agent, parsed: parsed, agente: agente } );
});

app.get('/json', function(req, res){
  res.send(woothee.parse(req.params.a || ''));
});

app.listen(app.get('port'));
