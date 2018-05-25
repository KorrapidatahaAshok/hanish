const tasks = require('./../models/tasks');
const section = require('./../models/sections');
var profileSchema = require("mongoose").model("Userprofile");
const calendar = require('.././models/calendarEvents');
const notifications = require('.././models/notifications');

const express = require('express');
var multer = require('multer')
var path = require('path');
var nodemailer = require('nodemailer');

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		console.log(file)
		callback(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
	}
})

const router = express.Router();


router.post("/createTasks", (req, res) => {

    // console.log(req.body)

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    var a = new Date(req.body.fieldvalues.rangeData[0]);
    var b = new Date(req.body.fieldvalues.rangeData[1]);
    
    var taskdata = {

        projectname: req.body.fieldvalues.projectname,
        sectionname: req.body.fieldvalues.sectionname,
        taskname: req.body.fieldvalues.taskname,
        description: req.body.fieldvalues.description,
        comments: req.body.fieldvalues.comments,
        followers: req.body.fieldvalues.followers,
        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
        start: a.toString(),
        end: b.toString(),
        assigneename: req.body.fieldvalues.assigneename,
        tags: req.body.fieldvalues.tags,
        uploads: req.body.fieldvalues.upload,
        userId: req.body.fieldvalues.userid

    }

    // console.log("taskdata", taskdata)

    let projectData = new tasks(taskdata)

    section.update({$and:[{ "userId":req.body.fieldvalues.userid, "sectionName" : req.body.fieldvalues.sectionname }]}, {$push: {tasks: taskdata }}, (err, result) => {

        if(err){
            var output = {

                msg: "Error in creating task",
                err: err,
                condition: false
            }

            res.json(output)
           
        }
        else{

            var eventData = {

                desc: req.body.fieldvalues.description,
                start: a.toString(),
                end: b.toString(),
                title: req.body.fieldvalues.taskname,
                userId: req.body.fieldvalues.userid
              };

            var eventDataSave = new calendar(eventData)

            eventDataSave.save((err, data) => {

                if (err) {
                    
                    res.json("err")
                }
                else {

                if(req.body.fieldvalues.assigneename) {

     
            profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){

                if (err) console.log(err)

                console.log("result",result.email)

                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'forgot@getviahome.com',
                        pass: 'viahome321!' 
                    }
                })

                var mailOptions = {
                    from: 'forgot@getviahome.com',
                    to: result.email,
                    subject: 'TASK',
                    text: 'Task Detailes',
                    html: '<p>Hi ' + result.username + ', </p><p>The following task has been assigned to you.<p><h2 style= "color: blue"> ' + req.body.fieldvalues.taskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                       
                }
                transporter.sendMail(mailOptions, (error, obj) => {

                    if (error) console.log(error);

                    console.log(obj)
                    
                    projectData.save()
                    .then(response => {

                        var msg1 = {
                            
                            userId: result._id,
                            name:  "Get ViaHome" ,
                            notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                        }
                        let sample = new notifications(msg1)

                        sample.save()
                        .then((data) => {

                            var out = {
                
                                msg: "Task created successfully",
                                condition: true,
                                result: response,
                                msg1: msg1
                            }
                            res.send(out)
                        })
                        .catch((err) => {

                            var output = {
                
                                msg: "Cannot create Task.",
                                condition: false,
                                result: err
                            }
                            res.json(output)
                        })
                        
                    })
                    .catch(err => {
                        var output = {
                
                            msg: "Cannot create Task.",
                            condition: false,
                            result: err
                        }
                        res.json(output)
                    })
                   
                })

            })
        }
        else {

            var out = {
                
                msg: "Task created successfully",
                condition: true,
             
            }
            res.send(out)
        }
            
        }
        
                
    })


        }
    })
})

router.get('/getTasks/:id', (req, res) => {

    tasks.find({userId: req.params.id}, (err, result) => {

        if(err) res.json(err)

        res.json(result)
    })
})

router.get('/findUserNotifications/:id', (req, res) => {

    notifications.find({userId: req.params.id}, (err, result) => {

        if(err) res.json(err)

        res.json(result)
    })
})

