import classnames from 'classnames';
import config from '../config';

export const renderIf = (condition, ifCallback) => (condition() ? ifCallback() : null);

export const classnamesWithModifier = (baseClassname, ...modifiers) => {
  if (modifiers.length) {
    const modifiedClasses = modifiers.map(modifier => modifier && `${baseClassname}--${modifier}`);
    return classnames(baseClassname, modifiedClasses.join(' ').trim());
  }
  return baseClassname;
};

export const isNonProd = () => config.env === 'dev' || config.env === 'qa' || config.env === 'local';

export const isLocal = () => config.env === 'local';

export const exists = field => field !== undefined && field !== null;
