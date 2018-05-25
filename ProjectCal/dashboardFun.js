var dashboard = {};

var stabilizationSchema = require("mongoose").model("stabilization");
var OpAssumptionsSchema = require("mongoose").model("OpAssumptionsCalculation");
var FinancingScenarioSchema = require("mongoose").model("FinancingScenario");
var conDebtSchema = require("mongoose").model("conDebt");
var BenchMarkSchema = require("mongoose").model("BenchMark");
var SeniorDebtSchema = require("mongoose").model("SeniorDebtCalculation");
var SubDebtSchema = require("mongoose").model("SubDebt");
var capRateSchema = require("mongoose").model("capRateProfile");
var fmrRentsSchema = require("mongoose").model("fmrrentsprofiles");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

dashboard.cal = (data1, data2, db) => {

    // console.log(data1, data2)

    //  console.log("data", data1)
    //  console.log("data2", data2)
    // console.log("data1", data1[2].pbdata[15])
    //  console.log("projcal", data2[1].projcalc.Project_Purchase_Price)

    var constructionUses = [];
    var dashboarddata = [];
    var LIHTC = [];
    var stabilization = [];
    var opAssupmtions = [];
    var financeScenario = [];
    var conDebt = [];
    var seniorDebt = [];
    var subDebt = [];
    var capRate = [];

    var output = {

        msg: "Home Type data",
        homeType: data2[0].homeType
    }

    // console.log("output", output)

    dashboarddata.push(output)

    var price1 = data1[2].pbdata[12].Cost;
    var price2 = data1[2].pbdata[11].Cost;
    var price3 = data1[2].pbdata[14].Cost;
    var price4 = data1[2].pbdata[15].Cost;
    var price5 = price1 + price2 + price3 + price4

    // console.log("price", price1, price2, price3, price4, price5)

    var sample = {

        "Construction_Uses": "Purchase Price",
        "price": price1,
        "percentage": ((price1 / price5) * 100).toFixed(2) / 1,
        "price_per_unit": (price1 / data2[1].projcalc.Units).toFixed(2) / 1,
        "project_id": data2[1].projcalc.project_id
    }
    constructionUses.push(sample)
    //  res.json(constructionUses)
    var sample = {

        "Construction_Uses": "Renovation Costs",
        "price": price2,
        "percentage": ((price2 / price5) * 100).toFixed(2) / 1,
        "price_per_unit": (price2 / data2[1].projcalc.Units).toFixed(2) / 1,
        "project_id": data2[1].projcalc.project_id
    }
    constructionUses.push(sample)

    var sample = {

        "Construction_Uses": "Soft Costs",
        "price": price3,
        "percentage": ((price3 / price5) * 100).toFixed(2) / 1,
        "price_per_unit": (price3 / data2[1].projcalc.Units).toFixed(2) / 1,
        "project_id": data2[1].projcalc.project_id
    }
    constructionUses.push(sample)
    var sample = {

        "Construction_Uses": "Developer Fee",
        "price": price4,
        "percentage": ((price4 / price5) * 100).toFixed(2) / 1,
        "price_per_unit": (price4 / data2[1].projcalc.Units).toFixed(2) / 1,
        "project_id": data2[1].projcalc.project_id
    }
    constructionUses.push(sample)

    //LIHTC Data
    var sample = {

        "Construction_Uses": "Total",
        "price": price5,
        "percentage": ((price5 / price5) * 100).toFixed(2) / 1,
        "price_per_unit": (price5 / data2[1].projcalc.Units).toFixed(2) / 1,
        "project_id": data2[1].projcalc.project_id
    }
    constructionUses.push(sample)


    var output = {

        msg: "Construction Uses",
        constructionUses: constructionUses
    }
    dashboarddata.push(output)

    var sample = {

        "LIHTC_Eligibility": "Project Adjusted Basis",
        "Input": constructionUses[4].price,
        "project_id": data2[1].projcalc.project_id
    }
    LIHTC.push(sample)

    var sample = {

        "LIHTC_Eligibility": "Renovation Costs",
        "Input": constructionUses[1].price,
        "project_id": data2[1].projcalc.project_id
    }
    LIHTC.push(sample)

    var a = LIHTC[1].Input / LIHTC[0].Input;
    if (a > 0.2) {
        value = 1;
    }
    else {
        value = 0;
    }
    var sample = {

        "LIHTC_Eligibility": "Sufficient Renovation?",
        "Input": value,
        "project_id": data2[1].projcalc.project_id
    }
    LIHTC.push(sample)

    var sample = {

        "LIHTC_Eligibility": "Sufficient Bond Finance",
        "Input": value,
        "project_id": data2[1].projcalc.project_id
    }
    LIHTC.push(sample)

    var output = {

        msg: "LIHTC Data",
        LIHTC: LIHTC
    }

    dashboarddata.push(output)

    stabilizationSchema.find({}, function (err, stabobj) {

        if (err) console.log(err)
        // console.log(stabobj)
        for (var i = 0; i < stabobj.length; i++) {

            var sample = {
                "Stabilization": stabobj[i].Stabilization,
                "Input": stabobj[i].Input,
                "project_id": data2[1].projcalc.project_id
            }

            stabilization.push(sample)

        }
        var output = {

            msg: "Stabilization Data",
            Stabilization: stabilization
        }

        dashboarddata.push(output)


        adminEditVHModelSchema.find({"project_id":data2[1].projcalc.project_id}, function (err, oppobj) {
            if (err) console.log(err)
            // res.json(oppobj)
            // console.log(oppobj)
        
            for (var i = 0; i < oppobj.length; i++) {

                // console.log(oppobj[i].OpAssumptions)

                for(var j=0; j<oppobj[i].OpAssumptions.length; j++){


                var sample = {

                    "Op_Assumptions": oppobj[i].OpAssumptions[j].Op_Assumptions,
                    "Input": oppobj[i].OpAssumptions[j].Input,
                    "project_id": oppobj[i].OpAssumptions[j].project_id
                }

                opAssupmtions.push(sample)
               
                }
            }
            // console.log(opAssupmtions)
            var output = {

                msg: "OP Assumptions Data",
                opAssupmtions: opAssupmtions
            }
            dashboarddata.push(output)

           

            adminEditVHModelSchema.find({"project_id":data2[1].projcalc.project_id}, function (err, finscobj) {
                if (err) console.log(err)
                // console.log(finscobj)
                for (var i = 0; i < finscobj.length; i++) {

                    for(var j=0; j<finscobj[i].Financing_Scenario.length; j++){

                    var sample = {
                        "Financing_Scenario": finscobj[i].Financing_Scenario[j].Financing_Scenario,
                        "Input": finscobj[i].Financing_Scenario[j].Input,
                        "project_id": data2[1].projcalc.project_id
                    }

                    financeScenario.push(sample)

                }
            }

                var output = {

                    msg: "Financing Scenario Data",
                    financeScenario: financeScenario
                }

                dashboarddata.push(output)

                //  console.log(dashboarddata)

                adminEditVHModelSchema.find({"project_id":data2[1].projcalc.project_id }, function (err, conobj) {

                            if (err) console.log(err)
                            for (var i = 0; i < conobj.length; i++) {

                                for(var j=0; j<conobj[i].Con_Debt.length; j++){

                                var sample = {
                                    "Con_Debt": conobj[i].Con_Debt[j].Con_Debt,
                                    "Input": conobj[i].Con_Debt[j].Input,
                                    "project_id": data2[1].projcalc.project_id
                                }

                                conDebt.push(sample)

                            }
                        }
                            // console.log(conDebt)

                            var output = {
                                msg: "Con. Debt",
                                conDebt: conDebt
                            }
                            dashboarddata.push(output)
                            // console.log(dashboarddata)

                            adminEditVHModelSchema.find({"project_id":data2[1].projcalc.project_id }, function (err, senobj) {

                                if (err) console.log(err)

                                        for (var i = 0; i < senobj.length; i++) {

                                            for(var j=0; j<senobj[i].Senior_Debt.length; j++) {

                                            var sample = {

                                                "Senior_Debt": senobj[i].Senior_Debt[j].Senior_Debt,
                                                "Parameters": senobj[i].Senior_Debt[j].Parameters,
                                                "project_id": data2[1].projcalc.project_id
                                            }

                                         
                                            seniorDebt.push(sample)
                                        }
                                    }

                                        var output = {
                                            msg: "Senior Debt Data",
                                            seniorDebt: seniorDebt
                                        }
                                        dashboarddata.push(output)

                                        adminEditVHModelSchema.find({ "project_id":data2[1].projcalc.project_id }, function (err, subobj) {

                                            if (err) console.log(err)
                                            // console.log(subobj)
                                            
                                                    for (var i = 0; i < subobj.length; i++) {

                                                        for(var j=0; j<subobj[i].Sub_Debt.length; j++){

                                                        var sample = {

                                                            "Sub_Debt": subobj[i].Sub_Debt[j].Sub_Debt,
                                                            "Parameters": subobj[i].Sub_Debt[j].Parameters,
                                                            "project_id": data2[1].projcalc.project_id
                                                        }
                                                    
                                                        subDebt.push(sample)
                                                    }
                                                }

                                                    var output = {

                                                        msg: "Sub Debt Data",
                                                        subDebt: subDebt
                                                    }

                                                    dashboarddata.push(output)
                                                    // console.log(data2[1].projcalc)
                                                     
                                                        adminEditVHModelSchema.find({"project_id": data2[1].projcalc.project_id}, function(err, capopbj) {
                                                            if(err) console.log(err)
                                                                // console.log(capopbj)                                               
                                                           
                                                        for(var i=0; i<capopbj.length; i++) {

                                                            for(var j=0; j<capopbj[i].Cap_Rate.length; j++){

                                                            var sample = {

                                                                "Cap_Rate":capopbj[i].Cap_Rate[j].Cap_Rate,
                                                                "Input": parseFloat(capopbj[i].Cap_Rate[j].Input),
                                                                "project_id": data2[1].projcalc.project_id
                                                            }
                                                        
                                                            capRate.push(sample)
                                                        }
                                                    }
                                                        // console.log(capRate)
                                                        
                                                        var output = {
                                                            msg: "CapRate data",
                                                            capRate: capRate
                                                        }
                                                        dashboarddata.push(output)

                                                        // console.log(dashboarddata)

                                                    
                                                        return db(dashboarddata)
                                                       
                                                        })
 
                                            
                                        })

                            })

                        })

            })

        })
    })

}


module.exports = dashboard;