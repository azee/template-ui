define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var UserDetailsModel = Backbone.Model.extend({
        url:    "/mockdata/session.json",

        initialize : function () {
        },

        parse: function (data) {
            return data;
        }
    });

    return UserDetailsModel;
});