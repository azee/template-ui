define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/someBean/someBeansDetailsTemplate.html' ,
    'models/someBean/SomeBeanModel' ,
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone,someBeanDetailsTemplate, SomeBeanDetailsModel){

    var SomeBeanDetailsView = Backbone.View.extend({

        template : Handlebars.compile(someBeanDetailsTemplate),
        events : {

        },
        initialize : function (options) {
            _.bindAll(this, 'render', 'renderDetails'); // fixes loss of context for 'this' within methods
            this.id = options.id;

            this.model = new SomeBeanDetailsModel({
                id: this.id
            });
        },
        render: function(){
            this.model.fetch({success : this.renderDetails});
        },
        renderDetails : function() {
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        }
    });

    return SomeBeanDetailsView;
});