var mongoose = require('mongoose');

var EmailNotificationSchema = mongoose.Schema({
    tanentId: String, //TODO this should be mendatory field for all request
    sender: String, // Sender email address
    subject: String, //Subject 
    recipients: [String], // Receiver
    message: String, //Message body
    bodyText: String,
    bodyHtml: String,
    signature: String,
    responseId: String,
});

var EmailNotification = module.exports = mongoose.model('EmailNotification', EmailNotificationSchema);

// module.exports.sendSMS = function(callback, limit){	
// 	SNSMessage.find(callback).limit(limit);
// }

// ---TODO remove it from code after validation---
module.exports.addEmailMessage = function (emailNotificationPayload, callback) {
    // console.log(emailNotificationPayload);
    EmailNotificationSchema.create(emailNotificationPayload, callback);
}