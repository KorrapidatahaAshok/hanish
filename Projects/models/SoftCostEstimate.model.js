var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var softCostEstimate = {
    Soft_Cost_Category: { type: String },
    Input_In_Percentage: { type: Number },
    Cost: { type: Number },
    Percentage: {type: Number},
    project_id: { type: String }
}

var softCostEstimateSchema = mongoose.Schema(softCostEstimate);

mongoose.model('softCostEstimate', softCostEstimateSchema);