var termSheetGenerationHandler = {}

var middlewareCalc = require('../ProjectCal/MiddlewareCalcFun');
var projectBasis = require('../ProjectCal/ProjectBasisFun');
var dashboard = require('../ProjectCal/dashboardFun');
var conPeriodFun = require('../ProjectCal/conPeriodFun');
var stabilizedProForma = require('../ProjectCal/stabilizedProFormaFun')
var netOperatingIncome = require('../ProjectCal/operatingIncomeFun')
var ProjectValuation = require('../ProjectCal/ProjectValuationFun')
var SeniorDebt = require('../ProjectCal/SeniorDebtFun')
var SubDebt = require('../ProjectCal/SubDebtFun')
var ConsDebt = require('../ProjectCal/ConsDebtFun')
var TaxCredit4 = require('../ProjectCal/TaxCredit4Fun')
var TaxCredit9 = require('../ProjectCal/TaxCredit9Fun')
var SourcesFun = require('../ProjectCal/SourcesFun')
var lastCalc = require('../ProjectCal/lastCalcFun')

var projectSchema = require("mongoose").model("ProjectList");
var projectIntakeDataSchema = require("mongoose").model("projectIntakeData");
var inputTermSheetSchema = require("mongoose").model("inputTermSheetData");
var zipCodeSchema = require("mongoose").model("zipCodeData");
var vHModelWorkPaperSchema = require("mongoose").model("vHModelWorkPaper");
var projectBasisCalcSchema = require("mongoose").model("projectBasisCalc");
var fmrRentsSchema = require("mongoose").model("fmrrentsprofiles");

var OpAssumptionsSchema = require("mongoose").model("OpAssumptionsCalculation");
var FinancingScenarioSchema = require("mongoose").model("FinancingScenario");
var conDebtSchema = require("mongoose").model("conDebt");
var SeniorDebtSchema = require("mongoose").model("SeniorDebtCalculation");
var SubDebtSchema = require("mongoose").model("SubDebt");
var capRateSchema = require("mongoose").model("capRateProfile");
var BenchMarkSchema = require("mongoose").model("BenchMark");
var finEliminationSchema = require("mongoose").model("finEliminationProfile");
var taxCredit4Schema = require("mongoose").model("taxCredit4Profile");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");
var editvhmodelcalcSchema = require("mongoose").model("editvhmodelcalc");

var resposeHandler = require("../resposeHandler/resposeHandller")


