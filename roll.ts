const form = document.getElementById("form");

function submit(event: Event) {
  event.preventDefault();
  const positionDiv = (document.getElementById(
    "position"
  ) as unknown) as HTMLSelectElement | null;
  const position = positionDiv?.value;
  console.log(position);
  miro.board.ui.closeModal({ position });
}

if (form) {
  form.onsubmit = submit;
}
