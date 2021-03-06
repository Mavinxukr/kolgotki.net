import React, { useState } from 'react';
import Link from 'next/link';
import ProfileBreadCrumbs from '../ProfileBreadCrumbs/ProfileBreadCrumbs';
import BonusComponent from '../BonusComponent/BonusComponent';
import ProfileViewed from '../ProfileViewed/ProfileViewed';
import ProfileMailing from '../ProfileMailing/ProfileMailing';
import ProfileOrder from '../ProfileOrder/ProfileOrder';
import ProfileData from '../ProfileData/ProfileData';
import ProfileDataEdit from '../ProfileDataEdit/ProfileDataEdit';
import ProfileFavourite from '../ProfileFavourite/ProfileFavourite';
import Styles from './ProfileNav.module.scss';
import './ProfileNav.scss';

const ProfileNav = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [valueForCrumb, setValueForCrumb] = useState('Мои данные');

  const onSetCrumb = e => setValueForCrumb(e.target.textContent);

  return (
    <>
      <ProfileBreadCrumbs valueForCrumb={valueForCrumb} />
      <div className={Styles.ProfileNav__Content}>
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="order" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="favorites" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="bonus" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="seen" />
        <input type="radio" className={Styles.ProfileNav__Field} name="switcher" id="links" />
        <input defaultChecked type="radio" className={Styles.ProfileNav__Field} name="switcher" id="data" />
        <nav className={Styles.ProfileNav__Nav}>
          <label onClick={onSetCrumb} className={Styles.ProfileNav__Switcher} htmlFor="order">Заказы</label>
          <label onClick={onSetCrumb} className={Styles.ProfileNav__Switcher} htmlFor="favorites">Избранные</label>
          <label onClick={onSetCrumb} className={Styles.ProfileNav__Switcher} htmlFor="bonus">Бонусы</label>
          <label onClick={onSetCrumb} className={Styles.ProfileNav__Switcher} htmlFor="seen">Просмотренные</label>
          <label onClick={onSetCrumb} className={Styles.ProfileNav__Switcher} htmlFor="links">Рассылки</label>
          <label onClick={onSetCrumb} className={Styles.ProfileNav__Switcher} htmlFor="data">Мои данные</label>
          <Link href="/">
            <a className={Styles.ProfileNav__ButtonExit}>Выйти</a>
          </Link>
        </nav>
        <div id="order" className={Styles.ProfileNav__Item}>
          <ProfileOrder />
        </div>
        <div id="favorites" className={Styles.ProfileNav__Item}>
          <ProfileFavourite />
        </div>
        <div id="bonus" className={Styles.ProfileNav__Item}>
          <BonusComponent />
        </div>
        <div id="seen" className={Styles.ProfileNav__Item}>
          <ProfileViewed />
        </div>
        <div id="links" className={Styles.ProfileNav__Item}>
          <ProfileMailing />
        </div>
        <div id="data" className={Styles.ProfileNav__Item}>
          {
            openEdit ? <ProfileDataEdit /> : <ProfileData changeEditValue={setOpenEdit} />
          }
        </div>
      </div>
    </>
  );
};

export default ProfileNav;
