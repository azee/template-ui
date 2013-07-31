define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var SomeBeanDetailsModel = Backbone.Model.extend({
        id: "",
        url : 'some-api/version/some-bean/',

        initialize: function (options) {
		this.url = this.url + this.id;            
            

        }
    });

    return SomeBeanDetailsModel;
});
