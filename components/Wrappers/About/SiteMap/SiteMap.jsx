import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './SiteMap.scss';

const MapItem = ({ title, arrOfLinks }) => (
  <div className={styles.listsItem}>
    {title ? <h2 className={styles.listsItemTitle}>{title}</h2> : null}
    <ul className={styles.listsItemLinks}>
      {arrOfLinks.map((item, id) => (
        <li className={styles.listsItemLinkWrapper} key={id}>
          <a className={styles.listsItemLink} href="/">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SiteMap = () => (
  <div className={styles.siteMap}>
    <div className={styles.item}>
      <h3 className={styles.title}>Женщинам</h3>
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <h3 className={styles.title}>Мужчинам</h3>
      <div className={styles.lists}>
        <MapItem
          title="Одежда"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div
      className={cx(
        styles.item,
        styles.itemBorder,
        styles.itemForChildren,
        styles.itemAdaptiveChild,
      )}
    >
      <h3 className={styles.title}>Детям</h3>
      <div className={styles.lists}>
        <MapItem
          title="Чулки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.itemLinksGroup}>
      <div className={cx(styles.item, styles.itemAdaptive)}>
        <h3 className={styles.title}>Клиентам</h3>
        <div className={styles.lists}>
          <MapItem
            arrOfLinks={[
              'Классические',
              'Колготки с рисунком',
              'Теплые колготки',
              'Большие размеры',
              'Материал',
            ]}
          />
        </div>
      </div>
      <div className={cx(styles.item, styles.itemBorder, styles.itemAdaptive)}>
        <h3 className={styles.title}>
          Оптовым <br /> покупатели
        </h3>
        <div className={styles.lists}>
          <MapItem
            arrOfLinks={[
              'Классические',
              'Колготки с рисунком',
              'Теплые колготки',
              'Большие размеры',
              'Материал',
            ]}
          />
        </div>
      </div>
      <div className={cx(styles.item, styles.itemBorder)}>
        <h3 className={styles.title}>О нас</h3>
        <div className={styles.lists}>
          <MapItem
            arrOfLinks={[
              'Классические',
              'Колготки с рисунком',
              'Теплые колготки',
              'Большие размеры',
              'Материал',
            ]}
          />
        </div>
      </div>
    </div>
  </div>
);

MapItem.propTypes = {
  title: PropTypes.string,
  arrOfLinks: PropTypes.arrayOf(PropTypes.string),
};

export default SiteMap;