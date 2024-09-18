var AWS = require('aws-sdk');
var logger = require('../../log/logger');

// Set region
AWS.config.update({
    region: 'us-west-2'
});

var sns = new AWS.SNS({
    apiVersion: '2010-03-31'
});
// var message = 'This is for handsome man';
// Create publish parameters

function getMessage(message, phoneNumber) {
    var params = {
        Message: message,
        /* required */
        PhoneNumber: phoneNumber,
    };
    return params;
}

exports.sendSMS = function (requestBody) {
    var phoneNumbers = requestBody.phoneNumber;
    var message = requestBody.message;
    var resultData = [];
    var resultError = [];
    var count = 0;
    console.log(requestBody);
    console.log(phoneNumbers);
    console.log(message);
    for (var i = 0; i < phoneNumbers.length; i++) {
        var element = phoneNumbers[i];
        // console.log(element+'--->');
        var params = getMessage(message, element)
        var publishTextPromise = sns.publish(params).promise();
        publishTextPromise.then(
            function (data) {
                // count++;
                resultData.push(data);
            }).catch(
            function (err) {
                // count++;
                resultData.push(err);
            });
    }
    return resultData;
    // phoneNumbers.forEach(function(element) {
    //     console.log(element);
    //     var params = getMessage(message,element)
    //     var publishTextPromise = sns.publish(params).promise();
    //     publishTextPromise.then(
    //         function(data) {
    //             count++;
    //         //   console.log(element+" --> MessageID is " + data.MessageId);
    //           resultData.push(data);
    //           if( count == phoneNumbers.length){
    //               return resultData;
    //           }
    //         }).catch(
    //           function(err) {
    //             count++;
    //             resultData.push(err);
    //             if( count == phoneNumbers.length){
    //                 return resultData;
    //             }
    //             // console.error(err, err.stack);
    //       });
    //   });
}

// module.exports = sendSMS;



// var params = getMessage(message,'+16023219357')
// // Create promise and SNS service object
// var publishTextPromise = sns.publish(params).promise();

// publishTextPromise.then(
//   function(data) {
//     console.log("MessageID is " + data.MessageId);
//   }).catch(
//     function(err) {
//     console.error(err, err.stack);
// });