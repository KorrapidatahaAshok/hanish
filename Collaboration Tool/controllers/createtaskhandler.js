var createtaskhandler = {};

const tasks = require('./../models/tasks');
const section = require('./../models/sections');
var profileSchema = require("mongoose").model("Userprofile");
const calendar = require('.././models/calendarEvents');
const notifications = require('.././models/notifications');
const express = require('express');
var multer = require('multer')
var path = require('path');
var nodemailer = require('nodemailer');

createtaskhandler.createtask = (data, req, res) => {

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

var a = new Date(data.fieldvalues.rangeData[0]);
var b = new Date(data.fieldvalues.rangeData[1]);

var taskdata = {

    projectname: data.fieldvalues.projectname,
    sectionname: data.fieldvalues.sectionname,
    taskname: data.fieldvalues.taskname,
    description: data.fieldvalues.description,
    comments: data.fieldvalues.comments,
    followers: data.fieldvalues.followers,
    startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
    endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
    start: a.toString(),
    end: b.toString(),
    assigneename: data.fieldvalues.assigneename,
    tags: data.fieldvalues.tags,
    uploads: data.fieldvalues.upload,
    userId: data.fieldvalues.userid,
    key: Math.random()

}

// console.log("taskdata", taskdata)

// let projectData = new tasks(taskdata)

section.update({ $and: [{ "userId": data.fieldvalues.userid, "sectionName": data.fieldvalues.sectionname }] }, { $push: { tasks: taskdata } }, (err, result) => {

    if (err) {
        var output = {

            msg: "Error in creating task",
            err: err,
            condition: false
        }

        res.json(output)

    }
    else {
        profileSchema.findOne({ "_id": data.fieldvalues.userid }, function (err, result4) {
            
            if (err) console.log(err)


        if (data.fieldvalues.assigneename) {

            profileSchema.findOne({ "username": data.fieldvalues.assigneename }, function (err, result) {

                if (err) console.log(err)

                console.log("result", result.email)

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
                    subject: 'Task',
                    text: 'Task Details',
                    html: '<p>Hi ' + result.username + ', </p><p>The following task has been assigned to you.<p><h2 style= "color: blue"> ' + data.fieldvalues.taskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                }
                transporter.sendMail(mailOptions, (error, obj) => {

                    if (error) console.log(error);

                    console.log(obj)

                    var newcreatetaskdata = {

                        projectname: data.fieldvalues.projectname,
                        sectionname: data.fieldvalues.sectionname,
                        taskname: data.fieldvalues.taskname,
                        description: data.fieldvalues.description,
                        comments: data.fieldvalues.comments,
                        followers: data.fieldvalues.followers,
                        startDate: a.getDate().toString().concat(monthNames[a.getMonth()]),
                        endDate: b.getDate().toString().concat(monthNames[b.getMonth()]),
                        start: a.toString(),
                        end: b.toString(),
                        assigneename: data.fieldvalues.assigneename,
                        tags: data.fieldvalues.tags,
                        uploads: data.fieldvalues.upload,
                        userId: result._id,
                        creatorId: data.fieldvalues.userid
                    
                    }

                    let newtaskdata = new tasks(newcreatetaskdata)

                    newtaskdata.save()
                        .then(response => {

                            var msg1 = {

                                userId: result._id,
                                name: "Get ViaHome",
                                notification: data.fieldvalues.taskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                            }
                            let sample = new notifications(msg1)

                            sample.save()
                                .then((data1) => {

                                    var eventData = {

                                        desc: data.fieldvalues.description,
                                        start: a.toString(),
                                        end: b.toString(),
                                        title: data.fieldvalues.taskname,
                                        userId: result._id,
                                        creatorId: data.fieldvalues.userid
                                    };

                                    var eventDataSave = new calendar(eventData)

                                    eventDataSave.save()
                                    .then((result1) => {
                                        
                                        var out = {

                                            msg: "Task created successfully.",
                                            condition: true,
                                            // result: response,
                                            // msg1: msg1
                                        }
                                        res.json(out)

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

                msg: "Task created successfully.",
                condition: true,

            }
            res.json(out)
        }
    })

    }
})
}

module.exports = createtaskhandler;