'use strict';

var hapi = require('hapi');
var pkg = require('./package.json');
var notifier = require('node-notifier');
var config = require('./config.json');
var server = new hapi.Server();

if (process.env.PORT === undefined) {
    console.log("Server failed to initialized due to missing environment port.");
    return notifier.notify({
        title: 'Server event',
        message: 'Failed to initialized due to missing environment port.'
    });
}

// Create connection
server.connection({
    port: process.env.PORT,
    host: process.env.IP,
    labels: ['api'],
    routes: {
        cors: true,
        validate: {
            options: {
                stripUnknown: true
            }
        }
    }
});

// Register plugins
server.register([
    // OFFICIAL 3RD PARTY PLUGINS
    {
        register: require('hapi-swagger'),
        options: {
            basePath: server.info.uri,
            endpoint: '/docs',
            documentationPath: '/restricted/test',
            pathPrefixSize: 1,
            apiVersion: pkg.version,
            auth: false,
            payloadType: 'json',
            enableDocumentationPage: true
        }
    },
    // CUSTOM PLUGINS
    {
        // Properties SEARCH and SHOW
        register: require('./plugins/feeds'),
        options: {
            version: pkg.version
        }
    }
    // END OF PLUGINS
], function(err) {
    if (err) {
        console.error('Failed to load a plugin:', err);
        notifier.notify({
            title: 'Server failure',
            message: 'Failed to load some plugins'
        });
    } else {
        server.start();
        console.log('Server running at ' + server.info.uri);
        notifier.notify({
            title: 'Server event',
            message: 'Running at ' + server.info.uri
        });
    }
});