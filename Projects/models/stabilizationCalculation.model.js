var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var stabilizationCalculation = {
      project_id: { type: String ,default:1 },
      Stabilization: {type: String},
      Input: {type: String},
      
    }
    var stabilizationSchema = mongoose.Schema(stabilizationCalculation);

    mongoose.model('stabilization', stabilizationSchema);
