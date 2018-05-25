var Register = {};
var profileSchema = require("mongoose").model("Userprofile");
var AdminSchema = require("mongoose").model("Adminprofile");
var ForGetPwd = require("mongoose").model("Forgetpwd")
var sections = require("../Collaboration Tool/models/sections")
var jwt = require("jsonwebtoken");
var config = require("../../config/config");

var section1 = require("./section1.cal");
var section2 = require("./section2.cal");
var section3 = require("./section3.cal");
var section4 = require("./section4.cal");

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


const nodemailer = require('nodemailer');


Register.register = function (req, res) {
    // console.log("TEST:", req.body);

    var user_name = req.body.username.toLowerCase();
    var email = req.body.email.toLowerCase();

    profileSchema.findOne({
        $or: [{
            username: user_name
        }, {
            email: email
        }]
    }, function (err, obj) {

        if (!err) {
            if (obj == null) {

                // req.body.active = true;
                // req.body.removeAccount = true;
                // req.body.city = "NA";
                // req.body.address = "NA";
                // req.body.phone = "NA";

                var profiledata = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username.toLowerCase(),
                    email: req.body.email.toLowerCase(),
                    active: true,
                    removeAccount: true,
                    city: "",
                    address: "",
                    phone: "",
                    password: req.body.password

                }
                let profile = new profileSchema(profiledata);

                // console.log("profile", profile)
                profile.save()
                    .then(function (response) {
                        // console.log(response)

                        var out = {
                            msg: "You have Registered successfully.",
                            condition: true,
                            response: response,
                            icon: "fa fa-check fa-2x success-icon"

                        }
                        res.json(out);

                        sections.find({ "userId": "5aa777ecaa0b060768cb568a" }, (err, sectionobj) => {

                            if (err) console.log(err)

                            // console.log("sectionobj", sectionobj)

                            for (var i = 0; i < sectionobj.length; i++) {

                                var sample = {

                                    "ProjectName": sectionobj[i].ProjectName,
                                    "sectionName": sectionobj[i].sectionName,
                                    "userId": response._id,
                                    "tasks": []
                                }

                                let project1 = new sections(sample)
                                project1.save()
                                    .then((data) => {

                                        // console.log("data", data)

                                        sectionobj.forEach(function (value) {
											 
                                            if (data.sectionName == "Pre-Development") {
   
                                               console.log("Jaya")
                                                   if (value.sectionName == data.sectionName) {
   
                                                       section1.cal(data, sectionobj, function (result) {
   
                                                           section2.cal(data, value, result, function (result1) {
   
                                                               // console.log(result1).
                                                               section2.cal1(data, value, result1, function (result2) {
   
                                                                   // console.log("result2", result2)
   
                                                               })
                                                           })
   
                                                       })
                                                   }
                                               
                                               }

                                               if(data.sectionName == "Financing, Diligence, and Closing") {

                                                    if(value.sectionName == data.sectionName) {

                                                        section3.cal(data, sectionobj, function(result3) {

                                                            section3.cal1(data, value, result3, function(result4) {

                                                                section3.cal2(data, value, result4, function(result5) {

                                                                    section3.cal3(data, value, result5, function(result6) {

                                                                    })

                                                                })

                                                            })
                                                        })
                                                    }
                                               }

                                               if(data.sectionName == "Post Closing and Lease-Up") {

                                                    if(value.sectionName == data.sectionName){

                                                        section4.cal(data, sectionobj, function(result7) {

                                                            section4.cal1(data, value, result7, function(result8) {

                                                                section4.cal2(data, value, result8, function(result9) {

                                                                })

                                                            })

                                                        })
                                                    }
                                               }
                                           
                                           })

                                            
                                    })
                                    .catch((err) => {

                                        console.log(err)
                                    })
                            }
                        })

                    })
                    .catch(function (err) {

                        var out = {
                            msg: "Your registration failed.",
                            condition: false,
                            response: err,
                            icon: "fa fa-exclamation-triangle fa-2x"

                        }
                        res.json(out);

                    })

            } else {
                if (obj.email == req.body.email.toLowerCase() && obj.username == req.body.username.toLowerCase()) {
                    var out = {
                        msg: 'Username and Email already exists.',
                        condition: false,
                        icon: "fa fa-exclamation-triangle fa-2x"
                        // response:obj

                    }
                    res.json(out);

                } else if (obj.email == req.body.email.toLowerCase()) {
                    var out = {
                        msg: 'Email already exists.',
                        condition: false,
                        icon: "fa fa-exclamation-triangle fa-2x"
                        // response:obj

                    }
                    res.json(out);


                } else if (obj.username == req.body.username.toLowerCase()) {
                    var out = {
                        msg: 'Username already exists.',
                        condition: false,
                        icon: "fa fa-exclamation-triangle fa-2x"
                        // response:obj

                    }
                    res.json(out);

                }

            }


        } else {
            // console.log("error" + err);

        }


    });


}


