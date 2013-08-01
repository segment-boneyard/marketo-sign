
var crypto = require('crypto');


/**
 * Module exports
 */

module.exports = sign;
module.exports.header = header;
module.exports.email  = email;


/**
 * Format a timestamp for use with marketo
 * Thanks to https://github.com/gkz/marketo-soap-security/blob/master/index.js
 *
 * @param  {Date}   timestamp
 * @return {String}
 */

function formatTimestamp (timestamp) {
  var year, month, day, timeString, time, offset;
  year = timestamp.getFullYear();
  month = timestamp.getMonth() + 1;
  if (month < 10) month = "0" + month;

  day = timestamp.getDate();
  if (day < 10) day = "0" + day;

  timeString = timestamp.toTimeString();
  time = timeString.slice(0, 8);
  offset = timeString.slice(12, 15);

  return year + '-' + month + '-' + day + ("T" + time + offset + ":00");
}


/**
 * Sign the user with the encryption key and timestamp, if no timestamp is
 * supplied, will use the current date
 *
 * @param  {String} userId
 * @param  {String} encryptionKey
 * @param  {Date}   timestamp [optional]
 * @return {String}
 */

function sign (userId, encryptionKey, timestamp) {
  timestamp = formatTimestamp(timestamp || new Date());

  var signature = crypto.createHmac('sha1', encryptionKey)
                         .update(timestamp + userId)
                         .digest('hex');

  return signature;
}


/**
 * Create the soap header, for use with requests to Marketo
 *
 * @param {String} userId
 * @param {String} encryptionKey
 * @param {Date}   timestamp [optional]
 */

function header (userId, encryptionKey, timestamp) {
  timestamp = timestamp || new Date();
  var signature = sign(userId, encryptionKey, timestamp);

  return '<env:Header><ns1:AuthenticationHeader>' +
      '<mktowsUserId>' + userId + '</mktowsUserId>' +
      '<requestSignature>' + signature + '</requestSignature>' +
      '<requestTimestamp>' + formatTimestamp(timestamp) + '</requestTimestamp>' +
    '</ns1:AuthenticationHeader></env:Header>';
}


/**
 * Returns an authenticated email signature based on these docs:
 * https://community.marketo.com/MarketoArticle?id=kA050000000Kyr7
 * so that Munchkin can make secure calls
 * @param  {String} encryptionKey The account's encryption key
 * @param  {String} email         The email to encrypt
 * @return {String}               The email signature
 */

function email (encryptionKey, email) {

  var magic = encryptionKey + email;

  var shasum = crypto.createHash('sha1');
  shasum.update(magic);

  var hex = shasum.digest('hex');

  return hex.toLowerCase();
}