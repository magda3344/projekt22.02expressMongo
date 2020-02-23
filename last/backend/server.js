//importujemy kilka rzeczy

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let bodyParser = require('body-parser')
let dbConfig = require('./db/db') //tu określamy ścieżkę naszego bloga

const articleRoute=require('./routes/article.route'); //jedna kropka bo katalog jest na tym samym poziomie
//ctr spacja podpowiada śieżkę
//../../../ kilka katalogów do góry
// bieżący katalog ./

mongoose.Promise= global.Promise; //operacja promise
mongoose.connect(dbConfig.db, { //do jakiej bazy danych się łączy
   useNewUrlParser:true //parametry uruchomieniowe do połaczenia - gdy uda się połączyć, to wtedy
}).then(()=>{
    console.log('Connected!') //udało sie połaczyć, to wyświetla
},
    error =>{ //w przeciwnym wypadku, wyświetla to
    console.log('Error during connection attempt: '+error)
    })

const app = express() //chcemy aby aplikacja używała bodyparser, aby rozumieć co do nas przychodzi
//rozumieć kodowanie, które przychodzi
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/articles', articleRoute);

//definiujemy port do którego sie łączymy
//najpierw sprawdzamy czy port istnieje, gdy nie bedzie to użyjmy 4000
//następnie definiujemy serwer
const port =process.env.PORT || 4000;
const server = app.listen(port, ()=> {
    console.log('Connected. Port: '+ port)
})

/*app.use((req,res,next)=>{
    //esLint - disable - next-line no -undef
   res.status(404).send("404 nie znaleziono strony");
}); */

app.use((err,req,res,next)=>{
    console.error(err.message);
    if(!err.statusCode){
        err.statusCode=500;
    }
    res.status(err.statusCode).send(err.message);
})