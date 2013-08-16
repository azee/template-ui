define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var SomeBeanModel = Backbone.Model.extend({
        id: "",
        url : '/some-api/version/some-bean/',

        methodToURL: {
            'read': "",
            'create': "/some-api/version/some-bean/",
            'update': "/some-api/version/some-bean/",
            'delete': ""
        },

        initialize: function (options) {
            if (options != null) {
                this.id = options.id;
                this.methodToURL['read'] = this.url + this.id;
                this.methodToURL['delete'] = this.url + this.id;
            }
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()];

            Backbone.sync(method, model, options);
        }
    });

    return SomeBeanModel;
});
