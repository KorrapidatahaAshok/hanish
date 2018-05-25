var netOperatingIncome = {};

var operatingIncomeSchema = require("mongoose").model("operatingIncome");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");
var editvhmodelcalcSchema = require("mongoose").model("editvhmodelcalc");

netOperatingIncome.cal = (data, data1, data2, op) => {

    var b = 0;
    var c = 0;
    var ab = 0;
    var cd = 0;

    adminEditVHModelSchema.findOne({"project_id": data2[1].projcalc.project_id} ,function(err, adminobj){

        if(err) console.log(err)
            // console.log(adminobj.OpAssumptions)

        adminobj.OpAssumptions.forEach(function(value1){

            if(value1.Op_Assumptions == "Assume OpEx?") {

                cd = parseFloat(value1.Input)

            }

            if(value1.Op_Assumptions == "OpEx Rate") {

                ab = parseFloat(value1.Input/100)

            }

            if(value1.Op_Assumptions == "Expense Growth") {

                c = parseFloat(value1.Input/100)
            }

            if(value1.Op_Assumptions == "Prop. Manage.") {

                b = parseFloat(value1.Input/100)
            }
        })
        // console.log(ab, c, b)
    

    // console.log(data)
    // console.log(data1)
    // console.log(data2[1].projcalc.project_id)
    var oIcm = [];
    var second = [];
    var third = [];
    var fourth = [];
    var fifth = [];
    var sixth =[];
    var seventh = [];
    var eighth = [];
    var nineth = [];
    var tenth = [];
    var eleventh = [];
    var twelth =[];
    var thirteenth =[];
    var fourteenth =[];
    var d = 0;
    var fifteenth = [];
    var opIncome = [];
    var opIncome1 = [];
    var operatingIncome = [];

    
    var a = data[0].stabproForma[0].Total_Effective_Gross_Income;

    // console.log("a", a)
    // var b = parseFloat(data1[4].opAssupmtions[5].Input/100)
    // var c = parseFloat(data1[4].opAssupmtions[4].Input/100)

    // console.log(a,b)
operatingIncomeSchema.find({}, function(err, opiobj) {

    if(err) console.log(err)
        // console.log(opiobj)
    opiobj.forEach(function(value) {

        if(value.Net_Operating_Income == 1) {
            oIcm.push(a*b)
            third.push(0)
            fourth.push(0)
            fifth.push(0)
            sixth.push(0)
            seventh.push(0)
            eighth.push(0)
            nineth.push(0)
            tenth.push(0)
            eleventh.push(0)
            twelth.push(0)
            thirteenth.push(0)

            var e = third[0]+fourth[0]+fifth[0]+sixth[0]+seventh[0]+eighth[0]+nineth[0]+tenth[0]+eleventh[0]+twelth[0]+third[0]; 
            var d = data[0].stabproForma[0].Total_Effective_Gross_Income*ab
            var f = cd == 1 ? d : e
            second.push((f).toFixed(2)/1)
            fourteenth.push((oIcm[0]+second[0]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[0].Total_Effective_Gross_Income - fourteenth[0]).toFixed(2)/1)
        }
        // console.log(f)
       
        if(value.Net_Operating_Income == 2) {
            oIcm.push((data[0].stabproForma[1].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(0)
            fourth.push(0)
            fifth.push(0)
            sixth.push(0)
            seventh.push(0)
            eighth.push(0)
            nineth.push(0)
            tenth.push(0)
            eleventh.push(0)
            twelth.push(0)
            thirteenth.push(0)

            var e = third[1]+fourth[1]+fifth[1]+sixth[1]+seventh[1]+eighth[1]+nineth[1]+tenth[1]+eleventh[1]+twelth[1]+third[1]; 
            var d = data[0].stabproForma[1].Total_Effective_Gross_Income*ab
            var f = cd == 1 ? d : e
            second.push((f).toFixed(2)/1)
            fourteenth.push((oIcm[1]+second[1]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[1].Total_Effective_Gross_Income - fourteenth[1]).toFixed(2)/1)
          
        }
        if(value.Net_Operating_Income == 3) {
            oIcm.push((data[0].stabproForma[2].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[1]*c)
            fourth.push(fourth[1]*c)
            fifth.push(fifth[1]*c)
            sixth.push(sixth[1]*c)
            seventh.push(seventh[1]*c)
            eighth.push(eighth[1]*c)
            nineth.push(nineth[1]*c)
            tenth.push(tenth[1]*c)
            eleventh.push(eleventh[1]*c)
            twelth.push(twelth[1]*c)
            thirteenth.push(thirteenth[1]*c)

           second.push((second[1]*(1+c)).toFixed(2)/1)
           fourteenth.push((oIcm[2]+second[2]).toFixed(2)/1)
           fifteenth.push((data[0].stabproForma[2].Total_Effective_Gross_Income - fourteenth[2]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 4) {
            oIcm.push((data[0].stabproForma[3].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[2]*c)
            fourth.push(fourth[2]*c)
            fifth.push(fifth[2]*c)
            sixth.push(sixth[2]*c)
            seventh.push(seventh[2]*c)
            eighth.push(eighth[2]*c)
            nineth.push(nineth[2]*c)
            tenth.push(tenth[2]*c)
            eleventh.push(eleventh[2]*c)
            twelth.push(twelth[2]*c)
            thirteenth.push(thirteenth[2]*c)

            second.push((second[2]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[3]+second[3]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[3].Total_Effective_Gross_Income - fourteenth[3]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 5) {
            oIcm.push((data[0].stabproForma[4].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[3]*c)
            fourth.push(fourth[3]*c)
            fifth.push(fifth[3]*c)
            sixth.push(sixth[3]*c)
            seventh.push(seventh[3]*c)
            eighth.push(eighth[3]*c)
            nineth.push(nineth[3]*c)
            tenth.push(tenth[3]*c)
            eleventh.push(eleventh[3]*c)
            twelth.push(twelth[3]*c)
            thirteenth.push(thirteenth[3]*c)

            second.push((second[3]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[4]+second[4]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[4].Total_Effective_Gross_Income - fourteenth[4]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 6) {
            oIcm.push((data[0].stabproForma[5].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[4]*c)
            fourth.push(fourth[4]*c)
            fifth.push(fifth[4]*c)
            sixth.push(sixth[4]*c)
            seventh.push(seventh[4]*c)
            eighth.push(eighth[4]*c)
            nineth.push(nineth[4]*c)
            tenth.push(tenth[4]*c)
            eleventh.push(eleventh[4]*c)
            twelth.push(twelth[4]*c)
            thirteenth.push(thirteenth[4]*c)

            second.push((second[4]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[5]+second[5]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[5].Total_Effective_Gross_Income - fourteenth[5]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 7) {
            oIcm.push((data[0].stabproForma[6].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[5]*c)
            fourth.push(fourth[5]*c)
            fifth.push(fifth[5]*c)
            sixth.push(sixth[5]*c)
            seventh.push(seventh[5]*c)
            eighth.push(eighth[5]*c)
            nineth.push(nineth[5]*c)
            tenth.push(tenth[5]*c)
            eleventh.push(eleventh[5]*c)
            twelth.push(twelth[5]*c)
            thirteenth.push(thirteenth[5]*c)

            second.push((second[5]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[6]+second[6]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[6].Total_Effective_Gross_Income - fourteenth[6]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 8) {
            oIcm.push((data[0].stabproForma[7].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[6]*c)
            fourth.push(fourth[6]*c)
            fifth.push(fifth[6]*c)
            sixth.push(sixth[6]*c)
            seventh.push(seventh[6]*c)
            eighth.push(eighth[6]*c)
            nineth.push(nineth[6]*c)
            tenth.push(tenth[6]*c)
            eleventh.push(eleventh[6]*c)
            twelth.push(twelth[6]*c)
            thirteenth.push(thirteenth[6]*c)
            second.push((second[6]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[7]+second[7]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[7].Total_Effective_Gross_Income - fourteenth[7]).toFixed(2)/1)

        }
        if(value.Net_Operating_Income == 9) {
            oIcm.push((data[0].stabproForma[8].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[7]*c)
            fourth.push(fourth[7]*c)
            fifth.push(fifth[7]*c)
            sixth.push(sixth[7]*c)
            seventh.push(seventh[7]*c)
            eighth.push(eighth[7]*c)
            nineth.push(nineth[7]*c)
            tenth.push(tenth[7]*c)
            eleventh.push(eleventh[7]*c)
            twelth.push(twelth[7]*c)
            thirteenth.push(thirteenth[7]*c)

            second.push((second[7]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[8]+second[8]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[8].Total_Effective_Gross_Income - fourteenth[8]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 10) {
            oIcm.push((data[0].stabproForma[9].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[8]*c)
            fourth.push(fourth[8]*c)
            fifth.push(fifth[8]*c)
            sixth.push(sixth[8]*c)
            seventh.push(seventh[8]*c)
            eighth.push(eighth[8]*c)
            nineth.push(nineth[8]*c)
            tenth.push(tenth[8]*c)
            eleventh.push(eleventh[8]*c)
            twelth.push(twelth[8]*c)
            thirteenth.push(thirteenth[8]*c)

            second.push((second[8]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[9]+second[9]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[9].Total_Effective_Gross_Income - fourteenth[9]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 11) {
            oIcm.push((data[0].stabproForma[10].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[9]*c)
            fourth.push(fourth[9]*c)
            fifth.push(fifth[9]*c)
            sixth.push(sixth[9]*c)
            seventh.push(seventh[9]*c)
            eighth.push(eighth[9]*c)
            nineth.push(nineth[9]*c)
            tenth.push(tenth[9]*c)
            eleventh.push(eleventh[9]*c)
            twelth.push(twelth[9]*c)
            thirteenth.push(thirteenth[9]*c)

            second.push((second[9]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[10]+second[10]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[10].Total_Effective_Gross_Income - fourteenth[10]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 12) {
            oIcm.push((data[0].stabproForma[11].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[10]*c)
            fourth.push(fourth[10]*c)
            fifth.push(fifth[10]*c)
            sixth.push(sixth[10]*c)
            seventh.push(seventh[10]*c)
            eighth.push(eighth[10]*c)
            nineth.push(nineth[10]*c)
            tenth.push(tenth[10]*c)
            eleventh.push(eleventh[10]*c)
            twelth.push(twelth[10]*c)
            thirteenth.push(thirteenth[10]*c)

            second.push((second[10]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[11]+second[11]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[11].Total_Effective_Gross_Income - fourteenth[11]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 13) {
            oIcm.push((data[0].stabproForma[12].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[11]*c)
            fourth.push(fourth[11]*c)
            fifth.push(fifth[11]*c)
            sixth.push(sixth[11]*c)
            seventh.push(seventh[11]*c)
            eighth.push(eighth[11]*c)
            nineth.push(nineth[11]*c)
            tenth.push(tenth[11]*c)
            eleventh.push(eleventh[11]*c)
            twelth.push(twelth[11]*c)
            thirteenth.push(thirteenth[11]*c)

            second.push((second[11]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[12]+second[12]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[12].Total_Effective_Gross_Income - fourteenth[12]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 14) {
            oIcm.push((data[0].stabproForma[13].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[12]*c)
            fourth.push(fourth[12]*c)
            fifth.push(fifth[12]*c)
            sixth.push(sixth[12]*c)
            seventh.push(seventh[12]*c)
            eighth.push(eighth[12]*c)
            nineth.push(nineth[12]*c)
            tenth.push(tenth[12]*c)
            eleventh.push(eleventh[12]*c)
            twelth.push(twelth[12]*c)
            thirteenth.push(thirteenth[12]*c)
            second.push((second[12]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[13]+second[13]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[13].Total_Effective_Gross_Income - fourteenth[13]).toFixed(2)/1)
        }
        if(value.Net_Operating_Income == 15) {
            oIcm.push((data[0].stabproForma[14].Total_Effective_Gross_Income*b).toFixed(2)/1)
            third.push(third[13]*c)
            fourth.push(fourth[13]*c)
            fifth.push(fifth[13]*c)
            sixth.push(sixth[13]*c)
            seventh.push(seventh[13]*c)
            eighth.push(eighth[13]*c)
            nineth.push(nineth[13]*c)
            tenth.push(tenth[13]*c)
            eleventh.push(eleventh[13]*c)
            twelth.push(twelth[13]*c)
            thirteenth.push(thirteenth[13]*c)
            second.push((second[13]*(1+c)).toFixed(2)/1)
            fourteenth.push((oIcm[14]+second[14]).toFixed(2)/1)
            fifteenth.push((data[0].stabproForma[14].Total_Effective_Gross_Income - fourteenth[14]).toFixed(2)/1)
        }
    })
    // console.log(oIcm)
    // console.log(third)
    // console.log(fourth)
    // console.log(second)
    // console.log(fourteenth)
    // console.log(fifteenth)

    for(var i=0; i<opiobj.length; i++) {

        var sample = {
            "Net_Operating_Income":opiobj[i].Net_Operating_Income,
            "Property_Management": oIcm[i],
            "Other_Expenses": second[i],
            "Insurance": third[i],
            "Utilities": fourth[i],
            "Repairs_and_Maintenance": fifth[i],
            "Cleaning_and_GarbageRemoval": sixth[i],
            "Contract_Services": seventh[i],
            "General_and_Administrative": eighth[i],
            "Turnover": nineth[i],
            "Marketing": tenth[i],
            "Payroll": eleventh[i],
            "Other": twelth[i],
            "Miscellaneous": thirteenth[i],
            "Total_Operating_Expenses": fourteenth[i],
            "Total_Net_Operating_Income": fifteenth[i],
            "project_id": data2[1].projcalc.project_id
            
        }
        opIncome.push(sample)

    }


    // console.log(opIncome)
    var output = {
        msg: "NetOperatingIncome",
        opIncome:opIncome
    }

 operatingIncome.push(output)
 return op(operatingIncome)
//  console.log(operatingIncome)

})
    })
    
}

module.exports = netOperatingIncome;