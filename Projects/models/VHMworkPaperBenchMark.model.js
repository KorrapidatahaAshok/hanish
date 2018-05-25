var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var BenchMarkCalculation = {
      project_id: { type: String ,default:1 },
      Benchmark: {type: String},
      Current_Rate: {type: Number}

    }
    var BenchMarkSchema = mongoose.Schema(BenchMarkCalculation);

    mongoose.model('BenchMark', BenchMarkSchema);
