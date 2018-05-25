const calendar = require('.././models/calendarEvents');

const express = require('express');
const router= express.Router();

router.post('/createCalendarEvent', (req, res) => {


  console.log("calendar data", req.body)

  // console.log("starta", req.body.data.start)

  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  var allday  = "";

  var a = new Date(req.body.data.start);
  var b = new Date(req.body.data.end);
  var c = a.getHours();
  var d = a.getMinutes();
  var e = a.getSeconds();

  console.log("a, b", a, b)

  var seconds = (b.getTime() - a.getTime()) / 1000;

  console.log("seconds", seconds)

  if(seconds == 0) {

    allday = true;
  }
  else {
    allday = false;
  }

  var eventData = {

    allDay: allday,
    desc: req.body.data.desc,
    start: a.toString(),
    end: b.toString(),
    title: req.body.data.title,
    userId: req.body.userId,
    creatorId: req.body.userId, 
    id: Math.random(),
    startTime : c+":"+d+":"+e,
    endTime :  b.getHours()+":"+b.getMinutes()+":"+b.getSeconds(),
  };

  var endDate = new Date(req.body.data.end)
  console.log("as",ashok)
 
  var year = endDate.getFullYear().toString();
  var month = (endDate.getMonth()+1).toString();
  var day = endDate.getDay().toString();

  var eventDataSave = new calendar(eventData)
  // var eventViewSave = new calendarView(viewData)

  calendar.cal(eventDataSave, (result) => {

    if(req.body.data.User){
      
          profileSchema.findOne({"username" : req.body.data.User},function(err,result){
      
            if(err) console.log(err)
      
            console.log("result",result)
        
             if(result.email){
      
              var transporter = nodemailer.createTransport({
                service : "Gmail",
                auth : {
                  user : "forgot@getviahome.com",
                  pass : "viahome321!"
                }
              })
              var mailOptions = {
                from: 'forgot@getviahome.com',
                to: result.email,
                subject: 'Event',
                text: 'Event Detailes',
                html: '<p>Hi ' + result.username + ', </p><p>The following Event has been assigned to you.<p> Event Title: <h2 style= "color: blue"> ' + req.body.data.title 
                +'.</h2> Event Description: <h2 style= "color: blue"> '+ req.body.data.desc + 
                '.</h2>Last Date:<h2 style = "color : blue">'+month+'/'+day+'/'+year+'.</h2></p><br><p>Regards ,</p><p>GetViaHome</p>'
      
            }
      
               transporter.sendMail(mailOptions, (error, obj) => {
      
                 if (error) console.log(error);
      
                 console.log(obj)
      
               })
             }
          })
        }

    res.send(result);

  })

})

router.get('/allEvents/:id', (req, res) => {

  // console.log("Hi");
  let id = req.params.id;

  // console.log("id", id)
  calendar.allEvents(id, (result) => {

    res.send(result);
    // console.log("calendarresult", result)
  })
})

router.post('/updateEvents', (req, res) => {

  // console.log("bodydata", req.body);

  var a = new Date(req.body.data.start);
  var b = new Date(req.body.data.end);

  var EventData = {

    id:req.body.data._id,
    allDay: req.body.data.allDay,
    desc: req.body.data.desc,
    start: a.toString(),
    end: b.toString(),
    title: req.body.data.title,
    userId: req.body.data.userId,
    creatorId: req.body.data.userId

  };

  calendar.updateEvents(EventData,function(result){

    res.send(result);
  })


})

router.post('/deleteEvents', (req, res) => {

  var id = req.body.data._id;

 calendar.deleteEvents(id,function(result){

  res.send(result);
 })


 

});
module.exports = router;
