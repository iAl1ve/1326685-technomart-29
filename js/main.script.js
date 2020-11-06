'use strict';

const KEY_ESC = 27;
const CLASS_MODAL_SHOW = `modal--show`;
const CLASS_MODAL_ERROE = `modal--error`;
const CLASS_SLIDER_SHOW = `slider__item--show`;
const CLASS_PREFIX_ACTIVE = `active`;

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem(`login`);
} catch (err) {
  isStorageSupport = false;
}

/* Управление модальным окном карты */
const modalMap = document.querySelector(`.modal-map`);
const modalMapClose = modalMap.querySelector(`.modal-map__btn-exit`);
const showMapBtn = document.querySelector(`.contacts__link`);

const closeModalMap = function (evt) {
  evt.preventDefault();
  modalMap.classList.remove(CLASS_MODAL_SHOW);
};

showMapBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  modalMap.classList.add(CLASS_MODAL_SHOW);
});

modalMapClose.addEventListener(`click`, closeModalMap);


/* Управление модальным окном обратной связи */

const modalFeedback = document.querySelector(`.modal-feedback`);
const showFeedbackBtn = document.querySelector(`.contacts__btn`);
const modalFeedbackLogin = modalFeedback.querySelector(`.modal-feedback__input--name`);
const modalFeedbackEmail = modalFeedback.querySelector(`.modal-feedback__input--email`);
const modalFeedbackTextarea = modalFeedback.querySelector(`.modal-feedback__textarea`);
const modalFeedbackClose = modalFeedback.querySelector(`.modal-feedback__btn-exit`);
const feedbackForm = modalFeedback.querySelector(`.modal-feedback__form`);

showFeedbackBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  modalFeedback.classList.add(CLASS_MODAL_SHOW);
  feedbackForm.addEventListener('submit', onSubmitFeedbackForm);

  if (storage) {
    modalFeedbackLogin.value = localStorage.getItem(`login`);
    modalFeedbackEmail.value = localStorage.getItem(`email`);
    modalFeedbackTextarea.focus();
  } else {
    modalFeedbackLogin.focus();
  }
});

const closeModalFeedback = function (evt) {
  evt.preventDefault();
  modalFeedback.classList.remove(CLASS_MODAL_SHOW);
  modalFeedback.classList.remove(CLASS_MODAL_ERROE);
  feedbackForm.removeEventListener('submit', onSubmitFeedbackForm);
};

modalFeedbackClose.addEventListener(`click`, closeModalFeedback);

const onSubmitFeedbackForm = function (evt) {
  if (!modalFeedbackLogin.value || !modalFeedbackEmail.value || !modalFeedbackTextarea.value) {
    evt.preventDefault();
    modalFeedback.classList.remove(CLASS_MODAL_ERROE);
    modalFeedback.offsetWidth;
    modalFeedback.classList.add(CLASS_MODAL_ERROE);
  } else {
    if (isStorageSupport) {
      localStorage.setItem(`login`, modalFeedbackLogin.value);
      localStorage.setItem(`email`, modalFeedbackEmail.value);
    }
  }
};

/* Управление промо слайдером */

const sliderBackBtn = document.querySelector(`.slider__back`);
const sliderNextBtn = document.querySelector(`.slider__next`);
const sliderToggleBtns = document.querySelectorAll(`.slider__toggle`);
const sliderItems = document.querySelectorAll(`.slider__item`);
let activeSliderItemId = 0;

sliderItems.forEach((el, itemId) => {
  if (el.classList.contains(CLASS_SLIDER_SHOW)) {
    activeSliderItemId = itemId;
  }
});

sliderBackBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  onClickSlideSwitch(activeSliderItemId - 1);
});

sliderNextBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  onClickSlideSwitch(activeSliderItemId + 1);
});

const onClickToggle = function (evt) {
  sliderItems[activeSliderItemId].classList.remove(CLASS_SLIDER_SHOW);
  sliderToggleBtns[activeSliderItemId].classList.remove(`slider__toggle--${CLASS_PREFIX_ACTIVE}`);

  sliderToggleBtns.forEach((el, itemId) => {
    if (el === evt.target) {
      activeSliderItemId = itemId;
    }
  });

  sliderToggleBtns[activeSliderItemId].classList.add(`slider__toggle--${CLASS_PREFIX_ACTIVE}`);
  sliderItems[activeSliderItemId].classList.add(CLASS_SLIDER_SHOW);
};

sliderToggleBtns.forEach((el) => {
  el.addEventListener('click', onClickToggle);
})

const onClickSlideSwitch = function (newActiveSliderItemId) {
  sliderItems[activeSliderItemId].classList.remove(CLASS_SLIDER_SHOW);
  sliderToggleBtns[activeSliderItemId].classList.remove(`slider__toggle--${CLASS_PREFIX_ACTIVE}`);

  if (newActiveSliderItemId > sliderItems.length - 1) {
    activeSliderItemId = 0;
  } else {
    activeSliderItemId = newActiveSliderItemId < 0 ? sliderItems.length - 1 : newActiveSliderItemId;
  }
  sliderToggleBtns[activeSliderItemId].classList.add(`slider__toggle--${CLASS_PREFIX_ACTIVE}`);
  sliderItems[activeSliderItemId].classList.add(CLASS_SLIDER_SHOW);
};

/* Управление слайдером сервисов */

const serviceBtns = document.querySelectorAll(`.service__btn`);
const serviceSliders = document.querySelectorAll(`.service__slider`);
const sliderDelivery = document.querySelector(`.service__slider--delivery`);
const sliderWarranty = document.querySelector(`.service__slider--warranty`);
const sliderCredit = document.querySelector(`.service__slider--credit`);
let activeSliderServiceItemId = 0;

const onClickServiceBtns = function (evt) {
  serviceBtns[activeSliderServiceItemId].classList.remove(`service__btn--${CLASS_PREFIX_ACTIVE}`);
  serviceSliders[activeSliderServiceItemId].classList.remove(`service__slider--${CLASS_PREFIX_ACTIVE}`);

  serviceBtns.forEach((el, itemId) => {
    if (el === evt.target) {
      activeSliderServiceItemId = itemId;
    }
  });

  serviceBtns[activeSliderServiceItemId].classList.add(`service__btn--${CLASS_PREFIX_ACTIVE}`);
  serviceSliders[activeSliderServiceItemId].classList.add(`service__slider--${CLASS_PREFIX_ACTIVE}`);
};

serviceBtns.forEach((el, itemId) => {
  if (el.classList.contains(`service__btn--${CLASS_PREFIX_ACTIVE}`)) {
    activeSliderServiceItemId = itemId;
  }
  el.addEventListener('click', onClickServiceBtns);
})

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
    if (modalFeedback.classList.contains(CLASS_MODAL_SHOW)) {
      closeModalFeedback(evt);
    }

    if (modalMap.classList.contains(CLASS_MODAL_SHOW)) {
      closeModalMap(evt);
    }

    if (modalSucces.classList.contains(CLASS_MODAL_SHOW)) {
      closeModalSucces(evt);
    }
  }
});
