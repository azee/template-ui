define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/someBean/someBeanTemplate.html' ,
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, someBeanTemplate){

    var SomeBeanView = Backbone.View.extend({

        template : Handlebars.compile(someBeanTemplate),
        events : {

        },
        initialize : function () {

        },
        render : function() {
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        }
    });

    return SomeBeanView;
});