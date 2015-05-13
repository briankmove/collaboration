var joi = require('joi');
var Feeds = require('./feeds.js');

exports.register = function(plugin, options, next) {
    // Create instances
    var feeds = new Feeds(options);
    // Expose for plugin
    plugin.expose(feeds);
    // Routes setup
    plugin.route([
        {
            path: '/v1/users/{userId}/feeds/',
            method: 'GET',
            handler: function(request, reply) {
                feeds
                    .getFeeds(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/',
            method: 'POST',
            handler: function(request, reply) {
                console.log(request.payload);
                feeds
                    .setFeed(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}',
            method: 'GET',
            handler: function(request, reply) {
                feeds
                    .getFeedByFeedId(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}',
            method: 'DELETE',
            handler: function(request, reply) {
                feeds
                    .removeFeed(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/posts/',
            method: 'GET',
            handler: function(request, reply) {
                feeds
                    .getPosts(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/posts/',
            method: 'POST',
            handler: function(request, reply) {
                feeds
                    .setPost(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/posts/{postId}',
            method: 'GET',
            handler: function(request, reply) {
                feeds
                    .getPost(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/posts/{postId}',
            method: 'PUT',
            handler: function(request, reply) {
                feeds
                    .updatePost(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/posts/{postId}',
            method: 'DELETE',
            handler: function(request, reply) {
                feeds
                    .removePost(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/members/',
            method: 'GET',
            handler: function(request, reply) {
                feeds
                    .getUsers(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/members/',
            method: 'POST',
            handler: function(request, reply) {
                feeds
                    .setUser(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{grantUserId}/feeds/{feedId}/members/{userId}',
            method: 'GET',
            handler: function(request, reply) {
                feeds
                    .getUser(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{grantUserId}/feeds/{feedId}/members/{userId}',
            method: 'PUT',
            handler: function(request, reply) {
                feeds
                    .updateUser(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        },
        {
            path: '/v1/users/{grantUserId}/feeds/{feedId}/members/{userId}',
            method: 'DELETE',
            handler: function(request, reply) {
                feeds
                    .removeUser(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                tags: ['api'],
                description: 'Feeds'
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    pkg: {
        'name': 'feeds',
        'version': '0.0.1',
        'description': 'Feeds',
        'main': 'index.js'
    }
};