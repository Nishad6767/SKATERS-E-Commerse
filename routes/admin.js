const express = require('express');
const router = express.Router();
const signIn = require('../controllers/admin/signIn');
const sessionCheck = require('../middlewares/admin/sessionCheck');
const accessCheck = require('../middlewares/admin/accessCheck');
const customer = require('../controllers/admin/customer');
const categories = require('../controllers/admin/categories');
const products = require('../controllers/admin/products');
const upload = require('../utilities/imageUpload');
const brands = require('../controllers/admin/brands');
const banners = require('../controllers/admin/banner');









// ================= SIGN IN =======================

// admin sign in routes (page and verification)

router
      .route('/')
      .get(signIn.page)
      .post(signIn.adminVerification);


// ============================== DASHBOARD ========================

// router
//       .route('/dashboard')
//       .get(sessionCheck,dashboard.view)



      

// ====================== BANNERS ===========================//

// view , add , delete, and update route
router 
      .route('/banner_management')
      .get(accessCheck(["Banner"]), banners.bannerPage)
      .post(accessCheck(["Banner"]), upload.single('bannerImage'), banners.addBanner)
      .patch(accessCheck(["Banner"]), banners.changeActivity)
      .delete(accessCheck(["Banner"]), banners.deleteBanner);




// ==================== USERS MANAGEMENT ============================

router 
      .route('/customer_management')
      .get(accessCheck(["Customer"]),customer.viewAll)
      .patch(accessCheck(['Customer']),customer.changeAccess);

      // admin categories view and add new categories
router
       .route('/categories')
       .get(accessCheck(['category']),categories.view)
       .post(accessCheck(['category']),categories.addCategory);



// admin edit page and edit category route
router
      .route('/categories/edit')
      .get(accessCheck(["Category"]), categories.editCategoryPage)
      .post(accessCheck(["Category"]), categories.editCategory);

// admin delete category
router
      .route('/categories/delete_category')
      .get(accessCheck(["Category"]), categories.deleteCategory); 
      
      
// ======================== PRODUCTS ===========================
router
      .route('/product_management')
      .get(accessCheck(['product']),products.view);



//Add product 
router
      .route('/product_management/add_product')
      .post(accessCheck(["Product"]), 
            // setting the fields to b uploaded and maximum count
            upload.fields([
                  {name:"frontImage", maxCount:1},
                  {name:"thumbnail", maxCount:1},
                  {name:"images", maxCount:3}
            ]),
             products.addProduct);


//Edit products page and post
router
      .route('/product_management/edit')
      .get(accessCheck(["Product"]), products.editPage)
      .post(
            accessCheck(["Product"]), 
            upload.fields([
                  { name: "frontImage", maxCount: 1 },
                  { name: "thumbnail", maxCount: 1 },
                  { name: "images", maxCount: 3 },
                ]),
            products.editProduct
      );



      // ========================= BRANDS ====================================

      // view brands page
router
.route('/brands')
.get(accessCheck(["Brand"]), brands.view)
.post(accessCheck(["Brand"]), brands.addBrand);


// edit brand 
router
.route('/brands/edit')
.get(accessCheck(["Brand"]), brands.editBrandPage)
.post(accessCheck(["Brand"]), brands.editBrand);

// delete brand
router
.route('/brands/delete_brand')
.get(accessCheck(["Brand"]), brands.deleteBrand);


//unlist product 
router
      .route('/product_management/changeListing')
      .get(accessCheck(["Product"]), products.changeListing);
      


















      module.exports = router;
