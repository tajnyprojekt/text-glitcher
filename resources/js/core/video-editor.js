var videoEditor;

$(function() {

    // define sketch object
    var createVideoEditor = function () {

        this.params = {
            duration: 6000, //ms
            automations: []
        };

        this.addAutomation = function (propIndex) {
            this.params.automations.push({propIndex: propIndex, points: []});
        };

        this.updatePoints = function (propIndex, points) {
            var automation = findObjectByKey(this.params.automations, 'propIndex', propIndex);
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
            var progress = time / this.params.duration;
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
            for (var i = 0; i < this.params.automations.length; i++) {
                var automation = this.params.automations[i];
                var paramValue = getParameterValue(automation, time);
                propsManager.setPropValue(automation.propIndex, paramValue);
            }
        };

        return this;
    };

    videoEditor = createVideoEditor();

});