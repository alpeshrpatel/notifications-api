var aws = require('aws-sdk');
// var logger = require('../../log/logger');

aws.config.update({
    region: 'us-west-2'
});

// load AWS SES
var ses = new aws.SES({
    apiVersion: '2010-12-01'
});

// var ses = new aws.SES();

const charset = "UTF-8";

exports.sendEmail = function (requestBody, callback) {
    var recipients = requestBody.recipients;
    var sender = requestBody.sender;
    var subject = requestBody.subject;
    var body_text = requestBody.bodyText;
    var body_html = requestBody.bodyHtml;
    var resultData;
    console.log("Request Body ", requestBody);
    // Specify the parameters to pass to the API.

    // for (var i = 0; i < recipients.length; i++) {
    var recipient = recipients[i];
    console.log(recipient);
    var params = {}
    params = {
        Source: sender,
        Destination: {
            ToAddresses: [
                recipients
            ],
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
    console.log(params);
    //Try to send the email.
    ses.sendEmail(params, function (err, data) {
        // If something goes wrong, print an error message.
        console.log(data);
        if (err) {
            resultData = "Email is not able sent to " + email + "! Message ID: ", data.MessageId;
        } else {
            resultData = "Email is sent to " + email + "! Message ID: ", data.MessageId;
        }
        // console.log("Email is sent to " + email + "! Message ID: ", data.MessageId);
        return resultData;
    });
    // }

}