const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

let items = ["Movies","Fish","Comic books"];
let workItems = [];

app.get('/',(req,res)=>{
    let today = new Date();
    
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    let currentDay = today.toLocaleDateString("en-US",options);
    res.render("index",{
        listTitle:currentDay,
        newListItems: items
    });
})

app.get('/work',(req,res)=>{
    res.render("index",{
        listTitle:"Work List",
        newListItems: workItems
    });
})

app.get('/about',(req,res)=>{
    res.render("about");
})

app.post('/',(req,res)=>{
    let item = req.body.newItem;
    console.log(req.body)
    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.listen(3000,()=>{
    console.log("Server started listening at port 3000");
})