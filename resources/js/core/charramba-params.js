
var charrambaParamsBounds = {
    canvas: {
        width: {
            min: 100,
            max: 1920
        },
        height: {
            min: 100,
            max: 1080
        },
        zoom: {
            min: 0.3,
            max: 5,
            step: 0.1
        }
    },
    text: {
        size: {
            min: 5,
            max: 200
        },
        lineHeight: {
            min: 5,
            max: 200
        }
    },
    form: {
        scraped: {
            offset: {
                min: -50,
                max: 50
            },
            slices: {
                min: 1,
                max: 100
            },
            direction: {
                min: 0,
                max: 360
            }
        },
        liquid: {
            dissolveX: {
                min: 1,
                max: 300
            },
            dissolveY: {
                min: 1,
                max: 300
            },
            shift: {
                min: 0,
                max: 400
            }
        },
        ascii: {
            size: {
                min: 2,
                max: 15
            }
        },
        chromatic: {
            shift:{
                min: -50,
                max: 50
            }
        }
    }
};