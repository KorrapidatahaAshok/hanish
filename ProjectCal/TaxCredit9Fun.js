var TaxCredit9 = {};

var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

TaxCredit9.cal = (data, data1, data2, tx9) => {

    var gh = 0;
    var hi = 0;

    adminEditVHModelSchema.findOne({"project_id":data2[1].projcalc.project_id}, function(err, adminobj) {

        if(err) console.log(err)
    

    adminobj.Financing_Scenario.forEach(function(value1) {

        
        if(value1.Financing_Scenario == "Basis Boost?") {

            hi = value1.Input
        }

        if(value1.Financing_Scenario == "Tax Credit Yield") {

            gh = parseFloat(value1.Input)/100
        }
    })

    var tax9 = [];
    var taxCredit9 = [];

    // console.log(data)

    var sample = {

        "Tax_Credit_9": "Project Basis",
        "Result": data[0].tax4[0].Result
    }
    tax9.push(sample)

    var a = hi == "Yes" ? tax9[0].Result*1.3 : tax9[0].Result;

    var sample = {

        "Tax_Credit_9": "Adjusted Project Basis",
        "Result": a
    }
    tax9.push(sample)

    var sample = {

        "Tax_Credit_9": "Excluded Basis",
        "Result": data[0].tax4[2].Result
    }
    tax9.push(sample)

    var sample = {

        "Tax_Credit_9": "LIHTC Rate",
        "Result": 9
    }
    tax9.push(sample)

    var sample = {

        "Tax_Credit_9": "Qualified Basis",
        "Result": (data[0].tax4[4].Result).toFixed(2)/1
    }
    tax9.push(sample)

    var sample = {

        "Tax_Credit_9": "TC Reservation",
        "Result": (tax9[4].Result * (tax9[3].Result/100)).toFixed(2)/1
    }
    tax9.push(sample)

    var rate = gh
    var nper = 10
    var pmt = tax9[5].Result

    var PV = Math.round(pmt / rate * (1 - Math.pow(1 + rate, -nper))    )

    // console.log(-(PV))
    // console.log(PV)
    if (PV.toString().length == 3 || PV.toString().length == 4) {
        var c = PV % 10;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_9": "Tax Credit Equity",
            "Result": d
        }
        tax9.push(sample)
    }
    else if (PV.toString().length == 5) {
        var c = PV % 100;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_9": "Tax Credit Equity",
            "Result": d
        }
        tax9.push(sample)
    }
    else {
        var c = PV % 1000;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_9": "Tax Credit Equity",
            "Result": d
        }
        tax9.push(sample)
    }
    // else if (PV.toString().length == 7) {
    //     var c = PV % 1000;
    //     var d = PV - c;
    //     //  console.log(d);
    //     var sample = {

    //         "Tax_Credit_9": "Tax Credit Equity",
    //         "Result": d
    //     }
    //     tax9.push(sample)
    // }
    // else if (PV.toString().length == 8) {
    //     var c = PV % 1000;
    //     var d = PV - c;
    //     //  console.log(d);
    //     var sample = {

    //         "Tax_Credit_9": "Tax Credit Equity",
    //         "Result": d
    //     }
    //     tax9.push(sample)
    // }

    var sample = {

        "Tax_Credit_9" : "Tax Credit Pricing",
        "Result": (((tax9[6].Result /10) / (tax9[5].Result)).toFixed(2)/1)
    }
    tax9.push(sample)
    // console.log(tax9)

    var output = {

        msg: "Tax Credit 9%",
        tax9: tax9
    }
taxCredit9.push(output)
return tx9(taxCredit9)
    })
}

module.exports = TaxCredit9;