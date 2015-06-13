/**
 * 400 (Custom Error) Handler
 *
 * Usage:
 * return res.customError();
 * return res.customError(data);
 * return res.customError(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.customError(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

var errors = require('../errors');
var _ = require('lodash');

module.exports = function customError(errorCode, err, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  var error = _.extend({}, errors(errorCode));

  // Set status code
  res.status(error.statusCode);

  // Log error to console
  if (errorCode !== undefined) {
    sails.log.verbose('Sending custom response: \n', error);
  }
  else sails.log.verbose('Sending custom response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'development') {
    error.rawError = err;
  }

  return res.jsonx(error);
};

