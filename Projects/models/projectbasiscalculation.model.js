var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var projectBasisCalc = {

    project_id: { type: String },
    Sponsor: { type: String },
    FMR_Area: { type: String },
    Deal_Type: { type: String },
    City: { type: String },
    State: { type: String },
    Project_Purchase_Price: { type: Number },
    Rentable_Square_Footage: { type: Number },
    Building_Floors: { type: Number },
    Square_Footage_per_Floor: { type: Number },
    Units: { type: Number },
    Interest_Reserve_Surplus_Deficit: { type: Number },
    Interest_Reserve_Check: { type: String },
    Additional_Rent_Discount: { type: Number },
    Deal_Score: { type: Number },
    Developer_Fee: { type: String },
    Developer_Fee_Deferral: { type: Number },
    ViaHome_Fee_Rate: { type: Number },
    ViaHome_Fee: { type: Number },
    Project_Staging: { type: String }

}

var projectBasisCalcSchema = mongoose.Schema(projectBasisCalc);

mongoose.model('projectBasisCalc', projectBasisCalcSchema);