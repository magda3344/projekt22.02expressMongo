let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let articleSchema= require('../models/Article'); // wyjście wyżej do katalogu ../ podpowiada

router.route('/create-article').post((req,res,next)=>{
   articleSchema.create(req.body, (error,data)=>{
       if(error){
           return next(error)
       }else {
           console.log(data);
           res.json(data)
       }
   })
});

router.route('/').get((req,res)=>{ //to są funkcje
    articleSchema.find((error,data)=>{
        if(error){
          console.log(error)
            res.json('') //zwracamy puste dane
        }else{
            res.json(data)
        }
    })
})

router.route('/edit-article/:id').get((req,res)=>{
    articleSchema.findById(req.params.id,(error,data)=>{
        if(error){
            console.log(error)
            res.json('') //zwracamy puste dane
        }else{
            res.json(data)
        }
    })
})

router.route('/update-article/:id').put((req,res, next)=>{
    articleSchema.findByIdAndUpdate(req.params.id,{$set: req.body}, (error,data) => {
        if(error){
            console.log(error)
         return next(error)
        }else{
            res.json(data)
            console.log("Updated!")
        }
    })
})

router.route('/delete-article/:id').delete((req,res, next)=>{ //usuwamy artykuł
    articleSchema.findByIdAndRemove(req.params.id, (error,data) => {
        if(error){
            return next(error)
        }else{
            res.status(200).json({msg:data})

        }
    })
})

module.exports=router; //wyświetlanie

//ścieżka która ma być wywołana - wykonana zostanie akcja, do tworzenia artykułu, jak cos dodajemy =post
//request, response, next, funkcja =>
//checemy utworzyć studenta za pomocą wcześniej utworzonego schematu - modelu
//create - tworzymy
//post -dostajemy od użytkownika, chcemy to zapisywac z formularza - req
//możemy otrzymac tez error, return -zwracamy
//console.log w backendzie to bedzie wypisywane w terminalu