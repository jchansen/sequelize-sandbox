/**
 * API Errors
 */

// Error code examples:
// https://dev.twitter.com/overview/api/response-codes
// http://docs.stormpath.com/errors/
// https://developers.facebook.com/docs/marketing-api/error-reference
// https://developers.google.com/doubleclick-search/v2/standard-error-responses
// https://developers.google.com/analytics/devguides/reporting/core/v3/coreErrors
// https://developer.paypal.com/docs/classic/api/errorcodes/

var errors = {
  // 2XXX: General Validation
  "2001": 401,

  // 3XXX: API
  "3001": 400,
  "3002": 400,
  "3003": 400,
  "3004": 500
};

module.exports = function(errorCode){
  return {
    statusCode: errors[errorCode],
    message: sails.__(errorCode + ".message")
  }
};

