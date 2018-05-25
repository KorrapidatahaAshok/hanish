var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var conDebt = {
      project_id: { type: String },
      Con_Debt: {type: String},
      Input: {type: String}

    }
    var conDebtSchema = mongoose.Schema(conDebt);

    mongoose.model('conDebt', conDebtSchema);
