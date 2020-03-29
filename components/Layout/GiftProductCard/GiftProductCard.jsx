import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './GiftProductCard.scss';
import IconLike from '../../../public/svg/like-border.svg';
import { cookies } from '../../../utils/getCookies';
import { addToFavourite } from '../../../redux/actions/favourite';

const GiftProductCard = ({
  item: {
    id, name, price, colors, new_price, isFavorite, img_link, goods,
  },
  classNameWrapper,
}) => {
  const [isAddFavourite, setIsAddFavourite] = useState(false);
  const sliderDataArr = [{ id: 9, present_img_link: img_link }, ...colors];

  const dispatch = useDispatch();

  const classNameForButton = cx(styles.buttonLike, {
    [styles.buttonAddToFavouriteSelect]: isFavorite || isAddFavourite,
  });

  return (
    <article className={cx(styles.card, classNameWrapper)}>
      <div
        uk-slideshow="ratio: 7:3, pause-on-hover: true"
        className={styles.slider}
      >
        <ul className={`${styles.list} uk-slideshow-items`}>
          {sliderDataArr.map(image => (
            <li key={image.id}>
              <img
                className={styles.sliderImage}
                src={image.present_img_link}
                alt={image.present_img_link}
              />
            </li>
          ))}
        </ul>
        <a
          href="/"
          className={styles.buttonLeft}
          uk-slideshow-item="previous"
        />
        <a href="/" className={styles.buttonRight} uk-slideshow-item="next" />
        <div className={styles.buttonsGroup}>
          <Link
            href={{
              pathname: '/Products/[pid]',
              query: {
                present: 'yes',
              },
            }}
            as={`/Products/${id}`}
          >
            <a className={styles.buttonBuy}>
              Купить
            </a>
          </Link>
          {
            cookies.get('token') && (
              <button
                type="button"
                className={classNameForButton}
                disabled={isAddFavourite || isFavorite}
                onClick={() => {
                  dispatch(
                    addToFavourite({}, { present_id: id }, true),
                  );
                  setIsAddFavourite(true);
                }}
              >
                <IconLike className={styles.likeIcon} />
              </button>
            )
          }
        </div>
      </div>
      <div className={styles.content}>
        <h6>{name}</h6>
        <ul className={styles.featuresItems}>
          {goods.map(item => (
            <li key={item.id} className={styles.featuresItem}>{item.name}</li>
          ))}
        </ul>
        <div className={styles.contentInfo}>
          <div className={styles.colors}>
            {colors.map((colorItem, index) => (
              <span
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: colorItem.color.hex
                    ? `${colorItem.color.hex}`
                    : `url(${colorItem.color.img_link})`,
                  display: 'inline-block',
                  marginRight: '7px',
                }}
              />
            ))}
          </div>
          {new_price ? (
            <div className={styles.prices}>
              <p className={styles.contentNewPrice}>{price} ₴</p>
              <p className={styles.contentOldPrice}>{new_price} ₴</p>
            </div>
          ) : (
            <p className={styles.contentPrice}>{price},00 ₴</p>
          )}
        </div>
      </div>
    </article>
  );
};

GiftProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.object),
    new_price: PropTypes.number,
    isFavorite: PropTypes.bool,
    goods: PropTypes.arrayOf(PropTypes.object),
  }),
  classNameWrapper: PropTypes.string,
};

export default GiftProductCard;
