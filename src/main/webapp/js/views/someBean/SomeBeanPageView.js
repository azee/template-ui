define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/someBean/someBeanPageTemplate.html' ,
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, someBeanPageTemplate){

    var SomeBeanPageView = Backbone.View.extend({

        template : Handlebars.compile(someBeanPageTemplate),
        events : {

        },
        initialize : function () {

        },
        render : function() {
            this.$el.append(this.template(this.model));
            return this;
        }
    });

    return SomeBeanPageView;
});