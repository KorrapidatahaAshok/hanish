var section3 = {};

var sections = require("../Collaboration Tool/models/sections")

section3.cal = (data, data1, result) => {

    // console.log("data", data)
    // console.log("data1", data1)
    var array = [];

    for (var i = 0; i < data1.length; i++) {

        if (i == 1) {

            if (data1[i].sectionName == data.sectionName) {

                for (var j = 0; j < data1[i].tasks.length; j++) {

                    var sample = {

                        "comments": data1[i].tasks[j].comments,
                        "description": data1[i].tasks[j].description,
                        "followers": data1[i].tasks[j].followers,
                        "projectname": data1[i].tasks[j].projectname,
                        "startDate": data1[i].tasks[j].startDate,
                        "endDate": data1[i].tasks[j].endDate,
                        "sectionname": data1[i].tasks[j].sectionname,
                        "taskname": data1[i].tasks[j].taskname,
                        "assigneename": data1[i].tasks[j].assigneename,
                        "start": data1[i].tasks[j].start,
                        "end": data1[i].tasks[j].end,
                        "tags": data1[i].tasks[j].tags,
                        "uploads": data1[i].tasks[j].uploads,
                        "userId": data.userId,
                        "key": Math.random()

                    }

                    //    console.log("sample", sample)
                    array.push(sample)


                }
                sections.update({ $and: [{ "userId": data.userId, "sectionName": data.sectionName }] }, { $push: { tasks: { $each: array } } }, (err, obj) => {

                    if (err) console.log(err)

                    // console.log("updated", obj)
                    console.log("HIIIIIIII 1")
					return result(obj)

                    // console.log("dtaa", data)               

                })

            }
        }

    }
   
}

section3.cal1 = (data, data1, data2, result) => {

    if(data.sectionName == data1.sectionName) {

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
            findquery1["tasks." + j + ".sectionname"] = data.sectionName
            findquery2["tasks." + j + ".taskname"] = data1.tasks[j].taskname

            // console.log("query", findquery, findquery1, findquery2, setter);
            sections.update({ $and: [findquery, findquery1, findquery2] }, { $set: setter }, (err, obj) => {

                if (err) console.log(err)

                // console.log("updated3", obj)
				return result(obj)

            })


        }
    }
  
}
}

section3.cal2 = (data, data1, data2, result) => {

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

                        // console.log("updated4", obj)
						return result(obj)

                    })

                }


            }
        }

       
    }
   
}

section3.cal3 = (data, data1, data2, result) => {

    // console.log("data", data)
    // console.log("data1", data1)
    // console.log("data2", data2)
   if (data.sectionName == data1.sectionName) {

        // console.log("dat1", data1)

        for (let j = 0; j < data1.tasks.length; j++) {

            for (let k = 0; k < data1.tasks[j].children.length; k++) {
              
                for (let l = 0; l < data1.tasks[j].children[k].children.length; l++) {

                    for (let m = 0; m < data1.tasks[j].children[k].children[l].children.length; m++) {

                        // console.log(data1.tasks[j].children[k].children[l])

                        var sample = {

                            "maintaskname": data1.tasks[j].taskname,
                            "subtaskname": data1.tasks[j].children[k].taskname,
                            "subsubtaskname": data1.tasks[j].children[k].children[l].taskname,
                            "comments": data1.tasks[j].children[k].children[l].children[m].comments,
                            "description": data1.tasks[j].children[k].children[l].children[m].description,
                            "followers": data1.tasks[j].children[k].children[l].children[m].followers,
                            "projectname": data1.tasks[j].children[k].children[l].children[m].projectname,
                            "startDate": data1.tasks[j].children[k].children[l].children[m].startDate,
                            "endDate": data1.tasks[j].children[k].children[l].children[m].endDate,
                            "sectionname": data1.tasks[j].children[k].children[l].children[m].sectionname,
                            "taskname": data1.tasks[j].children[k].children[l].children[m].taskname,
                            "assigneename": data1.tasks[j].children[k].children[l].children[m].assigneename,
                            "start": data1.tasks[j].children[k].children[l].children[m].start,
                            "end": data1.tasks[j].children[k].children[l].children[m].end,
                            "tags": data1.tasks[j].children[k].children[l].children[m].tags,
                            "uploads": data1.tasks[j].children[k].children[l].children[m].uploads,
                            "userId": data.userId,
                            "key": Math.random()
                            // "children": data1.tasks[j].children
                        }

                        var setter = {};
                        var findquery = {};
                        var findquery1 = {};
                        var findquery2 = {};

                        setter['tasks.' + j + '.children.' + k + '.children.' + l + '.children.' + m] = sample;
                        findquery["tasks." + j + ".children." + k + ".children." + l + ".userId"] = data.userId
                        findquery1["tasks." + j + ".children." + k + ".children." + l + ".sectionname"] = data.sectionName
                        findquery2["tasks." + j + ".children." + k + ".children." + l + ".maintaskname"] = data1.tasks[j].taskname

                        // console.log("query", findquery, setter);
                        sections.update({ $and: [findquery, findquery1, findquery2] }, { $set: setter }, (err, obj) => {

                            if (err) console.log(err)

                            //  console.log("updated5", obj)
							return result(obj)

                        })
                    }

                }


            }
        }

       
    }
 
}




module.exports = section3;

