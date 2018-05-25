var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var editvhmodelcalc = {

    project_id: { type: String },

    HomeType: { type: Array }

}

var editvhmodelcalcSchema = mongoose.Schema(editvhmodelcalc);

mongoose.model('editvhmodelcalc', editvhmodelcalcSchema);