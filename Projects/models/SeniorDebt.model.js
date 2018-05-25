var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var  SeniorDebtCalculation = {
      project_id: { type: String ,default:1 },
      Senior_Debt: {type: String},
      Parameters: {type: String}

    }
    var SeniorDebtSchema = mongoose.Schema(SeniorDebtCalculation);

    mongoose.model('SeniorDebtCalculation', SeniorDebtSchema);
