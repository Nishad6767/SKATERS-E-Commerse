const userCLTN = require('../../models/users/userDetails');
const productCLTN = require('../../models/admin/productDetails');
const bannerCLTN = require('../../models/admin/banner');



exports.viewAll = async(req ,res)=>{
    try{
        let currentUser = null;
        if(req.session.userId){
              currentUser = await userCLTN.findById(req.session.userId);
        }
        const allBanners = await bannerCLTN.find({active:true}).limit(3);
        console.log(allBanners);
        res.render('index/landingPage',{
            session : req.session.userId,
            banners:allBanners,
        })
    } catch(err){
        console.log(`Error rendering landing page` + err);
        res.render('index/404',{
            documentTitle : '404 | page not found',
            session : req.session.userId,
            currentUser
        })
    }
};
