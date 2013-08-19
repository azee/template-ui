define([
    'jquery',
    'underscore',
    'backbone',
    'models/pager/PagerItemModel'
], function ($, _, Backbone, PagerItemModel) {

    var SomeBeanPagerItemsCollection = Backbone.Collection.extend({
        model: PagerItemModel,
        url: "mockdata/someBeansPagerItemsCollection.json",

        parse: function (data) {
            return data.pages;
        }
    });

    return SomeBeanPagerItemsCollection;
});