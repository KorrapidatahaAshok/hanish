var conPeriodFun = {};
var stabilizationSchema = require("mongoose").model("stabilization");
var ConPeriodCashFlowSchema = require("mongoose").model("ConPeriodCashFlow");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

conPeriodFun.cal = (data, data1, data2, cp) => {

    // console.log("data", data)
    // console.log(data1)
    // console.log(data2)
   
    var cashPeriodData = [];
    var conPeriodData = [];
    var closing = [];
    var first = [];
    var second = [];
    var third = [];
    var fourth = [];
   


    ConPeriodCashFlowSchema.find({}, function(err, cashobj) {
        if(err) console.log(err)
        
        stabilizationSchema.findOne({"Stabilization":"Construction Period"}, function(err, stabobj1){
            if(err) console.log(err) 
             
            var a = parseFloat(stabobj1.Input)
            
            stabilizationSchema.findOne({"Stabilization":"Lease-Up Period"}, function(err, stabobj2){

                if(err) console.log(err)
                  
                var b = parseFloat(stabobj2.Input)

                adminEditVHModelSchema.findOne({"project_id": data2[1].projcalc.project_id}, function(err, adminobj){

                     var ab = 0;
                    if(err) console.log(err)

                        // console.log(adminobj.OpAssumptions)
                    adminobj.OpAssumptions.forEach(function(value1) {

                        if(value1.Op_Assumptions == "OpEx Rate") {

                            ab = parseFloat(value1.Input)/100
                        }
                    })
                    // console.log("ab", ab)

            
                // console.log(a, b)
                // console.log(data1[2].pbdata[12].Cost)
                // console.log(data1[0].sceData[5].Cost)
                
                cashobj.forEach(function(value) {
                    // console.log(value)
                    if(value.Con_Period_Cash_Flows == "Closing") {
                        first.push(0)
                        second.push(0)
                        third.push(0)
                        fourth.push(0)
                        // closing.push(data1[2].pbdata[12].Cost)                   
                        // closing.push(data1[0].sceData[5].Cost)
                    }
                    if(value.Con_Period_Cash_Flows == 1) {

                        var c = (value.Con_Period_Cash_Flows - a + 1)/b
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (Math.min(d, 1))*100
                        first.push(e)
                        second.push(first[1]*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[1]*ab)
                        fourth.push(second[1]-third[1])
                    }
                    if(value.Con_Period_Cash_Flows == 2) {

                        var c = (value.Con_Period_Cash_Flows - a + 1)/b
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (Math.min(d, 1))*100
                        first.push(e)
                        second.push((first[2]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[2]*ab)
                        fourth.push(second[2]-third[2])
                    }
                    if(value.Con_Period_Cash_Flows == 3) {

                        var c = (value.Con_Period_Cash_Flows - a + 1)/b
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (Math.min(d, 1))*100
                        first.push(e)
                        second.push((first[3]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[3]*ab)
                        fourth.push(second[3]-third[3])
                    }
                    if(value.Con_Period_Cash_Flows == 4) {

                        var c = (value.Con_Period_Cash_Flows - a + 1)/b
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (Math.min(d, 1))*100
                        first.push(e)
                        second.push((first[4]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[4]*ab)
                        fourth.push(second[4]-third[4])
                    }
                    if(value.Con_Period_Cash_Flows == 5) {

                        var c = (value.Con_Period_Cash_Flows - a + 1)/b
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (Math.min(d, 1))*100
                        first.push(e)
                        second.push((first[5]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[5]*ab)
                        fourth.push(second[5]-third[5])
                    }
                    if(value.Con_Period_Cash_Flows == 6) {

                        var c = (value.Con_Period_Cash_Flows - a + 1)/b
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (Math.min(d, 1))*100
                        first.push(e)
                        second.push((first[6]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[6]*ab)
                        fourth.push(second[6]-third[6])
                    }
                    if(value.Con_Period_Cash_Flows == 7) {

                        var c = (value.Con_Period_Cash_Flows - a + 1)/b
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (Math.min(d, 1))*100
                        first.push(e)
                        second.push((first[7]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[7]*ab)
                        fourth.push(second[7]-third[7])
                    }
                    if(value.Con_Period_Cash_Flows == 8) {

                        var c = ((value.Con_Period_Cash_Flows - a + 1)/b)
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(c,d)
                        var e = (Math.min(d, 1))*100

                        first.push(e)
                        second.push((first[8]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[8]*ab)
                        fourth.push(second[8]-third[8])
                    }
                    if(value.Con_Period_Cash_Flows == 9) {

                        var c = ((value.Con_Period_Cash_Flows - a + 1)/b)
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (((Math.min(d, 1))*100).toFixed(2)/1)
                        first.push(e)
                        second.push((first[9]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[9]*ab)
                        fourth.push(second[9]-third[9])
                    }
                    if(value.Con_Period_Cash_Flows == 10) {

                        var c = ((value.Con_Period_Cash_Flows - a + 1)/b)
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (((Math.min(d, 1))*100).toFixed(2)/1)
                        first.push(e)
                        second.push((first[10]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[10]*ab)
                        fourth.push(second[10]-third[10])
                    }
                    if(value.Con_Period_Cash_Flows == 11) {

                        var c = ((value.Con_Period_Cash_Flows - a + 1)/b)
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (((Math.min(d, 1))*100).toFixed(2)/1)
                        first.push(e)
                        second.push((first[11]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[11]*ab)
                        fourth.push(second[11]-third[11])
                    }
                    if(value.Con_Period_Cash_Flows == 12) {

                        var c = ((value.Con_Period_Cash_Flows - a + 1)/b)
                        var d = value.Con_Period_Cash_Flows < a ? 0 : c
                        // console.log(d)
                        var e = (((Math.min(d, 1))*100).toFixed(2)/1)
                        first.push(e)
                        second.push((first[12]/100)*data2[0].homeType[11].Rent_Monthly)
                        third.push(second[12]*ab)
                        fourth.push(second[12]-third[12])
                    }
                    if(value.Con_Period_Cash_Flows == "Total") {

                        var c = second.reduce(function(accumulator, currentValue) {
                           return accumulator + currentValue;
                        })
                        var d = third.reduce(function(accumulator, currentValue) {
                           return accumulator + currentValue;
                        })
                        var e = fourth.reduce(function(accumulator, currentValue) {
                           return accumulator + currentValue;
                        })
                        second.push(c)
                        third.push(d)
                        fourth.push(e)
                    }
                })
                // console.log(closing)
                // console.log(first)
                // console.log(second)
                // console.log(third)
                // console.log(fourth)
                for(var i=0; i<cashobj.length; i++) {

                    var sample = {

                        "Con_Period_Cash_Flows": cashobj[i].Con_Period_Cash_Flows,
                        "Placed_in_Service_percentage": first[i],
                        "Base_Rental_Revenue": second[i],
                        "Operating_Expenses": third[i],
                        "Net_Operating_Income": fourth[i],
                        "project_id": data2[1].projcalc.project_id
                    }
                    cashPeriodData.push(sample)
                }
                var output = {

                    msg: "Con.Period cash Flows",
                    cashPeriodData: cashPeriodData
                }

                conPeriodData.push(output)
            
                // console.log(conPeriodData)
                 return cp(conPeriodData)
                
            })
            })
        })
            // console.log(cashobj)
            
    })
 
}

module.exports = conPeriodFun;