router.post("/createSubTasks", (req, res) => {

    console.log(req.body)

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    if(req.body.fieldvalues.newsubtaskname) {


        if(req.body.fieldvalues.subsubtaskname) {

            console.log("Heloooooooooo")
        var a = new Date(req.body.fieldvalues.rangeData[0]);
        var b = new Date(req.body.fieldvalues.rangeData[1]);

        var taskdata = {

        maintaskname: req.body.fieldvalues.taskname,
        taskname: req.body.fieldvalues.subtaskname,
        subtaskname: req.body.fieldvalues.newsubtaskname,
        subsubtaskname: req.body.fieldvalues.subsubtaskname,
        sectionname: req.body.fieldvalues.sectionname,
        description: req.body.fieldvalues.description,
        comments: req.body.fieldvalues.comments,
        followers: req.body.fieldvalues.followers,
        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
        start: a.toString(),
        end: b.toString(),
        assigneename: req.body.fieldvalues.assigneename,
        tags: req.body.fieldvalues.tags,
        uploads: req.body.fieldvalues.upload,
        userId: req.body.fieldvalues.userid

        }

        section.findOne({ $and: [{"sectionName": req.body.fieldvalues.sectionname, "userId": req.body.fieldvalues.userid}] }, (err, obj) => {

            if (err) console.log(err)
            // console.log(obj)
            for (var i=0; i< obj.tasks.length; i++) {
               
                if(obj.tasks[i].taskname == req.body.fieldvalues.taskname) {
    
                    // console.log(obj.tasks[i])
    
                    for(var j=0; j<obj.tasks[i].children.length; j++) {          
    
                        if(obj.tasks[i].children[j].taskname == req.body.fieldvalues.newsubtaskname ) {
    
                        //    console.log("obj", obj.tasks[i].children[j])

                           for(var k=0; k<obj.tasks[i].children[j].children.length; k++) {

                            if(obj.tasks[i].children[j].children[k].taskname == req.body.fieldvalues.subsubtaskname) {

                                // console.log(obj.tasks[i].children[j].children[k])

                                var setter = {};
                                var findquery = {};
                                setter['tasks.'+i+'.children.'+j+'.children.'+k+'.children'] = taskdata;
                                findquery["tasks."+i+".taskname"] = req.body.fieldvalues.taskname

                                console.log("query" ,  findquery,setter);
                                section.update( findquery, {$push: setter}, (err, result) => {

                                    if (err) console.log(err)
        
                                   console.log("result", result)
                                   var eventData = {

                                    desc: req.body.fieldvalues.description,
                                    start: a.toString(),
                                    end: b.toString(),
                                    title: req.body.fieldvalues.taskname,
                                    userId: req.body.fieldvalues.userid
                                
                                  };
                    
                                var eventDataSave = new calendar(eventData)
                    
                                eventDataSave.save((err, data) => {
                    
                                    if (err) {
                                        
                                        res.json("err")
                                    }
                                    else {
                
                                        console.log("save")
                
                                        if( req.body.fieldvalues.assigneename) {
                                    
                                        profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){
                
                                            if (err) console.log(err)
                            
                                            // console.log("result",result.email)
                            
                                            var transporter = nodemailer.createTransport({
                                                service: 'Gmail',
                                                auth: {
                                                    user: 'forgot@getviahome.com',
                                                    pass: 'viahome321!' 
                                                }
                                            })
                            
                                            var mailOptions = {
                                                from: 'forgot@getviahome.com',
                                                to: result.email,
                                                subject: 'TASK',
                                                text: 'Task Detailes',
                                                html: '<p>Hi ' + result.email + ', </p><p>The following TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                                                   
                                            }
                                            transporter.sendMail(mailOptions, (error, obj) => {
                            
                                                if (error) console.log(error);
                            
                                                console.log("obj", obj)
                
                                                tasks.findOne({$and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, function(err, obj1) {
                
                                                    if(err) {
                                                        
                                                        console.log(err)
                                                        var output = {
                            
                                                            msg: "Task data not found",
                                                            obj1: obj1,
                                                            condition: false,
                                                            data: obj
                                                        }
                                    
                                                        res.json(output)
                                                    }
                
                                                    console.log("obj1", obj1)
                
                                                    if(obj1 == null) {
                
                                                        let data = new tasks(updatedata)
                
                                                        data.save()
                
                                                        .then((res) => {
                
                                                            var msg1 = {
                                            
                                                                userId: result._id,
                                                                name:  "Get ViaHome" ,
                                                                notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                                                            }
                
                                                            let sample = new notifications(msg1)
                
                                                            var output = {
                            
                                                                msg: "Sub Task created successfully.",
                                                                result: result,
                                                                condition: true,
                                                                data: obj
                                                            }
                                        
                                                            res.json(output)
                                                        })
                                                        .catch((err) => {
                
                                                            res.json(err)
                                                        })
                                                       
                                                    }
                                                    else {
                                                        tasks.update({ $and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, {$set: {tasks: updatedata}}, (err, result) => {
                
                                                            if(err) console.log(err)
                
                                                            var output = {
                            
                                                                msg: "Sub Task created successfully.",
                                                                result: result,
                                                                condition: true,
                                                                data: obj
                                                            }
                                        
                                                            res.json(output)
                
                                                        })
                                                    }
                                                })
                            
                                               
                                            })
                        
                                        })
                                    }
                                    else {
                                        var output = {
                            
                                            msg: "Sub Task created successfully.",                          
                                            condition: true,
                                            
                                        }
                    
                                        res.json(output)
                                    }
                
                                 
                            }
                            // console.log(output)
                            
                        })
                                })
                            }
                           }
                  
                        }
    
                    }
    
                }
            }
        })


        }
        else {

        var a = new Date(req.body.fieldvalues.rangeData[0]);
        var b = new Date(req.body.fieldvalues.rangeData[1]);

        var taskdata = {

        maintaskname: req.body.fieldvalues.taskname,
        taskname: req.body.fieldvalues.subtaskname,
        subtaskname: req.body.fieldvalues.newsubtaskname,
        sectionname: req.body.fieldvalues.sectionname,
        description: req.body.fieldvalues.description,
        comments: req.body.fieldvalues.comments,
        followers: req.body.fieldvalues.followers,
        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
        start: a.toString(),
        end: b.toString(),
        assigneename: req.body.fieldvalues.assigneename,
        tags: req.body.fieldvalues.tags,
        uploads: req.body.fieldvalues.upload,
        userId: req.body.fieldvalues.userid

    }

  
    section.findOne({ "tasks.taskname": req.body.fieldvalues.taskname }, (err, obj) => {

        if (err) console.log(err)
        // console.log(obj)
        for (var i=0; i< obj.tasks.length; i++) {
           
            if(obj.tasks[i].taskname == req.body.fieldvalues.taskname) {

                // console.log(obj.tasks[i])

                for(var j=0; j<obj.tasks[i].children.length; j++) {          

                    if(obj.tasks[i].children[j].taskname == req.body.fieldvalues.newsubtaskname ) {

                      //  console.log(obj.tasks[i].children[j])
                        console.log("j",j)
                        var query = {};
                        var setter = {};
                        var findquery = {};
                        setter['tasks.'+i+'.children.'+j+'.children'] = taskdata;
                        findquery["tasks."+i+".taskname"] = req.body.fieldvalues.taskname
                      //   query =  findquery , { $set: setter };
                        console.log("query" ,  findquery,setter);
                        section.update( findquery, {$push: setter}, (err, result) => {

                            if (err) console.log(err)

                           console.log("result", result)
                           var eventData = {

                            desc: req.body.fieldvalues.description,
                            start: a.toString(),
                            end: b.toString(),
                            title: req.body.fieldvalues.taskname,
                            userId: req.body.fieldvalues.userid
                        
                          };
            
                        var eventDataSave = new calendar(eventData)
            
                        eventDataSave.save((err, data) => {
            
                            if (err) {
                                
                                res.json("err")
                            }
                            else {
        
                                console.log("save")
        
                                if( req.body.fieldvalues.assigneename) {
                            
                                profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){
        
                                    if (err) console.log(err)
                    
                                    // console.log("result",result.email)
                    
                                    var transporter = nodemailer.createTransport({
                                        service: 'Gmail',
                                        auth: {
                                            user: 'forgot@getviahome.com',
                                            pass: 'viahome321!' 
                                        }
                                    })
                    
                                    var mailOptions = {
                                        from: 'forgot@getviahome.com',
                                        to: result.email,
                                        subject: 'TASK',
                                        text: 'Task Detailes',
                                        html: '<p>Hi ' + result.email + ', </p><p>The following TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                                           
                                    }
                                    transporter.sendMail(mailOptions, (error, obj) => {
                    
                                        if (error) console.log(error);
                    
                                        console.log("obj", obj)
        
                                        tasks.findOne({$and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, function(err, obj1) {
        
                                            if(err) {
                                                
                                                console.log(err)
                                                var output = {
                    
                                                    msg: "Task data not found",
                                                    obj1: obj1,
                                                    condition: false,
                                                    data: obj
                                                }
                            
                                                res.json(output)
                                            }
        
                                            console.log("obj1", obj1)
        
                                            if(obj1 == null) {
        
                                                let data = new tasks(updatedata)
        
                                                data.save()
        
                                                .then((res) => {
        
                                                    var msg1 = {
                                    
                                                        userId: result._id,
                                                        name:  "Get ViaHome" ,
                                                        notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                                                    }
        
                                                    let sample = new notifications(msg1)
        
                                                    var output = {
                    
                                                        msg: "Sub Task created successfully.",
                                                        result: result,
                                                        condition: true,
                                                        data: obj
                                                    }
                                
                                                    res.json(output)
                                                })
                                                .catch((err) => {
        
                                                    res.json(err)
                                                })
                                               
                                            }
                                            else {
                                                tasks.update({ $and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, {$set: {tasks: updatedata}}, (err, result) => {
        
                                                    if(err) console.log(err)
        
                                                    var output = {
                    
                                                        msg: "Sub Task created successfully.",
                                                        result: result,
                                                        condition: true,
                                                        data: obj
                                                    }
                                
                                                    res.json(output)
        
                                                })
                                            }
                                        })
                    
                                       
                                    })
                
                                })
                            }
                            else {
                                var output = {
                    
                                    msg: "Sub Task created successfully.",                          
                                    condition: true,
                                    
                                }
            
                                res.json(output)
                            }
        
                         
                    }
                    // console.log(output)
                    
                })
                        })

                    } 
                }

            }
        }
    })
        
    }
}

    else {

        console.log("Hi Jaya")

    var a = new Date(req.body.fieldvalues.rangeData[0]);
    var b = new Date(req.body.fieldvalues.rangeData[1]);

    var taskdata = {

        maintaskname: req.body.fieldvalues.taskname,
        taskname: req.body.fieldvalues.subtaskname,
        sectionname: req.body.fieldvalues.sectionname,
        description: req.body.fieldvalues.description,
        comments: req.body.fieldvalues.comments,
        followers: req.body.fieldvalues.followers,
        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
        start: a.toString(),
        end: b.toString(),
        assigneename: req.body.fieldvalues.assigneename,
        tags: req.body.fieldvalues.tags,
        uploads: req.body.fieldvalues.upload,
        userId: req.body.fieldvalues.userid

    }

    console.log("taskdata", taskdata)
    section.findOne({ "sectionName": req.body.fieldvalues.sectionname }, (err, result) => {

        if(err) res.json(err)

        //  console.log("assigneename",result)

        section.update({ $and: [{ "tasks.taskname" : req.body.fieldvalues.taskname , "sectionName": req.body.fieldvalues.sectionname }] }, {$push:{ "tasks.$.children": taskdata}}, (err, result) => {

            if(err){
                var output = {
    
                    msg: "Error in creating subtask",
                    err: err,
                    condition: false
                }
               
            }
            else{
                console.log("JAYAYAAAA")
                var eventData = {

                    desc: req.body.fieldvalues.description,
                    start: a.toString(),
                    end: b.toString(),
                    title: req.body.fieldvalues.taskname,
                    userId: req.body.fieldvalues.userid
                  };
    
                var eventDataSave = new calendar(eventData)
    
                eventDataSave.save((err, data) => {
    
                    if (err) {
                        
                        res.json("err")
                    }
                    else {
                        
                if(req.body.fieldvalues.assigneename !== undefined) {

                profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){

                    if (err) console.log(err)
    
                    // console.log("result",result.email)
    
                    var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'forgot@getviahome.com',
                            pass: 'viahome321!' 
                        }
                    })
    
                    var mailOptions = {
                        from: 'forgot@getviahome.com',
                        to: result.email,
                        subject: 'SUB TASK',
                        text: 'SubTask Detailes',
                        html: '<p>Hi ' + result.username + ', </p><p>The following SUB TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                           
                    }
                    transporter.sendMail(mailOptions, (error, obj) => {
    
                        if (error) console.log(error);
    
                        console.log(obj)
    
                           var eventData = {

                                    desc: req.body.fieldvalues.description,
                                    start: a.toString(),
                                    end: b.toString(),
                                    title: req.body.fieldvalues.taskname,
                                    userId: req.body.fieldvalues.userid
                                
                                  };
                    
                                var eventDataSave = new calendar(eventData)
                    
                                eventDataSave.save((err, data) => {
                    
                                    if (err) {
                                        
                                        res.json("err")
                                    }
                                    else {
                
                                        console.log("save")
                
                                        if( req.body.fieldvalues.assigneename) {
                                    
                                        profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){
                
                                            if (err) console.log(err)
                            
                                            // console.log("result",result.email)
                            
                                            var transporter = nodemailer.createTransport({
                                                service: 'Gmail',
                                                auth: {
                                                    user: 'forgot@getviahome.com',
                                                    pass: 'viahome321!' 
                                                }
                                            })
                            
                                            var mailOptions = {
                                                from: 'forgot@getviahome.com',
                                                to: result.email,
                                                subject: 'TASK',
                                                text: 'Task Detailes',
                                                html: '<p>Hi ' + result.email + ', </p><p>The following TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                                                   
                                            }
                                            transporter.sendMail(mailOptions, (error, obj) => {
                            
                                                if (error) console.log(error);
                            
                                                console.log("obj", obj)
                
                                                tasks.findOne({$and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, function(err, obj1) {
                
                                                    if(err) {
                                                        
                                                        console.log(err)
                                                        var output = {
                            
                                                            msg: "Task data not found",
                                                            obj1: obj1,
                                                            condition: false,
                                                            data: obj
                                                        }
                                    
                                                        res.json(output)
                                                    }
                
                                                    console.log("obj1", obj1)
                
                                                    if(obj1 == null) {
                
                                                        let data = new tasks(updatedata)
                
                                                        data.save()
                
                                                        .then((res) => {
                
                                                            var msg1 = {
                                            
                                                                userId: result._id,
                                                                name:  "Get ViaHome" ,
                                                                notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                                                            }
                
                                                            let sample = new notifications(msg1)
                
                                                            var output = {
                            
                                                                msg: "Sub Task created successfully.",
                                                                result: result,
                                                                condition: true,
                                                                data: obj
                                                            }
                                        
                                                            res.json(output)
                                                        })
                                                        .catch((err) => {
                
                                                            res.json(err)
                                                        })
                                                       
                                                    }
                                                    else {
                                                        tasks.update({ $and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, {$set: {tasks: updatedata}}, (err, result) => {
                
                                                            if(err) console.log(err)
                
                                                            var output = {
                            
                                                                msg: "Sub Task created successfully.",
                                                                result: result,
                                                                condition: true,
                                                                data: obj
                                                            }
                                        
                                                            res.json(output)
                
                                                        })
                                                    }
                                                })
                            
                                               
                                            })
                        
                                        })
                                    }
                                    else {
                                        var output = {
                            
                                            msg: "Sub Task created successfully.",                          
                                            condition: true,
                                            
                                        }
                    
                                        res.json(output)
                                    }
                
                                 
                            }
                            // console.log(output)
                            
                        })
                    })

                })
            }
            else {
                var output = {
    
                    msg: "SubTask created successfully.",
                   
                    condition: true,
                  
                }

                res.json(output)

            }
            }
        })

            }
          
        })
    })
}

})


