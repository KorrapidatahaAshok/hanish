var section1 = {};

var sections = require("../Collaboration Tool/models/sections")

section1.cal = (data, data1, result) => {

    var array = [];

    // console.log("sectiondata", data)
        for(var i=0; i<data1.length; i++) {
            
        if(i == 0) {

            if(data1[i].sectionName == data.sectionName) {

               for(var j=0; j<data1[i].tasks.length; j++) {

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
               sections.update({ $and: [{ "userId": data.userId, "sectionName": data.sectionName }] }, { $push: { tasks: {$each: array } }}, (err, obj) => {

                if (err) console.log(err)

                // console.log("updated", obj)
                console.log("HIIIIIIII")
				return result(obj)

                // console.log("dtaa", data)               

            })

            }
        }


}
  
   

    // return result;
}

module.exports = section1;

