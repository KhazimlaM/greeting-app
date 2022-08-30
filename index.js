const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const Greetings = require('./greetings');
const greetDBLogic = require('./greetingsdb');
const pgp = require('pg-promise')();

const app = express();
const greetings = Greetings();


const DATABASE_URL = process.env.DATABASE_URL || "postgresql://codex:pg123@localhost:5432/greet";

const config = { 
	connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
  config.ssl = {
    rejectUnauthorized: false
  }
}
const db = pgp(config);
console.log(db);
let logic = greetDBLogic(db)

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
  secret: 'codeforgeek',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

app.get("/", async function (req, res) {

  var myName = greetings.name;
  var myLanguage = greetings.language;

  if (myName !== '') {
    var theName = greetings.greet(myName, myLanguage)
    greetings.name = ""
    greetings.language = ""
  }

  let counter = await logic.getCounter();
  res.render('index', {
    theName,
    counter
  })

 
});


app.post("/greet", async function (req, res) {

  let name = req.body.nameEntered
  let language = req.body.myButton
  await logic.storedNames(name);
  if (!name || !language) {
    req.flash('info', greetings.errorHandling(name, language));

  } else {
    greetings.name = name
    greetings.language = language
  }


  res.redirect('/');

});

app.get('/actions', function (req, res) {

  let names = greetings.namesReturned()

  res.render('actions', {
    names

  })

});

app.get('/counter/:name', function (req, res) {
  let Names = req.params.name
  let Times = greetings.countNames(Names)

  res.render('names', {
    Names,
    Times

  });

});
app.get('/reset', async function (req, res) {
 
  await logic.clear()

  res.redirect('/')
})




const PORT = process.env.PORT || 3030;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});


