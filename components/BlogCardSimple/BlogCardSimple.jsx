import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './BlogCardSimple.scss';

const BlogCardSimple = ({ item, classNameWrapper }) => (
  <article className={classNameWrapper}>
    <div className={styles.imageWrapper}>
      <img
        src={
          item.image
          || '/images/ververa_67403054_455097258420211_8361133781576766144_n.png'
        }
        alt="ververa"
        className={styles.image}
      />
    </div>
    <div className={styles.content}>
      <div className={styles.tags}>
        {item.tags.map(tag => (
          <p className={styles.tag} style={{ color: tag.color }} key={tag.id}>
            #{parseText(cookies, tag.name, tag.name_ua)}
          </p>
        ))}
      </div>
      <h6 className={styles.title}>
        {parseText(cookies, item.name, item.name_ua)}
      </h6>
      <p className={styles.desc}>
        {parseText(cookies, item.preview, item.preview_ua)}
      </p>
    </div>
    <Link href="/Blog/[bid]" as={`/Blog/${item.id}`} prefetch={false}>
      <a href="/" className={styles.link}>
        {parseText(cookies, 'Читать далее', 'Читати далі')}
      </a>
    </Link>
  </article>
);

BlogCardSimple.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    name_ua: PropTypes.string,
    preview: PropTypes.string,
    preview_ua: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
  }),
  classNameWrapper: PropTypes.string,
};

export default BlogCardSimple;
