"use strict";

module.exports = function() {

    var env = process.env.NODE_ENV || 'development';
    var dbContants = databaseConfig();

    var obj = {
        database : {
            host     : dbContants[env]['host'],
            port     : dbContants[env]['port'],
            user     : dbContants[env]['user'],
            password : dbContants[env]['password'],
            database : dbContants[env]['database']
        }
    };

    if (!obj.database['host']) {
        throw new Error('Missing constant database.host. ' +
        'Check your enviroment variables.');
    } else if (!obj.database['user']) {
        throw new Error('Missing constant database.user. ' +
        'Check your enviroment variables.');
    } else if (!obj.database['password']) {
        throw new Error('Missing constant database.password. ' +
        'Check your enviroment variables.');
    } else if (!obj.database['database']) {
        throw new Error('Missing constant database.database. ' +
        'Check your enviroment variables.');
    }

    return obj;

    function databaseConfig(){
        return {
            'production' : {
                'host' : process.env.DB_PRD_HOST,
                'port' : process.env.DB_PRD_PORT,
                'user' : process.env.DB_PRD_USER,
                'password' : process.env.DB_PRD_PASS,
                'database' : 'collaboration'
            },
            'development' : {
                'host' : process.env.DB_DEV_HOST,
                'port' : process.env.DB_DEV_PORT,
                'user' : process.env.DB_DEV_USER,
                'password' : process.env.DB_DEV_PASS,
                'database' : 'collaboration'
            },
            'test' : {
                'host' : 'localhost',
                'port' : 8889,
                'user' : process.env.DB_TEST_USER,
                'password' : process.env.DB_TEST_PASS,
                'database' : 'collaboration'
            }
        };
    }

}();