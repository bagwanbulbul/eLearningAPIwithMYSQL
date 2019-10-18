var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
var mysql = require('mysql');
var knex = require("knex")({
    client:"mysql",
    connection:{
        host : 'localhost',
        user : 'root',
        password : 'navgurukul',
        database : 'myDB'
    }
});
app.get("/distinct",function(req,res){
    knex.distinct("name").from("ng").then((DATA)=>{
        res.send(DATA)
    })
});
app.get("/WHERE",function(req,res){
    knex.select("*").from("ng").where("id",">",7).then((data)=>{
        res.send(data)
    }).catch(()=> {
        console.log("oops!!!!!!!")
    })
});
app.get("/limit",function(req,res){
    knex.select("*").from("ng").limit(4,8).then((data)=>{
        res.send(data)
    }).catch(()=>{
        console.log("oops!!!!! somthing went wrong")
    })
});

app.post("/user",function(req,res){
    knex('ng').insert({name:req.body.name,lastname:req.body.lastname})
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.send("oops!!!! somthing went wrong")
    })
});
app.put("/update/:id",function(req,res){
    knex("ng").where("id",req.params.id)
    .update({
        "name":req.body.name,
        "lastname":req.body.lastname
    }).then(()=>{
        res.json("update is sucessful")
    }).catch(()=>{
        res.send("oops!! somthing went wrong")
    })
});
app.delete("/delete/:id",function(req,res){
    knex("ng").where({"id":req.params.id}).del()
    .then(()=>{
        res.send("id deleted")
    }).catch(()=>{
        res.send("oops!!! somthing went wrong")
    })

});
app.listen(2000, function () {
    console.log('Express server is listening on port 3000');
});