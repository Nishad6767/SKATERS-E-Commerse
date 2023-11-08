const adminCLTN = require('../../models/admin/adminDetails');


// admin page rendering
exports.page = async(req, res)=>{
    try{
        res.render('admin/partials/signIn')
    } catch(err){
        console.log(`error rendering admin sign in page :` + err);
    }
};



// admin verification
exports.adminVerification = async(req, res)=>{
    try{
        const inputPassword = req.body.password;
        const inputEmail = req.body.email;
        const adminFind = await adminCLTN.findOne({email: inputEmail});
              console.log(adminFind);
        if(adminFind){
            if(adminFind.password=== inputPassword){
                req.session.admin = adminFind;
                console.log('Admin session created succefully');
                res.redirect('/admin/dashboard');
            }
            else{
                res.render('admin/partials/signIn',{
                    errorMessage : 'Incorrect Password',
                    admin : true
                });
            }
        }
        else{
            res.render('admin/partials/signIn',{
                errorMessage : 'Admin not found',
                admin : true
            });
        }
    }
    catch(err){
        console.log(`Failed to login` + err);
    }
    
};
