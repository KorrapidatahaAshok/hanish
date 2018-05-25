var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var SubDebtCalculation = {
      project_id: { type: String ,default:1 },
      Sub_Debt: {type: String},
      Parameters: {type: String}

    }
    var SubDebtSchema = mongoose.Schema(SubDebtCalculation);

    mongoose.model('SubDebt', SubDebtSchema);
