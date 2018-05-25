var ConsDebt = {};

var ConPeriodCashFlowSchema = require("mongoose").model("ConPeriodCashFlow");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");

ConsDebt.cal = (data, data1, data2, data3, data4, cd) => {

    // console.log(data[0])
    // console.log(data1[6])
    // console.log(data4)
    adminEditVHModelSchema.findOne({"project_id": data4[0].cashPeriodData[0].project_id}, function(err, adminobj) {

        if(err) console.log(err)

        // console.log(adminobj.Con_Debt)

        var a=0;
        var b=0;
        adminobj.Con_Debt.forEach(function(value) {

            // console.log(value)
            if(value.Con_Debt == "Rate") {

                a = parseFloat(value.Input)/100
            }
            if(value.Con_Debt == "Margin") {

                b = parseFloat(value.Input)/100
            }

        })
        // console.log("acondebt", a)
        // console.log("acondebt", b)
    

    var condebt = [];
    var ConDbt = [];
    var fifth = [];
    var sixth = [];
    var seventh = [];
    var conPeriodArray = [];

    // var a = (parseFloat(data1[6].conDebt[1].Input))/100
    // var b = (parseFloat(data1[6].conDebt[2].Input))/100
    var c = data2[2].pbdata[16].Cost
    // console.log(c)
    // console.log(a,b )

    var sample = {

        "Cons_Debt": "Rate",
        "Result": ((a+b)*100).toFixed(2)/1,
        "project_id": data4[0].cashPeriodData[0].project_id
    }
    condebt.push(sample)

    var sample = {

        "Cons_Debt": "Max Loan Based on LTC",
        "Result": (((parseFloat(data1[6].conDebt[4].Input))/100)*c).toFixed(2)/1,
        "project_id": data4[0].cashPeriodData[0].project_id
    }
    condebt.push(sample)

    var sample = {

        "Cons_Debt": "Max Loan Based on Perm",
        "Result": data[0].subDebt[7].Result + data3[0].seniorDebt[7].Result,
        "project_id": data4[0].cashPeriodData[0].project_id
    }

    condebt.push(sample)

    var sample = {

        "Cons_Debt": "Tax Exempt Cons. Loan",
        "Result": Math.min(condebt[1].Result, condebt[2].Result),
        "project_id": data4[0].cashPeriodData[0].project_id
    }
    
    condebt.push(sample)

    ConPeriodCashFlowSchema.find({}, function(err, cashobj) {

        if(err) console.log(err)

        


        // console.log(cashobj)
        cashobj.forEach(function(value){

            

            if(value.Con_Period_Cash_Flows == "Closing")
                {
                    fifth.push(data2[2].pbdata[12].Cost)
                    sixth.push(0)
                    seventh.push(data2[0].sceData[5].Cost)
                }

            var logic = data1[3].Stabilization[4].Input == "Fund at Close";
            var val1 = data2[2].pbdata[11].Cost + data2[2].pbdata[14].Cost + data2[2].pbdata[15].Cost
            var val2 = fifth[0] + val1
 
            if(value.Con_Period_Cash_Flows == 1)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
                // console.log(result)
                fifth.push(result.toFixed(2)/1)
                sixth.push((fifth[1]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                seventh.push(seventh[0] - sixth[1] + data4[0].cashPeriodData[1].Net_Operating_Income)

                }
            if(value.Con_Period_Cash_Flows == 2)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                sixth.push((fifth[2]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                seventh.push((seventh[1] - sixth[2] + data4[0].cashPeriodData[2].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == 3)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))               
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                sixth.push((fifth[3]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                seventh.push((seventh[2] - sixth[3] + data4[0].cashPeriodData[3].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == 4)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[4]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[3] - sixth[4] + data4[0].cashPeriodData[4].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == 5)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[5]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[4] - sixth[5] + data4[0].cashPeriodData[5].Net_Operating_Income).toFixed(2)/1)

                }
            if(value.Con_Period_Cash_Flows == 6)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                sixth.push((fifth[6]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                seventh.push((seventh[5] - sixth[6] + data4[0].cashPeriodData[6].Net_Operating_Income).toFixed(2)/1)

                }
            if(value.Con_Period_Cash_Flows == 7)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[7]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[6] - sixth[7] + data4[0].cashPeriodData[7].Net_Operating_Income).toFixed(2)/1)

                }
            if(value.Con_Period_Cash_Flows == 8)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[8]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[7] - sixth[8] + data4[0].cashPeriodData[8].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == 9)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[9]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[8] - sixth[9] + data4[0].cashPeriodData[9].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == 10)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[10]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[9] - sixth[10] + data4[0].cashPeriodData[10].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == 11)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[11]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[10] - sixth[11] + data4[0].cashPeriodData[11].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == 12)
                {
                
                var val3 = fifth[0] + Math.min(((value.Con_Period_Cash_Flows/parseFloat(data1[3].Stabilization[1].Input)) * val1), (condebt[3].Result - fifth[0]))
                
                var result = logic ? val2 : val3
              
                fifth.push(result.toFixed(2)/1)
                 sixth.push((fifth[12]*((condebt[0].Result/100)/12)).toFixed(2)/1)
                  seventh.push((seventh[11] - sixth[12] + data4[0].cashPeriodData[12].Net_Operating_Income).toFixed(2)/1)
                }
            if(value.Con_Period_Cash_Flows == "Total")
                {
                var c = sixth.reduce(function(accumulator, currentValue) {
                           return accumulator + currentValue;
                })
          
                 sixth.push(c)
                }
            
            
        })
  
        
        for(var i=0; i<cashobj.length; i++) {
        
            var sample = {

                "Con_Period_Cash_Flows": data4[0].cashPeriodData[i].Con_Period_Cash_Flows,
                "Placed_in_Service_percentage":data4[0].cashPeriodData[i].Placed_in_Service_percentage,
                "Base_Rental_Revenue": data4[0].cashPeriodData[i].Base_Rental_Revenue,
                "Operating_Expenses": data4[0].cashPeriodData[i].Operating_Expenses,
                "Net_Operating_Income": data4[0].cashPeriodData[i].Net_Operating_Income,
                "Construction_Draw": fifth[i],
                "Interest_Charge": sixth[i].toFixed(2)/1,
                "Interest_Reserves_Deficit": seventh[i],
                "project_id": data4[0].cashPeriodData[i].project_id
            }

            conPeriodArray.push(sample)
        }

        //  console.log(conPeriodArray)

         
         var output = {

             msg: "ConDebt Data",
             condebt: condebt
         }
         ConDbt.push(output)

         var output = {

            msg: "Con.Period Cash Flows",
            conPeriodArray: conPeriodArray
         }

         ConDbt.push(output)
    

         return cd(ConDbt)
    })
   


    // console.log(condebt)
    })
    
}

module.exports = ConsDebt;

