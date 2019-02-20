var automationTimeline;


$(function() {

    // define sketch object
    var createAutomationTimeline = function (_container) {

        var container = _container;

        this.addAutomationRow = function (propIndex) {
            var index = charrambaCore.getParams().video.automations.length;
            var propName = propsManager.getPropName(propIndex);
            var removeId = 'video-automation-remove-' + propIndex;
            var timelineId = 'video-automation-timeline-' + propIndex;
            var rowHtml = '<div class="video-editor__sequencer__row" data-index="' + propIndex + '">\n' +
                          // '    <div class="col-md-3">\n' +
                                    '<div class="video-editor__sequencer__remove" id="' + removeId + '" data-prop="' + propIndex + '" data-toggle="tooltip" data-placement="right" title="remove">' +
                                        '<img src="./resources/img/icons/cross.svg"/>' +
                                    '</div>' +
                                    '<p class="video-editor__sequencer__name">' + propName + '</p>' +

                // '    </div>\n' +
                //           '    <div class="col-md-9">\n' +
                                    '<div id="' + timelineId + '" class="video-editor__timeline"></div>\n' +
                          // '    </div>\n' +
                          '</div>';
            $(container).append(rowHtml);
            videoEditor.addAutomation(propIndex);
            var $timeline = $('#' + timelineId);
            $timeline.timeline({
                fgColor: '#666666',
                ptColor: '#e6e6e6',
                points: [[0, 0.5]]
            });

            $timeline.bind('change', function() {
                var points = $timeline.timeline().getPoints();
                if (typeof(points) !== undefined && points.length > 0) {
                    videoEditor.updatePoints(propIndex, points);
                }
            });

            $('#' + removeId).on('click', function () {
                var propIndex = $(this).data('prop');
                videoEditor.removeAutomation(propIndex);
                $('.video-editor__sequencer__row[data-index=' + propIndex + ']').remove();
            });
        };

        this.renderPropsSelect = function(container) {
            var mappings = propsManager.getMappings();
            var selectHtml = '<div class="select">\n' +
                             '    <select data-function="' + CONTROLS.video.animateParameterSelect + '" class="js-control">\n';
            for (var i = 0; i < mappings.length; i++) {
                var name = propsManager.getPropName(i);
                selectHtml += '<option class="select__option" value="' + i + '">' + name + '</option>\n';
            }
            selectHtml += '    </select>\n' +
                          '</div>';
            $(container).append(selectHtml);
        };

        var renderTimeline = function () {

        };

        var rowCount = function () {

        };



        return this;
    };

    automationTimeline = createAutomationTimeline(document.getElementById('video-editor__sequencer'));
});

