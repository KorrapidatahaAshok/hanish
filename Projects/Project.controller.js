var Project = {};

// var localStorage = require('localStorage');
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
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var termSheetGenerationHandler = require('../ProjectCal/projectcalFun');
var middlewareCalc = require('../ProjectCal/MiddlewareCalcFun');
var middlewareCalc1 = require('../ProjectCal/MiddlewareCalcFun.update')
var projectBasis = require('../ProjectCal/ProjectBasisFun');
var projectBasis1 = require('../ProjectCal/ProjectBasisFun.update');
var dashboard = require('../ProjectCal/dashboardFun');
var conPeriodFun = require('../ProjectCal/conPeriodFun');
var stabilizedProForma = require('../ProjectCal/stabilizedProFormaFun')
var netOperatingIncome = require('../ProjectCal/operatingIncomeFun')
var netOperatingIncome1 = require('../ProjectCal/operatingIncomeFun.update')
var ProjectValuation = require('../ProjectCal/ProjectValuationFun')
var SeniorDebt = require('../ProjectCal/SeniorDebtFun')
var SubDebt = require('../ProjectCal/SubDebtFun')
var ConsDebt = require('../ProjectCal/ConsDebtFun')
var TaxCredit4 = require('../ProjectCal/TaxCredit4Fun')
var TaxCredit9 = require('../ProjectCal/TaxCredit9Fun')
var SourcesFun = require('../ProjectCal/SourcesFun')
var lastCalc = require('../ProjectCal/lastCalcFun')

Project.create = function (req, res) {

    // console.log("create project", req.body)

    if(req.body.data.Studios == 0 && req.body.data.One_BedRoom_11 == 0 && req.body.data.Two_BedRoom_12 == 0 && req.body.data.Three_BedRoom_13 == 0 && req.body.data.Four_BedRoom_14 == 0) {

        var out = {
            msg: "Please provide bedroom and Studios details",
            condition : false,
            icon: "fa fa-times-circle fa-3x failed-icon",
            
        }
        res.json(out);
    }
    else if(req.body.data.ZipCode) {

        zipCodeSchema.findOne({ Zip_Code: req.body.data.ZipCode }, function (err, zipobj) {

            if (err) {
                // console.log(err)
                var output = {
                    msg: "ZipCode not available",
                    err: err,
                    condition: false,
					icon: "fa fa-times-circle fa-3x failed-icon",
                }
                res.json(output)
            }
            else {
                if (zipobj == null) {
                    var out1 = {
                        msg: "ZipCode not available",
                        err: err,
                        condition: false,
						 icon: "fa fa-times-circle fa-3x failed-icon",
                    }
                    res.json(out1)
                }
                else {

                    fmrRentsSchema.findOne({ "Area_Name": zipobj.FMR_Area }, function (err, fmrobj) {

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
                                var createdata = {
                                    Name: req.body.data.Name,
                                    Email: req.body.data.Email.toLowerCase(),
                                    Phone: req.body.data.Phone,
                                    Address: req.body.data.Address,
                                    City: req.body.data.City,
                                    State: req.body.data.State,
                                    ZipCode: req.body.data.ZipCode,
                                    OrganizationName: req.body.data.OrganizationName,
                                    ConstructionType: req.body.data.ConstructionType,
                                    PurchasePrice: req.body.data.PurchasePrice,
                                    SquareFootage: req.body.data.SquareFootage,
                                    RenovationLevel: req.body.data.RenovationLevel,
                                    Studios: req.body.data.Studios,
                                    One_BedRoom_11: req.body.data.One_BedRoom_11,
                                    Two_BedRoom_12: req.body.data.Two_BedRoom_12,
                                    Three_BedRoom_13: req.body.data.Three_BedRoom_13,
                                    Four_BedRoom_14: req.body.data.Four_BedRoom_14,
                                    userId: req.body.id
                                }
                                let project = new projectIntakeDataSchema(createdata);
                            
                                project.save()
                                    .then(function (response) {
                                        //  console.log("Hello")
                                        termSheetGenerationHandler.cal(response, req, res);
                            
                                    })
                                    .catch(function (err) {
                                        // console.log(err);
                                        var out = {
                                            msg: "Error in addding Project",
                                            icon: "fa fa-exclamation-triangle fa-2x",
                                            response: err
                                        }
                                        res.json(out);
                                    })
                            }
                        }
                    })

           
                    }
                }

        })
    }
   
}

