const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
    'mongodb+srv://lenhatminh:vNXlGIjqRWfAxZtc@cluster0.buembsu.mongodb.net/todolistDB?retryWrites=true&w=majority'
).then(() => {
    console.log("Connected to the database.");
}).catch(() => {
    console.log("Connection Failed!");
});

const itemsSchema = {
    name: String
}

const Item = mongoose.model("Item", itemsSchema);

app.get('/', (req, res) => {
    Item.find({}, (err, items) => {
        if (err) {
            console.log("Can't get data of database");
        }
        else {
            res.render("index", {
                listTitle: "Today",
                newListItems: items
            });
        }
    })
})

app.get('/about', (req, res) => {
    res.render("about");
})

app.post('/', (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({ name: itemName });
    item.save();
    res.redirect("/");
})


app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, (err) => {
        if (!err) {
            console.log("Successfully delete the item");
            res.redirect("/")
        }
    })
})

app.listen(3000, () => {
    console.log("Server started listening at port 3000");
})