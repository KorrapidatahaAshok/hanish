var SourcesFun = {};

var irrnpv = require('irr-npv')

var reversionAnalysisSchema = require("mongoose").model("reversionAnalysis");
var finEliminationSchema = require("mongoose").model("finEliminationProfile");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");


SourcesFun.cal = (data, data1, data2, data3, data4, data5, data6, data7, data8, sf) => {

    var ab = 0;
    var cd = 0;
    var ef = 0;
    var gh = 0;
    var x = 0;


    adminEditVHModelSchema.findOne({"project_id":data3[1].projcalc.project_id}, function(err, adminobj) {

        if(err) console.log(err)

            // console.log(adminobj.Sub_Debt)

            adminobj.Senior_Debt.forEach(function(value) {

                if(value.Senior_Debt == "Loan Rate") {

                    ab = parseFloat(value.Parameters)/100
                }
                if(value.Senior_Debt == "Amort.") {

                    cd = parseFloat(value.Parameters)
                }
            })

            adminobj.Sub_Debt.forEach(function(value2) {

                if(value2.Sub_Debt == "Loan Rate") {

                    ef = parseFloat(value2.Parameters)/100
                }
                if(value2.Sub_Debt == "Amort.") {

                    gh = parseFloat(value2.Parameters)
                }
            })
    

    var trarray = [];
    var sources = [];
    var DeveloperFee = []; 
    var finElimination = [];
    var LIHTC = [];
    var first =[];
    var second=[];
    var third = [];
    var fourth1 = [];
    var obj = {};
    var permCapStk = [];

    
    // console.log(data3[1].projcalc.Developer_Fee)
    // console.log( data4[1].dfData[0].Cost)
    // console.log(data4[1].dfData[1].Cost)
    // console.log(data8[7].seniorDebt[5].Parameters)
   
    var sample1 = {

        "Developer_Fee": "Closing Dev. Fee",
        "Input": data4[1].dfData[0].Cost,
    }
    DeveloperFee.push(sample1)

    var sample1 = {
        "Developer_Fee": "Def Dev. Fee",
        "Input": data4[1].dfData[1].Cost
    }
    DeveloperFee.push(sample1)

    var output = {
        msg: "Developer Fee",
        DeveloperFee:DeveloperFee
    }

    trarray.push(output)

    // var b = Math.max(0,  data4[2].pbdata[16].Cost - sources[0].Sources - sources[1].Sources - sources[2].Sources)
    // console.log(b)
    
    // console.log(data8[2].LIHTC[3].Input)
    //LIHTC Data - Dashboard Tab
    var value1 =  (data1[0].condebt[3].Result / data4[2].pbdata[16].Cost) > 0.5 ? 1 : 0;

    var sample2 = {

        "LIHTC_Eligibility": data8[2].LIHTC[0].LIHTC_Eligibility,
        "Input": Math.round(data8[2].LIHTC[0].Input),
        "project_id": data8[2].LIHTC[0].project_id
    }
    LIHTC.push(sample2)

    var sample2 = {

        "LIHTC_Eligibility": data8[2].LIHTC[1].LIHTC_Eligibility,
        "Input": (data8[2].LIHTC[1].Input).toFixed(2)/1,
        "project_id": data8[2].LIHTC[1].project_id
    }
    LIHTC.push(sample2)

    var sample2 = {

        "LIHTC_Eligibility": data8[2].LIHTC[2].LIHTC_Eligibility,
        "Input": data8[2].LIHTC[2].Input,
        "project_id": data8[2].LIHTC[2].project_id
    }
    LIHTC.push(sample2)

    var sample2 = {

        "LIHTC_Eligibility": data8[2].LIHTC[3].LIHTC_Eligibility,
        "Input": value1,
        "project_id": data8[2].LIHTC[3].project_id
    }
    LIHTC.push(sample2)
    // console.log(LIHTC)

    var output = {

        msg: "LIHTC Data",
        LIHTC: LIHTC
    }

    trarray.push(output)

    // console.log(data5[0].seniorDebt[7].Result)
    var price1 = data5[0].seniorDebt[7].Result
    var price2 = data6[0].subDebt[7].Result
   
    // console.log(price1, price2)

    var sample = {

        "Perm_Capital_Stack": "Senior Term Loan",
        "price": price1,
        "Yield": data5[0].seniorDebt[7].Result
        
    }
    permCapStk.push(sample)
     var sample = {

        "Perm_Capital_Stack": "Subordinate Term Loan",
        "price": price2,
        "Yield": data6[0].subDebt[7].Result
    }
    permCapStk.push(sample)

    var output = {

        msg: "Perm Capital Stock",
        permCapStk: permCapStk
    }

    trarray.push(output)
    //Sources Tab

    var a = data3[1].projcalc.Developer_Fee == "Yes" ? DeveloperFee[1].Input : 0;

    first.push("Construction Debt", "Tax Credit Equity", "Fee Deferral", "Cash_Gap_/_Sponsor_Equity", "Structure_Available?");

    second.push(data1[0].condebt[3].Result, 0, 0)
    second.push(Math.max(0, ((data4[2].pbdata[16].Cost) - second[0] - second[1] - second[2])))
   

    third.push(data1[0].condebt[3].Result, data2[0].tax4[6].Result, a)
    third.push((Math.max(0, ((data4[2].pbdata[16].Cost) - third[0] - third[1] - third[2]))).toFixed(2)/1)
   

    obj = {
        "c": data[0].tax9[6].Result,
        "b": a
    }
    var b = (Math.min(data1[0].condebt[3].Result, ((data4[2].pbdata[16].Cost) - obj.c - obj.b))).toFixed(2) / 1



    fourth1.push(b, obj.c, obj.b)
    var c = ((data4[2].pbdata[16].Cost - fourth1[0] - fourth1[1] - fourth1[2]).toFixed(2) / 1)
    fourth1.push(c.toFixed(2)/1)
  
    

    var val = -(second[3]) + (((data4[1].dfData[0].Input_in_percent)/100) * data4[0].sceData[9].Cost)
    //   console.log(data4[0].sceData[9].Cost)
    //   console.log(val)
    if (val == "err")
        {
            val = -(second[3])
        }
    else
        {
            val = val
        }

    reversionAnalysisSchema.find({}, function(err, analyobj) {

        var trrvranlys = [];
       

        var balance = [];
        var balance1 = [];
        var first1 = [];
        var second1 = [];
        var third1 = [];
        var fourth = [];
        var fifth = [];
        var sixth = [];
        var seventh = [];
        var eighth = [];
        var ninth = [];
        var tenth = [];
        var eleventh = [];
        var twelth=[];
        var thirteenth = [];
        var fourteenth = [];
        var fifteenth = [];
        var sixteenth = [];

        if(err) console.log(err)

        // console.log(analyobj)
        analyobj.forEach(function(value) {

            if (value.Traditional_Reversion_Analysis == "Closing") {

              
                first1.push(0)
                second1.push(0)
                third1.push(0)
                fourth.push(0)
                fifth.push(0)
                sixth.push(0)
                seventh.push(0)
                eighth.push(0)
                ninth.push(0)
                tenth.push(value.Cost_of_Sale)
                eleventh.push(0)
                twelth.push(0)
                thirteenth.push(0)
                fourteenth.push(0)
                fifteenth.push(val.toFixed(2)/1)
                sixteenth.push(Math.min(fifteenth[0], ((data4[2].pbdata[13].Cost + data4[2].pbdata[14].Cost)*0.1)))

            }
            if (value.Traditional_Reversion_Analysis == 1) {
                first1.push(0)
                second1.push(0)
                third1.push(0)
                fourth.push(0)
                fifth.push(0)
                sixth.push(0)
                seventh.push(0)
                eighth.push(permCapStk[0].price - sixth[1])
                ninth.push(permCapStk[1].price - seventh[1])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(0)
                thirteenth.push(0)
                fourteenth.push(0)
                fifteenth.push(0)
                sixteenth.push(fourteenth[1] + thirteenth[1])
                
            }
            var rate = ab/12
            var nper = cd*12
            var pv = -(permCapStk[0].price)

            // console.log(rate, nper, pv)
            var pmt = rate * pv * Math.pow((1 + rate), nper) / (1 - (Math.pow((1 + rate), nper)))
            // console.log(pmt * 12)
            var a = (pmt * 12).toFixed(2)/1

            var rate1 = ef/12
            var nper1 = gh*12
            var pv1 = -(permCapStk[1].price)

            // console.log(rate, nper, pv)
            var pmt1 = rate1 * pv1 * Math.pow((1 + rate1), nper1) / (1 - (Math.pow((1 + rate1), nper1)))
            // console.log(pmt1 * 12)
            var a1 = (pmt1 * 12).toFixed(2)/1

            var rate2 = rate
            var nper2 = nper
            var pv2 = pv

            var result = rate2 * pv2 * Math.pow((1 + rate2), nper2) / (1 - (Math.pow((1 + rate2), nper2)))
            
            var rate3 = rate1
            var nper3 = nper1
            var pv3 = pv1

            var result1 = rate3 * pv3 * Math.pow((1 + rate3), nper3) / (1 - (Math.pow((1 + rate3), nper3)))
            // console.log(result1)

            if (value.Traditional_Reversion_Analysis == 2) {
               
                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })

                var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)

                first1.push(data7[0].opIncome[1].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[2] - second1[2] - third1[2]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[2])
                ninth.push(permCapStk[1].price - seventh[2])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[2] + fifth[2])
                thirteenth.push(0)
                fourteenth.push(fourth[2] + fifth[2])
               fifteenth.push(fourteenth[2])
                sixteenth.push(fourteenth[2] + thirteenth[2])

            }  
            // console.log(first1[2], second1[2], third1[2])       

            if (value.Traditional_Reversion_Analysis == 3) {
             
                pv2 = pv2 + sixth[2]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)


                pv3 = pv3 + seventh[2]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)
         
                first1.push(data7[0].opIncome[2].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[3] - second1[3] - third1[3]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[3])
                ninth.push(permCapStk[1].price - seventh[3])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[3] + fifth[3])
                thirteenth.push(0)
                fourteenth.push(fourth[3] + fifth[3])
                fifteenth.push(fourteenth[3])
                sixteenth.push(fourteenth[3] + thirteenth[3])
             
            }
            // console.log(balance)
            if (value.Traditional_Reversion_Analysis == 4) {

                pv2 = balance[0]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                
                pv3 = balance1[0]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[3].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[4] - second1[4] - third1[4]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[4])
                ninth.push(permCapStk[1].price - seventh[4])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[4] + fifth[4])
                thirteenth.push(0)
                fourteenth.push(fourth[4] + fifth[4])
                fifteenth.push(fourteenth[4])
                sixteenth.push(fourteenth[4] + thirteenth[4])
               
            }
            if (value.Traditional_Reversion_Analysis == 5) {

                 pv2 = balance[1]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                 pv3 = balance1[1]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[4].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[5] - second1[5] - third1[5]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[5])
                ninth.push(permCapStk[1].price - seventh[5])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[5] + fifth[5])
                thirteenth.push(0)
                fourteenth.push(fourth[5] + fifth[5])
                fifteenth.push(fourteenth[5])
                sixteenth.push(fourteenth[5] + thirteenth[5])
             
            }
            if (value.Traditional_Reversion_Analysis == 6) {

                pv2 = balance[2]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                 pv3 = balance1[2]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[5].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[6] - second1[6] - third1[6]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[6])
                ninth.push(permCapStk[1].price - seventh[6])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[6] + fifth[6])
                thirteenth.push(0)
                fourteenth.push(fourth[6] + fifth[6])
                fifteenth.push(fourteenth[6])
                   sixteenth.push(fourteenth[6] + thirteenth[6])
              
            }
            if (value.Traditional_Reversion_Analysis == 7) {

                pv2 = balance[3]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                  pv3 = balance1[3]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[6].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[7] - second1[7] - third1[7]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[7])
                ninth.push(permCapStk[1].price - seventh[7])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[7] + fifth[7])
                thirteenth.push(0)
                fourteenth.push(fourth[7] + fifth[7])
                fifteenth.push(fourteenth[7])
                sixteenth.push(fourteenth[7] + thirteenth[7])
            }
            if (value.Traditional_Reversion_Analysis == 8) {
                pv2 = balance[4]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                  pv3 = balance1[4]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[7].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[8] - second1[8] - third1[8]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[8])
                ninth.push(permCapStk[1].price - seventh[8])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[8] + fifth[8])
                thirteenth.push(0)
                fourteenth.push(fourth[8] + fifth[8])
                fifteenth.push(fourteenth[8])
                sixteenth.push(fourteenth[8] + thirteenth[8])
            }
            if (value.Traditional_Reversion_Analysis == 9) {

                 pv2 = balance[5]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                   pv3 = balance1[5]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[8].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[9] - second1[9] - third1[9]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[9])
                ninth.push(permCapStk[1].price - seventh[9])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[9] + fifth[9])
                thirteenth.push(0)
                 fourteenth.push(fourth[9] + fifth[9])
                fifteenth.push(fourteenth[9])
                sixteenth.push(fourteenth[9] + thirteenth[9])
            }
            if (value.Traditional_Reversion_Analysis == 10) {

                

                pv2 = balance[6]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                    pv3 = balance1[6]
                 var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[9].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[10] - second1[10] - third1[10]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[10])
                ninth.push(permCapStk[1].price - seventh[10])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[10] + fifth[10])
                thirteenth.push(0)
                 fourteenth.push(fourth[10] + fifth[10])
                fifteenth.push(fourteenth[10])
                   sixteenth.push(fourteenth[10] + thirteenth[10])
            }
            if (value.Traditional_Reversion_Analysis == 11) {
                pv2 = balance[7]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                pv3 = balance1[7]
                var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[10].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[11] - second1[11] - third1[11]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[11])
                ninth.push(permCapStk[1].price - seventh[11])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[11] + fifth[11])
                thirteenth.push(0)
                 fourteenth.push(fourth[11] + fifth[11])
                fifteenth.push(fourteenth[11])
                sixteenth.push(fourteenth[11] + thirteenth[11])
            }
            if (value.Traditional_Reversion_Analysis == 12) {

                pv2 = balance[8]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                 pv3 = balance1[8]
                var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[11].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[12] - second1[12] - third1[12]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[12])
                ninth.push(permCapStk[1].price - seventh[12])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[12] + fifth[12])
                thirteenth.push(0)
                fourteenth.push(fourth[12] + fifth[12])
                fifteenth.push(fourteenth[12])
                sixteenth.push(fourteenth[12] + thirteenth[12])
            }
            if (value.Traditional_Reversion_Analysis == 13) {
                pv2 = balance[9]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                 pv3 = balance1[9]
                var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[12].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[13] - second1[13] - third1[13]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[13])
                ninth.push(permCapStk[1].price - seventh[13])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[13] + fifth[13])
                thirteenth.push(0)
                fourteenth.push(fourth[13] + fifth[13])
                fifteenth.push(fourteenth[13])
                sixteenth.push(fourteenth[13] + thirteenth[13])
            }
            if (value.Traditional_Reversion_Analysis == 14) {

                pv2 = balance[10]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                  pv3 = balance1[10]
                var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[13].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[14] - second1[14] - third1[14]).toFixed(2)/1)
                fifth.push(0)
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[14])
                ninth.push(permCapStk[1].price - seventh[14])
                tenth.push(0)
                eleventh.push(0)
                twelth.push(fourth[14] + fifth[14])
                thirteenth.push(0)
                fourteenth.push(fourth[14] + fifth[14])
                fifteenth.push(fourteenth[14])
                   sixteenth.push(fourteenth[14] + thirteenth[14])
            }
            if (value.Traditional_Reversion_Analysis == 15) {

               pv2 = balance[11]
                // console.log(pv2)

                var p = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv2 * rate2;
                var pa = result + mi;
                p.push(pa)
                pv2 = pv2+pa
                 
               }
                // console.log(p)
                var sum = p.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum)
                balance.push(pv2)

                   pv3 = balance1[11]
                var p1 = [];
               for(var i=0; i<12; i++) {
              
                var mi = pv3 * rate3;
                var pa = result1 + mi;
                p1.push(pa)
                pv3 = pv3+pa
                 
               }
                var sum1 = p1.reduce(function(acc, inc) {
                    return acc + inc
                })
                // console.log(sum1)
                balance1.push(pv3)

                first1.push(data7[0].opIncome[14].Total_Net_Operating_Income)
                second1.push(a)
                third1.push(a1)
                fourth.push((first1[15] - second1[15] - third1[15]).toFixed(2)/1)
               
                sixth.push(sum.toFixed(2)/1)
                seventh.push(sum1.toFixed(2)/1)
                eighth.push(permCapStk[0].price - sixth[15])
                ninth.push(permCapStk[1].price - seventh[15])
                eleventh.push((data7[0].opIncome[14].Total_Net_Operating_Income/parseFloat(parseFloat(data8[9].capRate[0].Input)/100)).toFixed(2)/1)
                tenth.push((eleventh[15] * (tenth[0]/100)).toFixed(2)/1)
                fifth.push((eleventh[15]-eighth[15]-ninth[15]-tenth[15]).toFixed(2)/1)
                twelth.push(0)
                thirteenth.push(0)
                fourteenth.push(fourth[15] + fifth[15])
                fifteenth.push(fourteenth[15])
                sixteenth.push(fourteenth[15] + thirteenth[15])

                // twelth.push(fourth[15] + fifth[15])
            }

           
        })

        for(var i=0; i<analyobj.length; i++) {

            var sample = {

                "Traditional_Reversion_Analysis": analyobj[i].Traditional_Reversion_Analysis,
                "Distributable_NOI": first1[i],
                "Senior_Debt_Service": second1[i],
                "Sub_Debt_Service": third1[i],
                "Net_Income": fourth[i],
                "Reversion_Proceeds": fifth[i],
                "Senior_Principal": sixth[i],
                "Sub_Principal": seventh[i],
                "Senior_PB": eighth[i],
                "Sub_PB":ninth[i],
                "Cost_of_Sale": tenth[i],
                "Sale_Price": eleventh[i],
                "Stabilized_Developer_Fee": twelth[i],
                "Deferred_Developer_Fee": thirteenth[i],
                "Proceeds_to_Equity": fourteenth[i],
                "Traditional_Cash_Flow_to_Equity": fifteenth[i],
                "Actual_Cash_Flow_to_Equity": sixteenth[i],
                "project_id": data3[1].projcalc.project_id
            }

            trrvranlys.push(sample)
        }
     
        var output = {

            msg: "Traditional Reversion Analysis",
            trrvranlys: trrvranlys
        }

        trarray.push(output)
         
        var irr1 = irrnpv.irr(fifteenth)
        var irr2 = irrnpv.irr(sixteenth)
        // console.log(irr)

        var output = {

            msg: "irr",
            irr1: irr1,
            irr2: irr2

        }
        // console.log(output)
        trarray.push(output)

        adminEditVHModelSchema.find({ "project_id":data3[1].projcalc.project_id}, function(err, finEleobj){

            if (err) console.log(err)

            // console.log(finEleobj)
            for(var i=0; i<finEleobj.length; i++){

                // console.log(finEleobj[i].Financing_Elimination)

                for (var j=0; j<finEleobj[i].Financing_Elimination.length; j++) {

                // console.log(finEleobj.Input) 
                if(finEleobj[i].Financing_Elimination[j].Financing_Elimination == "Benchmark IRR in %") {

                   x = finEleobj[i].Financing_Elimination[j].Input;
                   
                }      
               
            }
        }

            var sample3 = {

                "Financing_Elimination": "Benchmark IRR",
                "Input": x
            }

            finElimination.push(sample3)

        var sample3 = {

            "Financing_Elimination": " Traditional IRR",
            "Input": irr2
        }

        finElimination.push(sample3)

        // console.log(finElimination)

        var val1 = finElimination[1].Input < finElimination[0].Input ? 0 : 1

        if(val1 == "err")
        {
            val1 = 0
        }
        else
        {
            val1 = val1
        }
        var sample3 = {

            "Financing_Elimination": " Traditional Financing?",
            "Input": val1
        }

        finElimination.push(sample3)

        var sample3 = {

            "Financing_Elimination": " 9% LIHTC",
            "Input": data3[1].projcalc.Deal_Type == "Acquisition / Renovation" ? 0 : 1
        }

        finElimination.push(sample3)

        var sample3 = {

            "Financing_Elimination": " 4% LIHTC",
            "Input": (LIHTC[2].Input + LIHTC[3].Input)<2 ? 0 : 1
        }

        finElimination.push(sample3)
    

        // console.log(finElimination)

        var output = {

            msg: "Financing Elimination",
            finElimination: finElimination
        }

        trarray.push(output)
 
    
      //Sources Tab Continuation
      
        second.push(finElimination[2].Input)
        
        
        third.push(finElimination[4].Input) 
      
        fourth1.push(finElimination[3].Input)

        for(var i=0; i<5; i++) {

            var sample = {

            "Sources": first[i],
            "Traditional": second[i],
            "LIHTC_4": third[i],
            "LIHTC_9": fourth1[i]

            }

            sources.push(sample)
        }

        var output ={

            msg: "Sources",
            sources: sources
        }

        trarray.push(output)

        // console.log(data8[1].constructionUses[4].price)

        var output = {

            msg: "Financing Surplus",
            fnSurpls: ((third[0] + third[1] + third[2]) - data8[1].constructionUses[4].price).toFixed(2)/1
        }

        // console.log(output)
        
        trarray.push(output)
     
        // console.log(trrvranlys)
        // console.log(sources)
        // console.log(finElimination)
    

        return sf(trarray)
      
    })
})
    })
 
   
}

module.exports = SourcesFun;