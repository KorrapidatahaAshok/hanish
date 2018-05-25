const mongoose=require('mongoose');

const task = mongoose.Schema({

	comments : String,
		description : String,
		followers: String,	
		projectname: String,
		startDate: String,
		endDate: String,
		sectionname: String,
		taskname: String,
		assigneename: String,
		start: String,
		end: String,
		tags: String,
		uploads: Array,
		userId: String,
		creatorId: String,
		children: [{ 
			maintaskname: String,
			taskname: String,
			sectionname: String,
			description: String,
			comments: String,
			followers: String,
			startDate: String,
			endDate: String,
			start: String,
			end: String,
			assigneename: String,
			tags: String,
			uploads: Array,
			userId: String,
			children: [{ 
				maintaskname: String,
				taskname: String,
				subtaskname: String,
				sectionname: String,
				description: String,
				comments: String,
				followers: String,
				startDate: String,
				endDate: String,
				start: String,
				end: String,
				assigneename: String,
				tags: String,
				uploads: Array,
				userId: String,
				children: [{ 
					maintaskname: String,
					taskname: String,
					subtaskname: String,
					subsubtaskname: String,
					sectionname: String,
					description: String,
					comments: String,
					followers: String,
					startDate: String,
					endDate: String,
					start: String,
					end: String,
					assigneename: String,
					tags: String,
					uploads: Array,
					userId: String,
				}]
			}]
		}]

});

const taskNameName = module.exports = mongoose.model('tasks',task)