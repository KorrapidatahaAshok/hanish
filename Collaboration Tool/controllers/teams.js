const teamsSchema=require('.././models/teams.js');
const express = require('express');
const router= express.Router();

router.post('/createteams',(req,res)=>{
	console.log("reg");
	console.log(req.body);
	
	var teamSchema=new teamsSchema({
			teamName:req.body.teams_details.teamname,
			teamMembers:req.body.teams_details.teammembers,
			teamDesc:req.body.teams_details.description
	})
	teamsSchema.createTeam(teamSchema,(result)=>{

		res.json(result)
	
	})

})



router.get('/getTeams', (req, res) => {

	teamsSchema.getTeams((result) => {

		// console.log("result", result)
		res.send(result)
	})
})

router.post('/updateteams', (req, res) => {

	// console.log("updatedata", req.body)

	var updatedata = {

		id: req.body.teams_details.id,
		teamName:req.body.teams_details.teamname,
		teamMembers:req.body.teams_details.teammembers,
		teamDesc:req.body.teams_details.description

	}

	teamsSchema.update({"_id": updatedata.id}, {$set: updatedata}, function(err, result) {

		if(err) {		
			var output = {

				msg: "Cannot update team details",
				condition: false
			}
			res.json(output)
		}
		
		else {

			console.log("reut", result.nModified)

			if(result.nModified == 0) {

				var output = {
					msg: "Team data not modified",
					condition: false,
					result: result
				}
			}
			else {

				var output = {
					msg: "Successfully updated team details",
					condition: true,
					result: result
				}
			}

			res.json(output)
		}

		

		// console.log("updated", result)
	})

})

router.post('/deleteTeams', (req, res) => {


	teamsSchema.deleteOne({"_id": req.body.data._id}, function(err, result) {

		if(err) console.log(err)

		// console.log("deleted")
		res.json("Deleted")
	})

})


module.exports=router;
