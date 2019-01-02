$(function() {


    function check(ev, style, shift) {
        var macAllow = !style || style === 'mac',
            winAllow = !style || style === 'windows',
            code = ev.keyCode || ev.which;

        if (code!==122 && code!==90)
            return false;
        if (macAllow && (ev.metaKey && shift && !ev.ctrlKey && !ev.altKey))
            return true;
        if (winAllow && (ev.ctrlKey && shift && !ev.metaKey && !ev.altKey))
            return true;
        return false
    }

    // module.exports = function(ev, style) {
    //     return module.exports.undo(ev, style) || module.exports.redo(ev, style)
    // };

    var isUndo = function(ev, style) {
        return check(ev, style, !ev.shiftKey)
    };

    var isRedo = function(ev, style) {
        return check(ev, style, ev.shiftKey)
    };


    $(document).on('keydown', function (ev) {
        var performedAction = false;
        if (isUndo(ev)) {
            console.log('undo');
            charrambaCore.undo();
            performedAction = true;
        }
        if (isRedo(ev)) {
            console.log('redo');
            charrambaCore.redo();
            performedAction = true;
        }
        if (performedAction) {
            ev.preventDefault();
            return false;
        }
    });


    // var KEYCODE = {
    //     shift: 16,
    //     control: 17,
    //     command: [224, 17, 91, 93],
    //     alt: 18,
    //     z: [90, 122]
    // };
    //
    //
    // document.onkeydown = overrideKeyboardEvent;
    // document.onkeyup = overrideKeyboardEvent;
    // var keyIsDown = {};
    //
    // function overrideKeyboardEvent(e){
    //     switch(e.type){
    //         case "keydown":
    //             if(!keyIsDown[e.keyCode]){
    //                 keyIsDown[e.keyCode] = true;
    //                 // do key down stuff here
    //
    //                 if (isUndoShortcutPressed()) {
    //                     console.log('undo');
    //                     charrambaCore.undo();
    //                 }
    //
    //                 if (isRedoShortcutPressed()) {
    //                     console.log('redo');
    //                     charrambaCore.redo();
    //                 }
    //
    //             }
    //             break;
    //         case "keyup":
    //             delete(keyIsDown[e.keyCode]);
    //             // do key up stuff here
    //             break;
    //     }
    //     // disabledEventPropagation(e);
    //     // e.preventDefault();
    //     // return false;
    // }
    // function disabledEventPropagation(e){
    //     if(e){
    //         if(e.stopPropagation){
    //             e.stopPropagation();
    //         } else if(window.event){
    //             window.event.cancelBubble = true;
    //         }
    //     }
    // }
    //
    // function isUndoShortcutPressed() {
    //     return (keyIsDown[KEYCODE.z[0]] || keyIsDown[KEYCODE.z[1]])
    //         && !keyIsDown[KEYCODE.alt]
    //         && !keyIsDown[KEYCODE.shift]
    //         && (keyIsDown[KEYCODE.control]
    //             || keyIsDown[KEYCODE.command[0]]
    //             || keyIsDown[KEYCODE.command[1]]
    //             || keyIsDown[KEYCODE.command[2]]
    //             || keyIsDown[KEYCODE.command[3]]
    //             );
    // }
    //
    // function isRedoShortcutPressed() {
    //     return (keyIsDown[KEYCODE.z[0]] || keyIsDown[KEYCODE.z[1]])
    //         && !keyIsDown[KEYCODE.alt]
    //         && keyIsDown[KEYCODE.shift]
    //         && (keyIsDown[KEYCODE.control]
    //             || keyIsDown[KEYCODE.command[0]]
    //             || keyIsDown[KEYCODE.command[1]]
    //             || keyIsDown[KEYCODE.command[2]]
    //             || keyIsDown[KEYCODE.command[3]]
    //         );
    // }

});