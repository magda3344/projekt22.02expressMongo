const express = require('express') //tworzymy server, można to zastąpić http krócej, ale lepiej express
const cookieParser = require('cookie-parser') //cookie po stronie użytkownika zapis danych
const app = express()
app.use(cookieParser())
const expressSess = require('express-session')
app.use(expressSess({secret:"Id of session"}));
const port = 3000 //żeby sie wyświetliło muszę sama w przeglądarce wpisać localhost:3000 i enter

app.get('/',  //app - zmienna, get- metoda, potem ścieżka
    (req, res) => {
        if (req.session.visits) {
            req.session.visits++;
            res.send("Wizyta nr " + req.session.visits);
        } else {
            req.session.visits = 1;
            res.send("Witaj po raz pierwszy");
        } //funkcja, req- to co przyszło, res- to co budujemy i wysyłamy}
    }); //res.send - wyświetlanie

app.get('/test',  //robimy podstonę, w przeglądarce muszę wpisać sama na górze po adresie/test i enter wyświetlić
    //samo sie nie wyświetli
    (req, res) => { //to są nazwy zmiennych req i res
        console.log('test'); //to się wyświetli w terminalu
        console.log(req);
        console.log(res);
        res.send('testowa podstrona')
    }
)

app.get('/test/:id/:param2',  //:id - parametr zapytania, param2 to drugi parametr, wpisuję to w ścieżce w przeglądarce
    (req, res) => { //to są nazwy zmiennych req i res
        console.log(req.params.id); //req-to przychodzi od użytkownika, params-parametr, id
        console.log(req.params.param2);
        res.send('podstrona z parametrem o wartości' + ' ' + req.params.id + ' ' + req.params.param2)
        //wyświetla napis i to co wpiszemy w ścieżce w przeglądarce
        //res.send(`podstrona z parametrem o wartości ${req.params.id}`) - ten sam zapis co wyżej
    }
)

app.get('/test/:id',
    (req, res) => { //może być function albo =>
        console.log(req.cookies.id); //req - to co bierzemy od użytkownika, id to nasza nazwa nadana

        if(req.cookies.id===undefined){
            var cookieVal = 'brak';
        }else{
            var cookieVal = req.cookies.id;
        }
        res.cookie("id", req.params.id, {expire: 360000 + Date.now()}) //po przecinkach jest najpierw
            //nazwa "id", potem wartość, potem własciwość - tutaj czas do kiedy obowiązuje
            .send(`Poprzedni parametr: ${cookieVal}` + ' , ' + `Bieżący parametr: ${req.params.id}`)
        // .send(`Poprzedni parametr: ${req.cookies.id}` + ' , ' + `Bieżący parametr: ${req.params.id}`)
        // tak by wyglądało bez if- bez warunku
    })


app.get('*',  //domyslna podstrona, cokolwiek wpiszemy w przeglądarkę, nazwę podstorny, której nie ma zdefiniowanej
    //to musi być zdefiniowane na samym dole, na końcu
    (req, res) => {
        res.send('Brak wskazanego adresu')
    }
)


app.listen(port, //na którym porcie, pochylony cudzysłów ' pod ESC, może być samo to wpisane
    () => console.log(`Example app listening on port ${port}!`)) //tego nie musi być, to wpisujemy, tylko
//żeby sprawdzić że wsio ok, wyświetla się w terminalu