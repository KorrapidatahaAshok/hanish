var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var stabilizedProForma = {
      project_id: { type: String ,default:1 },
      Effective_Gross_Income: {type: String},
      Base_Rental_Revenue: {type: Number},
      Other_Gross_Income: {type: Number},
      Total_Gross_Revenue: {type: Number},
      Vacancy_and_Collection_Loss: {type: Number},
      Total_Effective_Gross_Income: {type: Number}
   

    }
    var stabilizedProFormaSchema = mongoose.Schema(stabilizedProForma);

    mongoose.model('stabilizedProForma', stabilizedProFormaSchema);
