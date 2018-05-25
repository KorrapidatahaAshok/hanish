var section2 = {};

var sections = require("../Collaboration Tool/models/sections")

section2.cal = (data, data1, data2, result1) => {

    // console.log("data", data)
    // console.log("data1", data1)
	
	console.log("data2", data2)

    if (data.sectionName == data1.sectionName) {

        // console.log("dat1", data1)

        for (let j = 0; j < data1.tasks.length; j++) {

            for (let k = 0; k < data1.tasks[j].children.length; k++) {

                // console.log(data1.tasks[j].children[k])

                var sample = {

                    "maintaskname": data1.tasks[j].taskname,
                    "comments": data1.tasks[j].children[k].comments,
                    "description": data1.tasks[j].children[k].description,
                    "followers": data1.tasks[j].children[k].followers,
                    "projectname": data1.tasks[j].children[k].projectname,
                    "startDate": data1.tasks[j].children[k].startDate,
                    "endDate": data1.tasks[j].children[k].endDate,
                    "sectionname": data1.tasks[j].children[k].sectionname,
                    "taskname": data1.tasks[j].children[k].taskname,
                    "assigneename": data1.tasks[j].children[k].assigneename,
                    "start": data1.tasks[j].children[k].start,
                    "end": data1.tasks[j].children[k].end,
                    "tags": data1.tasks[j].children[k].tags,
                    "uploads": data1.tasks[j].children[k].uploads,
                    "userId": data.userId,
                    "key": Math.random()
                    // "children": data1.tasks[j].children
                }

                // console.log("sample", sample)

                var setter = {};
                var findquery = {};
                var findquery1 = {};
                var findquery2 = {};


                setter['tasks.' + j + '.children.' + k] = sample;
                findquery["tasks." + j + ".userId"] = data.userId
                //findquery1["tasks." + j + ".sectionname"] = data.sectionName
                findquery2["tasks." + j + ".taskname"] = data1.tasks[j].taskname

                 //console.log("query", findquery, findquery1, findquery2, setter);
				 
                sections.update({ $and: [findquery, findquery2] }, { $set: setter }, (err, obj) => {

                    if (err) console.log(err)

                    //  console.log("updated1", obj)
					 return result1(obj)
                  
                })

             

            }
        }
		 

       
    }
	
}


section2.cal1 = (data, data1, data2, result) => {

    // console.log("data", data)
    // console.log("data1", data1)
    // console.log("data2", data2)
    if (data.sectionName == data1.sectionName) {

        // console.log("dat1", data1)

        for (let j = 0; j < data1.tasks.length; j++) {

            for (let k = 0; k < data1.tasks[j].children.length; k++) {
              
                for (let l = 0; l < data1.tasks[j].children[k].children.length; l++) {

                    // console.log(data1.tasks[j].children[k].children[l])

                    var sample = {

                        "maintaskname": data1.tasks[j].taskname,
                        "subtaskname": data1.tasks[j].children[k].taskname,
                        "comments": data1.tasks[j].children[k].children[l].comments,
                        "description": data1.tasks[j].children[k].children[l].description,
                        "followers": data1.tasks[j].children[k].children[l].followers,
                        "projectname": data1.tasks[j].children[k].children[l].projectname,
                        "startDate": data1.tasks[j].children[k].children[l].startDate,
                        "endDate": data1.tasks[j].children[k].children[l].endDate,
                        "sectionname": data1.tasks[j].children[k].children[l].sectionname,
                        "taskname": data1.tasks[j].children[k].children[l].taskname,
                        "assigneename": data1.tasks[j].children[k].children[l].assigneename,
                        "start": data1.tasks[j].children[k].children[l].start,
                        "end": data1.tasks[j].children[k].children[l].end,
                        "tags": data1.tasks[j].children[k].children[l].tags,
                        "uploads": data1.tasks[j].children[k].children[l].uploads,
                        "userId": data.userId,
                        "key": Math.random()
                        // "children": data1.tasks[j].children
                    }

                    var setter = {};
                    var findquery = {};
                    var findquery1 = {};
                    var findquery2 = {};


                    setter['tasks.' + j + '.children.' + k + '.children.' + l] = sample;
                    findquery["tasks." + j + ".children." + k + ".userId"] = data.userId
                    findquery1["tasks." + j + ".children." + k + ".sectionname"] = data.sectionName
                    findquery2["tasks." + j + ".children." + k + ".maintaskname"] = data1.tasks[j].taskname

                    // console.log("query" ,  findquery,setter,findquery1);
                    sections.update({ $and: [findquery, findquery1, findquery2] }, { $set: setter }, (err, obj) => {

                        if (err) console.log(err)

                        // console.log("updated2", obj)
						return result(obj)

                    })

                }


            }
        }

       
    }
    
}

module.exports = section2;

