define([
    'jquery',
    'underscore',
    'backbone',
    'models/someBean/SomeBeanModel'
], function ($, _, Backbone, SomeBeanModel) {

    var SomeBeansCollection = Backbone.Collection.extend({
        model: SomeBeanModel,
        url: "mockdata/someBeansCollection.json",

        initialize : function (options) {
            _.bindAll(this);
        },

        search: function (criteria) {
            if (criteria == "") return this;
            return _(this.filter(function (data) {
                if (data.get("title").toLowerCase().indexOf(criteria) !== -1){
                    return true;
                } else {
                    return false;
                }
            }));
        }
    });

    return SomeBeansCollection;
});