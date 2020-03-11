import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import AboutWrapper from '../../components/Wrappers/About/About/About';

const About = () => (
  <NavPanel
    routerValues={['Главная', 'О магазине']}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <AboutWrapper />
  </NavPanel>
);

export default About;