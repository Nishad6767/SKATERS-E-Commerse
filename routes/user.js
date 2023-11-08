const express = require('express');
const router = express.Router();
const signUp = require('../controllers/user/signUp');
const signIn = require('../controllers/user/signIn');
const sessionCheck = require('../middlewares/users/sessionCheck');
const forgotPassword = require('../controllers/user/forgotPassword');












//==================== SIGN IN ============================
router
      .route('/signIn')
      .get(signIn.signInPage)
      .post(signIn.signInVerification)


// ====================== SIGN UP ==========================
router
      .route('/signUp')
      .get(signUp.signUpPage)
      .post(signUp.registerUser);


    //   ================== OTP ===============================

router
      .route('/otp_verification')
      .get(signUp.otpPage)
      .post(signUp.otpVerification);






//=====================PASSWORD HANDLERS ==============================
router
      .route('/forgotPassword')
      .get(forgotPassword.forgotPasswordPage)
      .post(forgotPassword.emailVerification);

// OTP Page and verification
router
      .route('/forgotPassword/otpVerification')
      .get(forgotPassword.otpPage)
      .post(forgotPassword.otpVerification)

router
      .route('/changePassword')
      .get(forgotPassword.passwordChangePage)
      .post(forgotPassword.updatePassword);















      module.exports = router;