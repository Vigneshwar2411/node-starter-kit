import _isNaN from 'lodash/isNaN';

export const formatDollar = (input, inputField) => {
  if (_isNaN(parseInt(input, 10)) || Math.abs(input) === 0) {
    if (inputField) {
      if (Math.abs(input) === 0) {
        return '$0';
      }
      return '';
    }
    return '\u2014';
  }

  const number = Math.abs(input);
  const formattedAmount = number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  if (parseInt(input, 10) < 0) {
    return `$(${formattedAmount.slice(1)})`;
  }
  if (formattedAmount.includes('.00')) {
    return formattedAmount.slice(0, formattedAmount.length - 3);
  }
  return formattedAmount;
};

// TODO: Remove when more than one function is exported
export default formatDollar;
