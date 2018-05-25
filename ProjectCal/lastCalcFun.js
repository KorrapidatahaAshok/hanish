var lastCalc = {};
var projectValuationSchema = require("mongoose").model("projectvaluation");

lastCalc.cal = (data, data1, data2, data3, data4, data5, data6, data7, lc) => {

    // console.log(data[6].sources[4].LIHTC_9)
    // console.log(data1[1].projcalc)
    // console.log(data4[1].conPeriodArray[13].Interest_Charge)
    // console.log(data3[5].financeScenario[1].Input)
    // console.log("data7", data7[0].seniorDebt[3].Result)

    
    var sample = {

        "project_id": data1[1].projcalc.project_id,
        "Sponsor": data1[1].projcalc.Sponsor,
        "FMR_Area": data1[1].projcalc.FMR_Area,
        "Deal_Type": data1[1].projcalc.Deal_Type,
        "City": data1[1].projcalc.City,
        "State": data1[1].projcalc.State,
        "Project_Purchase_Price": data1[1].projcalc.Project_Purchase_Price,
        "Rentable_Square_Footage": data1[1].projcalc.Rentable_Square_Footage,
        "Building_Floors": data1[1].projcalc.Building_Floors,
        "Square_Footage_per_Floor": data1[1].projcalc.Square_Footage_per_Floor,
        "Units": data1[1].projcalc.Units,
        "Additional_Rent_Discount": data1[1].projcalc.Additional_Rent_Discount,
        "Developer_Fee": data1[1].projcalc.Developer_Fee,
        "Developer_Fee_Deferral": data1[1].projcalc.Developer_Fee_Deferral,
        "ViaHome_Fee_Rate": data1[1].projcalc.ViaHome_Fee_Rate,
        "Project_Staging": data1[1].projcalc.Project_Staging,
        "Interest_Reserve_Surplus_Deficit": data4[1].conPeriodArray[12].Interest_Reserves_Deficit,
        "Interest_Reserve_Check": (data2[0].sceData[5].Cost < data4[1].conPeriodArray[13].Interest_Charge ? "Increase" : "Ok"),
        "Deal_Score" : (data[6].sources[4].LIHTC_9 + data[6].sources[4].LIHTC_4 + data[6].sources[4].Traditional)

    }
    // console.log(sample)
    
    // console.log(data[3].trrvranlys[16].irr2)
    var lastCalArray = [];
    var capStack = [];
    var permUses = [];
    var permCapStack = [];
    var developerFee = [];
    var projVal = [];
    var trreadjst = [];
    var spnsEqtyAdjst = [];

    var val = data[6].sources[4].LIHTC_9 == 1 ? data[6].sources[0].LIHTC_9 : data[6].sources[0].LIHTC_4 - (Math.max(0, data[7].fnSurpls))

    // console.log(val)

    var val1 = data[6].sources[4].Traditional == 1 ? Math.min(data[6].sources[0].Traditional, ((data2[2].pbdata[13].Cost + data2[2].pbdata[14].Cost)*0.9)) : val
    var price1 =  sample.Deal_Score == 0 ? "No Deal" : val1.toFixed(2)/1
    
    var price2 = price1 == "No Deal"? price1 : (data[6].sources[4].Traditional == 1 ? data[6].sources[1].Traditional : (data[6].sources[0].LIHTC_9 == 1 ? data[6].sources[1].LIHTC_9 : data[6].sources[1].LIHTC_4))
    var price3 = price1 == "No Deal"? price1 : (data[6].sources[4].Traditional == 1 ? data[6].sources[2].Traditional : (data[6].sources[0].LIHTC_9 == 1 ? data[6].sources[2].LIHTC_9 : data[6].sources[2].LIHTC_4))
    var price4 = price1 == "No Deal"? price1 : (data[6].sources[4].Traditional == 1 ? data[6].sources[3].Traditional : (data[6].sources[0].LIHTC_9 == 1 ? data[6].sources[3].LIHTC_9 : data[6].sources[3].LIHTC_4))
    
    if(price1 == "No Deal" && price2 == "No Deal" && price3 == "No Deal" && price4 == "No Deal"){
        var price5 = "No Deal"
    }
    else {
        var price5 = price1 + price2 + price3 + price4
    }
    
    // console.log(price1)
    
   
    var sample1 = {

        "Construction_Cap_Stack": "Tax-Exempt Construction Loan",
        "price": price1,
        "percentage": price1 == "No Deal" ? price1 : ((price1/data3[1].constructionUses[4].price)*100).toFixed(2)/1,
        "Yield_IRR": price1 == "No Deal" ? price1 : data4[0].condebt[0].Result.toFixed(2)/1,
        "project_id": sample.project_id
    }
    capStack.push(sample1)

    var sample1 = {

        "Construction_Cap_Stack": "Tax Credit Equity",
        "price": price2,
        "percentage": price2 == "No Deal" ? price2 : ((price2 / data3[1].constructionUses[4].price) * 100).toFixed(2)/1,
        "Yield_IRR": price2 == "No Deal" ? "No Deal" : (price2 == 0 ? "N/A" : parseFloat(data3[5].financeScenario[1].Input).toFixed(2)/1),
        "project_id": sample.project_id
    }
    capStack.push(sample1)

    var sample1 = {

        "Construction_Cap_Stack": "Fee Deferral",
        "price": price3,
        "percentage": (price3 == "No Deal" ? price3 : ((price3 / data3[1].constructionUses[4].price) * 100).toFixed(2)/1),
        "Yield_IRR": capStack[1].percentage == "No Deal" ? "No Deal" : 0,
        "project_id": sample.project_id
    }
    capStack.push(sample1)

    var sample1 = {

        "Construction_Cap_Stack": "Sponsor Equity",
        "price": price4,
        "percentage": ((price4 == "No Deal" ? price4 : price4 / data3[1].constructionUses[4].price) * 100).toFixed(2)/1,
        "Yield_IRR": price4 == "No Deal" ? "No Deal" : (data[6].sources[0].Traditional == "Yes" ? data[4].irr1 : data[4].irr2),
        "project_id": sample.project_id
    }
    capStack.push(sample1)

    var sample1 = {

        "Construction_Cap_Stack": "Total",
        "price": price5,
        "percentage": Math.round(capStack[0].percentage + capStack[1].percentage + capStack[2].percentage + capStack[3].percentage).toFixed(2)/1,
        "project_id": sample.project_id
    }
    capStack.push(sample1)
    // console.log(sample1)
    var output = {

        msg: "Construction Cap Stack",
        capStack: capStack
    }

    lastCalArray.push(output)

    var price5 = data[2].permCapStk[0].price.toFixed(2)/1;
    var price6 = data[2].permCapStk[1].price.toFixed(2)/1;
    var price7 = price2;
    var price8 = price3;
    var price9 = price3 == "No Deal" ? "No Deal" : (Math.max(price4 - data3[1].constructionUses[3].price, ((data2[2].pbdata[13].Cost + data2[2].pbdata[14].Cost)*0.1)))
    var price10 = price5 + price6 + price7 + price8 + price9

    // console.log(price10)
    var sample2 = {

        "Perm_Capital_Stack": data[2].permCapStk[0].Perm_Capital_Stack,
        "price1": price5,
        "percentage": ((price5 / price10) * 100).toFixed(2)/1,
        "Yield": data[2].permCapStk[0].Yield,
        "project_id": sample.project_id
    }

    permCapStack.push(sample2)

    var sample2 = {

        "Perm_Capital_Stack": data[2].permCapStk[1].Perm_Capital_Stack,
        "price1": price6,
        "percentage": ((price6 / price10) * 100).toFixed(2) / 1,
        "Yield": data[2].permCapStk[1].Yield,
        "project_id": sample.project_id
    }

    permCapStack.push(sample2)

    var sample2 = {

        "Perm_Capital_Stack": "Tax Credit Equity",
        "price1": price7,
        "percentage": ((price7 / price10) * 100).toFixed(2) / 1,
        "Yield": capStack[1].Yield_IRR,
        "project_id": sample.project_id
    }

    permCapStack.push(sample2)

    var sample2 = {

        "Perm_Capital_Stack": "Sponsor Loan",
        "price1": price8,
        "percentage": ((price8 / price10) * 100).toFixed(2) / 1,
        "Yield": "N/A",
        "project_id": sample.project_id
    }

    permCapStack.push(sample2)

    var sample2 = {

        "Perm_Capital_Stack": "Sponsor Equity",
        "price1": (price9),
        "percentage": ((price9 / price10) * 100).toFixed(2) / 1,
        "Yield": "N/A",
        "project_id": sample.project_id
    }

    permCapStack.push(sample2)

    var sample2 = {

        "Perm_Capital_Stack": "Total",
        "price1": price10,
        "project_id": sample.project_id
    }

    permCapStack.push(sample2)
    // console.log(permCapStack)
    // console.log(sample2)

    var output = {

        msg: "Perm Capital Stack",
        permCapStack: permCapStack
    }

    lastCalArray.push(output)

    var price11 = price1;
    var price12 = Math.max((price5 + price6)-price1, 0)
    var price13 = price11 + price12

    // console.log("price12", price12)

    var sample3 = {

        "Perm_Uses" : "Construction Loan Payoff",
        "price2" : price11,
        "percentage": ((price11/price13)*100).toFixed(2)/1,
        "price_perunit" : (price11 / sample.Units).toFixed(2)/1,
        "project_id": sample.project_id
    }

    permUses.push(sample3)

    // console.log(permUses)

    var sample3 = {

        "Perm_Uses": "Sponsor Distribution",
        "price2": price12,
        "percentage": ((price12/ price13) * 100).toFixed(2)/1,
        "price_perunit": (price12 / sample.Units).toFixed(2)/1,
        "project_id": sample.project_id
    }

    permUses.push(sample3)

    var sample3 = {

        "Perm_Uses": "Total",
        "price2": price13,
        "price_perunit": (price13 / sample.Units).toFixed(2)/1,
        "project_id": sample.project_id
    }


    permUses.push(sample3)
    // console.log(sample3)
    // console.log(permUses)

    var output = {

        msg: "Perm Uses",
        permUses: permUses
    }

    lastCalArray.push(output)

    var sample4 = {

        "DFee": data[0].DeveloperFee[0].Developer_Fee,
        "Input": data[0].DeveloperFee[0].Input,
        "project_id": sample.project_id
    }
    developerFee.push(sample4)

    var sample4 = {

        "DFee": data[0].DeveloperFee[1].Developer_Fee,
        "Input": data[0].DeveloperFee[1].Input,
        "project_id": sample.project_id
    }
    developerFee.push(sample4)

    var sample4 = {

        "DFee": "Sponsor Equity",
        "Input": price4,
        "project_id": sample.project_id
    }
    developerFee.push(sample4)

    var sample4 = {

        "DFee": "Sponsor Return",
        "Input":((((developerFee[0].Input + developerFee[1].Input) / developerFee[2].Input) - 1)*100).toFixed(2)/1,
        "project_id": sample.project_id
    }
    developerFee.push(sample4)

    // console.log(developerFee)

    var output = {

        msg: "DeveloperFee",
        developerFee: developerFee
    }

    lastCalArray.push(output)

    // console.log(data5)
    projectValuationSchema.find({}, function(err, projvalobj){

        var fourth = [];
        var fifth = [];
        var sixth = [];
        var seveth = [];
        var eighth = [];
        var ninth = [];
        var tenth = [];
        // console.log(data4[1].conPeriodArray[13].Net_Operating_Income)

        if(err) console.log(err)

        projvalobj.forEach(function(value) {          

            if(value.Project_Valuation == 1) {

                fourth.push(((data4[1].conPeriodArray[12].Net_Operating_Income / data4[1].conPeriodArray[12].Construction_Draw)*100).toFixed(2)/1)
                fifth.push(0)
                sixth.push(0)
                seveth.push(0)
                eighth.push(0)
                ninth.push(0)
                tenth.push(0)
            }
            if (value.Project_Valuation == 2) {

                fifth.push(((data[3].trrvranlys[2].Distributable_NOI /data[3].trrvranlys[2].Senior_PB)*100).toFixed(2)/1)
                sixth.push(((data[3].trrvranlys[2].Distributable_NOI /(data[3].trrvranlys[2].Senior_PB + data[3].trrvranlys[2].Sub_PB)) *100).toFixed(2)/1)
                seveth.push(((data[3].trrvranlys[2].Senior_PB / data5[0].project[1].Value_Based_on_per_Cap_Rate)*100).toFixed(2)/1)
                eighth.push((((data[3].trrvranlys[2].Senior_PB + data[3].trrvranlys[2].Sub_PB)  / data5[0].project[1].Value_Based_on_per_Cap_Rate)*100).toFixed(2)/1)
                ninth.push((data[3].trrvranlys[2].Distributable_NOI / data[3].trrvranlys[2].Senior_Debt_Service).toFixed(2)/1)
                tenth.push(((data[3].trrvranlys[2].Distributable_NOI / (data[3].trrvranlys[2].Senior_Debt_Service + data[3].trrvranlys[2].Sub_Debt_Service)).toFixed(2)/1))
            }

            if(value.Project_Valuation == 3) {

                ninth.push(0)
            }
            if(value.Project_Valuation == 4) {

                ninth.push((data7[0].seniorDebt[3].Result/12).toFixed(2)/1)
            }
        })
        // console.log(fourth)
        // console.log(fifth)
        // console.log(sixth)
        // console.log(seveth)
        // console.log(tenth)

        for(var i=0; i<projvalobj.length; i++) {

            var sample = {

                "Project_Valuation": projvalobj[i].Project_Valuation,
                "Cap_Rate_Based_On_Project_Basis": data5[0].project[i].Cap_Rate_Based_On_Project_Basis,
                "Value_Based_on_per_Cap_Rate": data5[0].project[i].Value_Based_on_per_Cap_Rate,
                "Value_per_Unit": (data5[0].project[i].Value_per_Unit).toFixed(2)/1,
                "Construction_Loan_Debt_Yield" : fourth[i],
                "Class_A_Debt_Yield": fifth[i],
                "Class_B_Debt_Yield" : sixth[i],
                "Class_A_LTV": seveth[i],
                "Class_B_LTV": eighth[i],
                "Class_A_DSCR": ninth[i],
                "Class_B_DSCR": tenth[i],
                "project_id":data5[0].project[i].project_id
            }

            projVal.push(sample)
        }

        // console.log(projVal)

        var output = {

            msg: "Project Valuation",
            projVal: projVal
        }

        lastCalArray.push(output)

        // console.log(data3)

        var price14 = data3[1].constructionUses[0].price;
        var price15 = data3[1].constructionUses[1].price;
        var price16 = data3[1].constructionUses[2].price;

        var price17 = (price14 + price15 + price16).toFixed(2)/1;

        // console.log(data1[1].projcalc.Units)

        var sample4 = {

            "Traditional_Re_Adjust": "Purchase Price",
            "Cost": price14,
            "percentage": ((price14/price17)*100).toFixed(2)/1,
            "Yield": (price14 / data1[1].projcalc.Units).toFixed(2)/1,
            "project_id": sample.project_id
            
        }

        trreadjst.push(sample4)

        var sample4 = {

            "Traditional_Re_Adjust": "Renovation Costs",
            "Cost": price15,
            "percentage": ((price15 / price17) * 100).toFixed(2) / 1,
            "Yield": (price15 / data1[1].projcalc.Units).toFixed(2) / 1,
            "project_id": sample.project_id

        }

        trreadjst.push(sample4)

        var sample4 = {

            "Traditional_Re_Adjust": "Soft Costs",
            "Cost": price16,
            "percentage": ((price16 / price17) * 100).toFixed(2) / 1,
            "Yield": (price16 / data1[1].projcalc.Units).toFixed(2) / 1,
            "project_id": sample.project_id

        }

        trreadjst.push(sample4)

        var sample4 = {

            "Traditional_Re_Adjust": "Developer Fee",
            "Cost": 0,
            "percentage": ((0 / price9) * 100).toFixed(2) / 1,
            "Yield": (0 / data1[1].projcalc.Units).toFixed(2) / 1,
            "project_id": sample.project_id

        }

        trreadjst.push(sample4)

        var sample4 = {

            "Traditional_Re_Adjust": "Total",
            "Cost": price17,
            "percentage": ((price17 / price17) * 100).toFixed(2) / 1,
            "Yield": (price17 / data1[1].projcalc.Units).toFixed(2) / 1,
            "project_id": sample.project_id

        }

        trreadjst.push(sample4)

        // console.log(trreadjst)

        var output = {

            msg: "Traditional Re-Adjust",
            trreadjst: trreadjst
        }

        lastCalArray.push(output)

        var price18 = (Math.max((capStack[3].price - data3[1].constructionUses[3].price), ((data2[2].pbdata[13].Cost + data2[2].pbdata[14].Cost)*0.1)).toFixed(2))/1

        var sample5 = {

            "Sponsor_Equity_Adjust": "Equity Adjust",
            "price": price18,
            "percentage": ((price18 == "No Deal" ? price18 : price18/data3[1].constructionUses[4].price)*100).toFixed(2)/1,
            "Yield": price18 == "No Deal" ? price18 : 0
        }

        spnsEqtyAdjst.push(sample5)

        var sample5 = {

            "Sponsor_Equity_Adjust": "Total Project Size",
            "price": data2[2].pbdata[13].Level_of_Repair == "Traditional" ? price17 : (data3[1].constructionUses[4].price.toFixed(2))/1,
            "percentage": 0,
            "Yield": 0
        }

        spnsEqtyAdjst.push(sample5)

        // console.log(spnsEqtyAdjst)

        var output = {

            msg: "Sponsor Equity Adjust",
            spnsEqtyAdjst: spnsEqtyAdjst
        }

        lastCalArray.push(output)

        // console.log(data[7].fnSurpls)
        var sample6 = {

            "Tax_Credit_4": "Financing Surplus?",
            "Result": data[7].fnSurpls
        }

        data6[0].tax4.push(sample6)

        var output = {

            msg: "Tax Credit4%",
            tax4: data6[0].tax4
        }

        lastCalArray.push(output)

        // console.log(data6)

        return lc(lastCalArray)
    })
   

}

module.exports = lastCalc;