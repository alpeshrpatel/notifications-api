var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'us-west-2'});

var sns = new AWS.SNS({apiVersion: '2010-03-31'});

var message = 'This is for handsome man';
// Create publish parameters

function getMessage (message, phoneNumber)
{
    var params = {
        Message: message, /* required */
        PhoneNumber: phoneNumber,
    };
    return params;
}

var params = getMessage(message,'+14804923225')
// Create promise and SNS service object
var publishTextPromise = sns.publish(params).promise();

publishTextPromise.then(
  function(data) {
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
});
