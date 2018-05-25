var subtaskhandler = {};

const tasks = require('./../models/tasks');
const section = require('./../models/sections');
var profileSchema = require("mongoose").model("Userprofile");
const calendar = require('.././models/calendarEvents');
const notifications = require('.././models/notifications');
const express = require('express');
var multer = require('multer')
var path = require('path');
var nodemailer = require('nodemailer');

subtaskhandler.createsubtask = (data, req, res) => {

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];

    if (data.fieldvalues.newsubtaskname) {


        if (data.fieldvalues.subsubtaskname) {

            console.log("Heloooooooooo")
            var a = new Date(data.fieldvalues.rangeData[0]);
            var b = new Date(data.fieldvalues.rangeData[1]);

            var taskdata = {

                maintaskname: data.fieldvalues.taskname,
                taskname: data.fieldvalues.subtaskname,
                subtaskname: data.fieldvalues.newsubtaskname,
                subsubtaskname: data.fieldvalues.subsubtaskname,
                sectionname: data.fieldvalues.sectionname,
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

            section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userid }] }, (err, obj) => {

                if (err) console.log(err)
                // console.log(obj)
                for (var i = 0; i < obj.tasks.length; i++) {

                    if (obj.tasks[i].taskname == data.fieldvalues.taskname) {

                        // console.log(obj.tasks[i])

                        for (var j = 0; j < obj.tasks[i].children.length; j++) {

                            if (obj.tasks[i].children[j].taskname == data.fieldvalues.newsubtaskname) {

                                //    console.log("obj", obj.tasks[i].children[j])

                                for (var k = 0; k < obj.tasks[i].children[j].children.length; k++) {

                                    if (obj.tasks[i].children[j].children[k].taskname == data.fieldvalues.subsubtaskname) {

                                        // console.log(obj.tasks[i].children[j].children[k])

                                        var setter = {};
                                        var findquery = {};
                                        var findquery1 = {};

                                        setter['tasks.' + i + '.children.' + j + '.children.' + k + '.children'] = taskdata;
                                        findquery["tasks." + i + ".taskname"] = data.fieldvalues.taskname
                                        findquery1["tasks." + i + ".userId"] = data.fieldvalues.userid

                                        console.log("query", findquery, setter);
                                        section.update({$and: [findquery, findquery1]}, { $push: setter }, (err, result) => {

                                            if (err) {

                                                console.log(err)

                                                //    console.log("result", result)

                                            }
                                            else {
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
                                                            subject: 'Sub-Sub-Sub Task',
                                                            text: 'Task Details',
                                                            html: '<p>Hi ' + result.username + ', </p><p>The following sub-sub-sub task has been assigned to you.<p><h2 style="color : blue"> ' + data.fieldvalues.subtaskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                                                        }
                                                        transporter.sendMail(mailOptions, (error, obj) => {

                                                            if (error) console.log(error);

                                                            console.log("obj", obj)


                                                            var newsubtaskdata = {

                                                                maintaskname: data.fieldvalues.taskname,
                                                                taskname: data.fieldvalues.subtaskname,
                                                                subtaskname: data.fieldvalues.newsubtaskname,
                                                                subsubtaskname: data.fieldvalues.subsubtaskname,
                                                                sectionname: data.fieldvalues.sectionname,
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

                                                            let data1 = new tasks(newsubtaskdata)

                                                            data1.save()

                                                                .then((result1) => {

                                                                    var msg1 = {

                                                                        userId: result._id,
                                                                        name: "Get ViaHome",
                                                                        notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                                    }

                                                                    let sample = new notifications(msg1)

                                                                    sample.save()
                                                                        .then((data2) => {

                                                                            var eventData = {

                                                                                desc: data.fieldvalues.description,
                                                                                start: a.toString(),
                                                                                end: b.toString(),
                                                                                title: data.fieldvalues.subtaskname,
                                                                                userId: result._id,
                                                                                creatorId: data.fieldvalues.userid
                                                                            };

                                                                            var eventDataSave = new calendar(eventData)

                                                                            eventDataSave.save()
                                                                                .then((result3) => {

                                                                                    var out = {

                                                                                        msg: "Sub-Sub-Sub Task created successfully.",
                                                                                        condition: true,
                                                                                        // result: response,
                                                                                        msg1: msg1
                                                                                    }
                                                                                    res.json(out)
                                                                                })
                                                                                .catch((err) => {
                                                                                    var output = {

                                                                                        msg: "Cannot create Sub Task.",
                                                                                        condition: false,
                                                                                        result: err
                                                                                    }
                                                                                    res.json(output)

                                                                                })

                                                                        })

                                                                })
                                                                .catch((err) => {

                                                                    var output = {

                                                                        msg: "Cannot create Sub Task.",
                                                                        condition: false,
                                                                        result: err
                                                                    }
                                                                    res.json(output)
                                                                })

                                                                .catch(err => {
                                                                    var output = {

                                                                        msg: "Cannot create Sub Task.",
                                                                        condition: false,
                                                                        result: err
                                                                    }
                                                                    res.json(output)
                                                                })

                                                        })

                                                    })
                                                }
                                                else {
                                                    var output = {

                                                        msg: "Sub-Sub-Sub Task created successfully.",
                                                        condition: true,

                                                    }

                                                    res.json(output)
                                                }
                                            })


                                            }
                                            // console.log(output)

                                            // })
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

            console.log
            var a = new Date(data.fieldvalues.rangeData[0]);
            var b = new Date(data.fieldvalues.rangeData[1]);

            var taskdata = {

                maintaskname: data.fieldvalues.taskname,
                taskname: data.fieldvalues.subtaskname,
                subtaskname: data.fieldvalues.newsubtaskname,
                sectionname: data.fieldvalues.sectionname,
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


            section.findOne({ $and: [{"tasks.taskname": data.fieldvalues.taskname, "userId": data.fieldvalues.userid }]}, (err, obj) => {

                if (err) console.log(err)
                // console.log(obj)
                for (var i = 0; i < obj.tasks.length; i++) {

                    if (obj.tasks[i].taskname == data.fieldvalues.taskname) {

                        // console.log(obj.tasks[i])

                        for (var j = 0; j < obj.tasks[i].children.length; j++) {

                            if (obj.tasks[i].children[j].taskname == data.fieldvalues.newsubtaskname) {

                                //  console.log(obj.tasks[i].children[j])
                             
                                var setter = {};
                                var findquery = {};
                                var findquery1 = {};

                                setter['tasks.' + i + '.children.' + j + '.children'] = taskdata;
                                findquery["tasks." + i + ".taskname"] = data.fieldvalues.taskname
                                findquery1["tasks." + i +".userId"] =  data.fieldvalues.userid

                                //   query =  findquery , { $set: setter };
                                console.log("query", findquery, setter);
                                section.update({$and:[findquery, findquery1]}, { $push: setter }, (err, result) => {

                                    if (err) console.log(err)


                                    else {

                                        console.log("save")
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
                                                    subject: 'Sub-Sub Task',
                                                    text: 'Task Details',
                                                    html: '<p>Hi ' + result.username + ', </p><p>The following sub-sub task has been assigned to you.<p><h2 style="color : blue"> ' + data.fieldvalues.subtaskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                                                }
                                                transporter.sendMail(mailOptions, (error, obj) => {

                                                    if (error) console.log(error);

                                                    console.log("obj", obj)


                                                    var newsubtaskdata1 = {

                                                        maintaskname: data.fieldvalues.taskname,
                                                        taskname: data.fieldvalues.subtaskname,
                                                        subtaskname: data.fieldvalues.newsubtaskname,
                                                        sectionname: data.fieldvalues.sectionname,
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
                                                        creatorId : data.fieldvalues.userid
                                                    }

                                                    let data1 = new tasks(newsubtaskdata1)

                                                    data1.save()

                                                        .then((result1) => {

                                                            var msg1 = {

                                                                userId: result._id,
                                                                name: "Get ViaHome",
                                                                notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                            }

                                                            let sample = new notifications(msg1)

                                                            sample.save()
                                                                .then((data2) => {

                                                                    var eventData = {

                                                                        desc: data.fieldvalues.description,
                                                                        start: a.toString(),
                                                                        end: b.toString(),
                                                                        title: data.fieldvalues.subtaskname,
                                                                        userId: result._id,
                                                                        creatorId: data.fieldvalues.userid
                                                                    };

                                                                    var eventDataSave = new calendar(eventData)

                                                                    eventDataSave.save()
                                                                        .then((result3) => {

                                                                            var out = {

                                                                                msg: "Sub-Sub Task created successfully.",
                                                                                condition: true,
                                                                                // result: response,
                                                                                msg1: msg1
                                                                            }
                                                                            res.json(out)
                                                                        })
                                                                        .catch((err) => {
                                                                            var output = {

                                                                                msg: "Cannot create Sub Task.",
                                                                                condition: false,
                                                                                result: err
                                                                            }
                                                                            res.json(output)

                                                                        })

                                                                })

                                                        })
                                                        .catch((err) => {

                                                            var output = {

                                                                msg: "Cannot create Sub Task.",
                                                                condition: false,
                                                                result: err
                                                            }
                                                            res.json(output)
                                                        })

                                                        .catch(err => {
                                                            var output = {

                                                                msg: "Cannot create Sub Task.",
                                                                condition: false,
                                                                result: err
                                                            }
                                                            res.json(output)
                                                        })

                                                })

                                            })
                                        }
                                        else {
                                            var output = {

                                                msg: "Sub-Sub Task created successfully.",
                                                condition: true,

                                            }

                                            res.json(output)
                                        }
                                    })


                                    }
                                    // console.log(output)


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

        console.log("data", data)

        var a = new Date(data.fieldvalues.rangeData[0]);
        var b = new Date(data.fieldvalues.rangeData[1]);

        var taskdata = {

            maintaskname: data.fieldvalues.taskname,
            taskname: data.fieldvalues.subtaskname,
            sectionname: data.fieldvalues.sectionname,
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

        console.log("taskdata", taskdata)
        section.findOne({ "sectionName": data.fieldvalues.sectionname }, (err, result) => {

            if (err) res.json(err)

            //  console.log("assigneename",result)

            section.update({ $and: [{ "tasks.taskname": data.fieldvalues.taskname, "userId": data.fieldvalues.userid }] }, { $push: { "tasks.$.children": taskdata } }, (err, result) => {

                if (err) {
                    var output = {

                        msg: "Error in creating subtask",
                        err: err,
                        condition: false
                    }

                }

                else {

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
                                subject: 'Sub Task',
                                text: 'Task Details',
                                html: '<p>Hi ' + result.username + ', </p><p>The following sub task has been assigned to you.<p><h2 style="color : blue"> ' + data.fieldvalues.subtaskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                            }
                            transporter.sendMail(mailOptions, (error, obj) => {

                                if (error) console.log(error);

                                console.log("obj", obj)


                                var newsubtaskdata2 = {

                                    maintaskname: data.fieldvalues.taskname,
                                    taskname: data.fieldvalues.subtaskname,
                                    sectionname: data.fieldvalues.sectionname,
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

                                let data1 = new tasks(newsubtaskdata2)

                                data1.save()

                                    .then((result1) => {

                                        var msg1 = {

                                            userId: result._id,
                                            name: "Get ViaHome",
                                            notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                        }

                                        let sample = new notifications(msg1)

                                        sample.save()
                                            .then((data2) => {

                                                var eventData = {

                                                    desc: data.fieldvalues.description,
                                                    start: a.toString(),
                                                    end: b.toString(),
                                                    title: data.fieldvalues.subtaskname,
                                                    userId: result._id,
                                                    creatorId: data.fieldvalues.userid
                                                };

                                                var eventDataSave = new calendar(eventData)

                                                eventDataSave.save()
                                                    .then((result3) => {

                                                        var out = {

                                                            msg: "Sub Task created successfully.",
                                                            condition: true,
                                                            // result: response,
                                                            msg1: msg1
                                                        }
                                                        res.json(out)
                                                    })
                                                    .catch((err) => {
                                                        var output = {

                                                            msg: "Cannot create Sub Task.",
                                                            condition: false,
                                                            result: err
                                                        }
                                                        res.json(output)

                                                    })

                                            })

                                    })
                                    .catch((err) => {

                                        var output = {

                                            msg: "Cannot create Sub Task.",
                                            condition: false,
                                            result: err
                                        }
                                        res.json(output)
                                    })

                                    .catch(err => {
                                        var output = {

                                            msg: "Cannot create Sub Task.",
                                            condition: false,
                                            result: err
                                        }
                                        res.json(output)
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
                })
                }

            })
        })
    }

}

module.exports = subtaskhandler;