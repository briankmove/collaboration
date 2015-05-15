'use strict';

var hapi = require('hapi');
var notifier = require('node-notifier');
var plugins = require('./plugins.js');
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
                allowUnknown: true
            }
        }
    }
});

// Register path for temp content
server.route({
    method: "GET",
    path: "/restricted/{page*}",
    config: {
        description: 'Serve temp pages',
        handler: {
            directory: {
                path: "temp",
                listing: true,
                index: false
            }
        },
        tags: ['temp']
    }
});

// Register plugins
server.register(plugins, function(loadError) {
    if (loadError) {
        console.error('Failed to load a plugin:', loadError);
        notifier.notify({
            title: 'Server failure',
            message: 'Failed to load some plugins'
        });
    } else {
        // Start server
        server.start(function (startError) {
            if (startError) {
                console.error(startError);
            }
            // Log event
            console.log('Server running at ' + server.info.uri);
            notifier.notify({
                title: 'Server event',
                message: 'Running at ' + server.info.uri
            });
        });
    }
});
