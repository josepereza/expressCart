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
        imagePath: 'https://images.giant-bicycles.com/b_white,c_pad,h_400,q_80/dlptzraok4vi9di1wdb1/MY19-Escape-3_Color-A.jpg',
        title: "Old Bike On Sale!",
        description: "8 Gear Bike, very nice",
        price: 500
    }),
    new Product({
        imagePath: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/d285610e30664900b857a7fa00ed0201_9366/Superstar_Shoes_White_C77124_01_standard.jpg',
        title: "Adidas Shoes",
        description: "The full grain leather upper makes these trainers comfortable and soft on your feet.",
        price: 100
    }),
    new Product({
        imagePath: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/580x580/beff4985b56e3afdbeabfc89641a4582/H/E/HEADLINES-COACHES-JACKET_BLACK_JK00130_BLACK_01x.jpg',
        title: "Ugly Bike On Sale!",
        description: "8 Gear Bike, very nice",
        price: 500
    }),
    new Product({
        imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtWXsD7Mlzoiq1IJcFlOyMicS4aJKOaH7UaGQ1lsOoM_BmoTTu',
        title: "New Bike On Sale!",
        description: "The best bang for your buck and the most popular t-shirt in the world. Fits well and is perfect for any event, whether it be a giveaway, team, or group event.",
        price: 50
    }),
    new Product({
        imagePath: 'https://salsacycles.com/files/bikes/_small_image/2019_Marrakesh_Deore_Blue-uc-3.jpg',
        title: "Old Bike On Sale!",
        description: "8 Gear Bike, very nice",
        price: 500
    }),
    new Product({
        imagePath: 'https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fs.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F1f526ac0a181c4e73cee1b53b5d10a8%2F206322332%2FHarryPotter_HogwartsMystery_Key_Art.jpg&client=amp-blogside-v2&signature=9742f37de5015eef7cc3fa644fd57e64bb75ce1e',
        title: "Hogwarts Mystery",
        description: "The latest Harry Potter mobile game puts Hogwarts in your pocket",
        price: 500
    }),
    new Product({
        imagePath: 'https://pedegoelectricbikes.ca/wp-content/uploads/pedego-interceptor-electric-bicycle-1.jpg',
        title: "Ugly Bike On Sale!",
        description: "8 Gear Bike, very nice",
        price: 400
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
