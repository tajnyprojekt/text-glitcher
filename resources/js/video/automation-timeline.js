

var AutomationTimeline = function() {

    'use strict'

    var points = [
        {
            x: 0,
            y: 0
        },
        {
            x: 100,
            y: 0
        }
    ];

    this.create = function (container, id, pointsCount, height) {
        var $container = $(container);
        points[1].y = $container.width();
        $container.innerHtml = '<svg class="video-timeline-menu__chart">'
         + '<polyline id="'+ id
          + '" fill="none" stroke="#0074d9" stroke-width="3" points="'
          + serializePoints() + '"/></svg>';
        console.log($container.innerHtml);
    };

    var serializePoints = function () {
        var serialized = "";
        for (var i = 0; i < points.lenght; i++) {
            serialized += "" + points[i].x + ", " + points[i].y + ", \n";
        }
        return serialized;
    }

};

$(function () {

    // var timelineChart = {

    // };

    // $('.video-timeline-menu__chart').on('click', function (e) {
    //     var x = e.pageX - $('.video-timeline-menu__chart').offset().left;
    //     var y = e.pageY - $('.video-timeline-menu__chart').offset().top;
    //     console.log(x, y);
    //     var points = $("#chart-points").attr('points');
    //     console.log(points);
    //     points += "\n" + x + ", " + y;
    //     $("#chart-points").attr('points', points);
    // });
    var automationTimeline = new AutomationTimeline();
    automationTimeline.create('#automation-timeline-0', 'automation-0', 100, 10);

});