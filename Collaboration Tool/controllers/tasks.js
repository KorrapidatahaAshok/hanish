const tasks = require('./../models/tasks');
const section = require('./../models/sections');
var profileSchema = require("mongoose").model("Userprofile");
const calendar = require('.././models/calendarEvents');
const notifications = require('.././models/notifications');
var chat = require("mongoose").model("ChatMessages");

const taskhandler = require('./taskhandler');
const subtaskhandler = require('./subtaskhandler');
const updatesubtaskhandler = require('./updatesubtaskhandler');
const createtaskhandler = require('./createtaskhandler');

const express = require('express');
var multer = require('multer')
var path = require('path');
var nodemailer = require('nodemailer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        console.log(file)
        callback(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const router = express.Router();


router.post("/createTasks", (req, res) => {


    createtaskhandler.createtask(req.body, req, res);

    // console.log(req.body)

})

router.get('/getTasks/:id', (req, res) => {

    tasks.find({ userId: req.params.id }, (err, result) => {

        if (err) res.json(err)

        res.json(result)
    })
})

router.get('/findUserNotifications/:id', (req, res) => {

    notifications.find({ userId: req.params.id }, (err, result) => {

        if (err) res.json(err)

        res.json(result)
    })
})

router.post("/createSubTasks", (req, res) => {

    console.log(req.body)

    subtaskhandler.createsubtask(req.body, req, res);


})


router.post("/updatetasks", function (req, res) {

    // console.log(req.body)

    // console.log("children", req.body.fieldvalues.children)

    taskhandler.updatetasks(req.body, req, res);
    
})


router.post("/upadatesubtasks", function (req, res) {


    updatesubtaskhandler.updatesubtask(req.body, req, res);

    // console.log(req.body)

})

router.post("/deletetasks", function (req, res) {

    section.update({ "tasks._id": req.body.data._id }, { $pull: { "tasks": { _id: req.body.data._id } } }, function (err, result) {

        if (err) console.log(err)

        var output = {

            msg: "Task deleted successfully.",
            condition: true
       }
       res.json(output)

    })

})

router.post("/counttasks", function(req, res) {

    console.log(req.body)

    section.findOne({ $and: [{"sectionName": req.body.data.sectionname, "userId": req.body.data.userId}]}, (err, obj) => {

        if(err) console.log(err)
        else {

        var array = [];

        // console.log(obj.tasks.length)
        array.push(obj.tasks.length)

            for(var i=0; i<obj.tasks.length; i++) {

                array.push(obj.tasks[i].children.length)

                // console.log(obj.tasks[i].children.length)

                if(req.body.data.userId == obj.tasks[i].userId){
                
                for(var j=0; j<obj.tasks[i].children.length; j++) {

                    if(req.body.data.userId == obj.tasks[i].children[j].userId)

                    // console.log(obj.tasks[i].children[j].children.length)

                    array.push(obj.tasks[i].children[j].children.length)

                    for(var k=0; k<obj.tasks[i].children[j].children.length; k++) {

                        if(req.body.data.userId == obj.tasks[i].children[j].children[k].userId) {

                            // console.log(obj.tasks[i].children[j].children[k].children.length)
                            array.push(obj.tasks[i].children[j].children[k].children.length)
                        }
                        
                    }
                }
            }
            
            }
        console.log("array", array)

        var c = array.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
         })

         console.log("c", 100/c)
       

        if(req.body.check == true) {

            obj.count += Math.ceil(100/c);
        }
        else {

            obj.count -= Math.ceil(100/c);
        }

        section.update({$and: [{"sectionName": req.body.data.sectionname, "userId": req.body.data.userId}] }, {$set: {count: obj.count}}, (err, obj2) => {

            if(err) console.log(err)
            var output = {

                msg: "Count added"
            }
            console.log(output)
            res.json(output)
        })
    }
    })
})

router.post("/deletesubtasks", function (req, res) {

    // console.log("body", req.body)

    if (req.body.data.subtaskname) {

        if(req.body.data.subsubtaskname) {

            // console.log("Hello Jaya")

            section.findOne({ $and: [{ "tasks.children.children.children._id" : req.body.data._id, "sectionName": req.body.data.sectionname}]}, (err, obj2) => {

                if(err) console.log(err)

                // console.log("obj2", obj2)

                for(var i=0; i< obj2.tasks.length; i++) {

                    // console.log(obj2.tasks[i])

                    if(req.body.data.maintaskname == obj2.tasks[i].taskname) {

                        // console.log(obj2.tasks[i])

                        for (var j=0; j< obj2.tasks[i].children.length; j++) {

                            // console.log(obj2.tasks[i].children[j])
                            if(req.body.data.subtaskname == obj2.tasks[i].children[j].taskname) {

                                // console.log(obj2.tasks[i].children[j])
                                for(var k=0; k< obj2.tasks[i].children[j].children.length; k++) {

                                    // console.log(obj2.tasks[i].children[j].children[k])

                                    if(req.body.data.subsubtaskname == obj2.tasks[i].children[j].children[k].taskname) {

                                        // console.log(obj2.tasks[i].children[j].children[k])

                                        for(var l=0; l< obj2.tasks[i].children[j].children[k].children.length; l++) {

                                            if(req.body.data.taskname == obj2.tasks[i].children[j].children[k].children[l].taskname) {

                                                // console.log(obj2.tasks[i].children[j].children[k].children[l])

                                                obj2.tasks[i].children[j].children[k].children[l].remove();
                                                console.log("removed")

                                                obj2.save(function (err) {
                                                    // do something
                                                    var output = {
            
                                                        msg: "Sub task deleted successfully.",
                                                        condition: true
                                                   }
                                                   res.json(output)
                                                  });

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

        // console.log("Hiiii")

        section.findOne({ $and: [{ "tasks.children.children._id": req.body.data._id }, { "sectionName": req.body.data.sectionname }] }, (err, obj1) => {

            if (err) console.log(err)

            // console.log("obj1", obj1)
            for (var i = 0; i < obj1.tasks.length; i++) {

                if (req.body.data.maintaskname == obj1.tasks[i].taskname) {

                    for (var j = 0; j < obj1.tasks[i].children.length; j++) {

                        if (req.body.data.subtaskname == obj1.tasks[i].children[j].taskname) {


                            for (var k = 0; k < obj1.tasks[i].children[j].children.length; k++) {


                                if (req.body.data.taskname == obj1.tasks[i].children[j].children[k].taskname) {
                                    // console.log(obj1.tasks[i].children[j].children[k])

                                    obj1.tasks[i].children[j].children[k].remove();
                                    console.log("removed")
                                    obj1.save(function (err) {
                                        // do something
                                        var output = {

                                            msg: "Sub task deleted successfully.",
                                            condition: true
                                       }
                                       res.json(output)
                                      });
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

        section.update({ $and: [{ "tasks.children._id": req.body.data._id }, { "sectionName": req.body.data.sectionname }] }, { $pull: { "tasks.$.children": { _id: req.body.data._id } } }, function (err, result) {

            if (err) console.log(err)

           var output = {

                msg: "Sub task deleted successfully.",
                condition: true
           }
           res.json(output)

        })
    }

})




router.post('/profile', function (req, res) {

    var upload = multer({
        storage: storage
    }).single('userFile')
    upload(req, res, function (err) {
        res.end('File is uploaded')
    })

})

module.exports = router;