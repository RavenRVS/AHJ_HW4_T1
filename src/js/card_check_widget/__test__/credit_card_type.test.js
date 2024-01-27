import creditCardType from '../credit_card_type';

test.each([
  ['visa', '4111111111111111'],
  ['visa', '4012888888881881'],
  ['visa', '4222222222222'],
  ['amex', '378282246310005'],
  ['amex', '371449635398431'],
  ['master', '5555555555554444'],
  ['master', '5105105105105100'],
  ['discover', '6011111111111117'],
  ['discover', '6011000990139424'],
  ['mir', '2201427147768384'],
  ['mir', '2204961940514030'],

])(
  ('Test validate %s with value: %s'),
  (expected, numberCard) => {
    const received = creditCardType(numberCard);

    expect(received).toEqual(expected);
  },
);
