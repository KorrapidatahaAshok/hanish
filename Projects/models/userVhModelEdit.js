var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var editvhmodelcalc = {

    projectId :{type:String},
    middlewareCalc: { type: Array },
    projectBasis: { type: Array },
    dashboard: { type: Array },
    conPeriodFun: { type: Array },
    stabilizedProForma: { type: Array },
    netOperatingIncome: { type: Array },
    ProjectValuation: { type: Array },
    SeniorDebt: { type: Array },
    SubDebt: { type: Array },
    ConsDebt: { type: Array },
    TaxCredit4: { type: Array },
    TaxCredit9: { type: Array },
    SourcesFun: { type: Array },
    lastCalc: { type: Array },


    // Unit_Mix: { type: Object },
    // Hard_Costs_Budget: { type: Object },
    // Soft_Costs_Budget: { type: Object },
    // Operating_Expenditure: {type: Object},
    

}

var editvhmodelcalcSchema = mongoose.Schema(editvhmodelcalc);

mongoose.model('editvhmodelcalc', editvhmodelcalcSchema);