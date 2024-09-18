var textNotificationModel = require('../model/text.notification');
var smsUtil = require('../util/sms');
//-----------------question----------------------
/**
 * Get All questions
 */
exports.sendSMS = function (req, res) {
	var request = req.body;
	// console.log(request);
	textNotificationModel.create(request, function (result, request) {
		var response = smsUtil.sendSMS(request);
		res.json(response);
	});
};