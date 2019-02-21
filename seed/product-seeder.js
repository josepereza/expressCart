var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});
Product.collection.deleteMany({});

var products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: "Gothic Video Game",
        description: "Awesome Game!!",
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: "Gothic Video Game",
        description: "Awesome Game!!",
        price: 10
    }),
    new Product({
        imagePath: 'https://images.giant-bicycles.com/b_white,c_pad,h_400,q_80/dlptzraok4vi9di1wdb1/MY19-Escape-3_Color-A.jpg',
        title: "New Bike On Sale!",
        description: "8 Gear Bike, very nice",
        price: 500
    })
];

var done = 0; 
for (var i =0; i < products.length; i++)
{
    products[i].save(function(err, result){
        done++;
        if (done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
