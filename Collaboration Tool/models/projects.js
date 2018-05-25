const mongoose=require('mongoose');
const projects=mongoose.Schema({
	projectName:String,
	teamName:String,
	projectDesc:String,
	userId: String

});

var project=module.exports=mongoose.model('projects',projects)

module.exports.createProject=(createProjects, callback)=>{

	// console.log(createProjects)
	/* Save Data */
	project.findOne({projectName:createProjects.projectName},(err,projects)=>{
		if(err){
			return callback(err)
		}
		else if(projects){
			var output = {
			
				msg: "Project name already existed",
				condition: false
			}
			return callback(output)
		}
		else{
			createProjects.save((err,projectCreated)=>{
				if(err) {
					var output = {
			
						msg: "Error in adding project to team",
						err: err,
						condition: false
					}
					return callback(output)
					}
					else {
					var output = {
			
						msg: "Team added to project successfully",
						projectCreated: projectCreated,
						condition: true
					}
					return callback(output)
				}
			})
		}
	})
}

// module.exports.getProjects =(callback)=>{

// 	project.find({},(err,projects)=>{
// 		if(err){
// 			return callback(err)
// 		}
// 		else{
// 			return callback(projects)
// 		}
// 	})
// };
