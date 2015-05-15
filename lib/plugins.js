"use strict";

var config = require('../config.json');
var pkg = require('../package.json');
var plugins = [];

/*
 Interactive tool for REST Api testing
 https://github.com/glennjones/hapi-swagger
 https://github.com/swagger-api/swagger-ui
 */
if (config.plugins.swagger === true) {
    plugins.push({
        register: require('hapi-swagger'),
        options: {
            documentationPath: '/restricted/test',
            apiVersion: pkg.version
        }
    });
}

/*
 Web page based logging console (web socket driven)
 https://github.com/hapijs/tv
 */
if (config.plugins.tv === true) {
    plugins.push({
        register: require('tv'),
        options: {
            endpoint: '/restricted/console'
        }
    });
}

/*
 Good is a multi-target logger plugin
 https://github.com/hapijs/good
 */
if (config.plugins.good === true) {
    plugins.push({
        register: require('good'),
        options: {
            opsInterval: 1000,
            reporters: [{
                reporter: require('good-console'),
                events: {
                    log: '*',
                    request: '*',
                    response: '*'
                }
            }]
        }
    });
}

/* ENDPOINT PLUGINS */

/*
 Collaboration endpoint
 */
if (config.plugins.collaboration === true) {
    plugins.push({
        // Collaboration API
        register: require('../plugins/feeds'),
        options: {
            version: pkg.version
        }
    });
}

module.exports = plugins;
