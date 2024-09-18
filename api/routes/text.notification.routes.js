module.exports = function (app) {
    var textnotification = require('../controller/text.notification.controller');
    app.post('/api/notifications/sms', textnotification.sendSMS);
}