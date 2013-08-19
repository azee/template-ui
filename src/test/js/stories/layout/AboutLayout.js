var suite = function (PageLayoutView) {
    describe('About PageLayout', function () {
        var emptyView;

        beforeEach(function () {
            $('body').append('<div id="page"></div>');
            emptyView = new PageLayoutView({
                //element which will get all html produced during layout rendering
                el: '#page'
            });
        });

        afterEach(function () {
            emptyView.remove();
            $('#page').remove();
        });

        it('Should be tied to a DOM element when created, based off the property provided.', function () {
            expect(emptyView.el.tagName.toLowerCase()).toBe('div');
        });


    });
};

define(
    [
        'views/layout/PageLayoutView'
    ],
    suite);