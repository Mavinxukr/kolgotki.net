import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withResponse } from '../hoc/withResponse';
import styles from './Accordion.scss';

const Accordion = ({
  title,
  children,
  count,
  toggled,
  setToggled,
  classNameWrapper,
  addClassNameWrapper,
  isSortBlock,
  isMobileFilter,
  isFooterNav,
  isMobileFilterGiftBackets,
  isProductAccordion,
  linkValue,
  isDesktopScreen,
}) => {
  const [itemToggled, setItemToggled] = useState(toggled);

  useEffect(() => {
    setItemToggled(toggled);
  }, [toggled]);

  const classNameForAccordion = cx(cx(styles.accordionItem, classNameWrapper), {
    [cx('uk-open', addClassNameWrapper)]: itemToggled,
    [styles.noBorder]: itemToggled && !isProductAccordion,
    [styles.redBackground]: !isFooterNav && !isMobileFilterGiftBackets && itemToggled && (isProductAccordion && isDesktopScreen),
    [styles.accordionItemActiveMobileFilter]: itemToggled && isMobileFilter,
    [styles.accordionItemForGifts]: isMobileFilterGiftBackets,
    [styles.accordionItemForProduct]: isProductAccordion && !isDesktopScreen,
    [styles.accordionItemForProductActive]: isProductAccordion && itemToggled && !isDesktopScreen,
  });

  const classNameForTextButton = cx(styles.textButton, {
    [styles.iconArrowActive]: itemToggled && !count,
    [styles.iconArrowMobileFilter]: isMobileFilter,
    [styles.iconArrowMobileFilterActive]: isMobileFilter && itemToggled,
  });

  const classNameForCount = cx(styles.accordionCount, {
    [styles.accordionCountSort]: isSortBlock,
  });

  return (
    <li className={classNameForAccordion}>
      <a
        className={cx(styles.accordionButton, 'uk-accordion-title', {
          [styles.accordionButtonWithBorder]: isFooterNav && itemToggled,
        })}
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setItemToggled(!itemToggled);
          if (setToggled) {
            setToggled(false);
          }
        }}
      >
        <span className={classNameForTextButton}>
          {title}
          {count || count === 0 ? (
            <span className={classNameForCount}>
              {(isSortBlock && count) || `(${count})`}
            </span>
          ) : null}
        </span>
        {linkValue && <span className={styles.linkValue}>{linkValue}</span>}
      </a>
      <div className="uk-accordion-content">{children}</div>
    </li>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggled: PropTypes.bool,
  setToggled: PropTypes.func,
  classNameWrapper: PropTypes.string,
  addClassNameWrapper: PropTypes.string,
  isSortBlock: PropTypes.bool,
  isMobileFilter: PropTypes.bool,
  isFooterNav: PropTypes.bool,
  isMobileFilterGiftBackets: PropTypes.bool,
  isProductAccordion: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
  linkValue: PropTypes.string,
};

export default withResponse(Accordion);
