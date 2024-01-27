/* eslint-disable prefer-regex-literals */
export default function creditCardType(cc) {
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
