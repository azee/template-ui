define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/pager/pagerItemTemplate.html' ,
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone,pagerItemTemplate){

    var PagerItemView = Backbone.View.extend({

        template : Handlebars.compile(pagerItemTemplate),
        events : {

        },
        initialize : function () {

        },
        render : function() {
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        }
    });

    return PagerItemView;
});