miro.onReady(() => {
  const form = document.getElementById("form");

  function submit(event: Event) {
    event.preventDefault();
    let dice = 0;
    document.getElementsByName("dice").forEach(dieEl => {
      const checked = (dieEl as HTMLInputElement).checked;
      const value = (dieEl as HTMLInputElement).value;
      if (checked) {
        dice = Number(value);
      }
    });
    const positionDiv = document.getElementsByName("position").item(0);
    const position = (positionDiv as HTMLSelectElement).value;
    const effectDiv = document.getElementsByName("effect").item(0);
    const effect = (effectDiv as HTMLSelectElement).value;
    console.log(miro);
    miro.board.ui.closeModal({ position, effect, dice });
  }

  if (form) {
    form.onsubmit = submit;
  }
});
