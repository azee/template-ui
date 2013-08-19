define([
    'jquery',
    'underscore',
    'backbone',
    'libs/ginny/ginny'
], function($, _, Backbone){

    var SomeBeanModel = Backbone.Model.extend({
        id: "",
        url : 'mockdata/someBeanData.json',

        methodToURL: {
            'read': "",
            'create': "mockdata/someBeanData.json",
            'update': "mockdata/someBeanData.json",
            'delete': ""
        },

        initialize: function (options) {
            if (options != null) {
                this.id = options.id;
                this.methodToURL['read'] = this.url + "?id=" + this.id;
                this.methodToURL['delete'] = this.url + "?id=" + this.id;
            }
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()];

            Backbone.sync(method, model, options);
        },

        parse: function(data){
            data.displayCreatedTime = Ginny.timeToDate(data.created);
            data.displayTimePassed = Ginny.timePassed(data.time);
            return data;
        }
    });

    return SomeBeanModel;
});
