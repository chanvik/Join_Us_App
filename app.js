var express= require('express');
var mysql=require('mysql');
var bodyParser=require("body-parser");


var app= express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'cxk3713',  //your username
  database : 'join_us'         //the name of your db
});


/*app.get("/",function(req,res)
{
    res.send("You have reached");
});*/


app.get("/", function(req,res)
{
    var q ="select count(*) as count from users";
    connection.query(q,function(err,results)
    {
        if (err) throw err;
        var count = results[0].count;
        //res.send("We have " + count + " users in db");
        res.render("home",{data_count:count});
    });
});




app.get("/joke",function(req,res)
{
    var joke="blah blah hahahhahaha";
    console.log("requested joke");
    res.send(joke);
}
);

app.post("/register",function(req,res)
{
    
var person={email:req.body.email};
connection.query('INSERT INTO users SET ?',person,function(err,results)
{
    console.log(err);
    console.log(results);
    res.redirect("/");
});
    
    
});

app.listen(8080,function()
{
    console.log("Server listening on 8080");
});


