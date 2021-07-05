import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProductsSimilar.scss';
import { CardProduct } from '../../../Layout/CardProduct/CardProduct';
import GiftProductCard from '../../../Layout/GiftProductCard/GiftProductCard';
import { userDataSelector } from '../../../../utils/selectors';
import { parseText } from '../../../../utils/helpers';
import { cookies } from '../../../../utils/getCookies';
import { TopGoodsSlider } from '../../../Slider/TopGoodsSlider/TopGoodsSlider';
import { withResponse } from '../../../hoc/withResponse';

const ProductsSimilar = ({
  similar,
  router,
  isDesctop,
  isTablet,
  isMobile
}) => {
  const userData = useSelector(userDataSelector);

  return (
    <div className={styles.similar}>
      <h4 className={styles.similar__title}>
        {parseText(cookies, 'Похожие товары', 'Схожі товари')}
      </h4>
      <div className={styles.similar__list}>
        <TopGoodsSlider
          isDesctop={isDesctop}
          isTablet={isTablet}
          isMobile={isMobile}
          slides={similar}
        />
        {/* {(similar.length > 0 &&
          !router.query.present &&
          similar.map(item => (
            <div className={styles.similar__item}>
              <CardProduct key={item.id} data={item} />
            </div>
          ))) ||
          (similar.length > 0 &&
            router.query.present &&
            similar.map(item => (
              <div className={styles.similar__item}>
                <GiftProductCard
                  key={item.id}
                  classNameWrapper={styles.similarProductsCard}
                  item={item}
                  userDataId={userData?.role?.id}
                />
              </div>
            )))} */}
      </div>
    </div>
  );
};
export default withResponse(ProductsSimilar);
