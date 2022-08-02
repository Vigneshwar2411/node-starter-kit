export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

export const capitalizeAllWords = str => str && str.toLowerCase().split(' ').map(word => capitalize(word)).join(' ');
