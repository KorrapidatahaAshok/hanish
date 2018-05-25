var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var ConPeriodCashFlow = {
      project_id: { type: String ,default:1 },
      Con_Period_Cash_Flows: {type: String},
      Placed_in_Service_percentage: {type: Number},
      Base_Rental_Revenue: {type: Number},
      Operating_Expenses: {type: Number},
      Net_Operating_Income: {type: Number},
      Construction_Draw: {type: Number},
      Interest_Charge: {type: Number},
      Interest_Reserves_Deficit: {type: Number}

    }
    var ConPeriodCashFlowSchema = mongoose.Schema(ConPeriodCashFlow);

    mongoose.model('ConPeriodCashFlow', ConPeriodCashFlowSchema);
