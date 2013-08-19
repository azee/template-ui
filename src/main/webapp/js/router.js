// Filename: router.js
/**
 * Base router of the application
 * all pages urls should be aggregated here and actions
 * taken appropriately
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'PageLayoutView',
    //library has to be loaded globally
    'deparam'

], function ($, _, Backbone, PageLayoutView) {

    var AppRouter = Backbone.Router.extend({
        routes:{
            '':'showMainPage',
            'someBeans?:params':'showSomeBeans',
            'someBean/:id':'showSomeBean',
            'user/profile':'showUserProfile',
            // Default
            '*actions':'defaultAction'
        },

        initialize : function () {
            _.bindAll(this, 'showMainPage', 'showSomeBeans', 'showSomeBean', 'showUserProfile', 'showPage');
        },

        showPage : function (MainView,HeaderView,FooterView) {
            this.removeCurrentView();
            var pageContainer = $('<div></div>').attr({id : 'page'})
            $('body').append(pageContainer);
            this.showParams.mainContent = MainView;
            this.showParams.headerContent = HeaderView;
            this.showParams.footerContent = FooterView;
            var page = new PageLayoutView(this.showParams);
            page.render();
            this.setView(page);
        },

        showMainPage : function () {
            this.showParams = {
                el:'#page',
                mainContentOptions:{
                },
                headerOptions:{
                    activeTitle:'Main Page',
                    pageTitle : 'Main Page'
                }
            };
            require(['SomeBeansView'], this.showPage);
        },

        showSomeBeans : function (params) {
            this.showParams = {
                el:'#page',
                mainContentOptions:{
                    params : $.deparam(params)
                },
                headerOptions:{
                    activeTitle:'Some Beans',
                    pageTitle : 'Some Beans'
                }
            };
            require(['SomeBeansView'], this.showPage);
        },

        showSomeBean : function (id) {
            this.showParams = {
                el:'#page',
                mainContentOptions:{
                    id : id
                }
            };
            require(['SomeBeanDetailsView'], this.showPage);
        },

        showUserProfile : function () {
            this.showParams = {
                el:'#page'
            };
            require(['UserProfileView'],this.showPage);
        },

        defaultAction : function (action) {
            //            don't have to do anything here, just action like bootstrap toggle occurred
        },

        removeCurrentView : function () {
            if (!_.isEmpty(this.view)) {
                this.view.undelegateEvents();
                this.view.remove();
            }
            this.view = null;
        },

        setView : function (view) {
            this.view = view;
        }

    });

    var initialize = function () {

        Handlebars.registerHelper('ifEquals', function (v1, v2, options) {
            if (v1 == v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper('ifNotEquals', function (v1, v2, options) {
            if (v1 != v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper('ifGt', function (v1, v2, options) {
            if (v1 > v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper('ifGte', function (v1, v2, options) {
            if (v1 >= v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper('ifLt', function (v1, v2, options) {
            if (v1 < v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper('ifLte', function (v1, v2, options) {
            if (v1 <= v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });


        var app_router = new AppRouter();

        Backbone.history.start();
    };
    return {
        initialize:initialize
    };
});
