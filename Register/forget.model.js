var mongoose = require('mongoose'),
Schema = mongoose.Schema;



var ForgetData = {
UserId: { type: String },
Status: { type: Boolean },
createdDate: { type: Date }

};

var ForgetSchema = mongoose.Schema(ForgetData);
mongoose.model("Forgetpwd", ForgetSchema);