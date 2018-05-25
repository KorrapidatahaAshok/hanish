var ProjectValuation = {};
var projectValuationSchema = require("mongoose").model("projectvaluation");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

ProjectValuation.cal = (data, data1, data2, data3, pv) => {
    var b = 0;

    adminEditVHModelSchema.findOne({"project_id":data3[1].projcalc.project_id }, function(err, adminobj) {

        if(err) console.log(err)

            // console.log(adminobj.Cap_Rate)
            adminobj.Cap_Rate.forEach(function(value1) {

                if(value1.Cap_Rate == "Cap Rate") {

                    b = parseFloat(value1.Input) 
                }
            })
    

    // console.log("caprate data", data2)

var first = [];
var second = [];
var third = [];
var project = [];
var projVal = [];

var a = data1[2].pbdata[16].Cost;
// var b = parseFloat(data2[9].capRate[2].Input);
var c = data3[1].projcalc.Units;
// console.log(data[0].opIncome[0].Total_Net_Operating_Income)

projectValuationSchema.find({}, function(err, valobj) {
    if(err) console.log(err)

    // console.log(valobj)
    valobj.forEach(function(value) {

        if(value.Project_Valuation == 1) {

            first.push(((data[0].opIncome[0].Total_Net_Operating_Income/a)*100).toFixed(2)/1)
            second.push(((data[0].opIncome[0].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[0]/c)

        }
        if (value.Project_Valuation == 2) {

            first.push(((data[0].opIncome[1].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[1].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[1]/c)

        }
        if (value.Project_Valuation == 3) {

            first.push(((data[0].opIncome[2].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[2].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[2]/c)

        }
        if (value.Project_Valuation == 4) {

            first.push(((data[0].opIncome[3].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[3].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[3]/c)

        }
        if (value.Project_Valuation == 5) {

            first.push(((data[0].opIncome[4].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[4].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[4]/c)

        }
        if (value.Project_Valuation == 6) {

            first.push(((data[0].opIncome[5].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[5].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[5]/c)

        }
        if (value.Project_Valuation == 7) {

            first.push(((data[0].opIncome[6].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[6].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[6]/c)

        }
        if (value.Project_Valuation == 8) {

            first.push(((data[0].opIncome[7].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[7].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[7]/c)

        }
        if (value.Project_Valuation == 9) {

            first.push(((data[0].opIncome[8].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[8].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[8]/c)

        }
        if (value.Project_Valuation == 10) {

            first.push(((data[0].opIncome[9].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[9].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[9]/c)

        }
        if (value.Project_Valuation == 11) {

            first.push(((data[0].opIncome[10].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[10].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[10]/c)

        }
        if (value.Project_Valuation == 12) {

            first.push(((data[0].opIncome[11].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[11].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[11]/c)

        }
        if (value.Project_Valuation == 13) {

            first.push(((data[0].opIncome[12].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[12].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[12]/c)

        }
        if (value.Project_Valuation == 14) {

            first.push(((data[0].opIncome[13].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[13].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[13]/c)

        }
        if (value.Project_Valuation == 15) {

            first.push(((data[0].opIncome[14].Total_Net_Operating_Income / a) * 100).toFixed(2) / 1)
            second.push(((data[0].opIncome[14].Total_Net_Operating_Income/b)*100).toFixed(2)/1)
            third.push(second[14]/c)

        }
        
        
    })
    // console.log(first)
    // console.log(second)
    // console.log(third)

    for(var i=0; i<valobj.length; i++) {

        var sample = {

            "Cap_Rate_Based_On_Project_Basis": first[i],
            "Value_Based_on_per_Cap_Rate": second[i],
            "Value_per_Unit": third[i],
            "project_id": data3[1].projcalc.project_id
        }
        project.push(sample)
    }
    // console.log(project)

    var output = {
        msg: "ProjectValuation Data",
        project: project
    }

    projVal.push(output)
    return pv(projVal)

})
    })
    // console.log(data)
}

module.exports = ProjectValuation;