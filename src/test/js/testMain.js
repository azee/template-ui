// Require.js allows us to configure shortcut alias
// Their usage will become more apparent further along in the tutorial.
require.config({
    baseUrl: '/src/main/webapp/js',
    paths: {
        jquery: 'libs/jquery/jquery-min',
        jqueryUI: 'libs/jquery/jqueryui/jquery-ui-1.8.21.min',
        jqueryUICore: 'libs/jquery/jqueryui/jquery.ui.core',
        jqueryUIWidget: 'libs/jquery/jqueryui/jquery.ui.widget',
        jqueryUIPosition: 'libs/jquery/jqueryui/jquery.ui.position',
        deparam : 'libs/jquery/deparam',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        validation: 'libs/backbone/validation-min',
        handlebars: 'libs/handlebars/handlebars',
        templates: '../templates',
        bootstrap : 'libs/twitter/bootstrap.min',
        text: 'libs/require/text'
    },
    shim: {
        jquery : {
            exports : 'jQuery'
        },

        underscore : {
            exports : '_'
        },

        backbone : {
            deps: ['jquery','underscore'],
            exports : 'Backbone'
        },

        validation : {
            deps: ['backbone']

        },

        handlebars: {
            exports: 'Handlebars'
        },
        jqueryUI : {
            deps: ['jquery']
        },
        jqueryUICore : {
            deps: ['jquery','jqueryUI']
        },
        jqueryUIPosition : {
            deps: ['jquery','jqueryUI']
        },
        jqueryUIWidget : {
            deps: ['jquery','jqueryUI']
        },
        jqueryUISelectMenu : {
            deps: ['jquery','jqueryUI', 'jqueryUICore', 'jqueryUIPosition','jqueryUIWidget']
        },
        deparam : {
            deps: ['jquery']
        }
    }

});


//mock console for old browsers and headless environment
if ("undefined" === typeof window.console) {
    window.console = {
        "log": function () {
        }
    };
}

//endswith function to string class
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

console.log('running test main')

require(['jquery','handlebars','underscore','backbone','validation'], function ($) {
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
    $.ajax = jasmine.createSpy("spyAjax").andCallFake(function(params) {
        return null;
    });
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
});


