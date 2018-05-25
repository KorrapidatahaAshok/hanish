var SubDebt = {};
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

SubDebt.cal = (data3, data1, data2, data, data4, sb) => {

    // console.log(data3)
    var subDebt = [];
    var subDbt = [];

    var ab = 0;
    var cd = 0;
    var ef = 0;
    var gh = 0;
    var ij = 0;


    adminEditVHModelSchema.findOne({"project_id":data4[1].projcalc.project_id},function(err,obj){

        if(err) console.log(err)

            //    console.log(obj.Sub_Debt)

        obj.Sub_Debt.forEach(function(value){

            // console.log(value)
            if(value.Sub_Debt == "LTV"){

                ab = parseFloat(value.Parameters)
            }
            if(value.Sub_Debt == "DSCR") {

                cd = parseFloat(value.Parameters)

            }
            if(value.Sub_Debt == "Amort.") {

                ef = parseFloat(value.Parameters)

            }
            if(value.Sub_Debt == "Loan Rate") {

                gh = parseFloat(value.Parameters)

            }
            if(value.Sub_Debt == "Allow Sub Debt") {

                ij = parseFloat(value.Parameters)

            }
        })

    // console.log(data2[8].subDebt[7].Parameters)
  
    // console.log(data3[0].seniorDebt[7].Result)
    // console.log(data[0].project[1].Value_Based_on_per_Cap_Rate)
    // console.log(parseFloat(data2[7].subDebt[0].Parameters))

    var sample = {

        "Sub_Debt": "Stabilized Valuation",
        "Result": (data[0].project[1].Value_Based_on_per_Cap_Rate).toFixed(2)/1
    }
    subDebt.push(sample)

    var sample = {

        "Sub_Debt": "Max Loan Based on LTV",
        "Result": ((subDebt[0].Result*(ab/100)) - data3[0].seniorDebt[7].Result).toFixed(2)/1
    }
    subDebt.push(sample)
    var sample = {

        "Sub_Debt": "Net Operating Income",
        "Result": (data1[0].opIncome[1].Total_Net_Operating_Income).toFixed(2)/1
    }
    subDebt.push(sample)
    var sample = {

        "Sub_Debt": "NOI for Debt Cover",
        "Result": (subDebt[2].Result / cd).toFixed(2)/1
    }
    subDebt.push(sample)

    var sample = {

        "Sub_Debt": "Amortization",
        "Result": ef*12
    }
    subDebt.push(sample)
    var sample = {

        "Sub_Debt": "Interest Rate",
        "Result": gh 
    }
    subDebt.push(sample)
  
   var rate = (subDebt[5].Result/100)/12
   var nper = subDebt[4].Result
   var pmt = ((-(subDebt[3].Result) + data3[0].seniorDebt[3].Result)/12)

    var PV = -(pmt / rate * (1 - Math.pow(1 + rate, -nper)))
    // console.log(PV)

     var sample = {

        "Sub_Debt": "Max Loan Based on DSCR",
        "Result": (PV.toFixed(2)/1)
    }
    
    subDebt.push(sample)

    if( ij == 0) {

        var sample = {

            "Sub_Debt": "Sub Tax-Exempt PB",
            "Result": 0
        }

        subDebt.push(sample)
    }
    else {

    var a = Math.round(Math.min(subDebt[6].Result, subDebt[1].Result))

    if (a.toString().length == 3 || a.toString().length == 4) {
        var c = a % 100;
        var d = a - c;
        //  console.log(d);
        var sample = {

            "Sub_Debt": "Sub Tax-Exempt PB",
            "Result": d
        }

        subDebt.push(sample)
    }

    else if (a.toString().length == 5 || a.toString().length == 6 || a.toString().length == 7 || a.toString().length == 8) {
        var c = a % 1000;
        var d = a - c;
        //  console.log(d);
        var sample = {

            "Sub_Debt": "Sub Tax-Exempt PB",
            "Result": d
        }

        subDebt.push(sample)
    }
    // else if (a.toString().length == 6) {
    //     var c = a % 1000;
    //     var d = a - c;
    //     //  console.log(d);
    //     var sample = {

    //         "Sub_Debt": "Sub Tax-Exempt PB",
    //         "Result": d
    //     }

    //     subDebt.push(sample)
    // }
    // else if (a.toString().length == 7) {
    //     var c = a % 1000;
    //     var d = a - c;
    //     //  console.log(d);
    //     var sample = {

    //         "Sub_Debt": "Sub Tax-Exempt PB",
    //         "Result": d
    //     }

    //     subDebt.push(sample)
    // }
    // else if (a.toString().length == 8) {
    //     var c = a % 1000;
    //     var d = a - c;
    //     //  console.log(d);
    //     var sample = {

    //         "Sub_Debt": "Sub Tax-Exempt PB",
    //         "Result": d
    //     }

    //     subDebt.push(sample)
    // }
    }
   

    //  console.log(subDebt)
    var output = {

        msg: "Sub Debt data",
        subDebt: subDebt
    }
    subDbt.push(output)

    // console.log(subDbt)
    
    return sb(subDbt)
    })
}

module.exports = SubDebt;