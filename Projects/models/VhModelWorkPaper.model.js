var mongoose = require('mongoose'),
Schema = mongoose.Schema;



var vHModelWorkPaper = {
Number: { type: Number },
Name: { type: String }
};

var vHModelWorkPaperSchema = mongoose.Schema(vHModelWorkPaper);
mongoose.model("vHModelWorkPaper", vHModelWorkPaperSchema);