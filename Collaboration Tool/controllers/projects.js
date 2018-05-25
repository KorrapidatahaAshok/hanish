const prj=require('./../models/projects');
const express=require('express');
const router=express.Router();
router.post('/createproject',(req, res)=>{

	console.log(req.body)

	const prjSchema= new prj({
		projectName:req.body.values.projectname,
		teamName:req.body.values.teamname,
		projectDesc:req.body.values.description,
		userId: req.body.values.userid

	})
	prj.createProject(prjSchema,(result)=>{
		res.send(result);
	})
});

router.get('/getProjects/:id',(req,res)=>{

	prj.find({userId: req.params.id},(err,projects)=>{
		if(err){
			res.json(err)
		}
		else{
			res.json(projects)
		}
	})
	// prj.getProjects(req.params(result)=>{
	// 	res.send(result);
	// })
})

router.post('/updateProjects', (req, res) => {

	// console.log("updatedata", req.body)

	var updatedata = {

		id: req.body.values.id,
		projectName:req.body.values.projectname,
		teamName:req.body.values.teamname,
		projectDesc:req.body.values.description

	}

	prj.update({"_id": updatedata.id}, {$set: updatedata}, function(err, result) {

	
		if(err) {		
			var output = {

				msg: "Cannot update project details",
				condition: false
			}
			res.json(output)
		}
		
		else {

			// console.log("reut", result.nModified)

			if(result.nModified == 0) {

				var output = {
					msg: "Project data not modified",
					condition: false,
					result: result
				}
			}
			else {

				var output = {
					msg: "Successfully updated project details",
					condition: true,
					result: result
				}
			}

			res.json(output)
		}

	})

})

router.post('/deleteProjects', (req, res) => {


	prj.deleteOne({"_id": req.body.data._id}, function(err, result) {

		if(err) console.log(err)

		// console.log("deleted")
		res.json("Deleted")
	})

})
module.exports = router;