Project.update = function (req, res) {

    // console.log(req.body)

    if(req.body.Studios == 0 && req.body.One_BedRoom_11 == 0 && req.body.Two_BedRoom_12 == 0 && req.body.Three_BedRoom_13 == 0 && req.body.Four_BedRoom_14 == 0) {

        var out = {
            msg: "Please provide bedroom and Studios details.",
            condition : false,
            icon: "fa fa-times-circle fa-3x failed-icon",
            
        }
        res.json(out);
    }
    else 
    {

    var updateData = {

        Name: req.body.Name,
        Email: req.body.Email.toLowerCase(),
        Phone: req.body.Phone,
        Address: req.body.Address,
        City: req.body.City,
        State: req.body.State,
        ZipCode: req.body.ZipCode,
        OrganizationName: req.body.OrganizationName,
        ConstructionType: req.body.ConstructionType,
        PurchasePrice: req.body.PurchasePrice,
        SquareFootage: req.body.SquareFootage,
        RenovationLevel: req.body.RenovationLevel,
        Studios: req.body.Studios,
        One_BedRoom_11: req.body.One_BedRoom_11,
        Two_BedRoom_12: req.body.Two_BedRoom_12,
        Three_BedRoom_13: req.body.Three_BedRoom_13,
        Four_BedRoom_14: req.body.Four_BedRoom_14,

    }
    inputTermSheetSchema.update({ '_id': req.body._id },
        { $set: updateData }, function (err, result) {

            if (!err) {

                var msg = "";
                var condition = false;

                if (result.nModified == 0) {
                    msg = 'Project data not modified.';
                    condition = false;
                    icon = "fa fa-times-circle fa-3x failed-icon";

                    var out = {

                        msg: msg,
                        condition: condition,
                        icon: icon
                    }
                    res.json(out)
                }

                else {

                    // console.log("updated")
                    zipCodeSchema.findOne({ Zip_Code: updateData.ZipCode }, function (err, zipobj) {

                        // console.log(obj)

                        if (err) {
                            // console.log(err)
                            var out = {
                                msg: "ZipCode not available.",
                                err: err,
                                icon: "fa fa-times-circle fa-3x failed-icon",
                                condition : false,
                            }
                            res.json(out)
                        }
                        else {
                            if (zipobj == null) {
                                var out = {
                                    msg: "ZipCode not available.",
                                    err: err,
                                    icon: "fa fa-times-circle fa-3x failed-icon",
                                    condition : false,
                                }
                                res.json(out)
                            }
                            else {

                                var termSheetMetroArea = {

                                    MetroArea: zipobj.FMR_Area,

                                }

                                // console.log(termSheetMetroArea)

                                inputTermSheetSchema.update({ '_id': req.body._id }, { $set: termSheetMetroArea }, function (err, obj1) {

                                    if (err) {
                                        // console.log(err)
                                        var out = {
                                            msg: "Metro Area not saved",
                                            err: err,
                                            icon: "fa fa-times-circle fa-3x failed-icon",
                                            condition : false,
                                        }
                                        res.json(out)
                                    }

                                    // console.log("Hi")
                                    inputTermSheetSchema.findOne({ '_id': req.body._id }, function (err, inpobj) {

                                        if (err) console.log(err)

                                    

                                        fmrRentsSchema.findOne({ "Area_Name": inpobj.MetroArea }, function (err, fmrobj) {

                                            // console.log(fmrobj)

                                            if (err) {

                                                var output = {

                                                    msg: "Data not available for Metro Area"
                                                }
                                                res.json(output)
                                            }

                                            else {

                                                if (fmrobj == null) {

                                                    var output = {

                                                        msg: "Data not available for Metro Area",
                                                        icon: "fa fa-times-circle fa-3x failed-icon",
                                                        condition : false,
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
                                                    // console.log(req.body.project_id)

                                                    projectBasisCalcSchema.update({ "project_id": inpobj.project_id }, { $set: projectBasisCalcdata }, function (err, updobj) {

                                                        if (err) {
                                                            var out = {
                                                                msg: "Error in updating Project.",
                                                                response: err,
                                                                icon: "fa fa-times-circle fa-3x failed-icon",
                                                                condition : false,
                                                            }
                                                            res.json(out);
                                                        }
                                                        else {


                                                            editvhmodelcalcSchema.update({ $and: [{ "projectId": inpobj.project_id }, { "projectBasis.pbdata.Building_System": "Purchase Price" }] }, { $set: { "projectBasis.$.pbdata.12.Cost": parseFloat(req.body.PurchasePrice) } }, function (err, obj) {

                                                                if (err) console.log(err)
                                                                   
                                                                // console.log(obj)          
                                                            console.log("updated")
                                                            msg = 'Project updated successfully.';
                                                            condition = true;
                                                            icon = "fa fa-check fa-2x success-icon"

                                                            var out = {
                                                                msg: msg,
                                                                response: result,
                                                                condition: condition,
                                                                icon : icon

                                                            }

                                                            res.json(out);
                                                            })
                                                        }

                                                    })
                                                }
                                            }
                                        })
                                        })
                                    })

                                // })

                            }
                        }
                    })



                }

            }
            else {
                console.log("Error", err)
                msg = 'Project updation failed - id did not match';
                icon ="fa fa-times-circle fa-3x failed-icon";
                condition = false;
                var out = {
                    msg: 'Project updation failed - id did not match',
                    condition: condition,
                    icon: icon
                }
                res.json(out);

            }

        });

        }

}

Project.delete = function (req, res) {

    inputTermSheetSchema.deleteOne({ _id: req.body.id }, function (err, result) {

        if (!err) {
            var out = {
                msg: 'Project Removed Successfully',
                response: result

            }
            res.json(out);

        }

        else {
            var out = {
                msg: 'Unable to delete like did not matched id',
            }
            res.json(out);


        }
    });
}

Project.findProjects = function (req, res) {

    inputTermSheetSchema.find({}, function (err, result) {

        if (!err) {
            var vhmDataResult;
         

            adminEditVHModelSchema.find({}, function (err, vhmdata) {

                if (err) {

                    console.log(err)
                    var out = {

                        msg: "Data not found",
                        condition: false
                    }
                    res.json(out)
                }
                else {
                    
                    vhmDataResult = vhmdata;

                    editvhmodelcalcSchema.find({}, function(err, uservhData) {

                        if(err) console.log(err)

                        var out = {
                            msg: 'Found all projects Successfully',
                            App: result,
                            vhmdata: vhmDataResult,
                            uservhmdata: uservhData
                        }
                        // console.log(out)
                        res.json(out);

                    })
                    
               
                }
            })
         
            }

        // }
        else {
            var out = {
                msg: 'Unable to find projects',
            }
            res.json(out);


        }



    });
}

Project.findUserProjects = function (req, res) {

    console.log("req data", req.params.data)

    inputTermSheetSchema.find({"userId": req.params.data}, function (err, result) {

        if (!err) {
            var vhmDataResult;
         

            adminEditVHModelSchema.find({}, function (err, vhmdata) {

                if (err) {

                    console.log(err)
                    var out = {

                        msg: "Data not found",
                        condition: false
                    }
                    res.json(out)
                }
                else {
                    
                    vhmDataResult = vhmdata;

                    editvhmodelcalcSchema.find({}, function(err, uservhData) {

                        if(err) console.log(err)

                        var out = {
                            msg: 'Found all projects Successfully',
                            App: result,
                            vhmdata: vhmDataResult,
                            uservhmdata: uservhData
                        }
                        // console.log(out)
                        res.json(out);

                    })
                    
               
                }
            })
         
            }

        // }
        else {
            var out = {
                msg: 'Unable to find projects',
            }
            res.json(out);


        }



    });
}

Project.projectBasis = (req, res) => {

    inputTermSheetSchema.findOne({ "project_id": req.params.id }, function (err, obj1) {

        var msg = "";

        if (err) {
            // console.log(err)
            console.log("No matching id")
            msg = "No matching project id found";
            PIdata = err;

            var output = {

                msg: msg,
                PIdata: PIdata
            }

            res.json(output)
        }
        else {
            if (obj1 == null) {
                console.log("Project Intake data not found")
                var output = {

                    msg: "Project Intake data not found",
                    PIdata: obj1
                }
                res.json(output)
            }
            else {
                var array = [];

                editvhmodelcalcSchema.findOne({"projectId": req.params.id}, function(err, editobj) {

                        if(err) console.log(err)

                middlewareCalc1.cal(editobj.middlewareCalc, obj1, function (result) {

                            // console.log(editobj.middlewareCalc[0].homeType[0])
                            // res.json(editobj.dashboard[0])
                            // res.json(editobj.middlewareCalc)
                            // res.json(result)

                    projectBasis1.cal(result, editobj.projectBasis, function (result1) {

                        // res.json(editobj.projectBasis)
                        // res.json(editobj.middlewareCalc)
                        // console.log(result1[2].pbdata)
                        array.push(result1)

                        dashboard.cal(result1, result, function (result2) {

                            // res.json(result2)

                            array.push(result2)
                            conPeriodFun.cal(result2, result1, result, function (result3) {

                                stabilizedProForma.cal(result3, result, result2, function (result4) {

                                    array.push(result4)
                                    netOperatingIncome1.cal(result4, result2, result, editobj.netOperatingIncome, function (result5) {
                                      
                                        
                                        array.push(result5)

                                        ProjectValuation.cal(result5, result1, result2, result, function (result6) {

                                            SeniorDebt.cal(result6, result5, result2, result, function (result7) {

                                                array.push(result7)
                                                SubDebt.cal(result7, result5, result2, result6, result, function (result8) {

                                                    array.push(result8)
                                                    ConsDebt.cal(result8, result2, result1, result7, result3, function (result9) {

                                                        array.push(result9)
                                                        TaxCredit4.cal(result9, result1, result2, result, function (result10) {

                                                            array.push(result10)
                                                            TaxCredit9.cal(result10, result2, result, function (result11) {

                                                                // res.json(result11)

                                                                array.push(result11)
                                                                SourcesFun.cal(result11, result9, result10, result, result1, result7, result8, result5, result2, function (result12) {

                                                                    //  res.json(result12)
                                                                    array.push(result12)

                                                                    lastCalc.cal(result12, result, result1, result2, result9, result6, result10, result7, function (result13) {

                                                                        array.push(result13)

                                                                        editvhmodelcalcSchema.update({ "projectId": req.params.id }, {
                                                                            $set: {
                                                                                middlewareCalc: result, projectBasis: result1, dashboard: result2, conPeriodFun: result3, stabilizedProForma: result4, netOperatingIncome: result5,

                                                                                ProjectValuation: result6, SeniorDebt: result7, SubDebt: result8, ConsDebt: result9, TaxCredit4: result10, TaxCredit9: result11,

                                                                                SourcesFun: result12, lastCalc: result13
                                                                            }
                                                                        }, function (err, updobj) {

                                                                            if (err) console.log(err)

                                                                            console.log("saved")

                                                                    })
                                                                        res.json(array)

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
            }

        }

    })

}



Project.vhmodeledit = function (req, res) {

    console.log(req.body)

    console.log("Hi")

    var updatefnscenario = [
        {Input: req.body.input1},
        {Input: req.body.input2}]

    var updateCaprate = {

        Input: req.body.CapRate
    }

    var updateConDebt = [
        {Rate: req.body.Rate},
        {Rate: req.body.Margin}
    ]
    
    var updateSnrDebt = [

        {Input: req.body.snLTV},
        {Input: req.body.DSCR1},
        {Input: req.body.LRate1},
        {Input: req.body.Amort1},
    ]

    var updateSubDebt = [

        {LTV: req.body.subLTV},      
        {DSCR: req.body.DSCR2},       
        {LRate: req.body.LRate2},    
        {Amort: req.body.Amort2},
    ]
    var updatetaxCredit = [ 

        {QBasis: req.body.QBasis},
        { LIHTCRate: req.body.LIHTCRate}

    ]
    var updatefinEle = {

        BIRR: req.body.BIRR
       
    }
    // adminEditVHModelSchema.update({"project_id": req.body.project_id}, {$set: {Financing_Scenario : }})
    adminEditVHModelSchema.findOne({"project_id": req.body.id}, function(err, editobj){

        // console.log("JAYAAAAAAAAAAAA")

        var condition = false;
        if(err) {
            
            console.log(err)
            var out = {

                msg: "VHModel data not updated",
                err: err,
                condition: false
            }
            // res.json(out)

        }
        else {

            // console.log(editobj)
            var updarray = [];

                // console.log(editobj[i].Financing_Scenario)
                for(var j=0; j<editobj.Financing_Scenario.length; j++) {

                    // console.log(editobj[i].Financing_Scenario[j].Financing_Scenario)
                    // console.log(updatefnscenario[j])
                    adminEditVHModelSchema.update({"project_id": req.body.id, "Financing_Scenario.Financing_Scenario": editobj.Financing_Scenario[j].Financing_Scenario }, {$set: {"Financing_Scenario.$.Input": updatefnscenario[j].Input}}, function(err, obj){

                    if(err) console.log(err)

                        // console.log(obj)
                        // updarray.push(obj)
                        // console.log("updated")
                })
                }
           
                
            //    console.log(editobj[i].Cap_Rate[0].Cap_Rate)
               adminEditVHModelSchema.update({"project_id": req.body.id, "Cap_Rate.Cap_Rate": "Class C Cap Rate" }, {$set: {"Cap_Rate.$.Input": updateCaprate.Input}}, function(err, obj){

                    if(err) console.log(err)

                        console.log(obj)
                        updarray.push(obj)
                        // console.log("updated")
                })
                           
                // console.log(updateConDebt[0].Rate)               

                adminEditVHModelSchema.update({"project_id": req.body.id, "Con_Debt.Con_Debt": "Rate" }, {$set: {"Con_Debt.$.Input": updateConDebt[0].Rate}}, function(err, obj){

                    if(err) console.log(err)

                    console.log(obj)
                    updarray.push(obj)
                        // console.log("updated")
                })
                adminEditVHModelSchema.update({"project_id": req.body.id, "Con_Debt.Con_Debt": "Margin" }, {$set: {"Con_Debt.$.Input": updateConDebt[1].Rate}}, function(err, obj){

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                        // console.log("updated")
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Senior_Debt.Senior_Debt":"LTV"}, {$set: {"Senior_Debt.$.Parameters": updateSnrDebt[0].Input}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Senior_Debt.Senior_Debt":"DSCR"}, {$set: {"Senior_Debt.$.Parameters": updateSnrDebt[1].Input}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Senior_Debt.Senior_Debt":"Loan Rate"}, {$set: {"Senior_Debt.$.Parameters": updateSnrDebt[2].Input}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })
                
                adminEditVHModelSchema.update({"project_id": req.body.id, "Senior_Debt.Senior_Debt":"Amort."}, {$set: {"Senior_Debt.$.Parameters": updateSnrDebt[3].Input}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Sub_Debt.Sub_Debt":"LTV"}, {$set: {"Sub_Debt.$.Parameters": updateSubDebt[0].LTV}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Sub_Debt.Sub_Debt":"DSCR"}, {$set: {"Sub_Debt.$.Parameters": updateSubDebt[1].DSCR}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Sub_Debt.Sub_Debt":"Loan Rate"}, {$set: {"Sub_Debt.$.Parameters": updateSubDebt[2].LRate}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Sub_Debt.Sub_Debt":"Amort."}, {$set: {"Sub_Debt.$.Parameters": updateSubDebt[3].Amort}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                // console.log(editobj[i].TaxCredit4[2].Tax_Credit_Four_Percent)
                adminEditVHModelSchema.update({"project_id": req.body.id, "TaxCredit4.Tax_Credit_Four_Percent":"Qualified Basis"}, {$set: {"TaxCredit4.$.Result": updatetaxCredit[0].QBasis}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "TaxCredit4.Tax_Credit_Four_Percent":"LIHTC Rate in %"}, {$set: {"TaxCredit4.$.Result": updatetaxCredit[1].LIHTCRate}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)
                })

                adminEditVHModelSchema.update({"project_id": req.body.id, "Financing_Elimination.Financing_Elimination":"Benchmark IRR in %"}, {$set: {"Financing_Elimination.$.Input": updatefinEle.BIRR}}, function(err, obj) {

                    if(err) console.log(err)
                    console.log(obj)
                    updarray.push(obj)

                    // console.log("updarray", updarray)

                    for(var i=0; i<updarray.length; i++) {

                        // console.log(updarray[i].nModified)

                        if(updarray[i].nModified == 1) {

                            console.log("JAYAAAAAAAA")
                            var output = {

                                // response: obj,
                                msg: "VH Model data updated successfully",
                                condition: true
                            }
          
                        }
                        else{

                            var output = {

                                // response: obj,
                                msg: "VH Model data not modified",
                                condition: false
                            }

                        }
                        
                    }
                    res.json(output)

                })               
      
        }
    })

}



module.exports = Project;