router.post("/updatetasks",function(req,res){

    // console.log(req.body)

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    var a = new Date(req.body.fieldvalues.rangeData[0]);
    var b = new Date(req.body.fieldvalues.rangeData[1]);

    var updatedata = {

        _id:req.body.fieldvalues.id,
        projectname: req.body.fieldvalues.projectname,
        sectionname: req.body.fieldvalues.sectionname,
        taskname: req.body.fieldvalues.taskname,
        description: req.body.fieldvalues.description,
        comments: req.body.fieldvalues.comments,
        followers: req.body.fieldvalues.followers,
        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
        start: a.toString(),
        end: b.toString(),
        assigneename: req.body.fieldvalues.assigneename,
        tags: req.body.fieldvalues.tags,
        uploads: req.body.fieldvalues.upload,
        children: req.body.fieldvalues.children,
        userId: req.body.fieldvalues.userid

    }

    section.update({ "tasks._id": req.body.fieldvalues.id } ,{$set:{ "tasks.$": updatedata }},function(err,result){

        if(err) {		
			var output = {

				msg: "Cannot update task details",
				condition: false
			}
			res.json(output)
		}
		
		else {

            console.log("result", result)

			if(result.nModified == 0) {

				var output = {
					msg: "Task data not modified",
					condition: false,
					result: result
                }
                res.json(output)
         
            }
 			else {                

                var eventData = {

                    desc: req.body.fieldvalues.description,
                    start: a.toString(),
                    end: b.toString(),
                    title: req.body.fieldvalues.taskname,
                    userId: req.body.fieldvalues.userid
                
                  };
    
                var eventDataSave = new calendar(eventData)
    
                eventDataSave.save((err, data) => {
    
                    if (err) {
                        
                        res.json("err")
                    }
                    else {

                        console.log("save")

                        if( req.body.fieldvalues.assigneename) {
                    
                        profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){

                            if (err) console.log(err)
            
                            // console.log("result",result.email)
            
                            var transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'forgot@getviahome.com',
                                    pass: 'viahome321!' 
                                }
                            })
            
                            var mailOptions = {
                                from: 'forgot@getviahome.com',
                                to: result.email,
                                subject: 'TASK',
                                text: 'Task Detailes',
                                html: '<p>Hi ' + result.email + ', </p><p>The following TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                                   
                            }
                            transporter.sendMail(mailOptions, (error, obj) => {
            
                                if (error) console.log(error);
            
                                console.log("obj", obj)

                                tasks.findOne({$and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, function(err, obj1) {

                                    if(err) {
                                        
                                        console.log(err)
                                        var output = {
            
                                            msg: "Task data not found",
                                            obj1: obj1,
                                            condition: false,
                                            data: obj
                                        }
                    
                                        res.json(output)
                                    }

                                    console.log("obj1", obj1)

                                    if(obj1 == null) {

                                        let data = new tasks(updatedata)

                                        data.save()

                                        .then((res) => {

                                            var msg1 = {
                            
                                                userId: result._id,
                                                name:  "Get ViaHome" ,
                                                notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                                            }

                                            let sample = new notifications(msg1)

                                            var output = {
            
                                                msg: "Task updated successfully.",
                                                result: result,
                                                condition: true,
                                                data: obj
                                            }
                        
                                            res.json(output)
                                        })
                                        .catch((err) => {

                                            res.json(err)
                                        })
                                       
                                    }
                                    else {
                                        tasks.update({ $and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, {$set: {tasks: updatedata}}, (err, result) => {

                                            if(err) console.log(err)

                                            var output = {
            
                                                msg: "Task updated successfully.",
                                                result: result,
                                                condition: true,
                                                data: obj
                                            }
                        
                                            res.json(output)

                                        })
                                    }
                                })
            
                               
                            })
        
                        })
                    }
                    else {
                        var output = {
            
                            msg: "Task updated successfully.",                          
                            condition: true,
                            
                        }
    
                        res.json(output)
                    }

				 
			}
            // console.log(output)
			
		})
    }
    }
    })
  })


  router.post("/upadatesubtasks",function(req,res){

    // console.log(req.body)

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    if(req.body.fieldvalues.newsubtaskname) {


        if(req.body.fieldvalues.subsubtaskname) {

            // console.log("Hello Jaya")
         
            var a = new Date(req.body.fieldvalues.rangeData[0]);
            var b = new Date(req.body.fieldvalues.rangeData[1]);
    
            var taskdata = {
    
            maintaskname: req.body.fieldvalues.taskname,
            taskname: req.body.fieldvalues.subtaskname,
            subtaskname: req.body.fieldvalues.newsubtaskname,
            subsubtaskname: req.body.fieldvalues.subsubtaskname,
            sectionname: req.body.fieldvalues.sectionname,
            description: req.body.fieldvalues.description,
            comments: req.body.fieldvalues.comments,
            followers: req.body.fieldvalues.followers,
            startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
            endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
            start: a.toString(),
            end: b.toString(),
            assigneename: req.body.fieldvalues.assigneename,
            tags: req.body.fieldvalues.tags,
            uploads: req.body.fieldvalues.upload,
            userId: req.body.fieldvalues.userid
    
            }
    
            section.findOne({ $and: [{"sectionName": req.body.fieldvalues.sectionname, "userId": req.body.fieldvalues.userid}] }, (err, obj) => {
    
                if (err) console.log(err)
                // console.log(obj)
                for (var i=0; i< obj.tasks.length; i++) {
                   
                    if(obj.tasks[i].taskname == req.body.fieldvalues.taskname) {
        
                        // console.log(obj.tasks[i])
        
                        for(var j=0; j<obj.tasks[i].children.length; j++) {          
        
                            if(obj.tasks[i].children[j].taskname == req.body.fieldvalues.newsubtaskname ) {
        
                            //console.log("obj", obj.tasks[i].children[j])
    
                               for(var k=0; k<obj.tasks[i].children[j].children.length; k++) {
    
                                if(obj.tasks[i].children[j].children[k].taskname == req.body.fieldvalues.subsubtaskname) {
    
                                    // console.log("obj", obj.tasks[i].children[j].children[k])

                                    for(var l=0; l<obj.tasks[i].children[j].children[k].children.length; l++) {

                                        if(obj.tasks[i].children[j].children[k].children[l]._id == req.body.fieldvalues.id) {

                                            // console.log("obj", obj.tasks[i].children[j].children[k].children[l])
                                            var setter = {};
                                            var findquery = {};
                                            setter['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l] = taskdata;
                                            findquery['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l + '._id'] = req.body.fieldvalues.id

                                            // console.log("query", findquery, setter);
                                            section.update(findquery, { $set: setter }, (err, result) => {

                                                if (err) console.log(err)

                                                console.log("result", result)
                                                if(result.nModified == 0) {

                                                    var output = {
                        
                                                        msg: "SubTask data not modified.",
                                                        result: result,
                                                        condition: false,
                                                        data: obj
                                                    }
                                
                                                    res.json(output)
                                                }    
                                                else { 
                                                    var eventData = {

                                                        desc: req.body.fieldvalues.description,
                                                        start: a.toString(),
                                                        end: b.toString(),
                                                        title: req.body.fieldvalues.taskname,
                                                        userId: req.body.fieldvalues.userid
                                                    
                                                      };
                                        
                                                    var eventDataSave = new calendar(eventData)
                                        
                                                    eventDataSave.save((err, data) => {
                                        
                                                        if (err) {
                                                            
                                                            res.json("err")
                                                        }
                                                        else {
                                    
                                                            console.log("save")
                                    
                                                            if( req.body.fieldvalues.assigneename) {
                                                        
                                                            profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){
                                    
                                                                if (err) console.log(err)
                                                
                                                                // console.log("result",result.email)
                                                
                                                                var transporter = nodemailer.createTransport({
                                                                    service: 'Gmail',
                                                                    auth: {
                                                                        user: 'forgot@getviahome.com',
                                                                        pass: 'viahome321!' 
                                                                    }
                                                                })
                                                
                                                                var mailOptions = {
                                                                    from: 'forgot@getviahome.com',
                                                                    to: result.email,
                                                                    subject: 'TASK',
                                                                    text: 'Task Detailes',
                                                                    html: '<p>Hi ' + result.email + ', </p><p>The following TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                                                                       
                                                                }
                                                                transporter.sendMail(mailOptions, (error, obj) => {
                                                
                                                                    if (error) console.log(error);
                                                
                                                                    console.log("obj", obj)
                                    
                                                                    tasks.findOne({$and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, function(err, obj1) {
                                    
                                                                        if(err) {
                                                                            
                                                                            console.log(err)
                                                                            var output = {
                                                
                                                                                msg: "Task data not found",
                                                                                obj1: obj1,
                                                                                condition: false,
                                                                                data: obj
                                                                            }
                                                        
                                                                            res.json(output)
                                                                        }
                                    
                                                                        console.log("obj1", obj1)
                                    
                                                                        if(obj1 == null) {
                                    
                                                                            let data = new tasks(updatedata)
                                    
                                                                            data.save()
                                    
                                                                            .then((res) => {
                                    
                                                                                var msg1 = {
                                                                
                                                                                    userId: result._id,
                                                                                    name:  "Get ViaHome" ,
                                                                                    notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                                                                                }
                                    
                                                                                let sample = new notifications(msg1)
                                    
                                                                                var output = {
                                                
                                                                                    msg: "Task updated successfully.",
                                                                                    result: result,
                                                                                    condition: true,
                                                                                    data: obj
                                                                                }
                                                            
                                                                                res.json(output)
                                                                            })
                                                                            .catch((err) => {
                                    
                                                                                res.json(err)
                                                                            })
                                                                           
                                                                        }
                                                                        else {
                                                                            tasks.update({ $and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, {$set: {tasks: updatedata}}, (err, result) => {
                                    
                                                                                if(err) console.log(err)
                                    
                                                                                var output = {
                                                
                                                                                    msg: "Sub Task updated successfully.",
                                                                                    result: result,
                                                                                    condition: true,
                                                                                    data: obj
                                                                                }
                                                            
                                                                                res.json(output)
                                    
                                                                            })
                                                                        }
                                                                    })
                                                
                                                                   
                                                                })
                                            
                                                            })
                                                        }
                                                        else {
                                                            var output = {
                                                
                                                                msg: "Sub Task updated successfully.",                          
                                                                condition: true,
                                                                
                                                            }
                                        
                                                            res.json(output)
                                                        }
                                    
                                                     
                                                }
                                                // console.log(output)
                                                
                                            })
                                                // var output = {
                        
                                                //     msg: "SubTask updated successfully.",
                                                //     result: result,
                                                //     condition: true,
                                                //     data: obj
                                                // }
                            
                                                // res.json(output)
                                            }
                                            })
                                        } 
                                    }
    
                                   
                                }
                               }
                      
                            }
        
                        }
        
                    }
                }
            })
    
        }
        else {

        // console.log("Helloooo")
        var a = new Date(req.body.fieldvalues.rangeData[0]);
        var b = new Date(req.body.fieldvalues.rangeData[1]);

        var taskdata = {

        maintaskname: req.body.fieldvalues.taskname,
        taskname: req.body.fieldvalues.subtaskname,
        subtaskname: req.body.fieldvalues.newsubtaskname,
        sectionname: req.body.fieldvalues.sectionname,
        description: req.body.fieldvalues.description,
        comments: req.body.fieldvalues.comments,
        followers: req.body.fieldvalues.followers,
        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
        start: a.toString(),
        end: b.toString(),
        assigneename: req.body.fieldvalues.assigneename,
        tags: req.body.fieldvalues.tags,
        uploads: req.body.fieldvalues.upload,
        userId: req.body.fieldvalues.userid,
        children: req.body.fieldvalues.children

    }

  
    section.findOne({ $and: [{"sectionName": req.body.fieldvalues.sectionname, "userId": req.body.fieldvalues.userid}] }, (err, obj) => {

        if (err) console.log(err)
        // console.log(obj)
        for (var i=0; i< obj.tasks.length; i++) {
            // console.log(obj.tasks[i])
           
            if(obj.tasks[i].taskname == req.body.fieldvalues.taskname) {

                for(var j=0; j<obj.tasks[i].children.length; j++) {  

                    if(obj.tasks[i].children[j].taskname == req.body.fieldvalues.newsubtaskname ) {

                    //    console.log("obj", obj.tasks[i].children[j])

                       for(var k=0; k<obj.tasks[i].children[j].children.length; k++) {

                        if(obj.tasks[i].children[j].children[k]._id == req.body.fieldvalues.id) {

                        // console.log("obj", obj.tasks[i].children[j].children[k])
                       
                        // console.log("j",j)
                        var query = {};
                        var setter = {};
                        var findquery = {};
                        var findquery1 = {};

                        setter['tasks.'+i+'.children.'+j+'.children.'+k] = taskdata;
                        findquery["tasks."+i+".children."+j+'.children.'+k+'._id'] = req.body.fieldvalues.id
                        findquery1["tasks."+i+".children."+j+'.children.'+k+'.userId'] = req.body.fieldvalues.userid
                     
                        // console.log("query" ,  findquery,findquery1,setter);
                        section.update( {$and: [findquery, findquery1]}, {$set: setter}, (err, result) => {

                            if (err) console.log(err)

                           console.log("result", result) 
                           if(result.nModified == 0) {

                            var output = {

                                msg: "SubTask data not modified.",
                                result: result,
                                condition: false,
                                data: obj
                            }
        
                            res.json(output)
                        }    
                        else { 
                            var eventData = {

                                desc: req.body.fieldvalues.description,
                                start: a.toString(),
                                end: b.toString(),
                                title: req.body.fieldvalues.taskname,
                                userId: req.body.fieldvalues.userid
                            
                              };
                
                            var eventDataSave = new calendar(eventData)
                
                            eventDataSave.save((err, data) => {
                
                                if (err) {
                                    
                                    res.json("err")
                                }
                                else {
            
                                    console.log("save")
            
                                    if( req.body.fieldvalues.assigneename) {
                                
                                    profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){
            
                                        if (err) console.log(err)
                        
                                        // console.log("result",result.email)
                        
                                        var transporter = nodemailer.createTransport({
                                            service: 'Gmail',
                                            auth: {
                                                user: 'forgot@getviahome.com',
                                                pass: 'viahome321!' 
                                            }
                                        })
                        
                                        var mailOptions = {
                                            from: 'forgot@getviahome.com',
                                            to: result.email,
                                            subject: 'TASK',
                                            text: 'Task Detailes',
                                            html: '<p>Hi ' + result.email + ', </p><p>The following TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                                               
                                        }
                                        transporter.sendMail(mailOptions, (error, obj) => {
                        
                                            if (error) console.log(error);
                        
                                            console.log("obj", obj)
            
                                            tasks.findOne({$and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, function(err, obj1) {
            
                                                if(err) {
                                                    
                                                    console.log(err)
                                                    var output = {
                        
                                                        msg: "Task data not found",
                                                        obj1: obj1,
                                                        condition: false,
                                                        data: obj
                                                    }
                                
                                                    res.json(output)
                                                }
            
                                                console.log("obj1", obj1)
            
                                                if(obj1 == null) {
            
                                                    let data = new tasks(updatedata)
            
                                                    data.save()
            
                                                    .then((res) => {
            
                                                        var msg1 = {
                                        
                                                            userId: result._id,
                                                            name:  "Get ViaHome" ,
                                                            notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                                                        }
            
                                                        let sample = new notifications(msg1)
            
                                                        var output = {
                        
                                                            msg: "Task updated successfully.",
                                                            result: result,
                                                            condition: true,
                                                            data: obj
                                                        }
                                    
                                                        res.json(output)
                                                    })
                                                    .catch((err) => {
            
                                                        res.json(err)
                                                    })
                                                   
                                                }
                                                else {
                                                    tasks.update({ $and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, {$set: {tasks: updatedata}}, (err, result) => {
            
                                                        if(err) console.log(err)
            
                                                        var output = {
                        
                                                            msg: "Sub Task updated successfully.",
                                                            result: result,
                                                            condition: true,
                                                            data: obj
                                                        }
                                    
                                                        res.json(output)
            
                                                    })
                                                }
                                            })
                        
                                           
                                        })
                    
                                    })
                                }
                                else {
                                    var output = {
                        
                                        msg: "Sub Task updated successfully.",                          
                                        condition: true,
                                        
                                    }
                
                                    res.json(output)
                                }
            
                             
                        }
                        // console.log(output)
                        
                    })
                    }
                        })
                        }
                       }
                    } 
                }

            }
        }
    })
    }
}
    else {

        console.log("JAyaaaaaaaaaaaaa")

    var a = new Date(req.body.fieldvalues.rangeData[0]);
    var b = new Date(req.body.fieldvalues.rangeData[1]);

    var upadatesubtasksdata= {

        _id: req.body.fieldvalues.id,
        maintaskname: req.body.fieldvalues.taskname,
        taskname: req.body.fieldvalues.subtaskname,
        sectionname: req.body.fieldvalues.sectionname,
        description: req.body.fieldvalues.description,
        comments: req.body.fieldvalues.comments,
        followers: req.body.fieldvalues.followers,
        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
        start: a.toString(),
        end: b.toString(),
        assigneename: req.body.fieldvalues.assigneename,
        tags: req.body.fieldvalues.tags,
        uploads: req.body.fieldvalues.upload,
        userId: req.body.fieldvalues.userid,
        children: req.body.fieldvalues.children
    }

    section.findOne({ $and: [{"sectionName": req.body.fieldvalues.sectionname, "userId": req.body.fieldvalues.userid}] }, (err, obj) => {

        if(err) {
            var output = {

				msg: "No subtask details",
				condition: false
			}
			res.json(output)
        }
        else {
            // console.log("obj", obj)

            for(var i=0; i<obj.tasks.length; i++) {
          
                for(var j=0; j<obj.tasks[i].children.length; j++) {

                    // console.log("obj", obj.tasks[i].children[j])

                    if(obj.tasks[i].children[j]._id == req.body.fieldvalues.id) {

                        // console.log("obj", obj.tasks[i].children[j])

                        var query = {};
                        var setter = {};
                        var findquery = {};
                        var findquery1 = {};


                        setter['tasks.'+i+'.children.'+j] = upadatesubtasksdata;
                        findquery["tasks."+i+".children."+j+"._id"] = req.body.fieldvalues.id
                        findquery["tasks."+i+".children."+j+".userId"] = req.body.fieldvalues.userid
                
                        // console.log("query" ,  findquery,setter);
                        section.update( {$and: [findquery, findquery1]}, {$set: setter}, (err, result) => {

                            if (err) console.log(err)

                            console.log("result", result)

                            if(result.nModified == 0) {

                                var output = {
    
                                    msg: "SubTask data not modified.",
                                    result: result,
                                    condition: false,
                                    data: obj
                                }
            
                                res.json(output)
                            }    
                            else { 
                                var eventData = {

                                    desc: req.body.fieldvalues.description,
                                    start: a.toString(),
                                    end: b.toString(),
                                    title: req.body.fieldvalues.taskname,
                                    userId: req.body.fieldvalues.userid
                                
                                  };
                    
                                var eventDataSave = new calendar(eventData)
                    
                                eventDataSave.save((err, data) => {
                    
                                    if (err) {
                                        
                                        res.json("err")
                                    }
                                    else {
                
                                        console.log("save")
                
                                        if( req.body.fieldvalues.assigneename) {
                                    
                                        profileSchema.findOne({"username":req.body.fieldvalues.assigneename},function(err,result){
                
                                            if (err) console.log(err)
                            
                                            // console.log("result",result.email)
                            
                                            var transporter = nodemailer.createTransport({
                                                service: 'Gmail',
                                                auth: {
                                                    user: 'forgot@getviahome.com',
                                                    pass: 'viahome321!' 
                                                }
                                            })
                            
                                            var mailOptions = {
                                                from: 'forgot@getviahome.com',
                                                to: result.email,
                                                subject: 'TASK',
                                                text: 'Task Detailes',
                                                html: '<p>Hi ' + result.email + ', </p><p>The following TASK has been assigned to you.<p><h2 style="color : blue"> ' +  req.body.fieldvalues.subtaskname + '.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
                                                   
                                            }
                                            transporter.sendMail(mailOptions, (error, obj) => {
                            
                                                if (error) console.log(error);
                            
                                                console.log("obj", obj)
                
                                                tasks.findOne({$and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, function(err, obj1) {
                
                                                    if(err) {
                                                        
                                                        console.log(err)
                                                        var output = {
                            
                                                            msg: "Task data not found",
                                                            obj1: obj1,
                                                            condition: false,
                                                            data: obj
                                                        }
                                    
                                                        res.json(output)
                                                    }
                
                                                    console.log("obj1", obj1)
                
                                                    if(obj1 == null) {
                
                                                        let data = new tasks(updatedata)
                
                                                        data.save()
                
                                                        .then((res) => {
                
                                                            var msg1 = {
                                            
                                                                userId: result._id,
                                                                name:  "Get ViaHome" ,
                                                                notification:  req.body.fieldvalues.taskname +' '+ '- Task is assigned by GetViaHome.'
                                                            }
                
                                                            let sample = new notifications(msg1)
                
                                                            var output = {
                            
                                                                msg: "Sub Task updated successfully.",
                                                                result: result,
                                                                condition: true,
                                                                data: obj
                                                            }
                                        
                                                            res.json(output)
                                                        })
                                                        .catch((err) => {
                
                                                            res.json(err)
                                                        })
                                                       
                                                    }
                                                    else {
                                                        tasks.update({ $and: [{"userId": req.body.fieldvalues.userid, "taskname": req.body.fieldvalues.taskname}]}, {$set: {tasks: updatedata}}, (err, result) => {
                
                                                            if(err) console.log(err)
                
                                                            var output = {
                            
                                                                msg: "Sub Task updated successfully.",
                                                                result: result,
                                                                condition: true,
                                                                data: obj
                                                            }
                                        
                                                            res.json(output)
                
                                                        })
                                                    }
                                                })
                            
                                               
                                            })
                        
                                        })
                                    }
                                    else {
                                        var output = {
                            
                                            msg: "Sub Task updated successfully.",                          
                                            condition: true,
                                            
                                        }
                    
                                        res.json(output)
                                    }
                
                                 
                            }
                            // console.log(output)
                            
                        })
                        }
                        })
                    }
                }

            }
        }
    })
}

  })

  router.post("/deletetasks",function(req,res){

    section.update({"tasks._id": req.body.data._id} ,{ $pull :{"tasks": {_id: req.body.data._id}}}, function(err,result){
        
        if(err) console.log(err)

        console.log("tasks deleted")

    })
    
  })

  router.post("/deletesubtasks",function(req,res){

    console.log("body", req.body)

    if(req.body.data.subtaskname) {
        console.log("Hiiii")

        section.findOne({ $and: [{ "tasks.children.children._id" : req.body.data._id }, { "sectionName": req.body.data.sectionname}] }, (err, obj1) => {

            if(err) console.log(err)

            // console.log("obj1", obj1)
            for(var i=0; i< obj1.tasks.length; i++) {

                if(req.body.data.maintaskname == obj1.tasks[i].taskname) {
                    
                    for(var j=0; j< obj1.tasks[i].children.length; j++) {

                        if(req.body.data.subtaskname == obj1.tasks[i].children[j].taskname ){

                           
                            for(var k=0; k<obj1.tasks[i].children[j].children.length; k++) {


                                if(req.body.data.taskname == obj1.tasks[i].children[j].children[k].taskname) {
                                    // console.log(obj1.tasks[i].children[j].children[k])

                                   
                                    var setter = {};
                                    var x = {};
                                    var setter1 = {};
                                    var findquery = {};
                                    var findquery1 = {};
                                    var findquery2 = {};
                                    var findquery3 = {};
                                   
                                    // setter['tasks.'+i+'.children.'+j+'.children.'+k+'._id'] = req.body.data._id;
                                    // setter1['tasks.'+i+'.children.'+j+'.children'] = obj1.tasks[i].children[j].children;
                                     x = 'tasks.'+i+'.children.'+j+'.children'
                                 
                                    findquery["tasks."+i+".children."+j+'.children.'+k+'.userId'] = req.body.data.userId
                                    findquery1["tasks."+i+".children."+j+'.children.'+k+'._id'] = req.body.data._id
                                    findquery2["tasks."+i+".children."+j+'.userId'] = req.body.data.userId
                                    findquery3["tasks."+i+'.userId'] = req.body.data.userId
                                  

                                    console.log("query", findquery, findquery1, x)
                                    
                                    section.update({$and: [findquery, findquery1, findquery2, findquery3]}, {$pull :{x: {"_id": req.body.data._id}}}, function(err,result){
        
                                        if(err) console.log(err)

                                        console.log("result", result)
                                
                                        // console.log("subtasksss deleted")
                                
                                    })

                                }
                            }
                        }

                    }
                }
            }
        })

       
      
    }
    else {

    section.update({ $and: [{ "tasks.children._id" : req.body.data._id }, { "sectionName": req.body.data.sectionname}] } ,{ $pull :{"tasks.$.children": {_id: req.body.data._id}}}, function(err,result){
        
        if(err) console.log(err)

        console.log("subtasks deleted")

    })
    }

  })


  router.post('/profile', function (req, res) {

	var upload = multer({
		storage: storage
	}).single('userFile')
	upload(req, res, function(err) {
		res.end('File is uploaded')
	})

  })

module.exports = router;