const categoryCLTN = require("../../models/admin/categoryDetails");
const productCLTN = require("../../models/admin/productDetails");
const userCLTN = require("../../models/users/userDetails");
// const { search } = require("../../routes");


exports.collection = async (req, res)=>{
    try{
        let collectionId = req.query.query;
        let listing = req.session.listing;
        // let listingName;
        let currentUser = null;
        let listingName = 'Our Collection';

        listing=await productCLTN.find({ isDeleted: false, listed:true})
        
        res.render('index/productListing',{
            listing,
        })
    }
    catch(err){
        console.log(`error in product listng` + err);
    }
}


