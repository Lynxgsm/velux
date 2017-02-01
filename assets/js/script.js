var D = document.createElement('div');
var draw = SVG('drawing').size(1000, 500);
let objects = [];
var concerned = [];
var init = 0;
var startDrag_X = 0,
    startDrag_Y = 0,
    x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0;

var variation = [1, .6];

draw.each(function(i, children) {
    children[i].node;
    if (children[i].classes() == 'line') {
        this.draggable().on('dragstart', function(e) {
            e.preventDefault();
            concernedx = [];
            concerned = [];
            concernedMovex = [];
            concernedMove = [];
            startDrag_X = e.detail.p.x;
            startDrag_Y = e.detail.p.y;

            x1 = this.attr('x1');
            x2 = this.attr('x2');
            y1 = this.attr('y1');
            y2 = this.attr('y2');

            for (var i = 0; i < $('.line').length; i++) {
                if (this.attr('x1') == $('.line:nth(' + i + ')').attr('x2')) {
                    concernedx.push($('.line:nth(' + i + ')').attr('id') + "#x1");
                    concerned.push($('.line:nth(' + i + ')').attr('id'));
                }

                if (this.attr('x2') == $('.line:nth(' + i + ')').attr('x1')) {
                    concernedx.push($('.line:nth(' + i + ')').attr('id') + "#x2");
                    concerned.push($('.line:nth(' + i + ')').attr('id'));
                }

                if ($('#' + this.attr('data-move')).attr('x1') == $('.line:nth(' + i + ')').attr('x2')) {
                    concernedMovex.push($('.line:nth(' + i + ')').attr('id') + "#x1");
                    concernedMove.push($('.line:nth(' + i + ')').attr('id'));
                }

                if ($('#' + this.attr('data-move')).attr('x2') == $('.line:nth(' + i + ')').attr('x1')) {
                    concernedMovex.push($('.line:nth(' + i + ')').attr('id') + "#x2");
                    concernedMove.push($('.line:nth(' + i + ')').attr('id'));
                }

            }
        });


        this.draggable().on('dragmove', function(e) {
            x = Number(e.detail.p.x) - Number(startDrag_X);
            y = Number(e.detail.p.y) - Number(startDrag_Y);
            e.preventDefault();

            x1 = this.attr('x1');
            x2 = this.attr('x2');
            y1 = this.attr('y1');
            y2 = this.attr('y2');

            if (direction === 'right') {
                if (this.attr('data-direction') === 'y') {
                    this.attr('x1', this.attr('x1') + variation[0]);
                    this.attr('x2', this.attr('x2') + variation[0]);
                    this.attr('y1', this.attr('y1') - .6);
                    this.attr('y2', this.attr('y2') - .6);
                    /*MOVE LINE*/
                    $('#' + this.attr('data-move')).attr('x1', Number($('#' + this.attr('data-move')).attr('x1')) + variation[0]);
                    $('#' + this.attr('data-move')).attr('x2', Number($('#' + this.attr('data-move')).attr('x2')) + variation[0]);
                    $('#' + this.attr('data-move')).attr('y1', Number($('#' + this.attr('data-move')).attr('y1')) - variation[1]);
                    $('#' + this.attr('data-move')).attr('y2', Number($('#' + this.attr('data-move')).attr('y2')) - variation[1]);
                    /*MOVE GRAB*/
                    $('#' + this.attr('data-grab')).children().attr('cx', Number($('#' + this.attr('data-grab')).children().attr('cx')) + variation[0]);
                    $('#' + this.attr('data-grab')).children().attr('cy', Number($('#' + this.attr('data-grab')).children().attr('cy')) - variation[1]);

                    /*MOVE CONCERNED GRAB*/
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx')) + variation[0]);
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy')) - variation[1]);

                } else {
                    /*MOVE LINE*/
                    this.attr('x1', this.attr('x1') + variation[0]);
                    this.attr('x2', this.attr('x2') + variation[0]);
                    this.attr('y1', this.attr('y1') + variation[1]);
                    this.attr('y2', this.attr('y2') + variation[1]);
                    /*MOVE CONCERNED LINE*/
                    $('#' + this.attr('data-move')).attr('x1', $('#' + this.attr('data-move')).attr('x1') - variation[0]);
                    $('#' + this.attr('data-move')).attr('x2', $('#' + this.attr('data-move')).attr('x2') - variation[0]);
                    $('#' + this.attr('data-move')).attr('y1', $('#' + this.attr('data-move')).attr('y1') - variation[1]);
                    $('#' + this.attr('data-move')).attr('y2', $('#' + this.attr('data-move')).attr('y2') - variation[1]);
                    /*MOVE GRAB*/
                    $('#' + this.attr('data-grab')).children().attr('cx', Number($('#' + this.attr('data-grab')).children().attr('cx')) + variation[0]);
                    $('#' + this.attr('data-grab')).children().attr('cy', Number($('#' + this.attr('data-grab')).children().attr('cy')) + variation[1]);
                    /*MOVE CONCERNED GRAB*/
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx')) - variation[0]);
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy')) - variation[1]);
                    /*MOVE TEXT*/
                    $('#' + this.attr('data-grab')).children('text').attr('x', Number($('#' + this.attr('data-grab')).children('text').attr('x')) + variation[0]);
                    $('#' + this.attr('data-grab')).children('text').attr('y', Number($('#' + this.attr('data-grab')).children('text').attr('y')) + variation[1]);
                    /*MOVE CONCERNED TEXT*/
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children('text').attr('x', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children('text').attr('x')) - variation[0]);
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children('text').attr('y', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children('text').attr('y')) - variation[1]);

                }
            } else {
                if (this.attr('data-direction') === 'y') {
                    /*MOVE LINE*/
                    this.attr('x1', this.attr('x1') - variation[0]);
                    this.attr('x2', this.attr('x2') - variation[0]);
                    this.attr('y1', this.attr('y1') + variation[1]);
                    this.attr('y2', this.attr('y2') + variation[1]);
                    /*MOVE GRAB*/
                    $('#' + this.attr('data-move')).attr('x1', Number($('#' + this.attr('data-move')).attr('x1')) - variation[0]);
                    $('#' + this.attr('data-move')).attr('x2', Number($('#' + this.attr('data-move')).attr('x2')) - variation[0]);
                    $('#' + this.attr('data-move')).attr('y1', Number($('#' + this.attr('data-move')).attr('y1')) + variation[1]);
                    $('#' + this.attr('data-move')).attr('y2', Number($('#' + this.attr('data-move')).attr('y2')) + variation[1]);
                    /*MOVE CONCERNED GRAB*/
                    $('#' + this.attr('data-grab')).children().attr('cx', Number($('#' + this.attr('data-grab')).children().attr('cx')) - variation[0]);
                    $('#' + this.attr('data-grab')).children().attr('cy', Number($('#' + this.attr('data-grab')).children().attr('cy')) + variation[1]);

                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx')) - variation[0]);
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy')) + variation[1]);
                } else {
                    /*MOVE LINE*/
                    this.attr('x1', this.attr('x1') - variation[0]);
                    this.attr('x2', this.attr('x2') - variation[0]);
                    this.attr('y1', this.attr('y1') - variation[1]);
                    this.attr('y2', this.attr('y2') - variation[1]);
                    /*MOVE GRAB*/
                    $('#' + this.attr('data-move')).attr('x1', Number($('#' + this.attr('data-move')).attr('x1')) + variation[0]);
                    $('#' + this.attr('data-move')).attr('x2', Number($('#' + this.attr('data-move')).attr('x2')) + variation[0]);
                    $('#' + this.attr('data-move')).attr('y1', Number($('#' + this.attr('data-move')).attr('y1')) + variation[1]);
                    $('#' + this.attr('data-move')).attr('y2', Number($('#' + this.attr('data-move')).attr('y2')) + variation[1]);
                    /*MOVE CONCERNED GRAB*/
                    $('#' + this.attr('data-grab')).children().attr('cx', Number($('#' + this.attr('data-grab')).children().attr('cx')) - variation[0]);
                    $('#' + this.attr('data-grab')).children().attr('cy', Number($('#' + this.attr('data-grab')).children().attr('cy')) - variation[1]);
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cx')) + variation[0]);
                    $('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy', Number($('#' + $('#' + this.attr('data-move')).attr('data-grab')).children().attr('cy')) + variation[1]);
                }
            }

            for (var i = 0; i < concerned.length; i++) {
                var ind = $('#' + concerned[i]);
                var result = GetDistance(ind.attr('x1'), ind.attr('y1'), ind.attr('x2'), ind.attr('y2'));
                console.log("Distance: " + result);
                $('#length_' + concerned[i]).text(transportToActualSize(result));
            }

            s = [];
            scon = [];

            for (var i = 0; i < concernedx.length; i++) {
                var s = concernedx[i].split('#');
            }


            for (var i = 0; i < concernedMovex.length; i++) {
                var scon = concernedMovex[i].split('#');
            }

            if (s[1] == "x1") {
                $('#' + concerned[1]).attr('x2', this.attr('x1'));
                $('#' + concerned[1]).attr('y2', this.attr('y1'));
                $('#' + concerned[0]).attr('x1', this.attr('x2'));
                $('#' + concerned[0]).attr('y1', this.attr('y2'));
            } else {
                $('#' + concerned[0]).attr('x2', this.attr('x1'));
                $('#' + concerned[0]).attr('y2', this.attr('y1'));
                $('#' + concerned[1]).attr('x1', this.attr('x2'));
                $('#' + concerned[1]).attr('y1', this.attr('y2'));
            }

            if (scon[1] == "x1") {
                $('#' + concernedMove[1]).attr('x2', $('#' + this.attr('data-move')).attr('x1'));
                $('#' + concernedMove[1]).attr('y2', $('#' + this.attr('data-move')).attr('y1'));
                $('#' + concernedMove[0]).attr('x1', $('#' + this.attr('data-move')).attr('x2'));
                $('#' + concernedMove[0]).attr('y1', $('#' + this.attr('data-move')).attr('y2'));
            } else {
                $('#' + concernedMove[0]).attr('x2', $('#' + this.attr('data-move')).attr('x1'));
                $('#' + concernedMove[0]).attr('y2', $('#' + this.attr('data-move')).attr('y1'));
                $('#' + concernedMove[1]).attr('x1', $('#' + this.attr('data-move')).attr('x2'));
                $('#' + concernedMove[1]).attr('y1', $('#' + this.attr('data-move')).attr('y2'));
            }
        });
    }
}, true);

var direction = "",
    oldx = 0;

$(window).mousemove(function(e) {
    if (e.pageX < oldx) {
        direction = "left"
    } else
    if (e.pageX > oldx) {
        direction = "right"
    }
    oldx = e.pageX;

});

function changeLengthValue(element, value) {
    console.log(element.attr('x1'));
}

function GetDistance(x1, y1, x2, y2) {
    ptA = Math.pow(Number(x2) - Number(x1), 2);
    ptB = Math.pow(Number(y2) - Number(y1), 2);
    distance = Math.sqrt(Number(ptA) + Number(ptB));
    return Math.round(distance);
}

function transportToActualSize(dist) {
    return Math.round(dist * 15 / 390);
}