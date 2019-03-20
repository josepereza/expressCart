var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  var products = Product.find(function(err, docs){
    var productChunks = [];
    let chunkSize = 3;
    for (var i=0; i<docs.length; i+=chunkSize) {
      productChunks.push(docs.slice(i, i+chunkSize));
    }
    res.render('shop/index', { title: 'ExpressCart', products: productChunks, successMsg: successMsg, noMessages: !successMsg });
  });
 
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, product){
    if (err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');

  });

});
router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart){
    return res.render("shop/shopping-cart",{products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next){
  if (!req.session.cart){
    return res.redirect("shop/shopping-cart");
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render("shop/checkout", {total: cart.totalPrice, errMsg: errMsg, noErrors: !errMsg});

});

router.post('/checkout', function (req, res, next){
  if (!req.session.cart){
    return res.redirect("shop/shopping-cart");
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_dGXjOS7k0HEfGWevEqBmsYuX");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "cad",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    // asynchronously called
    if (err){
      req.flash('error', err.message);
      return res.redirect('/checkout', {errMsg: err.message});
    }
    var order = new Order({
      user: req.user
    });
    req.flash('success', "Successfully purchased! ");
    req.session.cart = null;
    res.redirect('/');
  });
});
module.exports = router;

// this is a test
