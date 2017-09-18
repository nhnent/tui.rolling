'use strict';

var Rolling = require('../src/js/rolling');

describe('rolling 테스트', function() {
    jasmine.getFixtures().fixturesPath = 'base';

    beforeEach(function() {
        loadFixtures('test/fixtures/rolling.html');
    });

    describe('생성 및 동작 테스트', function() {
        var rolling1,
            rolling2,
            rolling3,
            rolling4;

        beforeEach(function() {
            var div1 = document.getElementById('rolling1'),
                div2 = document.getElementById('rolling2'),
                div3 = document.getElementById('rolling3'),
                div4 = document.getElementById('rolling4');

            rolling1 = new Rolling({
                element: div1,
                isAuto: true
            }, ['a1', 'a2', 'a3']);

            rolling2 = new Rolling({
                element: div2,
                direction: 'vertical',
                isVariable: true
            }, 'initData');

            // width 300px; height:150px;
            rolling3 = new Rolling({
                element: div3,
                direction: 'horizontal',
                isVariable: false,
                isAuto: false,
                duration: 400,
                isCircle: true,
                isDrawn: true,
                unit: 'page'
            });
            // width 150px, height: 300px;
            rolling4 = new Rolling({
                element: div4,
                direction: 'vertical',
                isVariable: false,
                isAuto: false,
                duration: 400,
                isCircle: true,
                isDrawn: true,
                unit: 'item'
            });
        });

        it('롤링 생성', function() {
            expect(rolling1).toBeDefined();
            expect(rolling2).toBeDefined();
            expect(rolling3).toBeDefined();
            expect(rolling4).toBeDefined();
        });

        it('isDrawn 에 따른 모델 존재', function() {
            // !isDrawn
            expect(rolling1._model).toBeDefined();
            expect(rolling2._model).toBeDefined();
            // isDrawn
            expect(rolling3._model).toBe(null);
            expect(rolling4._model).toBe(null);
        });

        it('is Defined roller', function() {
            expect(rolling1._roller).toBeDefined();
            expect(rolling2._roller).toBeDefined();
            expect(rolling3._roller).toBeDefined();
            expect(rolling4._roller).toBeDefined();
        });

        it('roll , 롤링 작동확인 (!isDrwan)', function() {
            var rollNum1 = rolling1._model.getCurrent();
            var rollNum2;

            rolling1.roll();
            rollNum2 = rolling1._model.getCurrent();
            expect(rollNum1).not.toBe(rollNum2);
        });

        it('moveTo test', function() {
            var error = false;
            rolling1.moveTo(3);
            expect(rolling1._model.getCurrent()).toBe(3);
            try {
                rolling1.moveTo();
            } catch (e) {
                error = e.toString();
            }
            expect(error).not.toBeFalsy();
            error = false;
            try {
                rolling1._options.isVariable = true;
                rolling1.moveTo(3);
            } catch (e) {
                rolling1._options.isVariable = false;
                error = e.toString();
            }
            expect(error).not.toBeFalsy();
        });

        it('auto And Stop', function() {
            rolling1.auto();
            expect(rolling1._timer).toBeDefined();
        });

        it('roll - not idle', function() {
            var move = false;
            var error = false;
            var handler = function() {
                move = true;
            };
            rolling1.on('beforeMove', handler);
            rolling1._roller.status = 'run';
            rolling1.roll();
            expect(move).toBeFalsy();

            rolling1._roller.status = 'idle';
            rolling1._options.isVariable = true;
            try {
                rolling1.roll();
            } catch (e) {
                error = e.toString();
            }
            expect(error).not.toBeFalsy();

            rolling1.roll('data');
        });

        it('Custom Event mixin', function() {
            expect(rolling1.on).toBeDefined();
            expect(rolling2.on).toBeDefined();
        });

        it('Custom Event test', function() {
            var beforeMoveHandler = jasmine.createSpy('before move event handler');
            var afterMoveHandler = jasmine.createSpy('after move event handler');

            rolling1.on('beforeMove', beforeMoveHandler);
            rolling1.on('afterMove', afterMoveHandler);

            rolling1.roll('data');

            expect(beforeMoveHandler).toHaveBeenCalled();
            expect(afterMoveHandler).toHaveBeenCalled();
        });
    });
});