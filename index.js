const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings= require('./greetings');

const app = express();
const greetings = Greetings();


app.engine('handlebars', exphbs.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("index")
  });

  app.post("/greet", function(req, res){
    res.redirect("index")
  });

  app.get("/", function(req, res){
    res.render("index")
   
  });

  app.post("/greet", function(req, res){
    res.redirect("index")
  });




const PORT = process.env.PORT || 3030;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});