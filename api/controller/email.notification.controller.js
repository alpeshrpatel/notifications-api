/**
 * Send email to users
 */


var emailNotificationModel = require('../model/email.notification');

var aws = require('aws-sdk');
// var logger = require('../../log/logger');
var ses = new aws.SES();

const charset = "UTF-8";
//-----------------question----------------------
exports.sendEmail = function (req, res) {
	aws.config.update({
		region: 'us-west-2'
	});

	var request = req.body;
	console.log(request);
	// load AWS SES

	var recipients = request.recipients;
	var sender = request.sender;
	var subject = request.subject;
	var body_text = request.bodyText;
	var body_html = request.bodyHtml;

	console.log(recipients);

	var resultData;
	console.log("Request Body ", request);

	var params = {
		Source: sender,
		Destination: {
			ToAddresses: recipients
		},
		Message: {
			Subject: {
				Data: subject,
				Charset: charset
			},
			Body: {
				Text: {
					Data: body_text,
					Charset: charset
				},
				Html: {
					Data: body_html,
					Charset: charset
				}
			}
		}
	};

	//Try to send the email.
	ses.sendEmail(params, function (err, data) {
		// If something goes wrong, print an error message.
		console.log(data);
		if (err) {
			request.responseId = err.message;
			emailNotificationModel.create(request, function (result, request) {
				res.json(err.message);
			});
		} else {
			request.responseId = data.MessageId;
			emailNotificationModel.create(request, function (result, request) {
				res.json("Email is sent to " + recipients + "! Message ID: " + data.MessageId);
			});
		}
		// // console.log("Email is sent to " + email + "! Message ID: ", data.MessageId);
		// return resultData;
	});



};