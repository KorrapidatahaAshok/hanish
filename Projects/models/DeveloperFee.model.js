var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var developerFee = {
    Developer_Fee: { type: String },
    Input_in_percent: { type: Number },
    Cost: { type: Number },
    project_id: { type: String }
}

var developerFeeSchema = mongoose.Schema(developerFee);

mongoose.model('developerFee', developerFeeSchema);