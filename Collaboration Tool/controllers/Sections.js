const section = require('./../models/sections');
const express = require('express');
const router = express.Router();

router.post('/createSection', function(req, res) {

    // console.log(req.body)

      var data = {

        ProjectName: req.body.values.projectname,
        sectionName: req.body.values.sectionname,
        userId: req.body.values.userid
    }
    // console.log("data", data)

    var SectionData = new section(data)

    section.findOne({sectionName: req.body.values.sectionname},function(err,result){

        if (err) console.log(err)

        // console.log(result)

        if(result == null) {

            SectionData.save()
            .then(response => {
        
                var output = {
        
                    msg: "Section created successfully",
                    condition: true,
                    result: response
                }
                res.send(output)
            })
            .catch(err => {
                var output = {
        
                    msg: "Cannot create section",
                    condition: false,
                    result: err
                }
                res.json(output)
            })
        }
        else 
        {

            var output = {

                msg: "Section name already exists",
                condition: false,
            }
            res.send(output)
        }
    })

  
})


router.get("/getSections/:id", function(req, res){

    // console.log("userid", req.params.id)


    section.find({userId: req.params.id}, function(err, result) {

        if(err) console.log(err)

        // console.log(result)
        res.json(result)

    })
    
})

router.post("/updateSections", function(req, res) {

    // console.log(req.body)

    var updateData = {

        _id: req.body.values.id,
        ProjectName: req.body.values.projectname,
        sectionName: req.body.values.sectionname,
        uploads: req.body.values.upload
    }

    section.update({ "_id": req.body.values.id}, {$set:updateData}, (err, result) => {

        if(err) {		
			var output = {

				msg: "Cannot update section details",
				condition: false
			}
			res.json(output)
		}
		
		else {

			if(result.nModified == 0) {

				var output = {
					msg: "Section data not modified",
					condition: false,
					result: result
                }
                
			}
			else {

				var output = {
					msg: "Successfully updated section details",
					condition: true,
					result: result
				}
			}
            // console.log(output)
			res.json(output)
		}
    })

})

router.post("/deletesections",function(req,res){

    section.deleteOne({"_id": req.body.data._id}, function(err, obj) {

		if(err) console.log(err)

		// console.log("deleted")
		res.json("deleted")
	})


})

module.exports = router;