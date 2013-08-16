define([
    'jquery',
    'underscore',
    'backbone',
    'collections/someBean/SomeBeansCollection',
    'views/someBean/SomeBeanView',
    'text!templates/someBean/someBeansTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars',
    'libs/ginny/ginny'
], function ($, _, Backbone, SomeBeansCollection, SomeBeanView, someBeansTemplate) {

    var SomeBeansView = Backbone.View.extend({

        template:Handlebars.compile(someBeansTemplate),

        events:{
            'keyup #filter':'filter'
        },

        initialize:function () {
            this.collection = new SomeBeansCollection();
            _.bindAll(this, 'render', 'appendItem', 'renderItems'); // fixes loss of context for 'this' within methods
            this.collection.fetch({success:this.renderItems});//render view once all backend data obtained
            this.collection.bind('add', this.appendItem); // collection event binder
            this.subviews = [];
        },

        render:function () {
            this.$el.html(this.template());
            return this;
        },

        renderItems:function (items) {
            var listWrapper = $(this.$el).find("#grouped-items");
            listWrapper.html('');
            items.each(this.appendItem);
        },

        remove:function (attributes) {
            this.$el.remove();
            Backbone.View.prototype.remove.call(this, attributes);
        },

        appendItem:function (item) {
            var itemView = new SomeBeanView({
                model:item,
                el:$(this.$el).find("#grouped-items")
            });
            itemView.render();
            this.subviews.push(itemView);
        },

        filter:function (event) {
            var criteria = $(event.target).val().toLowerCase();
            this.renderItems(this.collection.search(criteria));
        }
    });

    return SomeBeansView;
});
