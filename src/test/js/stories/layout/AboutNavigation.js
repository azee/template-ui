var suite =function (NavigationHeader) {
    describe('NavigationHeader', function () {
        var navigationView;

//          Initialize NavigationView
        beforeEach(function () {
//              append header destination to the body
            $('body').append('<div id="header"></div>');
//              invoke rendering to destination element
            navigationView = new NavigationHeader({
//                  element which will get all html produced during layout rendering
                el: '#header'
            });
            navigationView.render();
        });

//          Clean up page content once all tests passed
        afterEach(function () {
            navigationView.remove();
            $('#header').remove();
        });

        it ('has 2 navigation lists', function () {
            expect($('.nav').length).toBe(2);
        });

//        assert number of menu items
        it('section 1 has 2 menu items by default', function () {
            //assert that container is present
            expect(navigationView.el.tagName.toLowerCase()).toBe('div');
            //render content into container
            expect($($('.nav')[0]).children().length).toBe(2);

        });
    });

};

define(
    [
        "views/layout/NavigationHeader"
    ],
    suite
);