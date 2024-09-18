var mongoose = require('mongoose');

var TextNotificationSchema = mongoose.Schema({
    tanentId: {
        type: String //TODO this should be mendatory field for all request
    },
    phoneNumber: {
        type: [String]
    },
    message: {
        type: String
    },
    category: {
        type: String
    }
});

var TextNotification = module.exports = mongoose.model('sms', TextNotificationSchema);

// module.exports.sendSMS = function(callback, limit){	
// 	SNSMessage.find(callback).limit(limit);
// }

// // ---TODO remove it from code after validation---
// module.exports.addSMSMessage = function (textNotificationPayload, callback) {
//     console.log(textNotificationPayload);
//     TextNotification.create(textNotificationPayload, callback);
// }