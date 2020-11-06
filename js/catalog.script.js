const KEY_ESC = 27;
const CLASS_MODAL_SHOW = `modal--show`;
const CLASS_PREFIX_ACTIVE = `active`;

/* Показ формы добавления товара в корзину */

const cardBuyBtns = document.querySelectorAll(`.card__btn--buy`);
const modalSucces = document.querySelector(`.modal-succes`);
const modalSuccesClose = modalSucces.querySelector(`.modal-succes__btn-exit`);
const buyCloseButton = modalSucces.querySelector(`.modal-succes__btn-order`);
const basket = document.querySelector(`.header__toolbar-link--basket`);

const onClickBuyBtns = function (evt) {
  evt.preventDefault();
  modalSucces.classList.add(CLASS_MODAL_SHOW);
  basket.classList.add(`header__toolbar-link--${CLASS_PREFIX_ACTIVE}`);
};

const closeModalSucces = function (evt) {
  evt.preventDefault();
  modalSucces.classList.remove(CLASS_MODAL_SHOW);
};

cardBuyBtns.forEach((el) => {
  el.addEventListener('click', onClickBuyBtns);
})

modalSuccesClose.addEventListener(`click`, closeModalSucces);
buyCloseButton.addEventListener(`click`, closeModalSucces);

/* Управление закрытием форм через ESC */

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === KEY_ESC) {
    if (modalSucces.classList.contains(CLASS_MODAL_SHOW)) {
      closeModalSucces(evt);
    }
  }
});
