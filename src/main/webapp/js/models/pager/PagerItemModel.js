define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var PagerItemModel = Backbone.Model.extend({
        initialize : function () {
            // nothing to do here
        }
    });

    return PagerItemModel;
});