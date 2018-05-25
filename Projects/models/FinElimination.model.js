var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var finElimination = {
    Financing_Elimination: { type: String },
    Input: { type: Number },
    project_id: { type: String },
};

var finEliminationSchema = mongoose.Schema(finElimination);

mongoose.model("finEliminationProfile", finEliminationSchema);