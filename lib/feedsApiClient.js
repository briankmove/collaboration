/*global module*/
var Promise = require('bluebird');
var DbQuery = require('./dbQuery.js');
var errorHandler = require('./errorHandler.js');

/**
 * Client for Feeds API Service
 *
 * @class FeedsApiClient
 * @constructor
 * @param {object} options
 */

module.exports = function FeedsApiClient (options) {
    "use strict";
    var self = this,
        dbQuery = new DbQuery();

    /**
     * Options
     *
     * @property options
     */
    self.options = options || {};

    self.getFeed = function getFeed (params, resolve, reject) {
        console.log(params);
        var data;

        dbQuery.findFeedByUserId(params, function (error, response) {
            if (error) {
                data = errorHandler.setError(error, 502, "Feed id search failed", response, response);
                reject(data);
            } else {
                var feeds = [];
                for (var i in response) {
                    var feed = {};
                    feed.feedId = response[i].id;
                    feed.propertyId = response[i].property_id;
                    feed.createdBy = response[i].created_by;
                    feed.userId = response[i].user_id;
                    feed.roleId = response[i].role_id;

                    feeds.push(feed);
                }

                data = {
                    meta: {
                        build: self.options.version
                    },
                    feeds : feeds
                };
                resolve(data);
            }
        });


    };

    self.setFeed = function setFeed (params, resolve, reject) {
        console.log(params);

        dbQuery.createFeed(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "Feed creation failed", response, response);
                reject(data);
            } else {

                dbQuery.createUserFeed(params, function (error, response) {

                    if (error) {
                        data = errorHandler.setError(error, 502, "UserFeed creation failed", response, response);
                        reject(data);
                    } else {
                        data = {
                            meta: {
                                build: self.options.version
                            },
                            feedId : params.feedId
                        };
                        resolve(data);
                    }
                });
            }
        });
    };


    self.getFeedByFeedId = function getFeedByFeedId (params, resolve, reject) {
        console.log(params);
        var data;

        dbQuery.findFeedByFeedId(params, function (error, response) {
            if (error || response.length === 0) {
                data = errorHandler.setError(error, 502, "Feed id search failed", response, response);
                reject(data);
            } else {
                console.log(response);

                data = {
                    meta: {
                        build: self.options.version
                    },
                    feedId : response[0].id,
                    propertyId : response[0].property_id,
                    createdBy : response[0].created_by,
                    userId : response[0].user_id,
                    roleId : response[0].role_id
                };
                resolve(data);
            }
        });
    };

    self.removeFeed = function removeFeed (params, resolve, reject) {
        console.log(params);

        dbQuery.deleteFeedByFeedId(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "Feed creation failed", response, response);
                reject(data);
            } else {

                dbQuery.deleteUserFeedByFeedId(params, function (error, response) {

                    if (error) {
                        data = errorHandler.setError(error, 502, "UserFeed creation failed", response, response);
                        reject(data);
                    } else {
                        data = {
                            meta: {
                                build: self.options.version
                            },
                            removedFeedId : params.feedId
                        };
                        resolve(data);
                    }
                });
            }
        });
    };


    self.setPost = function setPost (params, resolve, reject) {
        console.log(params);


        dbQuery.createPost(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "Post creation failed", response, response);
                reject(data);
            } else {

                data = {
                    meta: {
                        build: self.options.version
                    },
                    postId : params.postId
                };
                resolve(data);


            }
        });
    };


    self.getPostsCount = function getPostsCount (params) {
        console.log(params);

        return new Promise(function (resolve, reject) {

            dbQuery.findPostsCountByFeedId(params, function (error, response) {
                var data;
                if (error) {
                    data = errorHandler.setError(error, 502, "Failed to get posts count", response, response);
                    reject(data);
                } else {
                    resolve(response[0].count);
                }
            });
        });

    };


    self.getPosts = function getPosts (params) {

        console.log(params);


        return new Promise(function (resolve, reject) {


            dbQuery.findPosts(params, function (error, response) {
                var data;

                console.log(response);

                if (error) {
                    data = errorHandler.setError(error, 502, "Post creation failed", response, response);
                    reject(data);
                } else {
                    var posts = [];
                    //var prevFeedId;
                    for (var i in response) {
                        var post = {};

                        post.postId = response[i].id;
                        post.feedId = response[i].feed_id;
                        post.propertyId = response[i].property_id;
                        post.feedOwnerId = response[i].feedOwnerId;
                        post.roleId = response[i].role_id;
                        post.createdBy = response[i].created_by;
                        post.createdTime = response[i].created_time;
                        post.comment = response[i].comment;
                        post.all_count = response[i].all_count;

                        //if (prevFeedId !== undefined && prevFeedId !== post.feedId) {
                        //    feeds.push(posts);
                        //    posts = [];
                        //}

                        posts.push(post);
                        //prevFeedId = post.feedId;
                    }

                    //feeds.push(posts);

                    data = {
                        meta: {
                            build: self.options.version
                        },
                        posts : posts,
                        returned_rows : posts.length

                    };
                    resolve(data);
                }
            });


        });


    };

    self.getPostByPostId = function getPostByPostId (params, resolve, reject) {

        dbQuery.findPostByPostId(params, function (error, response) {
            var data;

            console.log(response );

            if (error || response.length === 0) {
                data = errorHandler.setError(error, 502, "Couldn't find Post with id = " + params.postId, response, response);
                reject(data);
            } else {

                data = {
                    meta: {
                        build: self.options.version
                    },
                    postId : response[0].id,
                    feedId : response[0].feed_id,
                    propertyId : response[0].property_id,
                    userId : response[0].user_id,
                    roleId : response[0].role_id,
                    createdBy : response[0].created_by,
                    createdTime : response[0].created_time,
                    updatedTime : response[0].updated_time,
                    comment : response[0].comment
                };
                resolve(data);
            }
        });
    };

    self.updatePost = function updatePost (params, resolve, reject) {

        dbQuery.updatePostByPostId(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "Post updating failed", response, response);
                reject(data);
            } else {
                self.getPostByPostId(params, resolve, reject);
            }
        });
    };

    self.removePost = function removePost (params, resolve, reject) {

        dbQuery.deletePostByPostId(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "Post deleting failed", response, response);
                reject(data);
            } else {
                data = {
                    meta: {
                        build: self.options.version
                    },
                    removedPostId : params.postId
                };
                resolve(data);
            }
        });
    };

    self.validateOwner = function validateOwner (params, resolve, reject) {
        console.log(params)

        dbQuery.getFeedOwner(params, function (error, response) {
            var data;
            if (error) {
                data = errorHandler.setError(error, 502, "User search failed", response, response);
                reject(data);

            } else {

                for (var i in response) {
                    if (response[0].count === 0) {
                        data = errorHandler.setError(error, 502, "You don't have permission.", response, response);
                        reject(data);
                    }
                }

            }
        });
    };

    self.getUsers = function getUsers (params, resolve, reject) {

        dbQuery.findUsersByFeedId(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "User creation failed", response, response);
                reject(data);
            } else {
                var users = [];
                for (var i in response) {
                    var user = {};

                    user.userId = response[i].user_id;
                    user.feedId = response[i].feed_id;
                    user.roleId = response[i].role_id;

                    users.push(user);
                }

                data = {
                    meta: {
                        build: self.options.version
                    },
                    members : users
                };
                resolve(data);
            }
        });
    };

    self.setUser = function setUser (params, resolve, reject) {

        dbQuery.createUserFeed(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "User creation failed", response, response);
                reject(data);
            } else {
                self.getUser(params, resolve, reject);
            }
        });
    };

    self.getUser = function getUser (params, resolve, reject) {

        dbQuery.findUser(params, function (error, response) {
            var data;

            if (error || response.length === 0) {
                data = errorHandler.setError(error, 502, "Couldn't find User with id = " + params.userId, response, response);
                reject(data);
            } else {
                data = {
                    meta: {
                        build: self.options.version
                    },
                    userId: response[0].user_id,
                    feedId: response[0].feed_id,
                    roleId: response[0].role_id
                };

                resolve(data);
            }
        });
    };

    self.updateUser = function updateUser (params, resolve, reject) {

        dbQuery.updateUserRole(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "Post updating failed", response, response);
                reject(data);
            } else {
                self.getUser(params, resolve, reject);
            }
        });
    };

    self.removeUser = function removeUser (params, resolve, reject) {

        dbQuery.revokeUserRole(params, function (error, response) {
            var data;

            console.log(response);

            if (error) {
                data = errorHandler.setError(error, 502, "User deleting failed", response, response);
                reject(data);
            } else {
                data = {
                    meta: {
                        build: self.options.version
                    },
                    removedUserId : params.userId
                };
                resolve(data);
            }
        });
    };

};
