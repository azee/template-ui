define([
    'jquery',
    'underscore',
    'backbone',
    'collections/someBean/SomeBeansCollection',
    'views/someBean/SomeBeanPageView',
    'text!templates/someBean/someBeansPageTemplate.html',
    'views/pager/SomeBeanPagerItemsView',
    //dirty hack for handlebars loading wait
    'handlebars',
    'libs/ginny/ginny'
], function ($, _, Backbone, SomeBeansCollection, SomeBeanPageView, someBeansPageTemplate, SomeBeanPagerItemsView) {

    var SomeBeansPageView = Backbone.View.extend({

        template:Handlebars.compile(someBeansPageTemplate),

        events: {
            'click .remove-launch': 'removeLaunch',
            'click #filter': 'filter'
        },

        initialize:function (options) {
            this.skip = options.params.skip;
            this.limit = options.params.limit;
            if (options.params.title != null && options.params.title != undefined && options.params.title != ""){
                this.titleFilter = options.params.title;
            } else {
                this.titleFilter = "";
            }

            this.collection = new SomeBeansCollection();
            this.collection.url = this.collection.url + "?skip=" + this.skip + "&limit=" + this.limit + "&title=" + this.titleFilter;
            _.bindAll(this, 'render', 'remove', 'appendItems', 'renderItems', 'renderPager',
               'redrawPage', 'mainRender', 'intervalFetch'); // fixes loss of context for 'this' within methods
            this.collection.fetch({success:this.mainRender});

            //Clear all intervals
            var interval_id = window.setInterval("", 9999); // Get a reference to the last interval +1
            for (var i = 1; i < interval_id; i++){
                clearInterval(i);
            }

            //Set an inteval to update launches
            setInterval(this.intervalFetch, 30000);
            this.subviews = [];
        },



        intervalFetch: function(){
            this.collection.fetch({success:this.mainRender});
        },

        render:function () {
            this.$el.html(this.template({title: this.titleFilter}));
            return this
        },

        mainRender:function () {
            this.subviews = [];
            $(".some-bean-item").remove();

            if (!this.collection.isEmpty()) {
                this.renderItems(this.collection);
            }
            this.renderPager();
            this.delegateEvents();
            return this;
        },

        renderItems:function (items) {
            this.$el.find("#spinner").hide();
            items.each(this.appendItems);
        },

        appendItems:function (item) {
            var itemView = new SomeBeanPageView({
                model:item.toJSON(),
                el:this.$el.find(".some-beans")
            });
            itemView.render();
            this.subviews.push(itemView);
        },

        remove:function (attributes) {
            if (!_.isEmpty(this.pagerView)) {
                this.pagerView.remove();
            }
            if (!_.isEmpty(this.subviews)) {
                for (var i = 0; i < this.subviews.length; i++) {
                    this.subviews[i].remove();
                }
            }
            this.$el.remove();
            Backbone.View.prototype.remove.call(this, attributes);
        },

        renderPager:function () {
            var pagerView = new SomeBeanPagerItemsView({
                el:this.$el.find(".pager-wrapper"),
                skip: this.options.params.skip,
                limit: this.options.params.limit,
                title: this.options.params.title
            });
            pagerView.render();
            this.pagerView = pagerView;
        },

        redrawPage:function () {
            this.$el.html("");
            this.render();
            this.$el.find("#loading").hide();
            this.$el.find("#spinner").hide();
        },

        filter: function(){
            this.titleFilter = $('#title').val();
            window.location.hash = '#/some-beans?skip=' + this.skip + '&limit=' + this.limit + "&title=" + this.titleFilter;
            return false;
        }

    });

    return SomeBeansPageView;
});
