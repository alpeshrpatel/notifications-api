module.exports = function (app) {
    var emailNotification = require('../controller/email.notification.controller');
    //Retrieve all user profiles
    app.post('/api/notifications/email', emailNotification.sendEmail);
    //Retrieve single user profile with userId

}