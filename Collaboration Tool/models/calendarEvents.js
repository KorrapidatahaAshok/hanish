const mongoose = require('mongoose');

const calendarEvents = mongoose.Schema({

  allDay : { type: Boolean },
  desc : { type:String },
  end : { type:Date },
  start : { type:Date },
  title : { type:String },
  userId : { type: String },
  creatorId: { type: String },
  id: {type: Number},
  Assignname : {type : String},
  endTime: {type: String},
  startTime: {type: String}
});

const Event = module.exports = mongoose.model("events", calendarEvents)

module.exports.cal = (calendardata, callback) => {

      calendardata.save((err, data) => {

        if (err) return callback("Error")

        return callback("saved")
      })


}

module.exports.allEvents = (id, callback) => {

  Event.find({"userId": id}, function (err, eventData) {

    if (err) console.log(err);

    // console.log("EventData", eventData);
    return callback(eventData)
  })
}

module.exports.updateEvents = (eventupdate, callback)=>{

  // console.log("eventupdate",eventupdate);

  Event.update({_id:eventupdate.id}, {$set:eventupdate},function(err,result){
    
        if(err) console.log(err);
    
          console.log("result",result);
          var msg ="";
          var condition ="";
    
        if (result.nModified == 0) {
    
          msg = "Event data not modified.";
          condition = false;
          var out = {
    
            msg: msg,
            condition: condition
          }
          return callback (out);
        }
    
        else {
          msg = "Event data modified."
          condition = true
          var output = {
    
            msg: msg,
            condition: condition
          }
        return callback (output)
       }
      })
}

module.exports.deleteEvents = (id,callback)=>{

  Event.deleteOne({_id:id},function(err,result){

    if(err)  console.log(err)

      // console.log(result);

      return callback("deleted")
  })
}