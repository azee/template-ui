var suite = function ($, SomeBeansView) {

    describe('Main View', function () {
        var testedView = null;


        beforeEach(function () {
            testedView = new SomeBeansView();
        });

        it('renders', function () {
            testedView.render();
            expect(testedView.$el.children().length).toBe(1);
        });

        it('has itemsList block', function () {
            testedView.render();
            expect(testedView.$el.find("#itemsList").length).toBe(1);
        });

        it('has someBeans in someBeans block', function () {
            testedView.render();
            expect(testedView.$el.find("grouped-items").children.length).toBeGreaterThan(0);
        });

        afterEach(function () {
            testedView.remove();
        });

    });

};

define(['jquery',
    'views/someBean/SomeBeansView'
], suite);