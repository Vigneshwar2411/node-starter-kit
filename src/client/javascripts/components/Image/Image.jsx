/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { ImageContext } from '../ImageProvider/ImageProvider';

/* istanbul ignore next */
const getImagePath = imageName => (window.assets ? window.assets[imageName] : imageName);

/* istanbul ignore next */
const Image = props => (
  <ImageContext.Consumer>
    {
      source => (
        <img
          src={`${source}/${getImagePath(props.image)}`}
          className={props.className}
          alt={props.alt}
          onClick={props.onClick}
        />
      )
    }
  </ImageContext.Consumer>
);

Image.defaultProps = {
  alt: '',
  className: '',
  onClick: null,
};

Image.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Image;
