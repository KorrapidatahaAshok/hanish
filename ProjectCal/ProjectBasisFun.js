var projectBasis = {};

var projectSchema = require("mongoose").model("ProjectList");
var projectBasisSchema = require("mongoose").model("projectbasis");
var softCostEstimateSchema = require("mongoose").model("softCostEstimate");
var developerFeeSchema = require("mongoose").model("developerFee");
var projectIntakeDataSchema = require("mongoose").model("projectIntakeData");
var inputTermSheetSchema = require("mongoose").model("inputTermSheetData");
var zipCodeSchema = require("mongoose").model("zipCodeData");
var vHModelWorkPaperSchema = require("mongoose").model("vHModelWorkPaper");
var projectBasisCalcSchema = require("mongoose").model("projectBasisCalc");
var homeTypeDataSchema = require("mongoose").model("homeTypeData");
var fmrRentsSchema = require("mongoose").model("fmrrentsprofiles");
var rcAssumptionSchema = require("mongoose").model("rcaprofiles");

var editvhmodelcalcSchema = require("mongoose").model("editvhmodelcalc");


var dashboard = require('../ProjectCal/dashboardFun');

projectBasis.cal = (data, pb) => {

    // console.log("data", data[2].RenovationLevel)
    // console.log(data[1].projcalc.Rentable_Square_Footage)

    rcAssumptionSchema.find({}, function (err, rcobj) {

        if (err) {
            console.log(err)
            return pb(projectData)

        }
        else {
            rcAssumptionSchema.findOne({$and: [{"type":"Window Estimate"}, {"Repair_Level":"Gut"}]}, function(err, winobj){

                if(err) console.log(err)
                
                // console.log(winobj)
                let gutvalue = data[1].projcalc.Rentable_Square_Footage/100;              
                var c = gutvalue % 10;
                var d = gutvalue-c;

                // console.log("gutvalue", gutvalue);
                // console.log("c", c)
                // console.log("d", d)
                    
              
            var projectData = [];
            var pbdata = [];
            var bldngSys = [];
            var rprLvl = [];
            var rcData = [];
            var cstpUnit = [];
            var cost = [];
            //    console.log("obj", obj)

            rcobj.forEach(function (value) {

                // console.log(value)
                if (value.type == "Demolition" && value.Repair_Level == "Limited") {

                    bldngSys[0] = "Demolition";
                    rprLvl[0] = "Limited";
                    cstpUnit[0] = value.price;
                    cost[0] = data[1].projcalc.Rentable_Square_Footage * cstpUnit[0]

                }
                else if (value.type == "Roof" && value.Repair_Level == "Re-Roof w/o Insulation") {

                    bldngSys[1] = "Roof";
                    rprLvl[1] = "Re-Roof w/o Insulation";
                    cstpUnit[1] = value.price;
                    cost[1] = data[1].projcalc.Rentable_Square_Footage * cstpUnit[1]

                }
                else if (value.type == "Window Estimate" && value.Repair_Level == "Limited") {

                    bldngSys[2] = "Window Estimate";
                    rprLvl[2] = "Limited";
                    cstpUnit[2] = value.price;
                    cost[2] = d * cstpUnit[2]
                }
                else if (value.type == "Entryway" && value.Repair_Level == "None") {

                    bldngSys[3] = "Entryway";
                    rprLvl[3] = "None";
                    cstpUnit[3] = value.price;
                    cost[3] = cstpUnit[3]
                }
                else if (value.type == "Heating" && value.Repair_Level == "Minor Repair") {

                    bldngSys[4] = "Heating";
                    rprLvl[4] = "Minor Repair";
                    cstpUnit[4] = value.price;
                    cost[4] = data[1].projcalc.Units * cstpUnit[4]
                }
                else if (value.type == "Hot Water" && value.Repair_Level == "Limited") {

                    bldngSys[5] = "Hot Water";
                    rprLvl[5] = "Limited";
                    cstpUnit[5] = value.price;
                    cost[5] = data[1].projcalc.Units * cstpUnit[5]
                }
                else if (value.type == "Electric" && value.Repair_Level == "Limited") {

                    bldngSys[6] = "Electric";
                    rprLvl[6] = "Limited";
                    cstpUnit[6] = value.price;
                    cost[6] = data[1].projcalc.Units * cstpUnit[6]
                }
                else if (value.type == "Plumbing" && value.Repair_Level == "Limited") {

                    bldngSys[7] = "Plumbing";
                    rprLvl[7] = "Limited";
                    cstpUnit[7] = value.price;
                    cost[7] = data[1].projcalc.Units * cstpUnit[7]
                }
                else if (value.type == "Interior" && value.Repair_Level == "Limited") {
                    // console.log(value.price)
                    bldngSys[8] = "Interior Apartment Work";
                    rprLvl[8] = "Limited";
                    cstpUnit[8] = value.price;
                    cost[8] = data[1].projcalc.Units * cstpUnit[8]
                }
                else if (value.type == "Overall Ballpark" && value.Repair_Level == data[2].RenovationLevel) {
                    // console.log(value.price)
                    bldngSys[10] = "Ballpark Estimate";
                    rprLvl[10] = data[2].RenovationLevel;
                    cstpUnit[10] = value.price;
                    cost[10] = data[1].projcalc.Rentable_Square_Footage * cstpUnit[10]
                }
               
                    bldngSys[9] = "Itemized Hard Costs";                   
                    cost[9] = cost[0] + cost[1] + cost[2] + cost[3] + cost[4] + cost[5] + cost[6] + cost[7] + cost[8]
                
                    bldngSys[11] = "Preliminary Hard Costs";
                    cost[11] = cost[10]

                    bldngSys[12] = "Purchase Price"
                    cost[12] = data[1].projcalc.Project_Purchase_Price

                    bldngSys[13] = "Project Hard Costs"
                    cost[13] = cost[11] + cost[12]
                
                
            })
            // console.log(bldngSys)
            // console.log(rprLvl)
            // console.log(cstpUnit)
            // console.log(cost)

            for(var i=0; i<bldngSys.length; i++){

            var sample = {

                "Building_System" : bldngSys[i],
                "Level_of_Repair" : rprLvl[i],
                "Cost_per_unit" : cstpUnit[i],
                "Cost" : cost[i],
                "project_id" : data[1].projcalc.project_id
            }
            pbdata.push(sample)

            // console.log("pbdata", pbdata)

            // editvhmodelcalcSchema.update({"projectId":data[1].projcalc.project_id }, {$set: {projectBasis: pbdata}}, function(err, result){

            //     if(err) console.log(err)

            //         // console.log("updated")
            // })
        }
        // res.json(pbdata)
        // projectData.push(pbdata)

        var a = 0;
        var b = 0;
        var typeary = [];
        var valueary = [];
        var rprlvlary = [];
        var priceary = [];

        rcobj.forEach(function(val) {

            if (val.value == 80) {
                a = 80
            }
            if (val.value == 90) {
                b = 90
            }
            // console.log(a, b)
            // console.log(pbdata[12].Cost)
            // console.log(pbdata[13].Cost * (a/100) * (b/100) * (8/100))
            if (val.value == "LTC") {
            
                typeary[0] = "Con. Interest"
                valueary[0] = "LTC"
                rprlvlary[0] = 8
    
            }
            // console.log(pbdata[12].Cost * (b/100) * (rprlvlary[0]/100) * (a/100))
            var s = pbdata[13].Cost * (b/100) * (rprlvlary[0]/100) * (a/100)
            // console.log(s)
            priceary[0] = s

            if (val.value == 90) {

                typeary[1] = "Con. Interest"
                valueary[1] = 90
                rprlvlary[1] = 10

            }
            var s = pbdata[13].Cost * (b / 100) * (rprlvlary[1] / 100) * (a / 100)
            priceary[1] = s

            if (val.value == "Draw") {

                typeary[2] = "Con. Interest"
                valueary[2] = "Draw"
                rprlvlary[2] = 15

            }
            var s = pbdata[13].Cost * (b / 100) * (rprlvlary[2] / 100) * (a / 100)
            priceary[2] = s

            if (val.value == 80) {

                typeary[3] = "Con. Interest"
                valueary[3] = 80
                rprlvlary[3] = 18

            }
            var s = pbdata[13].Cost * (b / 100) * (rprlvlary[3] / 100) * (a / 100)
            priceary[3] = s

        })
        
        // console.log(typeary)
        // console.log(valueary)
        // console.log(rprlvlary)
        // console.log(priceary)

        softCostEstimateSchema.find({}, function (err, docs) {

            var softCost = [];
            var input = [];
            var Cost = [];
            var sceData = [];
            var dfData = []

            if (err) console.log(err)

            docs.forEach(function (val) {

                if(val.Soft_Cost_Category == "Con. Contingency") {

                    softCost.push(val.Soft_Cost_Category)
                    input.push(val.Input_In_Percentage)
                    Cost.push((input[0]/100) * pbdata[11].Cost)
                }
                if (val.Soft_Cost_Category == "Contractor O&P") {

                    softCost.push(val.Soft_Cost_Category)
                    input.push(val.Input_In_Percentage)
                    Cost.push((input[1] / 100) * pbdata[11].Cost)
                }
                if (val.Soft_Cost_Category == "Con. Management") {

                    softCost.push(val.Soft_Cost_Category)
                    input.push(val.Input_In_Percentage)
                    Cost.push((input[2] / 100) * pbdata[11].Cost)
                }
                if (val.Soft_Cost_Category == "Architectual") {

                    softCost.push(val.Soft_Cost_Category)
                    input.push(val.Input_In_Percentage)
                    Cost.push((input[3] / 100) * pbdata[11].Cost)
                }
                if (val.Soft_Cost_Category == "Advisory") {

                    softCost.push(val.Soft_Cost_Category)
                    input.push(val.Input_In_Percentage)
                    Cost.push((input[4] / 100) * pbdata[13].Cost)
                }
                if (val.Soft_Cost_Category == "Con. Interest") {

                    softCost.push(val.Soft_Cost_Category)
                    input.push(val.Input_In_Percentage)
                    Cost.push(priceary[3])
                }
                if (val.Soft_Cost_Category == "Orig. Fee") {

                    softCost.push(val.Soft_Cost_Category)
                    input.push(val.Input_In_Percentage)
                    Cost.push(((input[6] / 100) * pbdata[11].Cost).toFixed(2)/1)
                }
                if (val.Soft_Cost_Category == "Total") {

                    softCost.push(val.Soft_Cost_Category)
                   
                    Cost.push(Cost[0] + Cost[1] + Cost[2] + Cost[3] + Cost[4] + Cost[5] + Cost[6]).toFixed(2)/1
                }
                if (val.Soft_Cost_Category == "Project Hard Costs") {

                    softCost.push(val.Soft_Cost_Category)
                    Cost.push(pbdata[13].Cost)
                }
                if (val.Soft_Cost_Category == "Fee Basis Costs") {

                    softCost.push(val.Soft_Cost_Category)
                    Cost.push(Cost[7] + Cost[8])
                }


            })

            for(var i = 0; i< docs.length-2; i++) {

                var sample = {

                    "Soft_Cost_Category" : softCost[i],
                    "Input_In_Percentage": input[i],
                    "Cost": Cost[i],
                    "Percentage": ((Cost[i]/Cost[7])*100).toFixed(2)/1,
                    "project_id" : data[1].projcalc.project_id
                }
                sceData.push(sample)

            //     editvhmodelcalcSchema.update({"projectId":data[1].projcalc.project_id }, {$set: {sceData: sceData}}, function(err, result){

            //     if(err) console.log(err)

            //         // console.log("updated")
            // })
            }
            // res.json(sceData)

            var output = {

                msg: "SCE Data",
                sceData: sceData
            }

            projectData.push(output)

            developerFeeSchema.find({}, function (err, data1) {
                if (err) console.log(err)

                var dvfee = [];
                var dvinput = [];
                var dvcost = [];

                // console.log(data[1].projcalc.Developer_Fee_Deferral)

                data1.forEach(function (doc) {

                    if (doc.Developer_Fee == "Close. Dev. Fee") {

                        dvfee.push(doc.Developer_Fee)
                        dvinput.push(doc.Input_in_percent)
                        dvcost.push((sceData[9].Cost * (dvinput[0] / 100) * (1 - (data[1].projcalc.Developer_Fee_Deferral / 100))).toFixed(2)/1)
                    }
                    if (doc.Developer_Fee == "Def. Dev. Fee") {

                        dvfee.push(doc.Developer_Fee)
                        dvinput.push(doc.Input_in_percent)
                        dvcost.push((sceData[9].Cost * (dvinput[1] / 100) * (data[1].projcalc.Developer_Fee_Deferral / 100)).toFixed(2) / 1)
                    }
                    if (doc.Developer_Fee == "Total") {

                        dvfee.push(doc.Developer_Fee)
                        dvcost.push((dvcost[0] + dvcost[1]).toFixed(2) / 1)
                    }
                })


                // console.log(dvfee)
                // console.log(dvinput)
                // console.log(dvcost)

                for(var i = 0; i<data1.length; i++) {

                    var sample = {

                        "Developer_Fee": dvfee[i],
                        "Input_in_percent": dvinput[i],
                        "Cost": dvcost[i],
                        "project_id": data[1].projcalc.project_id
                    }

                    dfData.push(sample)
                }
                // res.json(dfData)
                var output = {

                    msg: "DF Data",
                    dfData: dfData
                }

                projectData.push(output)

                let proscdata = {
                    
                    Building_System: "Project Soft Costs",
                    Cost: sceData[7].Cost,
                    project_id: data[1].projcalc.project_id
                }
                pbdata.push(proscdata)

                let prodfdata = {

                    Building_System: "Developer Fee",
                    Cost: dfData[2].Cost,
                    project_id: data[1].projcalc.project_id
                }
                pbdata.push(prodfdata)

                let adpbdata = {

                    Building_System: "Adjusted Project Basis",
                    Cost: Math.round(pbdata[13].Cost + pbdata[14].Cost + pbdata[15].Cost),
                    project_id: data[1].projcalc.project_id
                }
                pbdata.push(adpbdata) 

                var output = {

                    msg: "PB Data",
                    pbdata: pbdata
                }

                projectData.push(output)

                return pb(projectData)

                // res.json(projectData)
                
                // dashboard.cal(projectData, data, req, res)
            })
            // res.json(projectData)
            // console.log(softCost)
            // console.log(input)
            // console.log(Cost)
        
        })
        })


        }

    })
}

module.exports = projectBasis;

