var stabilizedProForma = {};

var stabilizedProFormaSchema = require("mongoose").model("stabilizedProForma");
var adminEditVHModelSchema = require("mongoose").model("adminEditVHModelProfile");


stabilizedProForma.cal = (data, data1, data2, spf) => {
    
    var a = 0;
    var b = 0;

    adminEditVHModelSchema.findOne({"project_id": data1[1].projcalc.project_id}, function(err, adminobj) {

        if(err) console.log(err)

            // console.log(adminobj.OpAssumptions)
            adminobj.OpAssumptions.forEach(function(value) {

                if(value.Op_Assumptions == "Rental Growth") {

                    a = parseFloat(value.Input)/100
                }

                if(value.Op_Assumptions == "V&C Loss") {

                    b = parseFloat(value.Input)/100
                }
            })
    


    // console.log(data)
    // console. (data1)
    // console.log(data2)
    var proforma = [];
    var stabproForma = [];
    var first = [];
    var third = [];
    var fourth = [];
    var fifth = [];
    // console.log(data1[0].homeType[11].Rent_Monthly)
    // console.log(data2[4].opAssupmtions[3].Input)
    // var a = parseFloat(data2[4].opAssupmtions[3].Input) / 100
    // var b = parseFloat(data2[4].opAssupmtions[2].Input) / 100


    stabilizedProFormaSchema.find({}, function(err, stabpobj) {

        if(err) console.log(err)
            // console.log(stabpobj)
        stabpobj.forEach(function(value) {

            if(value.Effective_Gross_Income == 1) {
                first.push(data[0].cashPeriodData[13].Base_Rental_Revenue)
                third.push(first[0] + 0)
                fourth.push(0)
                fifth.push((fourth[0] + third[0]))
            }
            if(value.Effective_Gross_Income == 2) {
                first.push(data1[0].homeType[11].Rent_Monthly * 12)
                third.push(first[1] + 0)
                fourth.push(first[1] * b)
                fifth.push(fourth[1] + third[1])
            }
            if(value.Effective_Gross_Income == 3) {
                first.push(first[1]*(1 + a))
                third.push(first[2] + 0)
                fourth.push((first[2] * b).toFixed(2)/1)
                fifth.push((fourth[2] + third[2]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 4) {
                first.push((first[2]*(1 + a)).toFixed(2)/1)
                third.push((first[3] + 0).toFixed(2)/1)
                fourth.push((first[3] * b).toFixed(2)/1)
                fifth.push((fourth[3] + third[3]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 5) {
                first.push((first[3]*(1 + a)).toFixed(2)/1)
                third.push((first[4] + 0).toFixed(2)/1)
                fourth.push((first[4] * b).toFixed(2)/1)
                fifth.push((fourth[4] + third[4]).toFixed(2)/1)
                
            }
            if(value.Effective_Gross_Income == 6) {
                first.push((first[4]*(1 + a)).toFixed(2)/1)
                third.push((first[5] + 0).toFixed(2)/1)
                fourth.push((first[5] * b).toFixed(2)/1)
                fifth.push((fourth[5] + third[5]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 7) {
                first.push((first[5]*(1 + a)).toFixed(2)/1)
                third.push((first[6] + 0).toFixed(2)/1)
                fourth.push((first[6] * b).toFixed(2)/1)
                fifth.push((fourth[6] + third[6]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 8) {
                first.push((first[6]*(1 + a)).toFixed(2)/1)
                third.push((first[7] + 0).toFixed(2)/1)
                fourth.push((first[7] * b).toFixed(2)/1)
                fifth.push((fourth[7] + third[7]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 9) {
                first.push((first[7]*(1 + a)).toFixed(2)/1)
                third.push((first[8] + 0).toFixed(2)/1)
                fourth.push((first[8] * b).toFixed(2)/1)
                fifth.push((fourth[8] + third[8]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 10) {
                first.push((first[8]*(1 + a)).toFixed(2)/1)
                third.push((first[9] + 0).toFixed(2)/1)
                fourth.push((first[9] * b).toFixed(2)/1)
                fifth.push((fourth[9] + third[9]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 11) {
                first.push((first[9]*(1 + a)).toFixed(2)/1)
                third.push((first[10] + 0).toFixed(2)/1)
                fourth.push((first[10] * b).toFixed(2)/1)
                fifth.push((fourth[10] + third[10]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 12) {
                first.push((first[10]*(1 + a)).toFixed(2)/1)
                third.push((first[11] + 0).toFixed(2)/1)
                fourth.push((first[11] * b).toFixed(2)/1)
                fifth.push((fourth[11] + third[11]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 13) {
                first.push((first[11]*(1 + a)).toFixed(2)/1)
                third.push((first[12] + 0).toFixed(2)/1)
                fourth.push((first[12] * b).toFixed(2)/1)
                fifth.push((fourth[12] + third[12]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 14) {
                first.push((first[12]*(1 + a)).toFixed(2)/1)
                third.push((first[13] + 0).toFixed(2)/1)
                fourth.push((first[13] * b).toFixed(2)/1)
                fifth.push((fourth[13] + third[13]).toFixed(2)/1)
            }
            if(value.Effective_Gross_Income == 15) {
                first.push((first[13]*(1 + a)).toFixed(2)/1)
                third.push((first[14] + 0).toFixed(2)/1)
                fourth.push((first[14] * b).toFixed(2)/1)
                fifth.push((fourth[14] + third[14]).toFixed(2)/1)
            }
        })
        // console.log(first)
        // console.log(third)
        // console.log(fourth)
        // console.log(fifth)
        for(var i=0; i<stabpobj.length; i++) {

            var sample = {
                
                "Effective_Gross_Income": stabpobj[i].Effective_Gross_Income,
                "Base_Rental_Revenue": first[i],
                "Other_Gross_Income": 0,
                "Total_Gross_Revenue":third[i],
                "Vacancy_and_Collection_Loss": fourth[i],
                "Total_Effective_Gross_Income": fifth[i]
            }

            stabproForma.push(sample)
        }
        var output = {
            msg: "stabilizedProForma",
            stabproForma: stabproForma
        }

        proforma.push(output)

         return spf(proforma)
        // console.log(stabproForma)
    })
    })
 
}

module.exports = stabilizedProForma;