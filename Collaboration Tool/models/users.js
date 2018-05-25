
const bcrypt=require('bcryptjs'),
 mongoose = require('mongoose'),
Schema = mongoose.Schema,

SALT_WORK_FACTOR = 10;


var user = {
  email: { type: String },
  username: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  city: { type: String },
  address: { type: String },
  phone: { type: String },
  agree: { type: Boolean },
  active: { type: Boolean },
  removeAccount: { type: Boolean },
  createdDate: { type: Date, default: Date.now },
  fgtpswdDate: { type: Date }
};

var userSchema = mongoose.Schema(user);

var user = module.exports =mongoose.model("Usersprofile", userSchema);
/*register */
module.exports.reg=(userdetails, callback)=>{
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
    bcrypt.hash(userdetails.password, salt, (err, hash)=> {
      userdetails.password = hash;
      user.findOne({username:userdetails.username},(err,existed)=>{
        if(err){
          console.log("error")
        }else if(existed){
          return callback("username existed");

        }else{
          user.findOne({email:userdetails.email},(err,existed)=>{
            if(err){
              console.log("error")
            }else if(existed){
              return callback("email is existed")
            }
            else{
              userdetails.save((err,data)=>{
                if(err){
                  console.log(err)
                }
                else{
                  return callback("registration suceessfully");
                }

              })
            }

          })

        }


      });
    });

  })
}
/*login*/

module.exports.login=(userdetails,callback)=>{

  user.findOne({"username":userdetails.username},(err, result)=>{
    if(err){
      console.log("error");
    }else if(result)
    {
      console.log(userdetails.password)
      bcrypt.compare(userdetails.password, result.password, (err, result)=> {
        if(err){
          console.log("error")
        }else if(result==true){
          return callback("login suceess")
        }else{
          return callback("password not matched")
        }

      });

    }else
    {
      return callback("user details not found")
    }

  });
}
