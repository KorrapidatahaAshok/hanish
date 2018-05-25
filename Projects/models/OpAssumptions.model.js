var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var OpAssumptionsCalculation = {
      project_id: { type: String ,default:1 },
      Op_Assumptions: {type: String},
      Input: {type: String},

      // adminEditVHModel: [{
      //   project_id: { type: String },
      //   Op_Assumptions: {type: String},
      //   Input: {type: String}
      //    }]

    }
    var OpAssumptionsSchema = mongoose.Schema(OpAssumptionsCalculation);

    mongoose.model('OpAssumptionsCalculation', OpAssumptionsSchema);
