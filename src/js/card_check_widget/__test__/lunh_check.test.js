import lunhCheck from '../lunh_check';

test.each([
  ['visa', '4111111111111111', true],
  ['visa', '4012888888881881', true],
  ['visa', '4222222222222', true],
  ['amex', '378282246310005', true],
  ['amex', '371449635398431', true],
  ['master', '5555555555554444', true],
  ['master', '5105105105105100', true],
  ['discover', '6011111111111117', true],
  ['discover', '6011000990139424', true],
  ['mir', '2201427147768384', true],
  ['mir', '2204961940514030', true],
  ['any number1', '0123456789101112', false],

])(
  ('Test validate %s with value: %s'),
  (_, numberCard, expected) => {
    const received = lunhCheck(numberCard);

    expect(received).toEqual(expected);
  },
);
