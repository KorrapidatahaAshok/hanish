var mongoose = require('mongoose'),
Schema = mongoose.Schema;



var inputTermSheet = {
Name: { type: String },
Email: { type: String },
Phone: { type: Number },
Address: { type: String },
City: { type: String },
State: { type: String },
ZipCode: { type: Number },
OrganizationName: { type: String },
ConstructionType: { type: String },
PurchasePrice: { type: Number },
SquareFootage: { type: Number },
RenovationLevel: { type: String },
Studios: { type: Number },
One_BedRoom_11: { type: Number },
Two_BedRoom_12: { type: Number },
Three_BedRoom_13: { type: Number },
Four_BedRoom_14: { type: Number },
createdDate: { type: Date },
project_id: { type: String },
MetroArea: { type: String },
PropertyAddress: { type: String },
ProjectName: { type: String },
userId: {type: String }
};

var inputTermSheetSchema = mongoose.Schema(inputTermSheet);
mongoose.model("inputTermSheetData", inputTermSheetSchema);