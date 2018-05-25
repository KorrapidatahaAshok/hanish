var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var homeTypeData = {
Home_Type: { type: String },
Beds: { type: Number },
Number_of_Units: { type: Number },
Rent_Max: { type: Number },
Family_Size: { type: Number },
Rent_Charged: { type: Number },
Rent_Monthly: { type: Number },
Estimated_Sq_Ft: { type: Number },
Total_Sq_Ft: { type: Number },
project_id: { type: String }

};

var homeTypeDataSchema = mongoose.Schema(homeTypeData);
mongoose.model("homeTypeData", homeTypeDataSchema);