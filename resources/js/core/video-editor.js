var videoEditor;

$(function() {

    // define sketch object
    var createVideoEditor = function () {

        // this.params = charrambaCore.getParams().video;

        this.addAutomation = function (propIndex) {
            if (charrambaCore.getParams().video.automations.length === 0) {
                $('#video-timeline-message').fadeOut();
                $('.video-timeline-tip').fadeIn();
            }
            charrambaCore.addVideoAutomation({propIndex: propIndex, points: []});
        };

        this.automationExists = function (propIndex) {
            for (var i = 0; i < charrambaCore.getParams().video.automations.length; i++) {
                var automation = charrambaCore.getParams().video.automations[i];
                if (automation.propIndex === propIndex) {
                    return true;
                }
            }
            return false;
        };

        this.removeAutomation = function (propIndex) {
            charrambaCore.removeVideoAutomation(propIndex);
            if (charrambaCore.getParams().video.automations.length === 0) {
                $('#video-timeline-message').fadeIn();
                $('.video-timeline-tip').fadeOut();
            }
        };

        this.updatePoints = function (propIndex, points) {
            var automation = findObjectByKey(charrambaCore.getParams().video.automations, 'propIndex', propIndex);
            if (automation !== null) {
                automation.points = points;
            }
        };

        var findObjectByKey = function (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        };

        var getParameterValue = function (automation, time) {
            var bounds = propsManager.getPropBounds(automation.propIndex);
            var range = bounds.max - bounds.min;
            return interpolateValue(automation.points, time) * range + bounds.min;
        };

        var interpolateValue = function (points, time) {
            var progress = time / charrambaCore.getParams().video.duration;
            if (typeof(points) === undefined || points.length === 0) {
                return 0;
            }
            for (var i = 0; i < points.length- 1; i++) {
                var point = points[i];
                var nextPoint = points[i + 1];
                if (progress < point[0] && i === 0) {
                    return point[1];
                }
                if (point[0] < progress && progress < nextPoint[0]) {
                    var dir = (point[1] - nextPoint[1]) / (point[0] - nextPoint[0]);
                    return progress * dir + (point[1] - point[0] * dir);
                }
            }
            return points[points.length - 1][1];
        };

        this.updateAnimation = function (time) {
            console.log('animating');
            for (var i = 0; i < charrambaCore.getParams().video.automations.length; i++) {
                var automation = charrambaCore.getParams().video.automations[i];
                var paramValue = getParameterValue(automation, time);
                propsManager.setPropValue(automation.propIndex, paramValue);
            }
        };

        this.setAnimatedEffectsEnabled = function (enabled) {
            for (var i = 0; i < charrambaCore.getParams().video.automations.length; i++) {
                var automation = charrambaCore.getParams().video.automations[i];
                var keys = propsManager.getMappings()[automation.propIndex];
                if (keys[0] === 'form') {
                    var effectParams = propsManager.getFromObj(keys.slice(0, -1), charrambaCore.getParams());
                    effectParams.enabled = enabled;
                }
            }
        };

        return this;
    };

    videoEditor = createVideoEditor();

});