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

    // pixel

    controlPanel.getControl(CONTROLS.form.pixel.enabled).on('change', function () {
        var enabled = this.checked;
        charrambaCore.setFormPixelEnabled(enabled);
    });

    controlPanel.getControl(CONTROLS.form.pixel.size).attr({
        min: charrambaParamsBounds.form.pixel.size.min,
        max: charrambaParamsBounds.form.pixel.size.max,
        value: charrambaCore.getParams().form.pixel.size,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var size = $(this).val();
        charrambaCore.setFormPixelSize(size);
        controlPanel.getControl(CONTROLS.form.pixel.enabled).prop('checked', true).trigger('change');
    });

    // blur

    controlPanel.getControl(CONTROLS.form.blur.enabled).on('change', function () {
        var enabled = this.checked;
        charrambaCore.setFormBlurEnabled(enabled);
    });

    controlPanel.getControl(CONTROLS.form.blur.amount).attr({
        min: charrambaParamsBounds.form.blur.amount.min,
        max: charrambaParamsBounds.form.blur.amount.max,
        value: charrambaCore.getParams().form.blur.amount,
        step: 0.02
    })
    .trigger('change')
    .on('change input', function () {
        var amount = $(this).val();
        charrambaCore.setFormBlurAmount(amount);
        controlPanel.getControl(CONTROLS.form.blur.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.blur.x).attr({
        min: charrambaParamsBounds.form.blur.x.min,
        max: charrambaParamsBounds.form.blur.x.max,
        value: charrambaCore.getParams().form.blur.x,
        step: 4
    })
    .trigger('change')
    .on('change input', function () {
        var x = $(this).val();
        charrambaCore.setFormBlurX(x);
        controlPanel.getControl(CONTROLS.form.blur.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.blur.y).attr({
        min: charrambaParamsBounds.form.blur.y.min,
        max: charrambaParamsBounds.form.blur.y.max,
        value: charrambaCore.getParams().form.blur.y,
        step: 4
    })
    .trigger('change')
    .on('change input', function () {
        var y = $(this).val();
        charrambaCore.setFormBlurY(y);
        controlPanel.getControl(CONTROLS.form.blur.enabled).prop('checked', true).trigger('change');
    });

    // wave

    controlPanel.getControl(CONTROLS.form.wave.enabled).on('change', function () {
        var enabled = this.checked;
        charrambaCore.setFormWaveEnabled(enabled);
    });

    controlPanel.getControl(CONTROLS.form.wave.size).attr({
        min: charrambaParamsBounds.form.wave.size.min,
        max: charrambaParamsBounds.form.wave.size.max,
        value: charrambaCore.getParams().form.wave.size,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var size = $(this).val();
        charrambaCore.setFormWaveSize(size);
        controlPanel.getControl(CONTROLS.form.wave.enabled).prop('checked', true).trigger('change');
    });

    // adjust

    controlPanel.getControl(CONTROLS.form.adjust.enabled).on('change', function () {
        var enabled = this.checked;
        charrambaCore.setFormAdjustEnabled(enabled);
    });

    controlPanel.getControl(CONTROLS.form.adjust.gamma).attr({
        min: charrambaParamsBounds.form.adjust.gamma.min,
        max: charrambaParamsBounds.form.adjust.gamma.max,
        value: charrambaCore.getParams().form.adjust.gamma,
        step: 0.01
    })
    .trigger('change')
    .on('change input', function () {
        var offset = $(this).val();
        charrambaCore.setFormAdjustGamma(offset);
        controlPanel.getControl(CONTROLS.form.adjust.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.adjust.saturation).attr({
        min: charrambaParamsBounds.form.adjust.saturation.min,
        max: charrambaParamsBounds.form.adjust.saturation.max,
        value: charrambaCore.getParams().form.adjust.saturation,
        step: 0.01
    })
    .trigger('change')
    .on('change input', function () {
        var slices = $(this).val();
        charrambaCore.setFormAdjustSaturation(slices);
        controlPanel.getControl(CONTROLS.form.adjust.enabled).prop('checked', true).trigger('change');
    });

    controlPanel.getControl(CONTROLS.form.adjust.contrast).attr({
        min: charrambaParamsBounds.form.adjust.contrast.min,
        max: charrambaParamsBounds.form.adjust.contrast.max,
        value: charrambaCore.getParams().form.adjust.contrast,
        step: 0.01
    })
    .trigger('change')
    .on('change input', function () {
        var form = $(this).val();
        charrambaCore.setFormAdjustContrast(form);
        controlPanel.getControl(CONTROLS.form.adjust.enabled).prop('checked', true).trigger('change');
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