termSheetGenerationHandler.cal = (termSheetDataPull, req, res) => {

    var condition = false;
    var msg = "";
    // var oppArray = [];
    // var finEle = [];

    console.log("termSheetGeneration save")
    //  console.log(termSheetDataPull)

    var termSheetData = {

        Name: termSheetDataPull.Name,
        Email: termSheetDataPull.Email,
        Phone: termSheetDataPull.Phone,
        Address: termSheetDataPull.Address,
        City: termSheetDataPull.City,
        State: termSheetDataPull.State,
        ZipCode: termSheetDataPull.ZipCode,
        OrganizationName: termSheetDataPull.OrganizationName,
        ConstructionType: termSheetDataPull.ConstructionType,
        PurchasePrice: termSheetDataPull.PurchasePrice,
        SquareFootage: termSheetDataPull.SquareFootage,
        RenovationLevel: termSheetDataPull.RenovationLevel,
        Studios: termSheetDataPull.Studios,
        One_BedRoom_11: termSheetDataPull.One_BedRoom_11,
        Two_BedRoom_12: termSheetDataPull.Two_BedRoom_12,
        Three_BedRoom_13: termSheetDataPull.Three_BedRoom_13,
        Four_BedRoom_14: termSheetDataPull.Four_BedRoom_14,
        createdDate: termSheetDataPull.createdDate,
        project_id: termSheetDataPull._id,
        userId: termSheetDataPull.userId,
        PropertyAddress: termSheetDataPull.Address.concat(termSheetDataPull.City, termSheetDataPull.State, termSheetDataPull.ZipCode)
    }


    let termSheet = new inputTermSheetSchema(termSheetData);
    termSheet.save() // previous data 
        .then(function (response) {

            // console.log(response)
            // console.log("save")
            var out = {
                msg: "Term Sheet data added",
                response: response,
                condition: true
            }
            //  return out;
            // res.json(out);


            //start code 

            zipCodeSchema.findOne({ Zip_Code: termSheetDataPull.ZipCode }, function (err, zipobj) {

                // console.log(obj)

                if (err) {
                    // console.log(err)
                    var out = {
                        msg: "ZipCode not available",
                        err: err,
                        condition: false
                    }
                    res.json(out)
                }
                else {
                    if (zipobj == null) {
                        var out = {
                            msg: "ZipCode not available",
                            err: err,
                            condition: false
                        }
                        res.json(out)
                    }
                    else {

                        //  console.log(zipobj)
                        // console.log("metro area", obj.FMR_Area)

                        var termSheetMetroArea = {

                            MetroArea: zipobj.FMR_Area,

                        }

                        // console.log(termSheetMetroArea)

                        inputTermSheetSchema.update({ '_id': response._id }, { $set: termSheetMetroArea }, function (err, obj1) {

                            if (err) {
                                // console.log(err)
                                var out = {
                                    msg: "Metro Area not saved",
                                    err: err,
                                    condition: false
                                }
                                res.json(out)
                            }

                            // console.log(obj)
                            // res.json(obj1)

                            vHModelWorkPaperSchema.find({}, function (err, result) {

                                if (err) {
                                    console.log(err)
                                }
                                // console.log("Result", result)
                                projectIntakeDataSchema.count(function (err, docs) {

                                    if (err) {
                                        console.log(err)
                                    }
                                    // console.log("count", docs)
                                    // console.log("Result", result)
                                    // console.log("docs", docs-99)
                                    for (var i = 0; i < result.length; i++) {

                                        if (docs - 99 == result[i].Number) {

                                            var termSheetProjectName = {

                                                ProjectName: result[i].Name,

                                            }

                                            inputTermSheetSchema.update({ '_id': response._id }, { $set: termSheetProjectName }, function (err, obj) {
                                                if (err) {
                                                    console.log(err)
                                                }

                                                // console.log(obj)

                                                inputTermSheetSchema.findOne({ "project_id": response.project_id }, function (err, inpobj) {

                                                    if (err) console.log(err)

                                                    fmrRentsSchema.findOne({ "Area_Name": inpobj.MetroArea }, function (err, fmrobj) {

                                                        if (err) {
                                                            console.log(err)
                                                        }
                                                        else {

                                                            if (fmrobj == null || fmrobj == undefined) {

                                                                var output = {

                                                                    msg: "Data not available for Metro Area",
                                                                    condition: false
                                                                }
                                                                res.json(output)
                                                            }
                                                            else {

                                                                // console.log(inpobj)

                                                                var projectBasisCalcdata = {

                                                                    project_id: inpobj.project_id,
                                                                    Sponsor: inpobj.OrganizationName,
                                                                    FMR_Area: inpobj.MetroArea,
                                                                    Deal_Type: inpobj.ConstructionType,
                                                                    City: inpobj.City,
                                                                    State: inpobj.State,
                                                                    Project_Purchase_Price: inpobj.PurchasePrice,
                                                                    Building_Floors: 1,
                                                                    Additional_Rent_Discount: 0,
                                                                    Developer_Fee: "Yes",
                                                                    Developer_Fee_Deferral: 25,
                                                                    ViaHome_Fee_Rate: 0.005,
                                                                    Project_Staging: "White"
                                                                }

                                                                // console.log(projectBasisCalcdata)



                                                                let project = new projectBasisCalcSchema(projectBasisCalcdata);
                                                                project.save()
                                                                    .then(function (response) {
                                                                        console.log("save")
                                                                        console.log("hi")

                                                                        var sample = {


                                                                            "project_id": projectBasisCalcdata.project_id

                                                                        };

                                                                        let project1 = new adminEditVHModelSchema(sample)

                                                                        project1.save()
                                                                            .then(function (response) {
                                                                                //    console.log("saved")

                                                                                OpAssumptionsSchema.find({ "project_id": "1" }, function (err, oppobj) {

                                                                                    if (err) console.log(err)

                                                                                    for (var i = 0; i < oppobj.length; i++) {

                                                                                        var sample = {

                                                                                            "Op_Assumptions": oppobj[i].Op_Assumptions,
                                                                                            "Input": oppobj[i].Input,
                                                                                            "project_id": projectBasisCalcdata.project_id

                                                                                        }

                                                                                        adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { OpAssumptions: sample } }, function (err, oppobj) {

                                                                                            if (err) console.log(err)

                                                                                            // console.log("updated")
                                                                                        })


                                                                                    }
                                                                                    FinancingScenarioSchema.find({ "project_id": "1" }, function (err, finscobj) {

                                                                                        if (err) console.log(err)
                                                                                        for (var i = 0; i < finscobj.length; i++) {

                                                                                            var sample = {
                                                                                                "Financing_Scenario": finscobj[i].Financing_Scenario,
                                                                                                "Input": finscobj[i].Input,
                                                                                                "project_id": projectBasisCalcdata.project_id
                                                                                            }

                                                                                            adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { Financing_Scenario: sample } }, function (err, oppobj) {

                                                                                                if (err) console.log(err)

                                                                                                // console.log("updated")
                                                                                            })
                                                                                        }
                                                                                        fmrRentsSchema.findOne({ "Area_Name": projectBasisCalcdata.FMR_Area }, function (err, fmrobj) {

                                                                                            if (err) console.log(err)

                                                                                            capRateSchema.find({ "project_id": "1" }, function (err, capopbj) {

                                                                                                if (err) console.log(err)
                                                                                                var a = [];

                                                                                                a.push(parseFloat(fmrobj.Class_C_Adjusted_Cap_Rate))
                                                                                                a.push(0.5),
                                                                                                    a.push(parseFloat(fmrobj.Class_C_Adjusted_Cap_Rate) + 0.5)

                                                                                                for (var i = 0; i < capopbj.length; i++) {

                                                                                                    var sample = {

                                                                                                        "Cap_Rate": capopbj[i].Cap_Rate,
                                                                                                        "Input": a[i],
                                                                                                        "project_id": projectBasisCalcdata.project_id
                                                                                                    }
                                                                                                    adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { Cap_Rate: sample } }, function (err, oppobj) {

                                                                                                        if (err) console.log(err)

                                                                                                        //   console.log("updated")
                                                                                                    })

                                                                                                }
                                                                                                BenchMarkSchema.findOne({ "Benchmark": "Libor" }, function (err, benobj) {

                                                                                                    if (err) console.log(err)
                                                                                                    var rate = benobj.Current_Rate;

                                                                                                    conDebtSchema.update({ "Con_Debt": "Rate" }, { $set: { Input: rate } }, function (err, con1) {

                                                                                                        if (err) console.log(err)

                                                                                                        conDebtSchema.find({ "project_id": "1" }, function (err, conobj) {
                                                                                                            if (err) console.log(err)
                                                                                                            for (var i = 0; i < conobj.length; i++) {

                                                                                                                var sample = {
                                                                                                                    "Con_Debt": conobj[i].Con_Debt,
                                                                                                                    "Input": conobj[i].Input,
                                                                                                                    "project_id": projectBasisCalcdata.project_id
                                                                                                                }

                                                                                                                adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { Con_Debt: sample } }, function (err, oppobj) {

                                                                                                                    if (err) console.log(err)

                                                                                                                    //   console.log("updated")
                                                                                                                })

                                                                                                            }
                                                                                                            SeniorDebtSchema.find({ "project_id": "1" }, function (err, senobj) {

                                                                                                                if (err) console.log(err)
                                                                                                                BenchMarkSchema.findOne({ "Benchmark": "10-Y Treasury" }, function (err, trobj) {
                                                                                                                    if (err) console.log(err)
                                                                                                                    SeniorDebtSchema.update({ "Senior Debt": "Rate" }, { $set: { Parameters: trobj.Current_Rate } }, function (err, updobj) {
                                                                                                                        if (err) console.log(err)
                                                                                                                        for (var i = 0; i < senobj.length; i++) {

                                                                                                                            var sample = {

                                                                                                                                "Senior_Debt": senobj[i].Senior_Debt,
                                                                                                                                "Parameters": senobj[i].Parameters,
                                                                                                                                "project_id": projectBasisCalcdata.project_id
                                                                                                                            }

                                                                                                                            if (i == 5) {

                                                                                                                                senobj[5].Parameters = parseFloat(senobj[3].Parameters) + parseFloat(senobj[4].Parameters)

                                                                                                                            }
                                                                                                                            adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { Senior_Debt: sample } }, function (err, oppobj) {

                                                                                                                                if (err) console.log(err)

                                                                                                                                //   console.log("updated")
                                                                                                                            })

                                                                                                                        }
                                                                                                                        finEliminationSchema.find({ "project_id": "1" }, function (err, finEleObj) {

                                                                                                                            if (err) console.log(err)

                                                                                                                            // console.log(finEleObj)

                                                                                                                            for (var i = 0; i < finEleObj.length; i++) {

                                                                                                                                var sample = {

                                                                                                                                    "Financing_Elimination": finEleObj[i].Financing_Elimination,
                                                                                                                                    "Input": finEleObj[i].Input,
                                                                                                                                    "project_id": projectBasisCalcdata.project_id
                                                                                                                                }

                                                                                                                                adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { Financing_Elimination: sample } }, function (err, oppobj) {

                                                                                                                                    if (err) console.log(err)

                                                                                                                                    // console.log("updated")
                                                                                                                                })

                                                                                                                            }

                                                                                                                            taxCredit4Schema.find({ "project_id": "1" }, function (err, taxobj) {

                                                                                                                                if (err) console.log(err)

                                                                                                                                // console.log(taxobj)

                                                                                                                                for (var i = 0; i < taxobj.length; i++) {

                                                                                                                                    var sample = {

                                                                                                                                        "Tax_Credit_Four_Percent": taxobj[i].Tax_Credit_Four_Percent,
                                                                                                                                        "Result": taxobj[i].Result,
                                                                                                                                        "project_id": projectBasisCalcdata.project_id
                                                                                                                                    }

                                                                                                                                    adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { TaxCredit4: sample } }, function (err, oppobj) {

                                                                                                                                        if (err) console.log(err)

                                                                                                                                        // console.log("updated")
                                                                                                                                    })

                                                                                                                                }
                                                                                                                                SubDebtSchema.find({ "project_id": "1" }, function (err, subobj) {

                                                                                                                                    if (err) console.log(err)
                                                                                                                                    // console.log(subobj)

                                                                                                                                    BenchMarkSchema.findOne({ "Benchmark": "10-Y Treasury" }, function (err, trobj) {

                                                                                                                                        SubDebtSchema.update({ "Sub Debt": "Rate" }, { $set: { Parameters: trobj.Current_Rate } }, function (err, trsobj) {

                                                                                                                                            if (err) console.log(err)


                                                                                                                                            for (var i = 0; i < subobj.length; i++) {

                                                                                                                                                var sample = {

                                                                                                                                                    "Sub_Debt": subobj[i].Sub_Debt,
                                                                                                                                                    "Parameters": subobj[i].Parameters,
                                                                                                                                                    "project_id": projectBasisCalcdata.project_id
                                                                                                                                                }
                                                                                                                                                if (i == 5) {

                                                                                                                                                    subobj[5].Parameters = parseFloat(subobj[3].Parameters) + parseFloat(subobj[4].Parameters)

                                                                                                                                                }

                                                                                                                                                adminEditVHModelSchema.update({ "project_id": projectBasisCalcdata.project_id }, { $push: { Sub_Debt: sample } }, function (err, oppobj) {

                                                                                                                                                    if (err) console.log(err)

                                                                                                                                                    //  console.log("updated")

                                                                                                                                                })

                                                                                                                                            }

                                                                                                                                            var sample = {

                                                                                                                                                "projectId": projectBasisCalcdata.project_id

                                                                                                                                            };


                                                                                                                                            let pr1 = new editvhmodelcalcSchema(sample)
                                                                                                                                            pr1.save()
                                                                                                                                                .then(function (response) {



                                                                                                                                                    middlewareCalc.cal(inpobj, function (result) {



                                                                                                                                                        projectBasis.cal(result, function (result1) {


                                                                                                                                                            //         // console.log(result1)
                                                                                                                                                            //         // res.json(result1)

                                                                                                                                                            dashboard.cal(result1, result, function (result2) {



                                                                                                                                                                conPeriodFun.cal(result2, result1, result, function (result3) {


                                                                                                                                                                    stabilizedProForma.cal(result3, result, result2, function (result4) {



                                                                                                                                                                        netOperatingIncome.cal(result4, result2, result, function (result5) {




                                                                                                                                                                            ProjectValuation.cal(result5, result1, result2, result, function (result6) {



                                                                                                                                                                                SeniorDebt.cal(result6, result5, result2, result, function (result7) {



                                                                                                                                                                                    SubDebt.cal(result7, result5, result2, result6, result, function (result8) {



                                                                                                                                                                                        ConsDebt.cal(result8, result2, result1, result7, result3, function (result9) {



                                                                                                                                                                                            TaxCredit4.cal(result9, result1, result2, result, function (result10) {


                                                                                                                                                                                                TaxCredit9.cal(result10, result2, result, function (result11) {


                                                                                                                                                                                                    //                                                 // res.json(result11)


                                                                                                                                                                                                    SourcesFun.cal(result11, result9, result10, result, result1, result7, result8, result5, result2, function (result12) {


                                                                                                                                                                                                        //                                                     //  res.json(result12)

                                                                                                                                                                                                        lastCalc.cal(result12, result, result1, result2, result9, result6, result10, result7, function (result13) {


                                                                                                                                                                                                            // console.log(result13)
                                                                                                                                                                                                            // res.json(result13)

                                                                                                                                                                                                            //    res.send(array)
                                                                                                                                                                                                            editvhmodelcalcSchema.update({ "projectId": projectBasisCalcdata.project_id }, {
                                                                                                                                                                                                                $set: {
                                                                                                                                                                                                                    middlewareCalc: result, projectBasis: result1, dashboard: result2, conPeriodFun: result3, stabilizedProForma: result4, netOperatingIncome: result5,

                                                                                                                                                                                                                    ProjectValuation: result6, SeniorDebt: result7, SubDebt: result8, ConsDebt: result9, TaxCredit4: result10, TaxCredit9: result11,

                                                                                                                                                                                                                    SourcesFun: result12, lastCalc: result13
                                                                                                                                                                                                                }
                                                                                                                                                                                                            }, function (err, updobj) {

                                                                                                                                                                                                                if (err) console.log(err)

                                                                                                                                                                                                                // console.log("saved")

                                                                                                                                                                                                                msg = "Project successfully added.";
                                                                                                                                                                                                                condition = true;
                                                                                                                                                                                                                icon = "fa fa-check fa-2x success-icon"

                                                                                                                                                                                                                var out = {
                                                                                                                                                                                                                    msg: msg,
                                                                                                                                                                                                                    response: response,
                                                                                                                                                                                                                    condition: condition,
                                                                                                                                                                                                                    icon: icon
                                                                                                                                                                                                                }
                                                                                                                                                                                                                // console.log(out)
                                                                                                                                                                                                                res.json(out)


                                                                                                                                                                                                            })
                                                                                                                                                                                                        })
                                                                                                                                                                                                    })
                                                                                                                                                                                                })
                                                                                                                                                                                            })
                                                                                                                                                                                        })
                                                                                                                                                                                    })
                                                                                                                                                                                })

                                                                                                                                                                            })
                                                                                                                                                                        })

                                                                                                                                                                    })
                                                                                                                                                                })


                                                                                                                                                            });
                                                                                                                                                        })


                                                                                                                                                    })
                                                                                                                                                    //   var out = {
                                                                                                                                                    //       msg: "Project successfully added",
                                                                                                                                                    //       response: response,
                                                                                                                                                    //       condition: true
                                                                                                                                                    //   }
                                                                                                                                                    //   res.json(out)
                                                                                                                                                })

                                                                                                                                                .catch(function (err) {
                                                                                                                                                    msg = "Error in addding Project.";
                                                                                                                                                    condition = false;
                                                                                                                                                    icon = "fa fa-times-circle fa-3x failed-icon";

                                                                                                                                                    var out = {
                                                                                                                                                        msg: msg,
                                                                                                                                                        condition: condition,
                                                                                                                                                        icon: icon,
                                                                                                                                                        response: err
                                                                                                                                                    }
                                                                                                                                                    res.json(out);
                                                                                                                                                })

                                                                                                                                        })
                                                                                                                                    })

                                                                                                                                })
                                                                                                                            })
                                                                                                                        })
                                                                                                                    })

                                                                                                                })
                                                                                                            })

                                                                                                        })
                                                                                                    })
                                                                                                })
                                                                                            })

                                                                                        })

                                                                                    })


                                                                                })

                                                                            })
                                                                            .catch(function (err) {
                                                                                // console.log(err);
                                                                                var out = {
                                                                                    msg: "Error in addding Project",
                                                                                    condition: false,
                                                                                    response: err
                                                                                }
                                                                                res.json(out);
                                                                            })
                                                                    })
                                                                    .catch(function (err) {
                                                                        // console.log(err);
                                                                        var out = {
                                                                            msg: "Error in addding Project",
                                                                            condition: false,
                                                                            response: err
                                                                        }
                                                                        res.json(out);

                                                                        // console.log(response)                                                          
                                                                        // res.json(out);
                                                                    })


                                                            }

                                                            // console.log(obj)



                                                        }

                                                    })

                                                })


                                            })

                                        }


                                    }

                                })
                            })
                        })
                    }
                }
            })


            //end code 


        })
        .catch(function (err) {
            // console.log(err);
            var out = {
                msg: "Error in addding Term Sheet data",
                response: err,
                condition: false
            }
            // resposeHandler(req, res, null, out);
            // return out;
            res.json(out);
        })


}
module.exports = termSheetGenerationHandler;
