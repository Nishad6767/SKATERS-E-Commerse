const bcrypt = require('bcrypt');
const userCLTN = require('../../models/users/userDetails');



exports.signInPage = async (req, res)=>{
    try{
      //   if(req.session.userId){
      //       res.redirect('/');
      //   } else{
      //       res.render('user/partials/signIn',{
      //             session : null
      //       })
      //   }
      res.render('user/partials/signIn',{
                       session : null})
    } catch(err){
        console.log(`error rendering user sign in page :`+ err);
    }
};



exports.signInVerification = async(req, res)=> {
    try {
          const inputEmail = req.body.email.toLowerCase();
          const inputPassword = req.body.password;
          const userFind = await userCLTN.findOne({email : inputEmail}).populate('cart wishlist');
          
          if(userFind){
                const hashedCheck = await bcrypt.compare(
                      inputPassword,
                      userFind.password
                );
                if(userFind.access == true){
                      if(hashedCheck){
                            req.session.userId = userFind._id;
                            req.session.email = inputEmail;
                            // req.session.cartCount = userFind.cart.totalQuantity;
                            // req.session.wishlistCount = userFind.wishlist.products.length;
                            if(req.session.currentUrl){
                                  res.redirect(req.session.currentUrl);
                             
                            }
                            res.redirect('/');
                           
                      }
                      else{
                            res.render('user/partials/signIn',{
                                  documentTitle : "User Sign In ",
                                  errorMessage : "Incorrect Password",
                            });
                      }
                } else{
                      res.render('user/partials/signIn',{
                            documentTitle : "User Sign In ",
                            errorMessage : "Unauthorized User",
                      }); 
                }
          } else{
                res.render('user/partials/signIn',{
                      documentTitle : "User Sign In ",
                      errorMessage : "User Not Found",
                });
          }
    } catch (error) {
          console.log('Error signing in user : '+error);
    }
};

   