var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var netOperatingIncome = {
    Net_Operating_Income: { type: String },
    Property_Management: { type: Number },
    Other_Expenses: { type: Number },
    Insurance: { type: Number },
    Utilities: { type: Number },
    Repairs_and_Maintenance: { type: Number },
    Cleaning_and_GarbageRemoval: { type: Number },
    Contract_Services: { type: Number },
    General_and_Administrative: { type: Number },
    Turnover: { type: Number },
    Marketing: { type: Number },
    Payroll: { type: Number },
    Other: { type: Number },
    Miscellaneous: { type: Number },
    Total_Operating_Expenses: { type: Number },
    Total_Net_Operating_Income: { type: Number },
    project_id: { type: String }
};

var operatingIncomeSchema = mongoose.Schema(netOperatingIncome);

mongoose.model("operatingIncome", operatingIncomeSchema);