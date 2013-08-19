define([
    'jquery',
    'underscore',
    'backbone',
    'collections/pagerItems/SomeBeanPagerItemsCollection',
    'views/pager/PagerItemView',
    'text!templates/pager/pagerItemsTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone,SomeBeanPagerItemsCollection,PageItemView,pageItemsTemplate){

    var SomeBeanPagerItemsView = Backbone.View.extend({

        template : Handlebars.compile(pageItemsTemplate),

        initialize: function(options){
            this.skip = options.skip;
            this.limit = options.limit;

            if (options.title != null && options.title != undefined && options.title != ""){
                this.title = options.title;
            } else {
                this.title = "";
            }

            this.collection = new SomeBeanPagerItemsCollection();
            this.collection.url = this.collection.url + "?startWith=" + this.skip + "&step=" + this.limit + "&title=" + this.title;
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
            _.bindAll(this, 'appendItem'); // fixes loss of context for 'this' within methods
            _.bindAll(this, 'renderItems'); // fixes loss of context for 'this' within methods
            this.collection.fetch({success : this.renderItems});//render view once all backend data obtained
            this.collection.bind('add', this.appendItem); // collection event binder
        },

        render: function(){
            return this;
        },

        renderItems : function (items) {
            this.$el.html(this.template());
            items.each(this.appendItem);
        },

        appendItem: function(item){
            var itemView = new PageItemView({
                model: item,
                el: this.$el.find("#pager")
            });

//            if (item.attributes.enabled == false || item.attributes.active == true){
//                item.attributes.class = "disabled unclickable";
//            }
            if (item.get('enabled') == false || item.get('active') == true){
                item.set('class', 'disabled unclickable') ;
            }

            itemView.render();
        }
    });

    return SomeBeanPagerItemsView;
});