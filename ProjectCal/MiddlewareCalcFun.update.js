var middlewareCalc = {}

var projectSchema = require("mongoose").model("ProjectList");
var inputTermSheetSchema = require("mongoose").model("inputTermSheetData");
var zipCodeSchema = require("mongoose").model("zipCodeData");
var projectBasisCalcSchema = require("mongoose").model("projectBasisCalc");
var homeTypeDataSchema = require("mongoose").model("homeTypeData");
var fmrRentsSchema = require("mongoose").model("fmrrentsprofiles");
var rcAssumptionSchema = require("mongoose").model("rcaprofiles");
var editvhmodelcalcSchema = require("mongoose").model("editvhmodelcalc");

var resposeHandler = require("../resposeHandler/resposeHandller");

var projectBasis = require('../ProjectCal/ProjectBasisFun');


middlewareCalc.cal = (data1, obj,cb) => {

    // console.log("Hi")
    var mdlware = [];
    var homeType = [];

    var unitsarray = [];
    var rentmaxarray = [];
    var familyarray = [];
    var totalSqFtarray = [];
    var rentcharged = [];
    var rentmonthly = [];
     var a = 0;

    homeTypeDataSchema.find({}, function(err, homeobj) {

        if(err) console.log(err)
        // console.log(homeobj)

            // console.log(fmrobj)

            projectBasisCalcSchema.findOne({"project_id": obj.project_id}, function(err, proobj) {

                if(err) console.log(err)     
                        
                // console.log("data1", data1[0].homeType)
                var rent = [];

                for(var j=0; j<data1[0].homeType.length-7; j++) {

                    // console.log(data1[0].homeType[j].Rent_Max))
                    rent.push(data1[0].homeType[j].Rent_Max)
                   
                }
                

            for (var i = 0; i < homeobj.length; i++) {           
                // console.log("rent", rent)
         
            // console.log("beds", result[i].Beds)
 
            if (i == 0) {
                unitsarray.push(obj.Studios);
                rentmaxarray.push(rent[i]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if (i == 1) {
                unitsarray.push(obj.One_BedRoom_11);
                rentmaxarray.push(rent[i]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if (i == 2) {
                unitsarray.push(obj.Two_BedRoom_12);
                rentmaxarray.push(rent[i]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if (i == 3) {
                unitsarray.push(obj.Three_BedRoom_13);
                rentmaxarray.push(rent[i]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if (i == 4) {
                unitsarray.push(obj.Four_BedRoom_14);
                rentmaxarray.push(rent[i]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if(i == 5) {
                unitsarray.push(0);
                rentmaxarray.push(rent[0]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if(i == 6) {
                unitsarray.push(0);
                rentmaxarray.push(rent[1]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if(i == 7) {
                unitsarray.push(0);
                rentmaxarray.push(rent[2]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if(i == 8) {
                unitsarray.push(0);
                rentmaxarray.push(rent[3]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
                
            }
            else if(i == 9) {
                unitsarray.push(0);
                rentmaxarray.push(rent[4]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if(i == 10) {
                unitsarray.push(0);
                rentmaxarray.push(rent[4]);
                familyarray.push(homeobj[i].Beds + 1);
                totalSqFtarray.push(homeobj[i].Estimated_Sq_Ft * unitsarray[i])
                rentcharged.push(rentmaxarray[i] * (1-(proobj.Additional_Rent_Discount/100)))
                rentmonthly.push(rentcharged[i] * unitsarray[i])
            }
            else if(i == 11) {

                a = unitsarray[0] + unitsarray[1] + unitsarray[2] + unitsarray[3] + unitsarray[4]
                unitsarray.push(a);

                rentmaxarray.push(0);

                var c = totalSqFtarray[0]+ totalSqFtarray[1] + totalSqFtarray[2] + totalSqFtarray[3] + totalSqFtarray[4];
                var total = c * (1 + (homeobj[i].Estimated_Sq_Ft)/100)
                totalSqFtarray.push(total)

                var b = rentcharged[0] + rentcharged[1] + rentcharged[2] + rentcharged[3] + rentcharged[4]             
                rentcharged.push(b);

                var d = rentmonthly[0] + rentmonthly[1] + rentmonthly[2] + rentmonthly[3] + rentmonthly[4]
                rentmonthly.push(d)                             
            }
            }
        
        
        for(var i = 0; i< homeobj.length; i++) {

            var sample = {

                "Home_Type": homeobj[i].Home_Type,
                "Beds": homeobj[i].Beds,
                "Number_of_Units": unitsarray[i],
                "Rent_Max":rentmaxarray[i],
                "Family_Size":familyarray[i],
                "Rent_Charged": rentcharged[i],
                "Rent_Monthly": rentmonthly[i],
                "Estimated_Sq_Ft": homeobj[i].Estimated_Sq_Ft,
                "Total_Sq_Ft": totalSqFtarray[i],
                "project_id": obj.project_id
                }  
                homeType.push(sample)
        }
        var output = {

            msg:"Middleware calc data",
            homeType: homeType
        }
        mdlware.push(output)

        var resqftg = Math.max(totalSqFtarray[11], obj.SquareFootage)
        var sqftgpflr = resqftg / proobj.Building_Floors

        // console.log(sqftgpflr)

 
        var sample = {

            "project_id": proobj.project_id,
            "Sponsor": proobj.Sponsor,
            "FMR_Area": proobj.FMR_Area,
            "Deal_Type": proobj.Deal_Type,
            "City": proobj.City,
            "State": proobj.State,
            "Project_Purchase_Price": proobj.Project_Purchase_Price,
            "Rentable_Square_Footage": resqftg,
            "Building_Floors": proobj.Building_Floors,
            "Square_Footage_per_Floor": sqftgpflr,
            "Units": unitsarray[11],
            "Additional_Rent_Discount": proobj.Additional_Rent_Discount,
            "Developer_Fee": proobj.Developer_Fee,
            "Developer_Fee_Deferral": proobj.Developer_Fee_Deferral,
            "ViaHome_Fee_Rate": proobj.ViaHome_Fee_Rate,
            "Project_Staging": proobj.Project_Staging

        }

        var output = {

            msg: "ProjectCalc data",
            projcalc: sample
        }

        mdlware.push(output)
        mdlware.push(obj)
        
        // console.log(mdlware)

        // console.log(sample)

        // return mdlware
        // res.json(mdlware)
        //projectBasis.cal(mdlware)
        return cb(mdlware)

    })
        
    
})

    
           

}

module.exports = middlewareCalc;