Register.update = function (req, res) {

    console.log("body", req.body)

    var email_1 = req.body.email.toLowerCase();

    var updateData = {
        email: email_1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone
    }

    profileSchema.findOne({ $and: [{ "_id": req.body.id }, { "email": email_1 }] }, function (err, result) {

        if (err) console.log(err)


        else if (result) {

            profileSchema.findOne({ $and: [{ "_id": { $ne: req.body.id } }, { "email": { $ne: email_1 } }] }, function (err, result1) {

                if (err) console.log(err)

                else if (result1) {

                    profileSchema.update({ '_id': req.body.id }, { $set: updateData }, function (err, result2) {

                        if (!err) {
                            var ProfileUpadte = {};

                            var msg = "";
                            var condition = false;

                            // console.log("result", result)
                            if (result2.nModified == 0) {

                                msg = 'Profile data not modified.';
                                condition = false;
                                icon = "fa fa-times-circle fa-3x failed-icon";

                                ProfileUpadte = { Update: "Failed" }

                                var output = {
                                    msg: msg,
                                    condition: condition,
                                    icon: icon

                                }

                                res.json(output)

                            }

                            else {
                                profileSchema.findOne({ "_id": req.body.id }, function (err, result3) {
                                    if (!err) {


                                        ProfileUpadte = result3;
                                        // console.log("result3" + result3)
                                        msg = 'Profile data updated successfully.';
                                        icon = "fa fa-check fa-2x success-icon";
                                        condition = true;
                                        var out = {
                                            msg: msg,
                                            response: result3,
                                            condition: condition,
                                            ProfileUpadte: ProfileUpadte,
                                            icon: icon
                                            // tokenStatus:a,
                                            // token:token

                                        }
                                        res.json(out);

                                    }

                                });

                            }

                            // res.send("updated")

                        } else {

                            var out = {
                                msg: 'update failed like did not matched id.',
                                condition: false,
                                ProfileUpadte: { Update: "Failed" }
                                // response: result

                            }
                            res.json(out);
                            // res.send("updated Failure")

                        }




                    });


                }
            })

        }

        else {
            profileSchema.findOne({ "email": email_1 }, function (err, result4) {

                if (err) console.log(err)


                else {
                    // console.log("result2", result2)

                    if (result4 == null) {


                        profileSchema.update({ '_id': req.body.id }, { $set: updateData }, function (err, result5) {

                            if (!err) {
                                var ProfileUpadte = {};

                                var msg = "";
                                var condition = false;

                                // console.log("result", result)
                                if (result5.nModified == 0) {
                                    msg = 'Profile data not updated.';
                                    condition = false;
                                    icon = "fa fa-times-circle fa-3x failed-icon",

                                        ProfileUpadte = { Update: "Failed" }

                                    var output = {
                                        msg: msg,
                                        condition: condition,
                                        icon: icon

                                    }

                                    res.json(output)

                                }

                                else {
                                    profileSchema.findOne({ "_id": req.body.id }, function (err, result6) {
                                        if (!err) {
                                            ProfileUpadte = result6;
                                            // console.log("result1" + result1)
                                            msg = 'Profile data updated successfully.';
                                            icon = "fa fa-check fa-2x success-icon";
                                            condition = true;
                                            var out = {
                                                msg: msg,
                                                response: result6,
                                                condition: condition,
                                                ProfileUpadte: ProfileUpadte,
                                                icon: icon
                                                // tokenStatus:a,
                                                // token:token

                                            }
                                            res.json(out);



                                        }

                                    });

                                }

                                // res.send("updated")

                            } else {

                                var out = {
                                    msg: 'update failed like did not matched id.',
                                    condition: false,
                                    ProfileUpadte: { Update: "Failed" }
                                    // response: result

                                }
                                res.json(out);
                                // res.send("updated Failure")

                            }




                        });
                    }
                    else {
                        msg = 'email already exists.';
                        icon = "fa fa-times-circle fa-3x failed-icon";
                        condition = false;
                        var out = {
                            msg: msg,
                            response: result4,
                            condition: condition,
                            icon: icon,

                        }



                        res.json(out);
                    }


                }



            })


        }



    })



}


