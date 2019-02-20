var propsManager;

$(function() {

    // define sketch object
    var createPropsManager = function () {

        var mappings = [
            ['text', 'size'],
            ['text', 'lineHeight'],
            ['form', 'scraped', 'offset'],
            ['form', 'scraped', 'slices'],
            ['form', 'scraped', 'direction'],
            ['form', 'liquid', 'dissolveX'],
            ['form', 'liquid', 'dissolveY'],
            ['form', 'liquid', 'shift'],
            ['form', 'pixel', 'size'],
            ['form', 'blur', 'amount'],
            ['form', 'blur', 'x'],
            ['form', 'blur', 'y'],
            ['form', 'wave', 'size']
        ];

        this.getFromObj = function (keys, obj) {
            return keys.reduce(function (obj, key) {
                return (obj && obj[key]) ? obj[key] : null;
            }, obj);
        };

        this.getPropId = function (index) {
            if (index < 0 || index > mappings.length) return null;
            return this.getFromObj(mappings[index], CONTROLS);
        };

        this.getPropValue = function (index) {
            if (index < 0 || index > mappings.length) return null;
            return this.getFromObj(mappings[index], charrambaCore.getParams());
        };

        this.getPropBounds = function (index) {
            if (index < 0 || index > mappings.length) return null;
            return this.getFromObj(mappings[index], charrambaParamsBounds);
        };

        this.getMappings = function () {
            return mappings;
        };

        this.getPropName = function (index) {
            if (index < 0 || index > mappings.length) return 'unknown';
            var keys = mappings[index];
            var keysLen = keys.length;
            return (keysLen > 1 ? keys[keysLen - 2] + ' ' : '') + keys[keysLen - 1];

        };

        this.setPropValue = function (index, value) {
            if (index < 0 || index > mappings.length) return;
            var keys = mappings[index];
            var parent = this.getFromObj(keys.slice(0, -1), charrambaCore.getParams());
            parent[keys[keys.length - 1]] = value;
        };

        return this;
    };

    propsManager = createPropsManager();

});