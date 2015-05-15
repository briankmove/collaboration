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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id')
                    }
                },
                tags: ['api'],
                description: 'Retrieve feed list by their member id'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/',
            method: 'POST',
            handler: function(request, reply) {
                feeds
                    .setFeed(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id')
                    },
                    payload: {
                        propertyId: joi.number().positive().required().description('Property id'),
                        roleId: joi.any().valid('O', 'F').required().description('Role id')
                    }
                },
                tags: ['api'],
                description: 'Creates a feed per a member id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)')
                    }
                },
                tags: ['api'],
                description: 'Retrieve a feed information by a given feed id and a member id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)')
                    }
                },
                tags: ['api'],
                description: 'Remove a feed by a given feed id and a member id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)')
                    },
                    query: {
                        offset: joi.number().min(0).required().description('offset'),
                        limit: joi.number().positive().required().description('limit'),
                    }
                },
                tags: ['api'],
                description: 'Retrieve post list by a given feed id and a member id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)')
                    },
                    payload: {
                        comment: joi.string().required().description('Post comment')
                    }
                },
                tags: ['api'],
                description: 'Creates a post with a given member id and feed id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)'),
                        postId: joi.string().guid().required().description('post id (uuid)')
                    }
                },
                tags: ['api'],
                description: 'Retrieve a post by a post id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)'),
                        postId: joi.string().guid().required().description('post id (uuid)')
                    }
                },
                tags: ['api'],
                description: 'Update a post by a post id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)'),
                        postId: joi.string().guid().required().description('post id (uuid)')
                    }
                },
                tags: ['api'],
                description: 'Delete a post by a post id'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id'),
                        feedId: joi.string().guid().required().description('feed id (uuid)')
                    }
                },
                tags: ['api'],
                description: 'Retrieve members and role information'
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
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id : Owner of feed'),
                        feedId: joi.string().guid().required().description('feed id (uuid)')
                    },
                    payload: {
                        memberId: joi.string().required().description('RDC user id'),
                        roleId: joi.string().max(1).required().description('Role id')
                    }
                },
                tags: ['api'],
                description: 'Grant a role to a member'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/members/{memberId}',
            method: 'GET',
            handler: function(request, reply) {
                feeds
                    .getUser(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id : Owner of feed'),
                        feedId: joi.string().guid().required().description('feed id (uuid)'),
                        memberId: joi.string().required().description('RDC user id : grant user')
                    }
                },
                tags: ['api'],
                description: 'Retrieve member information by a user id'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/members/{memberId}',
            method: 'PUT',
            handler: function(request, reply) {
                feeds
                    .updateUser(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id : Owner of feed'),
                        feedId: joi.string().guid().required().description('feed id (uuid)'),
                        memberId: joi.string().required().description('RDC user id : grant user')
                    },
                    payload: {
                        roleId: joi.string().max(1).required().description('Role id')
                    }
                },
                tags: ['api'],
                description: 'Update a user role by user id'
            }
        },
        {
            path: '/v1/users/{userId}/feeds/{feedId}/members/{memberId}',
            method: 'DELETE',
            handler: function(request, reply) {
                feeds
                    .removeUser(request)
                    .catch(feeds.error)
                    .then(reply);
            },
            config: {
                validate: {
                    params: {
                        userId: joi.string().required().description('RDC user id : Owner of feed'),
                        feedId: joi.string().guid().required().description('feed id (uuid)'),
                        memberId: joi.string().required().description('RDC user id : grant user')
                    }
                },
                tags: ['api'],
                description: 'Revoke a role from a user'
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