var updatesubtaskhandler = {};

const tasks = require('./../models/tasks');
const section = require('./../models/sections');
var profileSchema = require("mongoose").model("Userprofile");
const calendar = require('.././models/calendarEvents');
const notifications = require('.././models/notifications');
const express = require('express');
var multer = require('multer')
var path = require('path');
var nodemailer = require('nodemailer');


updatesubtaskhandler.updatesubtask = (data, req, res) => {

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];

    if (data.fieldvalues.newsubtaskname) {


        if (data.fieldvalues.subsubtaskname) {

            // console.log("Hello Jaya")
            if(data.fieldvalues.rangeData) {

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
                userId: data.fieldvalues.userid

            }

            section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userid }] }, (err, obj) => {

                if (err) console.log(err)
                // console.log(obj)
                for (var i = 0; i < obj.tasks.length; i++) {

                    if (obj.tasks[i].taskname == data.fieldvalues.taskname) {

                        // console.log(obj.tasks[i])

                        for (var j = 0; j < obj.tasks[i].children.length; j++) {

                            if (obj.tasks[i].children[j].taskname == data.fieldvalues.newsubtaskname) {

                                //console.log("obj", obj.tasks[i].children[j])

                                for (var k = 0; k < obj.tasks[i].children[j].children.length; k++) {

                                    if (obj.tasks[i].children[j].children[k].taskname == data.fieldvalues.subsubtaskname) {

                                        // console.log("obj", obj.tasks[i].children[j].children[k])

                                        for (var l = 0; l < obj.tasks[i].children[j].children[k].children.length; l++) {

                                            if (obj.tasks[i].children[j].children[k].children[l]._id == data.fieldvalues.id) {

                                                if(obj.tasks[i].children[j].children[k].children[l].assigneename) {

                                                    if (obj.tasks[i].children[j].children[k].children[l].assigneename !== data.fieldvalues.assigneename) {

                                                        profileSchema.findOne({ "username": obj.tasks[i].children[j].children[k].children[l].assigneename }, function (err, obj6) {
                                                            if (err) console.log(err)

                                                            console.log("obj", obj6.email)

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
                                                                subject: 'Sub-Sub-Sub Task',
                                                                text: 'Task Details',
                                                                html: '<p>Hi ' + obj6.username + ', </p><p>The following sub-sub-sub task has been expired.<p><h2 style="color : blue"> ' + data.fieldvalues.subtaskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                                                            }

                                                            transporter.sendMail(mailOptions, (error, obj) => {

                                                                if (error) console.log(error);

                                                                console.log("obj", obj)
                                                            })

                                                        })
                                                    }
                                                }

                                                // console.log("obj", obj.tasks[i].children[j].children[k].children[l])
                                                var setter = {};
                                                var findquery = {};
                                                setter['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l] = taskdata;
                                                findquery['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l + '._id'] = data.fieldvalues.id

                                                // console.log("query", findquery, setter);
                                                section.update(findquery, { $set: setter }, (err, result) => {

                                                    if (err) console.log(err)

                                                    console.log("result", result)
                                                    if (result.nModified == 0) {

                                                        var output = {

                                                            msg: "Sub-Sub-Sub Task data not modified.",
                                                            result: result,
                                                            condition: false,
                                                            data: obj
                                                        }

                                                        res.json(output)
                                                    }


                                                    else {

                                                    profileSchema.findOne({ "_id": data.fieldvalues.userid }, function (err, result4) {
            
                                                            if (err) console.log(err)

                                                        console.log("save")

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

                                                                    tasks.findOne({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.subtaskname }] }, function (err, obj1) {

                                                                        if (err) {

                                                                            console.log(err)
                                                                            var output = {

                                                                                msg: "Sub-Sub-Sub Task data not found",
                                                                                obj1: obj1,
                                                                                condition: false,
                                                                                data: obj
                                                                            }

                                                                            // res.json(output)
                                                                        }
                                                                        else {

                                                                        console.log("obj1", obj1)

                                                                        var subsubtaskdata = {

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

                                                                        if (obj1 == null) {

                                                                            let data1 = new tasks(subsubtaskdata)

                                                                            data1.save()

                                                                                .then((res) => {

                                                                                    var msg1 = {

                                                                                        userId: result._id,
                                                                                        name: "Get ViaHome",
                                                                                        notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                                                    }

                                                                                    let sample = new notifications(msg1)

                                                                                    sample.save()
                                                                                        .then((data) => {

                                                                                            var eventData = {

                                                                                                desc: data.fieldvalues.description,
                                                                                                start: a.toString(),
                                                                                                end: b.toString(),
                                                                                                title: data.fieldvalues.subtaskname,
                                                                                                userId: result._id
                                                                                            };

                                                                                            var eventDataSave = new calendar(eventData)

                                                                                            eventDataSave.save()
                                                                                            .then((result1) => {
                                                                                                
                                                                                                var out = {

                                                                                                    msg: "Sub-Sub-Sub Task updated successfully",
                                                                                                    condition: true,
                                                                                                    // result: response,
                                                                                                    msg1: msg1
                                                                                                }
                                                                                                res.json(out)

                                                                                            })
                                                                                            .catch((err) => {
                                                                                                var output = {

                                                                                                    msg: "Cannot update Sub Task.",
                                                                                                    condition: false,
                                                                                                    result: err
                                                                                                }
                                                                                                res.json(output)
                                                                                            })


                                                                                        })

                                                                                })
                                                                                .catch((err) => {

                                                                                    var output = {

                                                                                        msg: "Cannot update Sub Task.",
                                                                                        condition: false,
                                                                                        result: err
                                                                                    }
                                                                                    res.json(output)
                                                                                })

                                                                                .catch(err => {
                                                                                    var output = {

                                                                                        msg: "Cannot update Sub Task.",
                                                                                        condition: false,
                                                                                        result: err
                                                                                    }
                                                                                    res.json(output)
                                                                                })

                                                                        }
                                                                        else {
                                                                            tasks.update({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.subtaskname }] }, { $set: subsubtaskdata  }, (err, result1) => {

                                                                                if (err) console.log(err)
                                        
                                                                               else {
                                                                                var msg1 = {
                                        
                                                                                    userId: result._id,
                                                                                    name: "Get ViaHome",
                                                                                    notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                                                }
                                        
                                                                                let sample1 = new notifications(msg1)
                                                                                sample1.save()
                                                                                .then((result2) => {
                                        
                                                                                    console.log("res", result2)
                                        
                                                                                    calendar.findOne({$and:[{ "creatorId": data.fieldvalues.userid, "title": data.fieldvalues.subtaskname}]}, (err, calendarobj) => {
                                        
                                                                                        if(err) {
                                                                                            console.log(err)
                                                                                        }
                                                                                        else {
                                                                                            console.log("calendarobj", calendarobj)
                                        
                                                                                            
                                                                                            var eventData = {
                                        
                                                                                                desc: data.fieldvalues.description,
                                                                                                start: a.toString(),
                                                                                                end: b.toString(), 
                                                                                                title: data.fieldvalues.subtaskname,
                                                                                                userId: result._id,
                                                                                                creatorId: data.fieldvalues.userid
                                                                                            };
                                        
                                        
                                                                                            if(calendarobj == null) {
                                        
                                                                                                var eventDataSave = new calendar(eventData)
                                        
                                                                                                eventDataSave.save()
                                                                                                .then((result3) => {
                                        
                                                                                                    var output = {
                                        
                                                                                                        msg: "Sub-Sub-Sub Task updated successfully.",
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
                                        
                                                                                                calendar.update({$and: [{"creatorId": data.fieldvalues.userid, "title": data.fieldvalues.subtaskname}]}, {$set: eventData}, (err, obj2) => {
                                        
                                                                                                    if(err){
                                                                                                        console.log(err)
                                                                                                    }
                                                                                                    else {
                                        
                                                                                                        var output = {
                                        
                                                                                                            msg: "Sub-Sub-Sub Task updated successfully.",
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

                                                                msg: "Sub-Sub-Sub Task updated successfully.",
                                                                condition: true,

                                                            }

                                                            res.json(output)
                                                        }
                                                    })


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
            section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userid }] }, (err, obj) => {

                if (err) console.log(err)
                // console.log(obj)
                for (var i = 0; i < obj.tasks.length; i++) {

                    if (obj.tasks[i].taskname == data.fieldvalues.taskname) {

                        // console.log(obj.tasks[i])

                        for (var j = 0; j < obj.tasks[i].children.length; j++) {

                            if (obj.tasks[i].children[j].taskname == data.fieldvalues.newsubtaskname) {

                                //console.log("obj", obj.tasks[i].children[j])

                                for (var k = 0; k < obj.tasks[i].children[j].children.length; k++) {

                                    if (obj.tasks[i].children[j].children[k].taskname == data.fieldvalues.subsubtaskname) {

                                        // console.log("obj", obj.tasks[i].children[j].children[k])

                                        for (var l = 0; l < obj.tasks[i].children[j].children[k].children.length; l++) {

                                            if (obj.tasks[i].children[j].children[k].children[l]._id == data.fieldvalues.id) {

                                                // console.log("obj", obj.tasks[i].children[j].children[k].children[l])
                                                var setter = {};
                                                var findquery = {};
                                                setter['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l + '.check'] = data.check;
                                                findquery['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l + '._id'] = data.fieldvalues.id

                                                // console.log("query", findquery, setter);
                                                section.update(findquery, { $set: setter }, (err, result) => {

                                                    if (err) console.log(err)

                                                    // console.log("result", result)
                                                    var output = {

                                                        msg: "updated",
                                                        condition: true
                                                    }
                                                    res.json(output)
                                                    
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

        }
        else {

            // console.log("Helloooo")       
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
                children: data.fieldvalues.children

            }


            section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userid }] }, (err, obj) => {

                if (err) console.log(err)
                // console.log(obj)
                for (var i = 0; i < obj.tasks.length; i++) {
                    // console.log(obj.tasks[i])

                    if (obj.tasks[i].taskname == data.fieldvalues.taskname) {

                        for (var j = 0; j < obj.tasks[i].children.length; j++) {

                            if (obj.tasks[i].children[j].taskname == data.fieldvalues.newsubtaskname) {

                                //    console.log("obj", obj.tasks[i].children[j])

                                for (var k = 0; k < obj.tasks[i].children[j].children.length; k++) {

                                    if (obj.tasks[i].children[j].children[k]._id == data.fieldvalues.id) {

                                        if(obj.tasks[i].children[j].children[k].assigneename) {

                                            if (obj.tasks[i].children[j].children[k].assigneename !== data.fieldvalues.assigneename) {

                                                profileSchema.findOne({ "username": obj.tasks[i].children[j].children[k].assigneename }, function (err, obj6) {
                                                    if (err) console.log(err)

                                                    console.log("obj", obj6.email)

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
                                                        subject: 'Sub-Sub Task',
                                                        text: 'Task Details',
                                                        html: '<p>Hi ' + obj6.username + ', </p><p>The following sub-sub task has been expired.<p><h2 style="color : blue"> ' + data.fieldvalues.subtaskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                                                    }

                                                    transporter.sendMail(mailOptions, (error, obj) => {

                                                        if (error) console.log(error);

                                                        console.log("obj", obj)
                                                    })

                                                })
                                            }
                                        }

                                        // console.log("obj", obj.tasks[i].children[j].children[k])

                                        // console.log("j",j)
                                        var query = {};
                                        var setter = {};
                                        var findquery = {};
                                        var findquery1 = {};

                                        setter['tasks.' + i + '.children.' + j + '.children.' + k] = taskdata;
                                        findquery["tasks." + i + ".children." + j + '.children.' + k + '._id'] = data.fieldvalues.id
                                        findquery1["tasks." + i + ".children." + j + '.children.' + k + '.userId'] = data.fieldvalues.userid

                                        // console.log("query" ,  findquery,findquery1,setter);
                                        section.update({ $and: [findquery, findquery1] }, { $set: setter }, (err, result) => {

                                            if (err) console.log(err)

                                            console.log("result", result)
                                            if (result.nModified == 0) {

                                                var output = {

                                                    msg: "Sub-Sub Task data not modified.",
                                                    result: result,
                                                    condition: false,
                                                    data: obj
                                                }

                                                res.json(output)
                                            }

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

                                                            tasks.findOne({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.subtaskname }] }, function (err, obj1) {

                                                                if (err) {

                                                                    console.log(err)
                                                                    var output = {

                                                                        msg: "Task data not found",
                                                                        obj1: obj1,
                                                                        condition: false,
                                                                        data: obj
                                                                    }

                                                                    // res.json(output)
                                                                }
                                                                else {

                                                                console.log("obj1", obj1)

                                                                var subsubtaskdata = {

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
                                                                    children: data.fieldvalues.children,
                                                                    userId: result._id,
                                                                    creatorId: data.fieldvalues.userid
                                                                }

                                                                if (obj1 == null) {

                                                                    let data1 = new tasks(subsubtaskdata)

                                                                    data1.save()

                                                                        .then((res) => {

                                                                            var msg1 = {

                                                                                userId: result._id,
                                                                                name: "Get ViaHome",
                                                                                notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                                            }

                                                                            let sample = new notifications(msg1)

                                                                            sample.save()
                                                                                .then((data) => {

                                                                                    var eventData = {

                                                                                        desc: data.fieldvalues.description,
                                                                                        start: a.toString(),
                                                                                        end: b.toString(),
                                                                                        title: data.fieldvalues.subtaskname,
                                                                                        userId: result._id
                                                                                    };

                                                                                    var eventDataSave = new calendar(eventData)

                                                                                    eventDataSave.save()
                                                                                    .then((result1) => {
                                                                                        
                                                                                        var out = {

                                                                                            msg: "Sub-Sub Task updated successfully",
                                                                                            condition: true,
                                                                                            // result: response,
                                                                                            msg1: msg1
                                                                                        }
                                                                                        res.json(out)

                                                                                    })
                                                                                    .catch((err) => {
                                                                                        var output = {

                                                                                            msg: "Cannot update Sub Task.",
                                                                                            condition: false,
                                                                                            result: err
                                                                                        }
                                                                                        res.json(output)
                                                                                    })


                                                                                })

                                                                        })
                                                                        .catch((err) => {

                                                                            var output = {

                                                                                msg: "Cannot update Sub Task.",
                                                                                condition: false,
                                                                                result: err
                                                                            }
                                                                            res.json(output)
                                                                        })

                                                                        .catch(err => {
                                                                            var output = {

                                                                                msg: "Cannot update Sub Task.",
                                                                                condition: false,
                                                                                result: err
                                                                            }
                                                                            res.json(output)
                                                                        })

                                                                }
                                                                else {
                                                                    tasks.update({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.subtaskname }] }, { $set: subsubtaskdata  }, (err, result1) => {

                                                                        if (err) console.log(err)
                                
                                                                       else {
                                                                        var msg1 = {
                                
                                                                            userId: result._id,
                                                                            name: "Get ViaHome",
                                                                            notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                                        }
                                
                                                                        let sample1 = new notifications(msg1)
                                                                        sample1.save()
                                                                        .then((result2) => {
                                
                                                                            console.log("res", result2)
                                
                                                                            calendar.findOne({$and:[{ "creatorId": data.fieldvalues.userid, "title": data.fieldvalues.subtaskname}]}, (err, calendarobj) => {
                                
                                                                                if(err) {
                                                                                    console.log(err)
                                                                                }
                                                                                else {
                                                                                    console.log("calendarobj", calendarobj)
                                
                                                                                    
                                                                                    var eventData = {
                                
                                                                                        desc: data.fieldvalues.description,
                                                                                        start: a.toString(),
                                                                                        end: b.toString(), 
                                                                                        title: data.fieldvalues.subtaskname,
                                                                                        userId: result._id,
                                                                                        creatorId: data.fieldvalues.userid
                                                                                    };
                                
                                
                                                                                    if(calendarobj == null) {
                                
                                                                                        var eventDataSave = new calendar(eventData)
                                
                                                                                        eventDataSave.save()
                                                                                        .then((result3) => {
                                
                                                                                            var output = {
                                
                                                                                                msg: "Sub-Sub Task updated successfully.",
                                                                                                condition: true,
                                                                                                // result: result3
                                                                                            }
                                                                                            res.json(output)
                                
                                                                                        })
                                                                                        .catch((err) => {
                                
                                                                                            var output = {
                                
                                                                                                msg: "Cannot Update Sub Task.",
                                                                                                condition: false,
                                                                                                result: err
                                                                                            }
                                                                                            res.json(output)
                                                                                        })
                                                                                    }
                                                                                    else {
                                
                                                                                        calendar.update({$and: [{"creatorId": data.fieldvalues.userid, "title": data.fieldvalues.subtaskname}]}, {$set: eventData}, (err, obj2) => {
                                
                                                                                            if(err){
                                                                                                console.log(err)
                                                                                            }
                                                                                            else {
                                
                                                                                                var output = {
                                
                                                                                                    msg: "Sub-Sub Task updated successfully.",
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
                                
                                                                                msg: "Cannot Update Sub Task.",
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

                                                        msg: "Sub-Sub Task updated successfully.",
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

                    }
                }
            })
        
        
        }
    }
    else {

        console.log("JAyaaaaaaaaaaaaa")

        if(data.fieldvalues.rangeData) {

        var a = new Date(data.fieldvalues.rangeData[0]);
        var b = new Date(data.fieldvalues.rangeData[1]);

        var upadatesubtasksdata = {

            _id: data.fieldvalues.id,
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
            children: data.fieldvalues.children
        }

        section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userid }] }, (err, obj) => {

            if (err) {
                var output = {

                    msg: "No subtask details",
                    condition: false
                }
                res.json(output)
            }
            else {
                // console.log("obj", obj)

                for (var i = 0; i < obj.tasks.length; i++) {

                    for (var j = 0; j < obj.tasks[i].children.length; j++) {

                        // console.log("obj", obj.tasks[i].children[j])

                        if (obj.tasks[i].children[j]._id == data.fieldvalues.id) {

                            if(obj.tasks[i].children[j].assigneename) {

                                if (obj.tasks[i].children[j].assigneename !== data.fieldvalues.assigneename) {

                                    profileSchema.findOne({ "username": obj.tasks[i].children[j].assigneename }, function (err, obj6) {
                                        if (err) console.log(err)

                                        console.log("obj", obj6.email)

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
                                            subject: 'Sub Task',
                                            text: 'Task Details',
                                            html: '<p>Hi ' + obj6.username + ', </p><p>The following sub task has been expired.<p><h2 style="color : blue"> ' + data.fieldvalues.subtaskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                                        }

                                        transporter.sendMail(mailOptions, (error, obj) => {

                                            if (error) console.log(error);

                                            console.log("obj", obj)
                                        })

                                    })
                                }
                            }

                            // console.log("obj", obj.tasks[i].children[j])

                            var query = {};
                            var setter = {};
                            var findquery = {};
                            var findquery1 = {};


                            setter['tasks.' + i + '.children.' + j] = upadatesubtasksdata;
                            findquery["tasks." + i + ".children." + j + "._id"] = data.fieldvalues.id
                            findquery1["tasks." + i + ".children." + j + ".userId"] = data.fieldvalues.userid

                            // console.log("query" ,  findquery,setter);
                            section.update({ $and: [findquery, findquery1] }, { $set: setter }, (err, result) => {

                                if (err) console.log(err)

                                console.log("result", result)

                                if (result.nModified == 0) {

                                    var output = {

                                        msg: "Sub Task data not modified.",
                                        result: result,
                                        condition: false,
                                        data: obj
                                    }

                                    res.json(output)
                                }

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
                                                subject: 'Sub Task',
                                                text: 'Task Details',
                                                html: '<p>Hi ' + result.username + ', </p><p>The following sub task has been assigned to you.<p><h2 style="color : blue"> ' + data.fieldvalues.subtaskname + '.</h2></p><br><p>Regards,</p><p>GetViaHome</p>'

                                            }
                                            transporter.sendMail(mailOptions, (error, obj) => {

                                                if (error) console.log(error);

                                                // console.log("obj", obj)

                                                tasks.findOne({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.subtaskname }] }, function (err, obj1) {

                                                    if (err) {

                                                        console.log(err)
                                                        var output = {

                                                            msg: "Task data not found",
                                                            obj1: obj1,
                                                            condition: false,
                                                            data: obj
                                                        }

                                                        // res.json(output)
                                                    }
                                                    else {

                                                    // console.log("obj1", obj1)

                                                    var subsubtaskdata = {

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
                                                        children: data.fieldvalues.children,
                                                        userId: result._id,
                                                        creatorId: data.fieldvalues.userid
                                                    }

                                                    if (obj1 == null) {

                                                        let data1 = new tasks(subsubtaskdata)

                                                        data1.save()

                                                            .then((res) => {

                                                                var msg1 = {

                                                                    userId: result._id,
                                                                    name: "Get ViaHome",
                                                                    notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                                }

                                                                let sample = new notifications(msg1)

                                                                sample.save()
                                                                    .then((data) => {

                                                                        var eventData = {

                                                                            desc: data.fieldvalues.description,
                                                                            start: a.toString(),
                                                                            end: b.toString(),
                                                                            title: data.fieldvalues.subtaskname,
                                                                            userId: result._id
                                                                        };

                                                                        var eventDataSave = new calendar(eventData)

                                                                        eventDataSave.save()
                                                                        .then((result1) => {
                                                                            
                                                                            var out = {

                                                                                msg: "Sub Task updated successfully.",
                                                                                condition: true,
                                                                                // result: response,
                                                                                msg1: msg1
                                                                            }
                                                                            res.json(out)

                                                                        })
                                                                        .catch((err) => {
                                                                            var output = {

                                                                                msg: "Cannot update Sub Task.",
                                                                                condition: false,
                                                                                result: err
                                                                            }
                                                                            res.json(output)
                                                                        })


                                                                    })

                                                            })
                                                            .catch((err) => {

                                                                var output = {

                                                                    msg: "Cannot update Sub Task.",
                                                                    condition: false,
                                                                    result: err
                                                                }
                                                                res.json(output)
                                                            })

                                                            .catch(err => {
                                                                var output = {

                                                                    msg: "Cannot update Sub Task.",
                                                                    condition: false,
                                                                    result: err
                                                                }
                                                                res.json(output)
                                                            })

                                                    }
                                                    else {
                                                        tasks.update({ $and: [{ "creatorId": data.fieldvalues.userid, "taskname": data.fieldvalues.subtaskname }] }, { $set: subsubtaskdata  }, (err, result1) => {

                                                            if (err) console.log(err)
                    
                                                           else {
                                                            var msg1 = {
                    
                                                                userId: result._id,
                                                                name: "Get ViaHome",
                                                                notification: data.fieldvalues.subtaskname + ' ' + '- Task is assigned by'+ ' '+ result4.username +'.'
                                                            }
                    
                                                            let sample1 = new notifications(msg1)
                                                            sample1.save()
                                                            .then((result2) => {
                    
                                                                // console.log("res", result2)
                    
                                                                calendar.findOne({$and:[{ "creatorId": data.fieldvalues.userid, "title": data.fieldvalues.subtaskname}]}, (err, calendarobj) => {
                    
                                                                    if(err) {
                                                                        console.log(err)
                                                                    }
                                                                    else {
                                                                        // console.log("calendarobj", calendarobj)
                    
                                                                        
                                                                        var eventData = {
                    
                                                                            desc: data.fieldvalues.description,
                                                                            start: a.toString(),
                                                                            end: b.toString(), 
                                                                            title: data.fieldvalues.subtaskname,
                                                                            userId: result._id,
                                                                            creatorId: data.fieldvalues.userid
                                                                        };
                    
                    
                                                                        if(calendarobj == null) {
                    
                                                                            var eventDataSave = new calendar(eventData)
                    
                                                                            eventDataSave.save()
                                                                            .then((result3) => {
                    
                                                                                var output = {
                    
                                                                                    msg: "Sub Task updated successfully.",
                                                                                    condition: true,
                                                                                    // result: result3
                                                                                }
                                                                                res.json(output)
                    
                                                                            })
                                                                            .catch((err) => {
                    
                                                                                var output = {
                    
                                                                                    msg: "Cannot Update Sub Task.",
                                                                                    condition: false,
                                                                                    result: err
                                                                                }
                                                                                res.json(output)
                                                                            })
                                                                        }
                                                                        else {
                    
                                                                            calendar.update({$and: [{"creatorId": data.fieldvalues.userid, "title": data.fieldvalues.subtaskname}]}, {$set: eventData}, (err, obj2) => {
                    
                                                                                if(err){
                                                                                    console.log(err)
                                                                                }
                                                                                else {
                    
                                                                                    var output = {
                    
                                                                                        msg: "Sub Task updated successfully.",
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
                    
                                                                    msg: "Cannot Update Sub Task.",
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

                                            msg: "Sub Task updated successfully.",
                                            condition: true,

                                        }

                                        res.json(output)
                                    }
                                })


                                }
                               
                            })
                        }
                    }

                }
            }
        })
    }
    else {

        if(data.fieldvalues.subtaskname) {

            if(data.fieldvalues.subsubtaskname) {

                console.log(data)

                section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userId }] }, (err, obj) => {

                    if (err) console.log(err)
                    // console.log(obj)
                    for (var i = 0; i < obj.tasks.length; i++) {
    
                        if (obj.tasks[i].taskname == data.fieldvalues.maintaskname) {
    
                            // console.log(obj.tasks[i])
    
                            for (var j = 0; j < obj.tasks[i].children.length; j++) {
    
                                if (obj.tasks[i].children[j].taskname == data.fieldvalues.subtaskname) {
    
                                    //console.log("obj", obj.tasks[i].children[j])
    
                                    for (var k = 0; k < obj.tasks[i].children[j].children.length; k++) {
    
                                        if (obj.tasks[i].children[j].children[k].taskname == data.fieldvalues.subsubtaskname) {
    
                                            // console.log("obj", obj.tasks[i].children[j].children[k])
    
                                            for (var l = 0; l < obj.tasks[i].children[j].children[k].children.length; l++) {
    
                                                if (obj.tasks[i].children[j].children[k].children[l]._id == data.fieldvalues._id) {
    
                                                    // console.log("obj", obj.tasks[i].children[j].children[k].children[l])
                                                    var setter = {};
                                                    var findquery = {};
                                                    setter['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l + '.check'] = data.check;
                                                    findquery['tasks.' + i + '.children.' + j + '.children.' + k + '.children.' + l + '._id'] = data.fieldvalues._id
    
                                                    // console.log("query", findquery, setter);
                                                    section.update(findquery, { $set: setter }, (err, result) => {
    
                                                        if (err) console.log(err)
    
                                                        console.log("result", result)
                                                        var output = {

                                                            msg: "updated",
                                                            condition: true
                                                        }
                                                        res.json(output)
                                                        
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

            // console.log(data.fieldvalues)

            section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userId }] }, (err, obj) => {

                if (err) console.log(err)
                // console.log(obj)
                for (var i = 0; i < obj.tasks.length; i++) {
                    // console.log(obj.tasks[i])

                    if (obj.tasks[i].taskname == data.fieldvalues.maintaskname) {

                        for (var j = 0; j < obj.tasks[i].children.length; j++) {

                            if (obj.tasks[i].children[j].taskname == data.fieldvalues.subtaskname) {

                                //    console.log("obj", obj.tasks[i].children[j])

                                for (var k = 0; k < obj.tasks[i].children[j].children.length; k++) {

                                    if (obj.tasks[i].children[j].children[k]._id == data.fieldvalues._id) {

                                        // console.log("obj", obj.tasks[i].children[j].children[k])

                                        // console.log("j",j)
                                        var query = {};
                                        var setter = {};
                                        var findquery = {};
                                        var findquery1 = {};

                                        setter['tasks.' + i + '.children.' + j + '.children.' + k + '.check'] = data.check;
                                        findquery["tasks." + i + ".children." + j + '.children.' + k + '._id'] = data.fieldvalues._id
                                        findquery1["tasks." + i + ".children." + j + '.children.' + k + '.userId'] = data.fieldvalues.userId

                                        // console.log("query" ,  findquery,findquery1,setter);
                                        section.update({ $and: [findquery, findquery1] }, { $set: setter }, (err, result) => {

                                            if (err) console.log(err)

                                            var output = {

                                                msg: "updated",
                                                condition: true
                                            }
                                            res.json(output)

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
        // console.log(data.fieldvalues)
        section.findOne({ $and: [{ "sectionName": data.fieldvalues.sectionname, "userId": data.fieldvalues.userId }] }, (err, obj) => {

            if (err) {
                var output = {

                    msg: "No subtask details",
                    condition: false
                }
                res.json(output)
            }
            else {
                // console.log("obj", obj)

                for (var i = 0; i < obj.tasks.length; i++) {

                    for (var j = 0; j < obj.tasks[i].children.length; j++) {

                        // console.log("obj", obj.tasks[i].children[j])

                        if (obj.tasks[i].children[j]._id == data.fieldvalues._id) {

                            // console.log("obj", obj.tasks[i].children[j])

                            var query = {};
                            var setter = {};
                            var findquery = {};
                            var findquery1 = {};


                            setter['tasks.' + i + '.children.' + j+ '.check'] = data.check;
                            findquery["tasks." + i + ".children." + j + "._id"] = data.fieldvalues._id
                            findquery1["tasks." + i + ".children." + j + ".userId"] = data.fieldvalues.userId

                            // console.log("query" ,  findquery,setter);
                            section.update({ $and: [findquery, findquery1] }, { $set: setter }, (err, result) => {

                                if (err) console.log(err)

                                var output = {

                                    msg: "updated",
                                    condition: true
                                }
                                res.json(output)
                            })
                        }
                    }

                }
            }
        })
    }
    }
    }
}
module.exports = updatesubtaskhandler;