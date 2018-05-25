const mongoose=require('mongoose');
const teams=mongoose.Schema({
	teamName:String,
	teamMembers:Array,
	teamDesc:String
});

const team=module.exports=mongoose.model('teams',teams)
module.exports.createTeam=(createTeams,callback)=>{

	team.findOne({teamName : createTeams.teamName},function(err,obj){

		if(err)  console.log(err)

		// console.log(obj)

		if(obj== null){

			createTeams.save((err,teamCreated)=>{
				if(err){
					var output = {

						msg: "Error in creating team.",
						condition: false,
						err: err
					}
					return callback(output)
				}
				else{

					var output = {

						msg: "Team created successfully.",
						condition: true,
						teamCreated: teamCreated
					}
					return callback(output)
				}

			})


		}

		else {
			// if(obj.teamName.toLowerCase() == createTeams.teamName.toLowerCase())
			var output = {

				msg: "Team Name already exists.",
				condition: false

			}
			return callback(output)
		}
	})

			
		}

module.exports.getTeams = (callback) => {

team.find({}, function(err, result) {

	if(err) console.log(err)

	return callback(result);
})

}
