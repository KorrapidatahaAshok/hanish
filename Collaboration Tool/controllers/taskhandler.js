var taskhandler = {};

const tasks = require('./../models/tasks');
const section = require('./../models/sections');
var profileSchema = require("mongoose").model("Userprofile");
const calendar = require('.././models/calendarEvents');
const notifications = require('.././models/notifications');
const express = require('express');
var multer = require('multer')
var path = require('path');
var nodemailer = require('nodemailer');

taskhandler.updatetasks = (data, req, res) => {

    // console.log("data", data)

    if (data.check == true || data.check == false) {

        section.update({ $and: [{ "tasks._id": data.fieldvalues._id, "userId": data.fieldvalues.userId }] }, { $set: { "tasks.$.check": data.check } }, function (err, result) {

            if (err) console.log(err)
            res.json("updated")
        })

    }
    else {

        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];

        var a = new Date(data.fieldvalues.rangeData[0]);
        var b = new Date(data.fieldvalues.rangeData[1]);
        var array = [];


        var updatedata = {

            _id: data.fieldvalues.id,
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
            children: data.fieldvalues.children,
            userId: data.fieldvalues.userid

        }



        section.findOne({ $and: [{ "tasks._id": data.fieldvalues.id, "userId": data.fieldvalues.userid }] }, function (err, obj5) {

            if (err) console.log(err)

            // console.log("obj5",obj5)


            for (var i = 0; i < obj5.tasks.length; i++) {

                // console.log("i",)
                if (obj5.tasks[i]._id == data.fieldvalues.id) {

                        if(obj5.tasks[i].assigneename) {
                            
                        if (obj5.tasks[i].assigneename !== data.fieldvalues.assigneename) {

                            profileSchema.findOne({ "username": obj5.tasks[i].assigneename }, function (err, obj6) {
                                if (err) console.log(err)

                                console.log("obj",obj6.email)

                                var transporter = nodemailer.createTransport({
                                    service: 'Gmail',
                                    auth: {
                                        user: 'forgot@getviahome.com',
                                        pass: 'viahome321!'
                                    }
                                })

                                var mailOptions = {
                                    from: 'forgot@getviahome.com',
                                    to: obj6.email,
                                    subject: 'TASK',
                                    text: 'Task Detailes',
                                    html: '<p>Hi ' + obj6.username + ', </p><p>The following task has been expired.<p><h2 style="color : blue"> ' + data.fieldvalues.taskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                                }

                                transporter.sendMail(mailOptions, (error, obj) => {

                                    if (error) console.log(error);

                                    console.log("obj", obj)
                                })

                            })
                        }
                    }

                    
                }
            }
            section.update({ $and: [{ "tasks._id": data.fieldvalues.id, "userId": data.fieldvalues.userid }] }, { $set: { "tasks.$": updatedata } }, function (err, result) {

                if (err) {
                    var output = {

                        msg: "Cannot update task details",
                        condition: false
                    }
                    res.json(output)
                }

                else {



                    // console.log("result", result)

                    if (result.nModified == 0) {

                        var output = {
                            msg: "Task data not modified",
                            condition: false,
                            result: result
                        }
                        res.json(output)

                    }

                    else {

                        // console.log("save")

                        profileSchema.findOne({ "_id": data.fieldvalues.userid }, function (err, result4) {

                            if (err) console.log(err)

                            if (data.fieldvalues.assigneename) {

                                profileSchema.findOne({ "username": data.fieldvalues.assigneename }, function (err, result) {

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
                                        html: '<p>Hi ' + result.username + ', </p><p>The following task has been assigned to you.<p><h2 style="color : blue"> ' + data.fieldvalues.taskname + '.</h2></p><p>Regards,</p><p>GetViaHome</p>'

                                    }
                                    transporter.sendMail(mailOptions, (error, obj) => {

                                        if (error) console.log(error);

                                        // console.log("obj", obj)

                                        tasks.findOne({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.taskname }] }, function (err, obj1) {

                                            if (err) {

                                                console.log(err)

                                                // res.json(output)
                                            }

                                            else {
                                                // console.log("obj1", obj1)

                                                var newtaskdata = {

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
                                                    children: data.fieldvalues.children,
                                                    userId: result._id,
                                                    creatorId: data.fieldvalues.userid
                                                }

                                                if (obj1 == null) {

                                                    let newdata = new tasks(newtaskdata)

                                                    newdata.save()

                                                        .then((data2) => {

                                                            var msg1 = {

                                                                userId: result._id,
                                                                name: "Get ViaHome",
                                                                notification: data.fieldvalues.taskname + ' ' + '- Task is assigned by' + ' ' + result4.username + '.'
                                                            }

                                                            let sample = new notifications(msg1)

                                                            sample.save()
                                                                .then((data3) => {

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
                                                                        .then((data4) => {

                                                                            var out = {

                                                                                msg: "Task updated successfully.",
                                                                                condition: true,
                                                                                // result: response,
                                                                                msg1: msg1
                                                                            }
                                                                            res.json(out)


                                                                        })
                                                                        .catch((err) => {
                                                                            var output = {

                                                                                msg: "Cannot Update Task.",
                                                                                condition: false,
                                                                                result: err
                                                                            }
                                                                            res.json(output)
                                                                        })

                                                                })
                                                                .catch((err) => {

                                                                    var output = {

                                                                        msg: "Cannot Update Task.",
                                                                        condition: false,
                                                                        result: err
                                                                    }
                                                                    res.json(output)
                                                                })


                                                        })

                                                        .catch(err => {
                                                            var output = {

                                                                msg: "Cannot Update Task.",
                                                                condition: false,
                                                                result: err
                                                            }
                                                            res.json(output)
                                                        })

                                                }

                                                else {

                                                    // console.log("Ashokkkk")

                                                    // console.log("newtaskdata", newtaskdata)
                                                    tasks.update({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.taskname }] }, { $set: newtaskdata }, (err, result1) => {

                                                        if (err) console.log(err)

                                                        else {
                                                            var msg1 = {

                                                                userId: result._id,
                                                                name: "Get ViaHome",
                                                                notification: data.fieldvalues.taskname + ' ' + '- Task is assigned by' + ' ' + result4.username + '.'
                                                            }

                                                            let sample1 = new notifications(msg1)
                                                            sample1.save()
                                                                .then((result2) => {

                                                                    console.log("res", result2)

                                                                    calendar.findOne({ $and: [{ "creatorId": data.fieldvalues.userid, "title": data.fieldvalues.taskname }] }, (err, calendarobj) => {

                                                                        if (err) {
                                                                            console.log(err)
                                                                        }
                                                                        else {
                                                                            console.log("calendarobj", calendarobj)


                                                                            var eventData = {

                                                                                desc: data.fieldvalues.description,
                                                                                start: a.toString(),
                                                                                end: b.toString(),
                                                                                title: data.fieldvalues.taskname,
                                                                                userId: result._id,
                                                                                creatorId: data.fieldvalues.userid
                                                                            };


                                                                            if (calendarobj == null) {

                                                                                var eventDataSave = new calendar(eventData)

                                                                                eventDataSave.save()
                                                                                    .then((result3) => {

                                                                                        var output = {

                                                                                            msg: "Task updated successfully.",
                                                                                            condition: true,
                                                                                            // result: result3
                                                                                        }
                                                                                        res.json(output)

                                                                                    })
                                                                                    .catch((err) => {

                                                                                        var output = {

                                                                                            msg: "Cannot Update Task.",
                                                                                            condition: false,
                                                                                            result: err
                                                                                        }
                                                                                        res.json(output)
                                                                                    })
                                                                            }
                                                                            else {

                                                                                calendar.update({ $and: [{ "creatorId": data.fieldvalues.userid, "title": data.fieldvalues.taskname }] }, { $set: eventData }, (err, obj2) => {

                                                                                    if (err) {
                                                                                        console.log(err)
                                                                                    }
                                                                                    else {

                                                                                        var output = {

                                                                                            msg: "Task updated successfully.",
                                                                                            condition: true,
                                                                                            // result: result3
                                                                                        }
                                                                                        res.json(output)

                                                                                    }
                                                                                })
                                                                            }


                                                                        }
                                                                    })



                                                                })
                                                                .catch((err) => {

                                                                    // console.log("err", err)

                                                                    var output = {

                                                                        msg: "Cannot Update Task.",
                                                                        condition: false,
                                                                        result: err
                                                                    }
                                                                    res.json(output)
                                                                })

                                                        }


                                                    })
                                                }
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
                        })


                    }
                    // console.log(output)



                }
            })

        })


    }

}
module.exports = taskhandler;