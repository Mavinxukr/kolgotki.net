import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cx from 'classnames';
import 'scroll-behavior-polyfill';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import { getSeoData } from '../../../services/home';
import { userDataSelector } from '../../../utils/selectors';
import './Global.scss';
import styles from './GlobalModule.scss';
import Header from '../Header/Header';
import SubNav from '../SubNav/SubNav';
import Footer from '../Footer/Footer';
import Login from '../../Wrappers/Login/Login';
import { arrRoutesForAuthUser } from '../../../utils/fakeFetch/routes';
import { cookies } from '../../../utils/getCookies';
import withPopup from '../../hoc/withPopup';

const checkUserRole = (userData, router) => {
  if (
    userData?.role?.id === 2 &&
    router.pathname.indexOf('/ProfileWholesale/') !== -1
  ) {
    router.push('/Profile/data');
  }

  if (userData?.role?.id === 3 && router.pathname.indexOf('/Profile/') !== -1) {
    router.push('/ProfileWholesale/data');
  }
};

const checkPagesForNotAuth = (arr, router, openPopup) => {
  arr.forEach(item => {
    if (router.pathname.indexOf(item) !== -1 && !cookies.get('token')) {
      openPopup({
        PopupContentComponent: Login
      });
    }
  });
};

const Global = ({ children, seo = {}, openPopup }) => {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const userData = useSelector(userDataSelector);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    console.log(isOpenMenu);
  }, [isOpenMenu]);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      setIsOpenMenu(false);
    }

    if (touchStart - touchEnd < -150) {
      setIsOpenMenu(true);
    }
  }

  useEffect(() => {
    checkPagesForNotAuth(arrRoutesForAuthUser, router, openPopup);
    if (cookies.get('token')) {
      dispatch(sendCurrentUserData({}));
    }
    getSeoData({}).then(response => setSeoData(response.data));
  }, []);

  if (!_.isEmpty(userData)) {
    checkUserRole(userData, router);
  }

  const classNameForChildren = cx(styles.children, {
    [styles.childrenSearchActive]: isSearchActive,
    [styles.childrenMenuActive]: isOpenMenu
  });

  const classNameForFooter = cx(styles.footer, {
    [styles.footerSearchActive]: isSearchActive
  });

  return (
    <>
      <Head>
        <title>{seo.seo_title || seoData.title || 'Home'}</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="description"
          content={seo.seo_description || seoData.meta_description}
        />
        <meta
          name="keywords"
          content={seo.seo_keywords || seoData.meta_keywords}
        />
        <meta name="title" content={seo.seo_title || seoData.meta_title} />
        <link rel="stylesheet" href="/uikit/uikit.css" />
        <link
          rel="shortcut icon"
          href="https://kolgot.net/var/media/images/themes/core_themes_favicon_1.ico"
        />
        {process.env.NODE_ENV !== 'production' && (
          <link
            rel="stylesheet"
            type="text/css"
            href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
          />
        )}
        {seo.seo_canonical && <link rel="canonical" href={seo.seo_canonical} />}
        <script src="/uikit/uikit.js" />
        {(router.pathname === '/order' && (
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCw6ut911rIYgBwRiOnvh9QbQkHJexp9-M&libraries=places" />
        )) ||
          (router.pathname === '/ProfileWholesale/data' && (
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCw6ut911rIYgBwRiOnvh9QbQkHJexp9-M&libraries=places" />
          )) ||
          (router.pathname === '/Profile/data' && (
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCw6ut911rIYgBwRiOnvh9QbQkHJexp9-M&libraries=places" />
          ))}
      </Head>
      <div
        onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
        onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => handleTouchEnd()}
      >
        <Header
          setIsSearchActive={setIsSearchActive}
          isSearchActive={isSearchActive}
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
        />
        {/* <SubNav /> */}
        <div
          style={{ scrollBehavior: 'smooth' }}
          className={classNameForChildren}
        >
          {children}
        </div>
        <Footer classNameWrapper={classNameForFooter} />
      </div>
    </>
  );
};

Global.propTypes = {
  children: PropTypes.node,
  seo: PropTypes.shape({
    seo_description: PropTypes.string,
    seo_keywords: PropTypes.string,
    seo_title: PropTypes.string,
    seo_canonical: PropTypes.string
  }),
  openPopup: PropTypes.func
};

export default withPopup(Global);
