"use strict";
miro.onReady(function() {
  var form = document.getElementById("form");
  function submit(event) {
    event.preventDefault();
    var dice = 0;
    document.getElementsByName("dice").forEach(function(dieEl) {
      var checked = dieEl.checked;
      var value = dieEl.value;
      if (checked) {
        dice = Number(value);
      }
    });
    var positionDiv = document.getElementsByName("position").item(0);
    var position = positionDiv.value;
    var effectDiv = document.getElementsByName("effect").item(0);
    var effect = effectDiv.value;
    console.log({ position, effect, dice });
    miro.board.ui.closeModal({ position, effect, dice });
  }
  if (form) {
    form.onsubmit = submit;
  }
});
