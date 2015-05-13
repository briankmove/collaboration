"use strict";

var mysql = require('mysql');
var _ = require('lodash');
var constants = require('./dbConfig.js');

module.exports = function() {

    var dbInstance = {};
    var dbConn = {};

    // adding more options here
    var options = {
        multipleStatements: true
    };
    _.extend(options, constants.database);

    var pool  = mysql.createPool(options);
    dbInstance.pool = pool;

    dbInstance.connect = function(connectHandler) {
        pool.getConnection(function(err, connection) {
            if (err) return connectHandler(err, null);
            return connectHandler(null, connection);
        });
    };

    dbConn.query = function(params) {
        var sql = params.sql;
        var values = params.values;
        var queryHandler = params.callback;
        dbInstance.connect(function(err, connection) {
            if (err) return queryHandler(err, null);
            connection.query(sql, values, function(err, rows, fields) {
                queryHandler(err, rows);
                connection.release();
            });
        });
    };

    return dbConn;
}();