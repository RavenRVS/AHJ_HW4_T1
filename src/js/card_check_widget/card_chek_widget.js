/* eslint-disable no-underscore-dangle */
import creditCardType from './credit_card_type';
import lunhCheck from './lunh_check';
// eslint-disable-next-line no-unused-vars
import style from './css/card_check_widget.css';

export default class CardCheckWidget {
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

    this.cardsList = this.container.querySelectorAll(
      CardCheckWidget.selectorCard,
    );
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
      this.cardsList.forEach((el) => {
        if (el === card) {
          return;
        }
        el.classList.add('cdisabled');
      });
    } else {
      this.cardsList.forEach((el) => {
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
