const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const landingPage = require('../controllers/index/landingPage');
const productListing = require('../controllers/index/productListing');
const objectIdCheck = require('../middlewares/users/objectIdCheck');
const productDetail = require('../controllers/index/productDetail');


// ================== LANDING PAGE ======================
router.get('/',landingPage.viewAll);


// ================== COLLECTIONS ========================

router
      .route('/products')
      .get(productListing.collection)




// ==================product detail view==================

router
.route('/products/:id')
.get(objectIdCheck,productDetail.view)








module.exports = router;