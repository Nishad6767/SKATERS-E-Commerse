const userCLTN = require('../../models/users/userDetails');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const saltRounds = 10;
const NewOTP = require('../../models/users/otp');

// signUp page
exports.signUpPage = async(req, res)=>{
    try{
        res.render('user/partials/signUp');
    } catch(err){
        console.log(`Error rendering the user signup page:`+ err);
    }
};

// User Registration With Otp Validation
exports.registerUser = async(req, res)=>{
    try{

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUserDetails = {
            name : req.body.name,
            number : req.body.number,
            email : req.body.email,
            password : hashedPassword
        };
        req.session.newUserDetails = newUserDetails;
        const inputEmail = req.body.email;
        req.session.inputEmail = inputEmail;
        const inputNumber = req.body.number;
        // checking for already existing user
        const emailCheck = await userCLTN.findOne({email:inputEmail});
        const numberCheck = await userCLTN.findOne({number:inputNumber});
        if(emailCheck||numberCheck){
            res.render('user/partials/signUp');
        }else{
            const otp = `${Math.floor(1000+Math.random()*9000)}`
            console.log(otp +'otp');
            req.session.otp = otp;

            const newOTP = new NewOTP({
                  email : inputEmail,
                  otp : otp,
            });
            await newOTP.save();


            // node mailer
            // creating transporter
            let transporter = nodemailer.createTransport({
                service:'Gmail',
                auth: {
                      user : process.env.TRANSPORTER_USERNAME,
                      pass : process.env.TRANSPORTER_PASSWORD,
                }
          });
        //   mail options
        let mailOptions = {
            from:process.env.TRANSPORTER_USERNAME,
            to: inputEmail,
            subject : "OTP Verification | Skaters eCommerce",
            html: `<h1>OTP</h1></br><h2 style="text-color: red, font-weight: bold">${otp}
                                          </h2></br><p>Enter the OTP to create account.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
              console.log('error Occured : '+error);
        } else{
              console.log(`OTP sent successfully ${otp}`);
              res.redirect('/users/otp_verification');
        }
  });



        }
    }catch(err){
        console.log(`Error signin up user :`+ err);
    }
};


exports.otpPage = async(req, res) => {
    try{
        
          res.render('user/partials/otp', {
                documentTitle:'OTP Verification',
          })
    } catch(error){
          console.log('Error in GET OTP Page :' + error);
    }
}

exports.otpVerification = async(req, res)=>{
    try{
        
        const otp = req.body.otp;
        const inputEmail = req.session.inputEmail;
        const otpDetails = await NewOTP.findOne({otp:otp, email:inputEmail});
        if(otpDetails){
             // if(otpDetails.expiration > Date.now()){
                const newUserDetails = await new userCLTN(req.session.newUserDetails);
                await newUserDetails.save();
                res.redirect('/users/signIn')
          
        } else{
            res.render('user/partials/otp');
        }

        
        const otpNew = req.body.otp;
        const mail = req.session.newUserDetails.email;
        await NewOTP.findOneAndDelete({email : mail , otp: otpNew});
        req.body.otp = false;
    } catch(err){
        console.log(`Error in Signup :` + err);
    }
};