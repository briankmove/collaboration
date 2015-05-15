/**
 * Error handling for JSON output
 *
 * @method setError
 * @param {object} [error] Node.js create error object (may be Boom wrapped)
 * @param {int}[500] [statusCode] HTTP status error code
 * @param {string} [message] Description of error
 * @param {object} [data] Additional meta data of error
 * @param {string} [serviceAddress] Service API endpoint with query string parameters
 * @return {object} Returns JSON of error details
 */
function _setError(error, statusCode, message, data, serviceAddress, debug) {
    var boom = require("boom"),
        boomError,
        hasError = (error !== undefined && error !== null),
        result = {};
    // Create boom error
    boomError = hasError ? boom.wrap(error, statusCode, message) : boom.create(statusCode, message, data);
    // Create response
    result.meta = {
        errors: [],
        version: require("../package.json").version
    };
    result.meta.errors.push(boomError);
    if (serviceAddress && debug === true) {
        result.meta.debug = result.meta.debug || {};
        result.meta.debug.url = serviceAddress;
    }
    return result;
}

module.exports = {
    "setError": _setError
};
