var TaxCredit4 = {};

var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

TaxCredit4.cal = (data, data1, data3, data4, tc) => {
    
    var ab = 0;
    var cd = 0;
    var ef = 0;

    
    var tax = [];
    var tax4 = [];
    var txCredit4 = [];

    var sample = {

        "Tax_Credit_4" : "Project Basis",
        "Result": (data1[2].pbdata[16].Cost).toFixed(2)/1
    }
    tax.push(sample)

    var a = data3[5].financeScenario[0].Input == "Yes" ? tax[0].Result*1.3 : tax[0].Result;

    // console.log(a)
    var sample = {

        "Tax_Credit_4" : "Adjusted Project Basis",
        "Result": a
    }
    tax.push(sample)


    
adminEditVHModelSchema.findOne({ "project_id": data4[1].projcalc.project_id}, function(err, adminobj) {


    if(err) console.log(err)


        // console.log(adminobj.TaxCredit4)
        adminobj.TaxCredit4.forEach(function(value) {

            // console.log(value)
            if(value.Tax_Credit_Four_Percent == "Excluded Basis in %") {

                ab = value.Result

                
            }
            if(value.Tax_Credit_Four_Percent == "LIHTC Rate in %") {

                cd = value.Result

            }
        })

        
        var sample = {

            "Tax_Credit_4": "Excluded Basis",
            "Result": ab
        }
        tax.push(sample)


        var sample = {

            "Tax_Credit_4": "LIHTC Rate",
            "Result": cd
        }
        tax.push(sample)

        var ef = (tax[1].Result * (1 - (tax[2].Result / 100))).toFixed(2) / 1;

        var sample = {

            "Tax_Credit_4": "Qualified Basis",
            "Result": (tax[1].Result * (1 - (tax[2].Result / 100))).toFixed(2) / 1
        }
        tax.push(sample)

        adminEditVHModelSchema.update({ "project_id": data4[1].projcalc.project_id, "TaxCredit4.Tax_Credit_Four_Percent": "Qualified Basis" }, { $set: { "TaxCredit4.$.Result": ef } }, function (err, updobj) {

            if (err) console.log(err)

            // console.log("updated")
            console.log(updobj)
        })


        var sample = {

        "Tax_Credit_4" : "TC Reservation",
        "Result": (tax[4].Result * (tax[3].Result/100)).toFixed(2)/1
    }
    tax.push(sample)

    var gh = 0;

    adminobj.Financing_Scenario.forEach(function(value1) {

        if(value1.Financing_Scenario == "Tax Credit Yield") {

            gh = parseFloat(value1.Input)/100
        }
        //  console.log("gh", gh)
    })
    var rate = gh
    var nper = 10
    var pmt = tax[5].Result

    var PV = Math.round(pmt / rate * (1 - Math.pow(1 + rate, -nper))    )

    // console.log("PV", PV)

    // console.log(-(PV))
    // console.log(PV)
    if (PV.toString().length == 3 || PV.toString().length == 4) {
        var c = PV % 10;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_4": "Tax Credit Equity",
            "Result": d
        }
        tax.push(sample)
    }

    else if (PV.toString().length == 5) {
        var c = PV % 100;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_4": "Tax Credit Equity",
            "Result": d
        }
        tax.push(sample)
    }
    else if (PV.toString().length == 6) {
        var c = PV % 1000;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_4": "Tax Credit Equity",
            "Result": d
        }
        tax.push(sample)
    }
    else if (PV.toString().length == 7) {
        var c = PV % 10000;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_4": "Tax Credit Equity",
            "Result": d
        }
        tax.push(sample)
    }
    else {
        var c = PV % 100000;
        var d = PV - c;
        //  console.log(d);
        var sample = {

            "Tax_Credit_4": "Tax Credit Equity",
            "Result": d
        }
        tax.push(sample)
    }

      
    // console.log(tax)

    var sample = {

        "Tax_Credit_4" : "Tax Credit Pricing",
        "Result": (((tax[6].Result /10) / (tax[5].Result)).toFixed(2)/1)
    }
    tax.push(sample)
    
    var output = {

        msg: "Tax Credit 4% data",
        tax4: tax
    }
    txCredit4.push(output)

    return tc(txCredit4)

    
    // console.log(tax)
})
}

module.exports = TaxCredit4;