var SeniorDebt = {};
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

SeniorDebt.cal = (data, data1, data2, data3, sb) => {

     var seniorDebt = [];
    var snrDbt = [];

    var ab = 0;
    var cd = 0;
    var ef = 0;
    var gh = 0;

    adminEditVHModelSchema.findOne({"project_id":data3[1].projcalc.project_id},function(err,obj){

        if(err) console.log(err)

            //    console.log(obj.Senior_Debt)

        obj.Senior_Debt.forEach(function(value){

            // console.log(value)
            if(value.Senior_Debt == "LTV"){

                ab = parseFloat(value.Parameters)
            }
            if(value.Senior_Debt == "DSCR") {

                cd = parseFloat(value.Parameters)

            }
            if(value.Senior_Debt == "Amort.") {

                ef = parseFloat(value.Parameters)

            }
            if(value.Senior_Debt == "Loan Rate") {

                gh = parseFloat(value.Parameters)

            }
        })
        // console.log("ab", ab)       
    

    // console.log(data)
   
    // console.log(data[0].project[1].Value_Based_on_per_Cap_Rate)
    // console.log(parseFloat(data2[7].seniorDebt[0].Parameters))

    var sample = {

        "Senior_Debt": "Stabilized Valuation",
        "Result": (data[0].project[1].Value_Based_on_per_Cap_Rate).toFixed(2)/1
    }
    seniorDebt.push(sample)

    var sample = {

        "Senior_Debt": "Max Loan Based on LTV",
        "Result": (seniorDebt[0].Result*(ab/100)).toFixed(2)/1
    }
    seniorDebt.push(sample)
    var sample = {

        "Senior_Debt": "Net Operating Income",
        "Result": (data1[0].opIncome[1].Total_Net_Operating_Income).toFixed(2)/1
    }
    seniorDebt.push(sample)
    var sample = {

        "Senior_Debt": "NOI for Debt Cover",
        "Result": (seniorDebt[2].Result / cd).toFixed(2)/1
    }
    seniorDebt.push(sample)

    var sample = {

        "Senior_Debt": "Amortization",
        "Result": ef*12
    }
    seniorDebt.push(sample)
    var sample = {

        "Senior_Debt": "Interest Rate",
        "Result": gh 
    }
    seniorDebt.push(sample)
  
   var rate = (seniorDebt[5].Result/100)/12
   var nper = seniorDebt[4].Result
   var pmt = (seniorDebt[3].Result/12)

    var PV = (pmt / rate * (1 - Math.pow(1 + rate, -nper)))
    // console.log(PV)
    
     var sample = {

        "Senior_Debt": "Max Loan Based on DSCR",
        "Result": PV.toFixed(2)/1
    }
    
    seniorDebt.push(sample)

    var a = Math.round(Math.min(seniorDebt[6].Result, seniorDebt[1].Result))

     if (a.toString().length == 3 || a.toString().length == 4) {
        var c = a % 10;
        var d = a - c;
        //  console.log(d);
        var sample = {

            "Senior_Debt": "Senior Tax-Exempt PB",
            "Result": d
        }

        seniorDebt.push(sample)
    }

    if (a.toString().length == 5) {
        var c = a % 100;
        var d = a - c;
        //  console.log(d);
        var sample = {

            "Senior_Debt": "Senior Tax-Exempt PB",
            "Result": d
        }

        seniorDebt.push(sample)
    }

    if (a.toString().length == 6 || a.toString().length == 7 || a.toString().length == 8 ) {
        var c = a % 1000;
        var d = a - c;
        //  console.log(d);
        var sample = {

            "Senior_Debt": "Senior Tax-Exempt PB",
            "Result": d
        }

        seniorDebt.push(sample)
    }

    // else if (a.toString().length == 7) {
    //     var c = a % 1000;
    //     var d = a - c;
    //     //  console.log(d);
    //     var sample = {

    //         "Senior_Debt": "Senior Tax-Exempt PB",
    //         "Result": d
    //     }

    //     seniorDebt.push(sample)
    // }

    // else if (a.toString().length == 8) {
    //     var c = a % 1000;
    //     var d = a - c;
    //     //  console.log(d);
    //     var sample = {

    //         "Senior_Debt": "Senior Tax-Exempt PB",
    //         "Result": d
    //     }

    //     seniorDebt.push(sample)

        
    // }
// console.log(seniorDebt)

  
    // console.log(seniorDebt)
    var output = {

        msg: "Senior Debt data",
        seniorDebt: seniorDebt
    }
    snrDbt.push(output)

    return sb(snrDbt)
    })
}


module.exports = SeniorDebt;