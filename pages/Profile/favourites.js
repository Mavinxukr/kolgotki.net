import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import FavouriteWrapper from '../../components/Wrappers/Profile/Favourite/Favourite';
import { getFavourites } from '../../redux/actions/favourite';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false },
);


const Favourites = () => (
  <DynamicComponentWithNoSSRNavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      nameUa: 'Головна',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет',
      nameUa: 'Особистий кабінет',
      pathname: '/Profile/favourites',
    },
    {
      id: 3,
      name: 'Избранные',
      nameUa: 'Вибрані',
    }]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <FavouriteWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

Favourites.getInitialProps = async ({ store }) => {
  store.dispatch(getFavourites({}));
};

export default Favourites;
