var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var projectBasisData = {

    Building_System: { type: String },
    Level_of_Repair: { type: String },
    Cost_per_unit: { type: Number },
    Cost: { type: Number },
    project_id: { type: String }
}

var projectBasisSchema = mongoose.Schema(projectBasisData);

mongoose.model('projectbasis', projectBasisSchema);