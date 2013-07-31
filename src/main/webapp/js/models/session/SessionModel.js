define(
    [
        'jquery',
        'underscore',
        'backbone'
    ],
    function ($, _, Backbone) {
        var SessionModel = Backbone.Model.extend({
            defaults: {
                user: {
                    name: "Guest",
                    id: "Guest"
                }
            },

            url: "some-api/version/user/token",

            initialize: function () {
                this.fetch();
            },

            //Mocking the user - remove if used with the real API:////
            fetch : function(){
                return {}
            },
            /////////////////////////////////////////////////////////

            parse: function (data) {
                if (!data.id) {
                    this.set("user", $.extend({}, this.attributes.user, this.defaults));
                } else {
                    this.set("user", $.extend({}, this.attributes.user, data));
                }
            },

            isAuthorized: function () {
                return Boolean(this.get("user").token);
            }

        });

        var _instance = new SessionModel();

        return {
            getInstance: function () {
                return _instance;
            }
        };
    });