$(function() {

    // cutting

    controlPanel.getControl(CONTROLS.form.scraped.enabled).on('change', function () {
        var enabled = this.checked;
        charrambaCore.setFormScrapedEnabled(enabled);
    });

    controlPanel.getControl(CONTROLS.form.scraped.offset).attr({
        min: charrambaParamsBounds.form.scraped.offset.min,
        max: charrambaParamsBounds.form.scraped.offset.max,
        value: charrambaCore.getParams().form.scraped.offset,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var offset = $(this).val();
        charrambaCore.setFormScrapedOffset(offset);
        controlPanel.getControl(CONTROLS.form.scraped.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.scraped.slices).attr({
        min: charrambaParamsBounds.form.scraped.slices.min,
        max: charrambaParamsBounds.form.scraped.slices.max,
        value: charrambaCore.getParams().form.scraped.slices,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var slices = $(this).val();
        charrambaCore.setFormScrapedSlices(slices);
        controlPanel.getControl(CONTROLS.form.scraped.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.scraped.direction).attr({
        min: charrambaParamsBounds.form.scraped.direction.min,
        max: charrambaParamsBounds.form.scraped.direction.max,
        value: charrambaCore.getParams().form.scraped.direction,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var form = $(this).val();
        charrambaCore.setFormScrapedDirection(form);
        controlPanel.getControl(CONTROLS.form.scraped.enabled).prop('checked', true).trigger('change');
    });

    // liquid

    controlPanel.getControl(CONTROLS.form.liquid.enabled).on('change', function () {
        var enabled = this.checked;
        charrambaCore.setFormLiquidEnabled(enabled);
    });

    controlPanel.getControl(CONTROLS.form.liquid.dissolveX).attr({
        min: charrambaParamsBounds.form.liquid.dissolveX.min,
        max: charrambaParamsBounds.form.liquid.dissolveX.max,
        value: charrambaCore.getParams().form.liquid.dissolveX,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var dissolveX = $(this).val();
        charrambaCore.setFormLiquidDissolveX(dissolveX);
        controlPanel.getControl(CONTROLS.form.liquid.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.liquid.dissolveY).attr({
        min: charrambaParamsBounds.form.liquid.dissolveY.min,
        max: charrambaParamsBounds.form.liquid.dissolveY.max,
        value: charrambaCore.getParams().form.liquid.dissolveY,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var dissolveY = $(this).val();
        charrambaCore.setFormLiquidDissolveY(dissolveY);
        controlPanel.getControl(CONTROLS.form.liquid.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.liquid.shift).attr({
        min: charrambaParamsBounds.form.liquid.shift.min,
        max: charrambaParamsBounds.form.liquid.shift.max,
        value: charrambaCore.getParams().form.liquid.shift,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var shift = $(this).val();
        charrambaCore.setFormLiquidShift(shift);
        controlPanel.getControl(CONTROLS.form.liquid.enabled).prop('checked', true).trigger('change');
    });

    // ascii

    controlPanel.getControl(CONTROLS.form.ascii.enabled).on('change', function () {
        var enabled = this.checked;
        charrambaCore.setFormAsciiEnabled(enabled);
    });

    controlPanel.getControl(CONTROLS.form.ascii.size).attr({
        min: charrambaParamsBounds.form.ascii.size.min,
        max: charrambaParamsBounds.form.ascii.size.max,
        value: charrambaCore.getParams().form.ascii.size,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var size = $(this).val();
        charrambaCore.setFormAsciiSize(size);
        controlPanel.getControl(CONTROLS.form.ascii.enabled).prop('checked', true).trigger('change');
    });

    // chromatic

    // controlPanel.getControl(CONTROLS.shift.chromatic.shift).attr({
    //     min: charrambaParamsBounds.shift.chromatic.shift.min,
    //     max: charrambaParamsBounds.shift.chromatic.shift.max,
    //     value: charrambaCore.getParams().shift.chromatic.shift,
    //     step: 1
    // })
    // .trigger('change')
    // .on('change input', function () {
    //     var shift = $(this).val();
    //     charrambaCore.setShiftChromaticShift(shift);
    // });

});