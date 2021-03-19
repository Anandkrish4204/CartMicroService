const Cart = require('../model/Cart');

exports.addToCart = (req,res)=>{
    
    Cart.findOne().where({userName: req.body.userName})
    .then(cartItem=> {
        const cartProductIndex = cartItem.cart.items.findIndex(element =>String(element.productId) === String(req.body.productId));
        let newQuantity = 1;
        const updatedCartItems = [...cartItem.cart.items];

        if(cartProductIndex >= 0){
            newQuantity = parseInt(cartItem.cart.items[cartProductIndex].quantity)+ parseInt(req.body.quantity);
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }else {            
            updatedCartItems.push({
              productId: req.body.productId,
              quantity: newQuantity
            });
        }
        const updatedCart = {
            items: updatedCartItems
        };
        cartItem.cart = updatedCart;
        cartItem.save().then(result=> res.send(result))
        .catch(err=>{res.send({"message":err})});
    })
    .catch(err=> {
        const cartItem = new Cart({
            userName: req.body.userName,
            cart: {
                items:[{
                    productId : req.body.productId,
                    quantity: req.body.quantity
                }]
            }
        });
        cartItem.save().then(result=> res.send(result))
        .catch(err=>{res.send({"message":err})});
    });
}


exports.removeFromCart = (req,res)=>{
    Cart.findOne().where({userName: req.body.userName})
    .then(cartItem=>{
        const updatedCartItems = cartItem.cart.items.filter( item => item.productId.toString() !== req.body.productId.toString());
        cartItem.cart.items = updatedCartItems;

        cartItem.save()
        .then(result=> res.send(result))
        .catch(err=>{res.send({"message":err})});
    })
    .catch(err=>{res.send({"message":err})});
}
