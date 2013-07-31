define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/layout/navigationTemplate.html' ,
    'models/session/SessionModel',
    'bootstrap',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, navigationTemplate, SessionModel) {

    var NavigationHeader = Backbone.View.extend({

        template: Handlebars.compile(navigationTemplate),
        toggleState: false,

        initialize: function (options) {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

//            TODO: pull menus from backend?
            this.menus = [
                {
                    title: "Main Page",
                    url: "#/"
                },
                {
                    title: "Some Beans",
                    url: "#/some-beans"
                },
            ];

            //initialize active menu based on options passed from router
            for (var i = 0; i < this.menus.length; i++) {
                if (this.menus[i].title == options.activeTitle) {
                    this.menus[i].active = true;
                }
            }

            if (options.pageTitle != null && options.pageTitle != "undefinde"){
                this.pageTitle = options.pageTitle;
            }

            //user info might change over time - update it on render request
//                TODO: update header on model change
            SessionModel.getInstance().bind("change", this.render);
        },

        authorized: function () {
            return SessionModel.getInstance().isAuthorized();
        },

        render: function () {
            if (this.authorized()) {
                this.userMenus = [
                    {
                        title: "View Profile",
                        url: "#/user/profile"
                    },
                    {
                        title: "Exit",
                        url: '/somLogoutUrl'
                    }
                ];
            } else {
                this.userMenus = [
                    {
                        title: "Login",
                        url: '/someLoginUrl'
                    }
                ];
            }
            var user = $.extend({}, SessionModel.getInstance().get("user"));

            //compile handlebars template
            //TODO: make menu items backed by some collection and models
            this.$el.html(this.template({
                "menus": this.menus,
                "userMenus": this.userMenus,
                "user": user
            }));

            return this;
        }

    });
    return NavigationHeader;

})
;