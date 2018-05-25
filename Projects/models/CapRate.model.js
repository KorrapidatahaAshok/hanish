var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var caprate = {
    Cap_Rate: { type: String },
    Input: { type: Number },
    project_id: { type: String },
};

var capRateSchema = mongoose.Schema(caprate);

mongoose.model("capRateProfile", capRateSchema);