var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var taxCredit4 = {
    Tax_Credit_Four_Percent: { type: String },
    Result: { type: Number },
    project_id: { type: String },
};

var taxCredit4Schema = mongoose.Schema(taxCredit4);

mongoose.model("taxCredit4Profile", taxCredit4Schema);