import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FacebookLogin } from 'react-facebook-login-component';

const FacebookButton = ({ handleCallback, classNameWrapper }) => {
  useEffect(() => {
    const button = document.querySelector(`.${classNameWrapper}`);
    button.type = 'button';
  }, []);

  return (
    <FacebookLogin
      socialId="1083453692003561"
      language="en_US"
      scope="public_profile,email"
      responseHandler={handleCallback}
      fields="id,email,name"
      version="v2.5"
      className={classNameWrapper}
      buttonText="Войти через Facebook"
    />
  );
};

FacebookButton.propTypes = {
  handleCallback: PropTypes.func,
  classNameWrapper: PropTypes.string,
};

export default FacebookButton;