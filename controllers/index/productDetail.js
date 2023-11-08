const productCLTN = require('../../models/admin/productDetails');
const userCLTN = require('../../models/users/userDetails');
const category  = require('../../models/admin/categoryDetails');

// Single product page
exports.view = async(req, res)=>{
    try{
        const currentUser = await userCLTN.findById(req.session.userId);
        const productDetails = await productCLTN
                    .findById(req.params.id)
                    .populate(['category', 'brand']);
        const categoryId = productDetails.category._id;



        
          let similarProducts = await productCLTN.find({'category':categoryId}).populate(['category', 'brand']);
          similarProducts = similarProducts.filter((product) => product.name != productDetails.name);

          res.render('index/product',{
            session : req.session.userId,
            documentTitle : productDetails.name,
            productDetails,
            currentUser,
            listing : similarProducts
          });
    
    } catch(err){
        console.log(`Error in Single product page :` + err);
        const currentUser = await userCLTN.findById(req.session.userId);
        res.render('index/404',{
            documentTitle : '404 | page not Found',
            url : req.originalUrl,
            session : req.session.userId,
            currentUser
        })
    }
}