Register.delete1 = function (req, res) {
    console.log(req.body)
    console.log("Remove account")

    var RemoveAccount = {
        removeAccount: req.body.removeAccount,
    }

    profileSchema.update({
        '_id': req.body.id
    }, {
            $set: RemoveAccount
        }, function (err, result) {

            if (!err) {
                var out = {
                    msg: 'Account removed successfully.',
                    response: result,
                    //  tokenStatus:a,
                    // token:token


                }
                res.json(out);
                // res.send("updated")

            } else {

                var out = {
                    msg: 'Unable to delete like did not matched id.',
                    // response: result

                }
                res.json(out);
                // res.send("updated Failure")

            }




        });

}



Register.ActiveAccount = function (req, res) {

    profileSchema.update({
        '_id': req.body.id
    }, {
            $set: {
                active: req.body.active
            }
        }, function (err, result) {

            if (!err) {
                var out = {
                    msg: 'Active Account Successfully updated.',
                    response: result,
                    // tokenStatus:a,
                    // token:token

                }
                res.json(out);
                // res.send("user Active Account updated")

            } else {
                var out = {
                    msg: 'Active Account updated Failure like did not matched id.',
                    // response: result

                }
                res.json(out);
                //res.send(" Active Account updated Failure")

            }

        });


}
Register.UserLogin = function (req, res) {

    console.log(req.body)

    //Admin login
    AdminSchema.findOne({
        $or: [{
            "username": req.body.username
        }, {
            "email": req.body.email
        }]
    }, function (err, result) {

        if (!err) {


            if (result != null) {

                bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                    if (err) return next(err);
                    bcrypt.compare(req.body.password, result.password, function (err, isMatch) {
                        if (err) {
                            // return console.error(err);
                        }

                        if (isMatch) {

                            var token = jwt.sign({ id: result._id }, config.secret, { expiresIn: 1000 });
                            console.log("token", token)


                            var outPut = {
                                msg: "Admin login successfull.",
                                condition: true,
                                Type: "Admin",
                                result: result,
                                token: token,
                                Match: isMatch,
                                icon: "fa fa-check fa-2x success-icon"

                            }
                            res.json(outPut);


                        } else {
                            var outPut = {
                                msg: "Password does not match.",
                                condition: false,
                                Match: isMatch,
                                icon: "fa fa-exclamation-triangle fa-2x"

                            }
                            res.json(outPut);

                        }

                    });


                });

            }


            else {

                var user_name = req.body.username.toLowerCase();

                profileSchema.findOne({
                    $or: [{
                        "username": user_name
                    }, {
                        "email": user_name
                    }]
                }, function (err, result) {

                    if (!err) {

                        // console.log("Enter login page");

                        // console.log("result", result)
                        if ((result != null) && (result.removeAccount == true) && (result.active == true)) {
                            // console.log("Results" + result)

                            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                                if (err) return next(err);

                                // console.log(req.body.password, result.password)
                                bcrypt.compare(req.body.password, result.password, function (err, isMatch) {
                                    if (err) {
                                        // return console.error(err);
                                    }

                                    if (isMatch) {

                                        var token = jwt.sign({ id: result._id }, config.secret, { expiresIn: 1000 });
                                        console.log("token", token)

                                        // console.log("hiiiiiiii")

                                        var outPut = {
                                            msg: "User Login successfull.",
                                            Type: "User",
                                            condition: true,
                                            result: result,
                                            token: token,
                                            Match: isMatch,
                                            icon: "fa fa-check fa-2x success-icon"

                                        }

                                        // console.log('output', outPut)
                                        //res.send(outPut);
                                        res.json(outPut)


                                    } else {
                                        var outPut = {
                                            msg: "Password does not match.",
                                            condition: false,
                                            Match: isMatch,
                                            icon: "fa fa-exclamation-triangle fa-2x"

                                        }
                                        //res.send(outPut);
                                        res.json(outPut)
                                    }

                                });


                            });

                        }
                        else {
                            //res.send("No data pls register");
                            var outPut = {
                                msg: "Invalid User login details.",
                                condition: false,
                                icon: "fa fa-exclamation-triangle fa-2x"
                            }
                            // res.send(outPut);
                            res.json(outPut)
                        }
                    }

                    else {
                        //res.send("err", err)
                        res.json("err", err)

                    }

                });

            }
        }
        else {

            //res.send("No data pls register");
            var outPut = {
                msg: "Invalid Admin login details.",
                icon: "fa fa-exclamation-triangle fa-2x"
            }
            res.json(outPut);

        }


    }

    )
}


