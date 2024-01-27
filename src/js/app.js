import CardCheckWidget from "./card_check_widget/card_chek_widget";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cardCheckWidget = new CardCheckWidget(container);
  cardCheckWidget.bindToDOM();
});
