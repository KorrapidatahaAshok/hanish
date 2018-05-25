var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ProjectValuationCal = {
  project_id: { type: String ,default:1 },
  Cap_Rate_Based_On_Project_Basis: { type: String },
  Value_Based_on_per_Cap_Rate: {type: String},
  Value_per_Unit: {type: String},
  Construction_Loan_Debt_Yieldt: {type: String},
  Class_A_Debt_Yield: {type: String},
  Class_B_Debt_Yield: {type: String},
  Class_A_LTV: {type: String},
  Class_B_LTV: {type: String},
  Class_A_DSCR: {type: String},
  Class_B_DSCR: {type: String},
  Project_Valuation:{type:String}

}
var ProjectValuation = mongoose.Schema(ProjectValuationCal);

mongoose.model('projectvaluation', ProjectValuation);