Register.findUsers = function (req, res) {

    profileSchema.find({ removeAccount: true }, function (err, obj) {

        if (!err) {

            var output = {

                msg: "Users found successfully.",
                App: obj
            }

            res.json(output)
        }

        else {

            var output = {

                msg: "Users data not found.",
                Error: err
            }

            res.json(output)
        }
    });
}



Register.fgtpswd = function (req, res) {

    console.log(req.body)
    console.log("Hello" + req.body.email)

    AdminSchema.findOne({
        email: req.body.email
    }, function (err, result) {
        var msg = ""
        if (err) {

            console.log("Err", err)
        }

        else {

            if (result == null) {
                msg: "Invalid Admin."
                var output = {
                    msg: "Invalid Admin.",
                    condition: false,
                    data: null
                }

                profileSchema.findOne({

                    email: req.body.email.toLowerCase()

                }, function (err, result) {
                    var msg = ""
                    if (err) {

                        console.log("Err", err)
                    }

                    else {

                        if (result == null) {
                            msg: "Invalid User."
                            var output = {
                                msg: "Invalid User.",
                                condition: false,
                                data: null
                            }


                            res.json(output)

                        }
                        else {

                            var status = {
                                UserId: result._id,
                                Status: true,
                                createdDate: new Date()
                            }

                            console.log("new status", status)

                            var ForGetPwdData = new ForGetPwd(status);
                            ForGetPwdData.save()
                                .then(function (response) {

                                    var transporter = nodemailer.createTransport({
                                        service: 'Gmail',
                                        auth: {
                                            user: 'forgot@getviahome.com', // Your email id
                                            pass: 'viahome321!' // Your password
                                        }
                                    })
                                    let urlids = result._id + '/' + response._id
                                    let userName = result.lastName;
                                    var mailOptions = {
                                        from: '"GetViaHome"<forgot@getviahome.com>',
                                        to: result.email,
                                        subject: 'Password reset',
                                        text: 'To change password click below link',
                                        html: '<p>Hi ' + userName + ', </p><p>Click the link below to reset your password</p><a href="http://192.168.0.63:3000/resetpassword/'
                                            + urlids + '">Reset Password</a><p>Regards,</p><p>GetViaHome</p>'
                                    };

                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            console.log(error);
                                            res.json("Err", error)
                                        }

                                        console.log(info)
                                        msg: "Please check your mail to reset password"
                                        // console.log(`Message sent: ${info.response}`);
                                        var output = {
                                            msg: "Please check your mail to reset password",
                                            condition: true,
                                            data: info
                                        }

                                        var currentdate = new Date();

                                        profileSchema.update({

                                            '_id': result._id
                                        },
                                            {
                                                $set: { 'fgtpswdDate': new Date() }

                                            }, function (err, result) {

                                                if (err) {
                                                    console.log(err)
                                                    msg = "Couldn't update the date to the profile"
                                                    // res.json(err)
                                                    condition = false;
                                                    result = err
                                                }
                                                else {
                                                    console.log("date result", result)
                                                    // console.log(result._id)
                                                    // res.json(result)
                                                    msg = "Updated date to the profile";
                                                    condition = true;
                                                    result = result
                                                }

                                                res.json(output)

                                            })

                                    });


                                }).catch(function (err) {

                                })

                            // console.log("result", result._id)
                            //  res.json(result)

                        }
                    }
                });


            }
            else {

                var status = {
                    UserId: result._id,
                    Status: true,
                    createdDate: Date.now()
                }
                var ForGetPwdData = new ForGetPwd(status);
                ForGetPwdData.save()
                    .then(function (response) {

                        var transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'forgot@getviahome.com', // Your email id
                                pass: 'viahome321!' // Your password
                            }
                        })
                        let urlids = result._id + '/' + response._id;
                        let userName = result.lastName;
                        var mailOptions = {
                            from: '"GetViaHome"<forgot@getviahome.com>',
                            to: result.email,
                            subject: 'Password reset',
                            text: 'To change password click below link',
                            html: '<p>Hi ' + userName + ', </p><p>Click the link below to reset your password</p><a href="http://192.168.0.63:3000/resetpassword/' + urlids + '">Reset Password</a><p>Regards,</p><p>GetViaHome</p>'
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                                res.json("Err", error)
                            }
                            console.log(info)
                            msg: "Please check  your mail to reset password"
                            // console.log(`Message sent: ${info.response}`);
                            var output = {
                                msg: "Please check your mail to reset password",
                                condition: true,
                                data: info
                            }

                            var currentdate = new Date();

                            AdminSchema.update({

                                '_id': result._id
                            },
                                {
                                    $set: { 'fgtpswdDate': new Date() }

                                }, function (err, result) {

                                    if (err) {
                                        console.log(err)
                                        msg = "Couldn't update the date to the profile"
                                        // res.json(err)
                                        condition = false;
                                        result = err
                                    }
                                    else {
                                        console.log("date result", result)
                                        // console.log(result._id)
                                        // res.json(result)
                                        msg = "Updated date to the profile";
                                        condition = true;
                                        result = result
                                    }

                                    res.json(output)

                                    // res.json(output)

                                });

                        })
                            .catch(function (err) {

                            })

                        // console.log("result", result._id)
                        //            res.json(result)

                    }

                    )
            }
        }
    })
};


