/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/card_check_widget/credit_card_type.js
/* eslint-disable prefer-regex-literals */
function creditCardType(cc) {
  const amex = new RegExp('^3[47]');
  const visa = new RegExp('^4');
  const mastercard = new RegExp('^5[1-5]');
  const disco = new RegExp('^6[0245]');
  const mir = new RegExp('^220[0-4]');
  if (visa.test(cc)) {
    return 'visa';
  }
  if (amex.test(cc)) {
    return 'amex';
  }
  if (mastercard.test(cc)) {
    return 'master';
  }
  if (disco.test(cc)) {
    return 'discover';
  }
  if (mir.test(cc)) {
    return 'mir';
  }
  return false;
}
;// CONCATENATED MODULE: ./src/js/card_check_widget/lunh_check.js
function lunhCheck(cardNo) {
  const nDigits = cardNo.length;
  let nSum = 0;
  let isSecond = false;
  for (let i = nDigits - 1; i >= 0; i -= 1) {
    let d = cardNo[i].charCodeAt() - '0'.charCodeAt();
    if (isSecond === true) d *= 2;
    nSum += parseInt(d / 10, 10);
    nSum += d % 10;
    isSecond = !isSecond;
  }
  return nSum % 10 === 0;
}
;// CONCATENATED MODULE: ./src/js/card_check_widget/card_chek_widget.js
/* eslint-disable no-underscore-dangle */


// eslint-disable-next-line no-unused-vars

class CardCheckWidget {
  constructor(container) {
    if (typeof container === 'string') {
      document.querySelector(container);
    }
    this.container = container;
    this._checkTypeCard = this._checkTypeCard.bind(this);
    this._isValid = this._isValid.bind(this);
  }
  static get widgetElements() {
    return `
    <div class="card-check-widget">
        <h3>Check your credit card number</h3>
        <ul class="cards list-unstyled">
            <li><span class="card visa" title="Visa">Visa</span></li>
            <li><span class="card master" title="Mastercard">Mastercard</span></li>
            <li><span class="card amex" title="American Express">American Express</span></li>
            <li><span class="card discover" title="Discover">Discover</span></li>
            <li><span class="card mir" title="MIR">MIR</span></li>
        </ul>
        <form id="form" class="form-inline" validate="novalidate">
            <div class="form-group">
                <input class="form-input" id="card_number" name="card_number" type="text" placeholder="Credit card number" data-original-title="" title="">
                <button class="form-btn" id="validate-btn">Click to Validate</button>
            </div>
        </form>
    </div>
    `;
  }
  static get selectorForm() {
    return '.form-inline';
  }
  static get selectorInput() {
    return '.form-input';
  }
  static get selectorCard() {
    return '.card';
  }
  bindToDOM() {
    this.container.innerHTML = CardCheckWidget.widgetElements;
    this.cardsList = this.container.querySelectorAll(CardCheckWidget.selectorCard);
    this.form = this.container.querySelector(CardCheckWidget.selectorForm);
    this.input = this.form.querySelector(CardCheckWidget.selectorInput);
    this.input.addEventListener('input', this._checkTypeCard);
    this.form.addEventListener('submit', this._isValid);
  }
  _checkTypeCard() {
    const cardType = creditCardType(this.input.value);
    this.input.classList.remove('valid', 'novalid');
    if (cardType) {
      const card = this.container.querySelector(`.${cardType}`);
      this.cardsList.forEach(el => {
        if (el === card) {
          return;
        }
        el.classList.add('cdisabled');
      });
    } else {
      this.cardsList.forEach(el => {
        el.classList.remove('cdisabled');
      });
    }
  }
  _isValid(e) {
    e.preventDefault();
    let result = false;
    if (lunhCheck(this.input.value)) {
      result = true;
    }
    if (result) {
      this.input.classList.add('valid');
      this.input.classList.remove('novalid');
    } else {
      this.input.classList.add('novalid');
      this.input.classList.remove('valid');
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const cardCheckWidget = new CardCheckWidget(container);
  cardCheckWidget.bindToDOM();
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;