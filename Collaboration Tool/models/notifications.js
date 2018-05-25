const mongoose = require('mongoose');

const notificationEvents = mongoose.Schema({

  userId : {type: String},
  name: {type: String},
  notification: {type: String}
});

const notification = module.exports = mongoose.model("notifications", notificationEvents)