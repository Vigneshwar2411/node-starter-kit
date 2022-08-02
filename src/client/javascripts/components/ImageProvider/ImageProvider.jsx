import React from 'react';
import PropTypes from 'prop-types';

export const ImageContext = React.createContext();

const ImageProvider = ({ source, children }) => (
  <ImageContext.Provider value={source}>
    <div className="image-provider">
      {children}
    </div>
  </ImageContext.Provider>
);

ImageProvider.defaultProps = {
  children: null,
  source: '',
};

ImageProvider.propTypes = {
  children: PropTypes.node,
  source: PropTypes.string,
};

export default ImageProvider;