Register.changepswd = function (req, res) {

    console.log("Hi")
    console.log(req.body)

    profileSchema.findOne(
        {

            '_id': req.body.id
        },
        {
            password: req.body.curpswd
        },
        function (err, result) {

            var condition = false;
            var msg = "";
            if (err) {

                console.log(err)
                msg = "Password change failed - id did not match";
                condition = false
                var output = {

                    msg: msg,
                    condition: condition,
                    icon: "fa fa-times-circle fa-3x failed-icon"
                }
                res.json(output)
            }
            else {

                if (result == null) {
                    msg = "Invalid password"
                    condition = false

                    var output = {
                        msg: "Invalid password",
                        data: null,
                        condition: condition,
                        icon: "fa fa-times-circle fa-3x failed-icon"
                    }
                    console.log(output)
                    res.json(output)

                }

                else {
                    console.log("aaaaaa")
                    if (result.nModified == 0) {
                        var output = {
                            msg: 'Password not modified.',
                            condition: false,
                            icon: "fa fa-times-circle fa-3x failed-icon"
                        }
                        res.json(output)

                    }

                    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                        if (err) return next(err);
                        bcrypt.compare(req.body.curpswd, result.password, function (err, isMatch) {
                            if (err) {
                                // return console.error(err);
                            }

                            if (isMatch) {
                                msg = "Password matched";
                                condition = true;
                                var outPut = {
                                    msg: "Password matched",
                                    Type: "User",
                                    condition: true,
                                    result: result,
                                    //  token:token,
                                    Match: isMatch,
                                    icon: "fa fa-check fa-2x success-icon"

                                }
                                var updateData = {

                                    password: req.body.password
                                }
                                //res.send(outPut);
                                // res.json(outPut)

                                profileSchema.update({

                                    '_id': req.body.id
                                },

                                    {
                                        $set: updateData

                                    }, function (err, result) {

                                        if (err) {

                                            console.log(err)
                                            msg = "Password not saved";
                                            condition = false;
                                            var output = {

                                                msg: "Password not saved",
                                                err: err,
                                                condition: false,
                                                icon: "fa fa-times-circle fa-3x failed-icon"
                                            }
                                            res.json(output)
                                        }

                                        else {

                                            console.log(result)
                                            msg = "Password updated successfully";
                                            condition = true;
                                            var output = {

                                                msg: "Password updated successfully",
                                                result: result,
                                                condition: true,
                                                icon: "fa fa-check fa-2x success-icon"
                                            }
                                            res.json(output)
                                        }
                                    }

                                )
                            } else {
                                msg = "Password does not match";
                                condition = false;

                                var outPut = {
                                    msg: "Password does not match",
                                    condition: false,
                                    Match: isMatch,
                                    icon: "fa fa-times-circle fa-3x failed-icon"

                                }
                                //res.send(outPut);
                                res.json(outPut)
                            }

                        });


                    });

                }

            }


        })

}


