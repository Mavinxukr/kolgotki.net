import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import { login } from '../../../services/login';
import styles from './Login.scss';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import Button from '../../Layout/Button/Button';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import InputFormWrapper from '../../InputFormWrapper/InputFormWrapper';
import {
  required,
  composeValidators,
  passwordValidation,
  emailValidation,
} from '../../../utils/validation';
import IconExit from '../../../assets/svg/Group 795.svg';

const renderInput = props => ({ input, meta }) => (
  <InputFormWrapper inputProps={input} meta={meta} {...props} />
);

const saveToken = (shouldRememberedUser, token, cookies) => {
  if (shouldRememberedUser) {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 * 30 });
  } else {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 });
  }
};

const Login = ({ cookies }) => {
  const [shouldRememberedUser, setShouldRememberedUser] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  if (isAuth) {
    router.push('/');
  }

  const onSubmit = (values) => {
    login({}, values)
      .then((response) => {
        if (response.status) {
          saveToken(shouldRememberedUser, response.data.token, cookies);
          setIsAuth(true);
        } else {
          setErrorMessage(response.message);
        }
      });
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4>Вход в аккаунт</h4>
            <div className={styles.links}>
              <Link href="/login">
                <a className={cx(styles.routeLink, styles.linkActive)}>Войти</a>
              </Link>
              <Link href="/registration">
                <a className={styles.routeLink}>Регистрация</a>
              </Link>
            </div>
            <div className={styles.inputs}>
              <Field
                name="email"
                validate={composeValidators(required, emailValidation)}
              >
                {renderInput({
                  placeholder: 'E-mail',
                  type: 'email',
                  viewTypeForm: 'userForm',
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
              <Field
                name="password"
                validate={composeValidators(required, passwordValidation)}
              >
                {renderInput({
                  placeholder: 'Пароль',
                  type: 'password',
                  viewTypeForm: 'userForm',
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            {errorMessage ? (
              <p className={styles.errorMessage}>неверный e-mail или пароль</p>
            ) : null}
            <div className={styles.checkboxWrapper}>
              <Checkbox
                name="login"
                title="Запомнить меня"
                checked={shouldRememberedUser}
                onChange={setShouldRememberedUser}
              />
              <button className={styles.forgotPasswordButton} type="button">
                Забыли пароль?
              </button>
            </div>
            <Button
              width="100%"
              buttonType="button"
              viewType="facebook"
              title="Войти через Facebook"
            />
            <Button
              width="100%"
              buttonType="submit"
              viewType="auth"
              title="Войти"
              disabled={errorMessage ? false : invalid}
            />
            <p className={styles.text}>
              Уже есть аккаунт?
              <Link href="/registration">
                <a className={styles.registrationLink}>Регистрация</a>
              </Link>
            </p>
            <button type="button" className={styles.closeButton}>
              <IconExit />
            </button>
          </form>
        )}
      />
    </FormWrapper>
  );
};

Login.propTypes = {
  cookies: PropTypes.object,
};

export default Login;
