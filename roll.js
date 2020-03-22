"use strict";
miro.onReady(function () {
    var form = document.getElementById("form");
    function submit(event) {
        console.log(event.preventDefault);
        event.preventDefault();
        var dice = 0;
        document.getElementsByName("dice").forEach(function (dieEl) {
            var checked = dieEl.checked;
            console.log(dieEl.value, checked);
        });
        var positionDiv = document.getElementsByName("position").item(0);
        var position = positionDiv.value;
        var effectDiv = document.getElementsByName("position").item(0);
        var effect = effectDiv.value;
        console.log(miro);
        miro.board.ui.closeModal({ position: position, effect: effect, dice: dice });
    }
    if (form) {
        form.onsubmit = submit;
    }
});