Register.changePwdBasedId = function (req, res) {
    console.log(req.body)
    console.log("HI" + req.body.id)

    let pwdChanges = {
        password: req.body.password
    }


    AdminSchema.findOne({ _id: req.body.id }, function (err, obj) {

        var msg = "";
        var condition = false

        if (!err) {
            if (obj == null) {


                profileSchema.findOne({ _id: req.body.id }, function (err, obj) {

                    // console.log("fgtpswd date", obj.fgtpswdDate.getMinutes())
                    // console.log("fgtpswd date", obj.fgtpswdDate)
                    // console.log("Present date", new Date())
                    // console.log("Present date", new Date().getMinutes())

                    var fgtPswDateMints = obj.fgtpswdDate.getMinutes()
                    var userHours = new Date().getMinutes()

                    // console.log("fgtPswDateMints", fgtPswDateMints)
                    // console.log("userHours", userHours)

                    // var expiryHours = fgtPswDateHours - userHours;
                    var expiryMin = userHours - fgtPswDateMints;

                    console.log("hiiii")
                    console.log(expiryMin)
                    if (expiryMin > 5) {

                        msg = "User Reset Password link expired";
                        condition: false;
                        console.log("User Reset Password link expired")

                        var output = {

                            msg: "User Reset Password link expired",
                            condition: false
                        }

                        res.json(output)
                    }
                    else {

                        ForGetPwd.findOne({ _id: req.body.UserId }, function (err, forgotobj) {

                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("Status", forgotobj.Status)

                                if (forgotobj.Status == true) {
                                    //update password and status

                                    console.log("user id is" + req.body.id)
                                    profileSchema.update({

                                        '_id': req.body.id
                                    },

                                        {
                                            $set: pwdChanges

                                        }, function (err, result) {

                                            var msg = "";
                                            var condition = false
                                            if (err) {

                                                console.log(err)

                                                msg = "User Password not saved";
                                                condition = false;
                                                var output = {

                                                    msg: "User Password not saved",
                                                    err: err,
                                                    condition: false
                                                }
                                                res.json(output)
                                            }

                                            else {

                                                console.log(result)
                                                console.log("User ID" + req.body.id)

                                                ForGetPwd.update({

                                                    '_id': req.body.UserId
                                                },

                                                    {
                                                        $set: { Status: false }

                                                    }, function (err, result) {
                                                        if (!err) {
                                                            console.log("status updated" + result)
                                                            msg = "User Password updated successfully";
                                                            condition = true;
                                                            var output = {

                                                                msg: "User Password updated successfully",
                                                                result: result,
                                                                condition: true
                                                            }
                                                            res.json(output)
                                                        }
                                                        else {
                                                            console.log("status updated error")

                                                        }

                                                    })

                                            }
                                        })
                                }
                                else {
                                    msg = "User Password already updated";
                                    condition = false;
                                    var output = {

                                        msg: "User Password already updated",
                                        // result: result,
                                        condition: false
                                    }
                                    res.json(output)
                                }

                            }
                        })
                    }

                })

            }
            else {

                var fgtPswDateMints = obj.fgtpswdDate.getMinutes()
                var userHours = new Date().getMinutes()

                // console.log("fgtPswDateMints", fgtPswDateMints)
                // console.log("userHours", userHours)

                // var expiryHours = fgtPswDateHours - userHours;
                var expiryMin = userHours - fgtPswDateMints;

                console.log("hiiii")
                console.log(expiryMin)
                if (expiryMin > 5) {

                    msg = "Admin Reset Password link expired";
                    condition: false;
                    var output = {

                        msg: "Admin Reset Password link expired",
                        condition: false
                    }

                    res.json(output)
                }
                else {

                    ForGetPwd.findOne({ _id: req.body.UserId }, function (err, forgotobj) {

                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("Status", forgotobj.Status)

                            if (forgotobj.Status == true) {
                                //update password and status

                                console.log("admin id is" + req.body.id)
                                AdminSchema.update({

                                    '_id': req.body.id
                                },

                                    {
                                        $set: pwdChanges

                                    }, function (err, result) {

                                        var msg = "";
                                        var condition = false
                                        if (err) {

                                            console.log(err)

                                            msg = "Admin Password not saved";
                                            condition = false;
                                            var output = {

                                                msg: msg,
                                                err: err,
                                                condition: false
                                            }
                                            res.json(output)
                                        }

                                        else {

                                            console.log(result)
                                            console.log("Admin ID" + req.body.id)

                                            ForGetPwd.update({

                                                '_id': req.body.UserId
                                            },

                                                {
                                                    $set: { Status: false }

                                                }, function (err, result) {
                                                    if (!err) {
                                                        console.log("status updated" + result)
                                                        msg = "Admin Password updated successfully";
                                                        condition = true;
                                                        var output = {

                                                            msg: msg,
                                                            result: result,
                                                            condition: true
                                                        }
                                                        res.json(output)
                                                    }
                                                    else {
                                                        console.log("status updated error")

                                                    }

                                                })

                                        }
                                    })
                            }
                            else {
                                msg = "Admin Password already updated";
                                condition = false;
                                var output = {

                                    msg: msg,
                                    // result: result,
                                    condition: false
                                }
                                res.json(output)
                            }

                        }
                    })
                }

            }

        }
        else {
            msg = "Admin Password cannot be updated - id did not match";
            condition = false;

            var output = {

                msg: "Admin Password cannot be updated - id did not match",
                err: err,
                condition: false
            }
            res.json(output)

        }


    })

}

module.exports = Register;


