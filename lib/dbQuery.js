var db = require('./dbConn.js');

module.exports = function DbQuery () {
    "use strict";
    var self = this;
    var ownerRoleId = 'C';


    self.findFeedByUserId = function findFeedByUserId(params, callback) {

        var values = [
            params.userId,
            params.propertyId
        ];

        var sql = "SELECT feed.id, feed.property_id, feed.created_by, user_feed.user_id, user_feed.role_id " +
                  "From feed "+
                  "INNER JOIN user_feed on feed.id = user_feed.feed_id " +
                  "WHERE user_feed.user_id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.findFeedByPropertyId = function findFeedByPropertyId(params, callback) {

        var values = [
            params.userId,
            params.propertyId
        ];

        var sql = "SELECT feed.id, feed.property_id, feed.created_by, user_feed.user_id, user_feed.role_id " +
            "From feed "+
            "INNER JOIN user_feed on feed.id = user_feed.feed_id " +
            "WHERE user_feed.userId = ? AND feed.property_id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.findFeedByFeedId = function findFeedByFeedId(params, callback) {

        var values = [
            params.userId,
            params.feedId
        ];

        var sql = "SELECT feed.id, feed.property_id, feed.created_by, user_feed.user_id, user_feed.role_id " +
            "From feed "+
            "INNER JOIN user_feed on feed.id = user_feed.feed_id " +
            "WHERE user_feed.user_id = ? AND feed.id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.createFeed = function createFeed(params, callback) {

        var values = [
            params.feedId,
            params.propertyId,
            params.userId
        ];

        var sql = "INSERT INTO feed " +
                  "(id, property_id, created_by) " +
                  "VALUES (?,?,?)";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.createUserFeed = function createUserFeed(params, callback) {

        var values = [
            params.userId,
            params.feedId,
            params.roleId,
            params.status
        ];

        var sql = "INSERT INTO user_feed " +
                  "(user_id, feed_id, role_id, status) " +
                  "VALUES (?,?,?,?)";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };



    self.deleteFeedByFeedId = function deleteFeedByFeedId(params, callback) {

        var values = [
            params.feedId
        ];

        var sql = "DELETE FROM feed " +
                  "WHERE id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.deleteUserFeedByFeedId = function deleteUserFeedByFeedId(params, callback) {

        var values = [
            params.feedId
        ];

        var sql = "DELETE FROM user_feed " +
                  "WHERE feed_id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.createPost = function createPost(params, callback) {

        var values = [
            params.postId,
            params.feedId,
            params.userId,
            params.comment
        ];

        var sql = "INSERT INTO post " +
                  "(id, feed_id, created_by, created_date, updated_date, comment) " +
                  "VALUES (?, ?, ?, NOW(), NOW(), ?)";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.findPostsCountByFeedId = function findPostsCountByFeedId(params, callback) {

        var values = [
            params.userId,
            params.feedId
        ];

        console.log(values);

        var sql = "SELECT count(*) AS count " +
            "From feed "+
            "INNER JOIN user_feed on feed.id = user_feed.feed_id " +
            "INNER JOIN post on feed.id = post.feed_id " +
            "WHERE user_feed.user_id = ? AND feed.id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.findPosts = function findPosts(params, callback) {

        var values = [
            params.userId,
            params.feedId,
            params.offset,
            params.limit
        ];

        console.log(values);

        var sql = "SELECT feed.id AS feed_id, feed.property_id, user_feed.user_id as feedOwnerId, user_feed.role_id, " +
            "post.id AS id, post.created_by, post.created_date, post.comment " +
            "From feed "+
            "INNER JOIN user_feed on feed.id = user_feed.feed_id " +
            "INNER JOIN post on feed.id = post.feed_id " +
            "WHERE user_feed.user_id = ? AND feed.id = ? " +
            "ORDER by post.created_date desc " +
            "LIMIT ?, ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.findPostByPostId = function findPostByPostId(params, callback) {

        var values = [
            params.userId,
            params.feedId,
            params.postId
        ];

        var sql = "SELECT feed.id AS feed_id, feed.property_id, user_feed.user_id, user_feed.role_id, " +
            "post.id AS id, post.created_by, post.created_date, post.comment " +
            "From feed "+
            "INNER JOIN user_feed on feed.id = user_feed.feed_id " +
            "INNER JOIN post on feed.id = post.feed_id " +
            "WHERE user_feed.user_id = ? AND feed.id = ? AND post.id = ? " +
            "ORDER by feed.id asc, created_date asc";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.updatePostByPostId = function updatePostByPostId(params, callback) {

        console.log(params);
        var values = [
            params.userId,
            params.comment,
            params.postId
        ];

        console.log(values);
        var sql = "UPDATE post " +
                  "SET created_by = ?, " +
                  "    updated_date = NOW(), " +
                  "    comment = ? " +
                  "WHERE id = ?";

        console.log(sql);
        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.deletePostByPostId = function deletePostByPostId(params, callback) {

        var values = [
            params.postId
        ];

        var sql = "DELETE FROM post " +
            "WHERE id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };



    self.findFeedOwner = function findFeedOwner(params, callback) {

        var values = [
            params.userId,
            params.feedId,
            ownerRoleId
        ];

        var sql = "SELECT count(*) AS count " +
            "From user_feed "+
            "WHERE user_id = ? AND feed_id = ? AND role_id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    self.findUsersByFeedId = function findUsersByFeedId(params, callback) {

        var values = [
            params.feedId
        ];

        var sql = "SELECT user_id, feed_id, role_id  " +
            "From user_feed "+
            "WHERE feed_id = ? ";

        console.log(sql);
        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };


    self.findUser = function findUser(params, callback) {

        var values = [
            params.userId,
            params.feedId
        ];

        var sql = "SELECT user_id, feed_id, role_id  " +
                  "From user_feed "+
                  "WHERE user_id = ? AND feed_id = ? ";

        console.log(sql);
        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };


    self.updateUserRole = function updateUserRole(params, callback) {

        var values = [
            params.roleId,
            params.userId,
            params.feedId
        ];

        var sql = "UPDATE user_feed " +
            "SET role_id = ? " +
            "WHERE user_id = ? AND feed_id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

    // ToDo : need to remove posts by this user?
    self.revokeUserRole = function revokeUserRole(params, callback) {

        var values = [
            params.userId,
            params.feedId
        ];

        var sql = "DELETE FROM user_feed " +
            "WHERE user_id = ? AND feed_id = ?";

        db.query({
            sql : sql,
            values: values,
            callback : callback
        });
    };

};

