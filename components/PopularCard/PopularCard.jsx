import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopularCard.scss';
import { getCorrectPrice } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';

const CategoriesCard = ({ item: { image_link, name, min_price }, isDesktopScreen }) => (
  <article className={styles.card}>
    {isDesktopScreen && (
      <p className={styles.price}>от {getCorrectPrice(min_price)} грн.</p>
    )}
    <img className={styles.image} src={image_link} alt={image_link} />
    <h3 className={styles.cardTitle}>{name}</h3>
  </article>
);

CategoriesCard.propTypes = {
  item: PropTypes.shape({
    image_link: PropTypes.string,
    name: PropTypes.string,
    min_price: PropTypes.number,
  }),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(CategoriesCard);
