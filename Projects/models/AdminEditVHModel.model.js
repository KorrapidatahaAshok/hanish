var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var adminEditVHModel = {

    project_id: { type: String , default:1 },
    
    OpAssumptions: [{ 
        
        project_id: { type: String ,default:1 },
        Op_Assumptions: {type: String},
        Input: {type: String},
     }],

    Financing_Scenario: [{ 
        project_id: { type: String ,default:1 },
        Financing_Scenario: {type: String},
        Input: {type: String}
     }],

    Cap_Rate: [{ 
        Cap_Rate: { type: String, default:1 },
        Input: { type: String },
        project_id: { type: String },
     }],

    Con_Debt: [{ 
        project_id: { type: String, default:1 },
        Con_Debt: {type: String},
        Input: {type: String}
     }],

    Senior_Debt: [{ 
        project_id: { type: String ,default:1 },
        Senior_Debt: {type: String},
        Parameters: {type: String}
     }],

     Financing_Elimination: [{
        Financing_Elimination: { type: String },
        Input: { type: Number },
        project_id: { type: String, default:1 }

     }],

    Sub_Debt: [{ 

        project_id: { type: String ,default:1 },
        Sub_Debt: {type: String},
        Parameters: {type: String}
     }],

    TaxCredit4: [{ 
        Tax_Credit_Four_Percent: { type: String },
        Result: { type: Number },
        project_id: { type: String, default:1 },
     }]
    
};

var adminEditVHModelSchema = mongoose.Schema(adminEditVHModel);

mongoose.model("adminEditVHModelProfile", adminEditVHModelSchema);