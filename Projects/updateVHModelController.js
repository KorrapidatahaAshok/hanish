var editvhmodelcalcSchema = require("mongoose").model("editvhmodelcalc");
var inputTermSheetSchema = require("mongoose").model("inputTermSheetData");
var projectBasisCalcSchema = require("mongoose").model("projectBasisCalc");

var updateCalculation = {};

updateCalculation.getById = function (req, res) {
  console.log(req.params.id)
  var projectId = req.params.id;
  editvhmodelcalcSchema.find({ projectId: projectId }, function (err, result) {
    if (err) {
      res.send(err.message)
    }
    else {
      //editvhmodelcalcSchema.update({})
      res.send(result);
    }
  })
}

/*update vhmodel by id */
updateCalculation.updateById = function (req, res) {

  console.log(req.body)

  // console.log(req.body.id)

  var projectId = req.body.id;

  var maxRent1 = req.body.maxRent1;
  var maxRent2 = req.body.maxRent2;
  var maxRent3 = req.body.maxRent3;
  var maxRent4 = req.body.maxRent4;
  var maxRent5 = req.body.maxRent5;

  var array = [];
  var ab = 0;
  var cd = 0;
  editvhmodelcalcSchema.findOne({ projectId: projectId }, function (err, result) {

    if (err) {
      res.send(err.message)
    }
    else {
      // res.send(result.middlewareCalc)
      // var ab = req.body.middlewareCalc;
      // var cd = req.body.homeType;
      for (var i = 0; i < 5; i++) {

        if (i == 0) {
          // console.log(result.middlewareCalc[i].homeType[i])
          // console.log(projectId)
          editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "middlewareCalc.homeType.Home_Type": "A" }] }, { $set: { "middlewareCalc.$.homeType.0.Rent_Max": maxRent1 } }, function (err, obj) {

            if (err) console.log(err)

            console.log(obj)

          })
        }
        else if (i == 1) {

          editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "middlewareCalc.homeType.Home_Type": "B" }] }, { $set: { "middlewareCalc.$.homeType.1.Rent_Max": maxRent2 } }, function (err, obj) {

            if (err) console.log(err)

            console.log(obj)
          })
        }
        else if (i == 2) {

          editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "middlewareCalc.homeType.Home_Type": "C" }] }, { $set: { "middlewareCalc.$.homeType.2.Rent_Max": maxRent3 } }, function (err, obj) {

            if (err) console.log(err)

            console.log(obj)
            
          })
        }
        else if (i == 3) {

          editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "middlewareCalc.homeType.Home_Type": "D" }] }, { $set: { "middlewareCalc.$.homeType.3.Rent_Max": maxRent4 } }, function (err, obj) {

            if (err) console.log(err)

            console.log(obj)
          })
        }
        else if (i == 4) {

          editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "middlewareCalc.homeType.Home_Type": "E" }] }, { $set: { "middlewareCalc.$.homeType.4.Rent_Max": maxRent5 } }, function (err, obj) {

            if (err) console.log(err)

            console.log(obj)
          })
        }
      }

      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.pbdata.Building_System": "Preliminary Hard Costs" }] }, { $set: { "projectBasis.$.pbdata.11.Cost":req.body.preliminaryHardCost} }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.pbdata.Building_System": "Purchase Price" }] }, { $set: { "projectBasis.$.pbdata.12.Cost": req.body.pucrchaseCost } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
        inputTermSheetSchema.update({"project_id": projectId}, {$set: {PurchasePrice: req.body.pucrchaseCost }}, function(err, result) {

          if(err) console.log(err)

            projectBasisCalcSchema.update({"project_id": projectId}, {$set: {Project_Purchase_Price: req.body.pucrchaseCost}}, function(err, obj) {

              if(err) console.log(err)

                // console.log("updated")
        
          
          })
        })
        
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.sceData.Soft_Cost_Category": "Con. Contingency" }] }, { $set: { "projectBasis.$.sceData.0.Cost": req.body.conContingency } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.sceData.Soft_Cost_Category": "Contractor O&P" }] }, { $set: { "projectBasis.$.sceData.1.Cost": req.body.contractorOP } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.sceData.Soft_Cost_Category": "Con. Management" }] }, { $set: { "projectBasis.$.sceData.2.Cost": req.body.conManagment } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.sceData.Soft_Cost_Category": "Architectual" }] }, { $set: { "projectBasis.$.sceData.3.Cost": req.body.architectual } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.sceData.Soft_Cost_Category": "Advisory" }] }, { $set: { "projectBasis.$.sceData.4.Cost": req.body.adivisory } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.sceData.Soft_Cost_Category": "Con. Interest" }] }, { $set: { "projectBasis.$.sceData.5.Cost": req.body.conIterest } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "projectBasis.sceData.Soft_Cost_Category": "Orig. Fee" }] }, { $set: { "projectBasis.$.sceData.6.Cost": req.body.orgFee } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
      })
     
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "netOperatingIncome.opIncome.Net_Operating_Income": "1" }] }, { $set: { "netOperatingIncome.$.opIncome.0.Insurance":  req.body.insurance, 
                                                                          "netOperatingIncome.$.opIncome.0.Utilities": req.body.utilities, 
                                                                          "netOperatingIncome.$.opIncome.0.Repairs_and_Maintenance": req.body.repairesAndMaintainance, 
                                                                          "netOperatingIncome.$.opIncome.0.Cleaning_and_GarbageRemoval": req.body.cleaningAndGarbageRemovel, 
                                                                          "netOperatingIncome.$.opIncome.0.Contract_Services": req.body.contactService, 
                                                                          "netOperatingIncome.$.opIncome.0.General_and_Administrative": req.body.generalAndAdministrative, 
                                                                          "netOperatingIncome.$.opIncome.0.Turnover": req.body.turnover, 
                                                                          "netOperatingIncome.$.opIncome.0.Marketing": req.body.marketing, 
                                                                          "netOperatingIncome.$.opIncome.0.Payroll": req.body.payRoll, 
                                                                          "netOperatingIncome.$.opIncome.0.Other": req.body.other, 
                                                                          "netOperatingIncome.$.opIncome.0.Miscellaneous": req.body.miscellaneous } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
        // console.log("ashok")

      })
      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId }, { "netOperatingIncome.opIncome.Net_Operating_Income": "2" }] }, { $set: { "netOperatingIncome.$.opIncome.1.Insurance": req.body.insurance1, 
                                                                          "netOperatingIncome.$.opIncome.1.Utilities": req.body.utilities1, 
                                                                          "netOperatingIncome.$.opIncome.1.Repairs_and_Maintenance": req.body.repairesAndMaintainance1, 
                                                                          "netOperatingIncome.$.opIncome.1.Cleaning_and_GarbageRemoval": req.body.cleaningAndGarbageRemovel1, 
                                                                          "netOperatingIncome.$.opIncome.1.Contract_Services": req.body.contactService1, 
                                                                          "netOperatingIncome.$.opIncome.1.General_and_Administrative": req.body.generalAndAdministrative1, 
                                                                          "netOperatingIncome.$.opIncome.1.Turnover": req.body.turnover1, 
                                                                          "netOperatingIncome.$.opIncome.1.Marketing": req.body.marketing1, 
                                                                          "netOperatingIncome.$.opIncome.1.Payroll": req.body.payRoll1, 
                                                                          "netOperatingIncome.$.opIncome.1.Other": req.body.other1, 
                                                                          "netOperatingIncome.$.opIncome.1.Miscellaneous": req.body.miscellaneous1 } }, function (err, obj) {

        if (err) console.log(err)

        console.log(obj)
        // console.log("ashok")

      })

      editvhmodelcalcSchema.update({ $and: [{ "projectId": projectId , "dashboard.opAssupmtions.Op_Assumptions": "Assume OpEx?" }] }, { $set: { "dashboard.$.opAssupmtions.0.Input": req.body.flag } }, function (err, obj) {

        if (err) console.log(err)

        // console.log(obj)

        array.push(obj)

        // console.log("array", array)


       
      })
       var output = {

          msg: "VH model data updated successfully",
          condition: true
        }

        res.json(output)

    }


  })
}
/*end of update vhmodel by id */
module.exports = updateCalculation;
