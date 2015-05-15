var Promise = require('bluebird');
var FeedsApiClient = require('../../lib/feedsApiClient.js');
var Uuid = require('uuid');

/**
 * Business logic object for property search and show end point
 *
 * @method Properties
 * @param {object} options
 * @return {promise}
 */
var Feeds = function(options) {
    "use strict";
    var self = this,
        client = new FeedsApiClient(options);


    /**
     * Get list of feed
     *
     * @method setFeed
     * @param {object} params
     * @return {promise}
     */
    self.getFeeds = function getFeeds (request) {
        return new Promise(function (resolve, reject) {
            request.query.userId = request.params.userId;
            client.getFeed(request.query, resolve, reject);
        });
    };

    /**
     * Creates a feed
     *
     * @method setFeed
     * @param {object} params
     * @return {promise}
     */

    self.setFeed = function setFeed (request) {
        return new Promise(function (resolve, reject) {
            request.payload.feedId = Uuid.v4();
            request.payload.userId = request.params.userId;

            client.setFeed(request.payload, resolve, reject);
        });
    };

    /**
     * Get feed information
     *
     * @method getFeedByFeedId
     * @param {object} params
     * @return {promise}
     */
    self.getFeedByFeedId = function getFeedByFeedId (request) {
        return new Promise(function (resolve, reject) {
            client.getFeedByFeedId(request.params, resolve, reject);
        });
    };

    /**
     * Removes a feed information
     *
     * @method removeFeed
     * @param {object} params
     * @return {promise}
     */

    self.removeFeed = function removeFeed (request) {
        return new Promise(function (resolve, reject) {
            client.removeFeed(request.params, resolve, reject);
        });
    };


    /**
     * Creates a post information
     *
     * @method setPost
     * @param {object} params
     * @return {promise}
     */
    self.setPost = function setPost (request) {
        return new Promise(function (resolve, reject) {
            request.payload.userId = request.params.userId;
            request.payload.feedId = request.params.feedId;
            request.payload.postId = Uuid.v4();
            client.setPost(request.payload, resolve, reject);
        });
    };

    self.getPosts = function getPosts (request) {
        var getParams = {};
        getParams.userId = request.params.userId;
        getParams.feedId = request.params.feedId;
        getParams.offset = parseInt(request.query.offset, 10);
        getParams.limit = parseInt(request.query.limit, 10);
        return new Promise.join(client.getPostsCount(getParams), client.getPosts(getParams), function (count, posts) {
            posts.matching_rows = count;
            return posts;
        });
    };

    self.getPost = function getPost (request) {
        return new Promise(function (resolve, reject) {
            client.getPostByPostId(request.params, resolve, reject);
        });
    };

    self.updatePost = function updatePost (request) {
        return new Promise(function (resolve, reject) {
            request.payload.userId = request.params.userId;
            request.payload.feedId = request.params.feedId;
            request.payload.postId = request.params.postId;
            client.updatePost(request.payload, resolve, reject);
        });
    };

    self.removePost = function removePost (request) {
        return new Promise(function (resolve, reject) {
            request.payload.userId = request.params.userId;
            request.payload.feedId = request.params.feedId;
            request.payload.postId = request.params.postId;
            client.removePost(request.payload, resolve, reject);
        });
    };

    self.validateOwner = function validateOwner (request) {
        return new Promise(function (resolve, reject) {
            client.validateOwner(request.params, resolve, reject);
        });
    };

    self.getUsers = function getUsers (request) {
        return new Promise(function (resolve, reject) {
            client.getUsers(request.params, resolve, reject);
        });
    };

    self.setUser = function setUser (request) {
        return new Promise(function (resolve, reject) {
            request.payload.userId = request.params.userId;
            request.payload.feedId = request.params.feedId;
            client.setUser(request.payload, resolve, reject);
        });
    };

    self.getUser = function getUser (request) {
        return new Promise(function (resolve, reject) {
            client.getUser(request.params, resolve, reject);
        });
    };

    self.updateUser = function updateUser (request) {
        return new Promise(function (resolve, reject) {
            request.payload.userId = request.params.userId;
            request.payload.feedId = request.params.feedId;
            client.updateUser(request.payload, resolve, reject);
        });
    };

    self.removeUser = function removeUser (request) {
        return new Promise(function (resolve, reject) {
            client.removeUser(request.params, resolve, reject);
        });
    };

    /**
     * Handling errors from this endpoint
     *
     * @method error
     * @return {data}
     */
    self.error = function error (data) {
        console.log(data);
        return data;
    };


};

module.exports = Feeds;