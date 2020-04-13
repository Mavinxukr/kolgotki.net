import React from 'react';
import dynamic from 'next/dynamic';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsWholesale';
import DocsWrapper from '../../components/Wrappers/ProfileWholesale/Docs/Docs';

const DynamicComponentWithNoSSRNavPanel = dynamic(
  () => import('../../components/Layout/NavPanel/NavPanel'),
  { ssr: false },
);


const Docs = () => (
  <DynamicComponentWithNoSSRNavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет (опт)',
      pathname: '/ProfileWholesale/docs',
    },
    {
      id: 3,
      name: 'Документы',
    }]}
    mainRoute="ProfileWholesale"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <DocsWrapper />
  </DynamicComponentWithNoSSRNavPanel>
);

export default Docs;
