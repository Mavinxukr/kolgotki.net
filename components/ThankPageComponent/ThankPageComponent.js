import React from 'react';
import MainLayout from '../UIComponents/MainLayout/MainLayout';
import Styles from './ThankPageComponent.module.scss';

const ThankPageComponent = () => (
  <MainLayout>
    <div className={Styles.ThankPageComponent}>
      <h2 className={Styles.ThankPageComponent__Title}>Спасибо за покупку!</h2>
      <p className={Styles.ThankPageComponent__Order}>Номер вашего заказа: <span className={Styles.ThankPageComponent__OrderNumber}>10031315819</span></p>
      <p className={Styles.ThankPageComponent__Desc}>На вашу почту и телефон мы выслалиреквизиты и подробную информацию о заказе</p>
      <a href="/" className={Styles.ThankPageComponent__Button}>Перейти на главную страницу</a>
    </div>
  </MainLayout>
);

export default ThankPageComponent;
