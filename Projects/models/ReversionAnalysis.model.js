var mongoose = require('mongoose'),
Schema = mongoose.Schema;



var reversionAnalysis = {
    
Traditional_Reversion_Analysis: { type: String },
Distributable_NOI: { type: Number },
Senior_Debt_Service: { type: Number },
Sub_Debt_Service: { type: Number },
Net_Income: { type: Number },
Reversion_Proceeds: { type: Number },
Senior_Principal: { type: Number },
Sub_Principal: { type: Number },
Senior_PB: { type: Number },
Sub_PB: { type: Number },
Cost_of_Sale: { type: Number },
Sale_Price: { type: Number },
Stabilized_Developer_Fee: { type: Number },
Deferred_Developer_Fee: { type: Number },
Proceeds_to_Equity: { type: Number },
Traditional_Cash_Flow_to_Equity: { type: Number },
Actual_Cash_Flow_to_Equity: { type: Number },
project_id: { type: String }
};

var reversionAnalysisSchema = mongoose.Schema(reversionAnalysis);
mongoose.model("reversionAnalysis", reversionAnalysisSchema);