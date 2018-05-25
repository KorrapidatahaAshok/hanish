var mongoose = require('mongoose'),
Schema = mongoose.Schema;



var zipCode = {
Zip_Code: { type: Number },
CBSA_Code: { type: Number },
FMR_Area: { type: String }
};

var zipCodeSchema = mongoose.Schema(zipCode);
mongoose.model("zipCodeData", zipCodeSchema);