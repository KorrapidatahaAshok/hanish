var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var FinancingScenarioCalculation = {
      project_id: { type: String ,default:1 },
      Financing_Scenario: {type: String},
      Input: {type: String}

    }
    var FinancingScenarioSchema = mongoose.Schema(FinancingScenarioCalculation);

    mongoose.model('FinancingScenario', FinancingScenarioSchema);
