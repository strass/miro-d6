const form = document.getElementById("form");

function submit(event: Event) {
  console.log(event.preventDefault);
  event.preventDefault();
  let dice = 0;
  document.getElementsByName("dice").forEach(dieEl => {
    const checked = (dieEl as HTMLInputElement).checked;
    console.log((dieEl as HTMLInputElement).name, checked);
  });
  const positionDiv = document.getElementsByName("position").item(0);
  const position = (positionDiv as HTMLSelectElement).value;
  const effectDiv = document.getElementsByName("position").item(0);
  const effect = (effectDiv as HTMLSelectElement).value;
  miro.board.ui.closeModal({ position, effect, dice });
}

if (form) {
  form.onsubmit = submit;
}
