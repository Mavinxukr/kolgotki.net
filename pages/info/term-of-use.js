import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import TermsOfUseWrapper from '../../components/Wrappers/Info/TermsOfUse/TermsOfUse';
import { getTerms } from '../../services/Info/term-of-use';

const TermsOfUse = ({ termsData }) => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      nameUa: 'Головна',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Пользовательское соглашение',
      nameUa: 'Угода користувача',
    }]}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <TermsOfUseWrapper termsData={termsData} />
  </NavPanel>
);

TermsOfUse.getInitialProps = async () => {
  const termsData = await getTerms({});

  return {
    termsData: termsData.data,
  };
};

export default TermsOfUse;
