import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Accordion from '../../../../Accordion/Accordion';
// import {
//   createCleanUrl,
//   setFiltersInCookies,
//   parseText
// } from '../../../../../utils/helpers';
import { withResponse } from '../../../../hoc/withResponse';
import styles from './Filter.scss';
import { parseText } from '../../../../../utils/helpers';
import { cookies } from '../../../../../utils/getCookies';

// const addOrDeleteElem = (filters, categoryName, item) => {
//   if (!filters || !filters[categoryName]) {
//     return [item];
//   }

//   const findElem =
//     Array.isArray(filters[categoryName]) &&
//     filters[categoryName].find(filterItem => filterItem.name === item.name);

//   if (findElem) {
//     return filters[categoryName].filter(
//       filterItem => filterItem.name !== findElem.name
//     );
//   }

//   if (filters[categoryName]) {
//     return [...filters[categoryName], item];
//   }
// };

// const definiteOfNewObj = (item, categoryName) => {
//   if (categoryName === 'tags') {
//     return {
//       id: item?.id,
//       name: item.slug,
//       nameSpec: item.name || item.value
//     };
//   }
//   return {
//     id: item?.id,
//     name: item.slug || item.name || item.value || item.size,
//     nameSpec: item.name || item.value
//   };
// };

// const setElementsForFilters = (item, categoryName, cookie) => {
//   setFiltersInCookies(cookie, {
//     ...filters,
//     [categoryName]: addOrDeleteElem(
//       filters,
//       categoryName,
//       definiteOfNewObj(item, categoryName)
//     )
//   });
// };

const SubFilters = ({
  changeHandle,
  arrSelects,
  // router,
  // pathname,
  categoryName,
  isDesktopScreen,
  isGifts,
  selected,
  // children,
  classNameAdditional
}) => {
  return (
    <ul
      className={cx(cx(styles.dropDownList, classNameAdditional), {
        [styles.dropDownListMobile]: !isDesktopScreen && isGifts
      })}
    >
      {arrSelects &&
        arrSelects.map((item, index) => {
          const value =
            parseText(cookies, item.name, item.name_ua) ||
            parseText(cookies, item.value, item.value_uk);
          return (
            <li className={styles.dropDownItem} key={item.id || index}>
              <input
                type="checkbox"
                id={categoryName + item.id}
                className={styles.field}
                checked={selected?.includes(value)}
                name={categoryName}
                onChange={ev => {
                  changeHandle(ev);
                  // setElementsForFilters(item, categoryName, cookies);
                  // if (isGifts) {
                  //   router.push(
                  //     {
                  //       pathname,
                  //       query: router.query
                  //     },
                  //     `${pathname}/${createCleanUrl(cookies).join('/')}`
                  //   );
                  // }
                  // if (window.innerWidth > 768) {
                  //   router.push(
                  //     {
                  //       pathname,
                  //       query: router.query
                  //     },
                  //     `${pathname}/${createCleanUrl(cookies).join('/')}`
                  //   );
                  // }
                }}
                // checked={
                //   window.innerWidth < 768
                //     ? checkedFilter
                //     : filters
                //     && filters[categoryName]?.some(
                //       itemChild => itemChild.id === item.id
                //         || itemChild.name === item.value
                //     )
                // }
              />
              <label
                htmlFor={categoryName + item.id}
                className={cx(styles.dropDownController, {
                  [styles.dropDownControllerForGift]:
                    isGifts && !isDesktopScreen
                })}
              >
                {item.img_link ? (
                  <span
                    className={cx(styles.colorBlock, {
                      [styles.withBorder]: item.name === 'White'
                    })}
                    style={{
                      background: item.hex
                        ? `${item.hex}`
                        : `url(${item.img_link})`
                    }}
                  />
                ) : null}
                <p>{value}</p>
              </label>
            </li>
          );
        })}
    </ul>
  );
};

const Filter = ({
  title,
  arrSelects,
  id,
  classNameWrapper,
  changeHandle,
  pathname,
  router,
  categoryName,
  isDesktopScreen,
  isGifts,
  classNameAdditional,
  selected
}) => {
  return (
    <>
      {(isDesktopScreen && (
        <div
          className={cx(styles.filter, classNameWrapper, {
            [styles.filterGift]: isGifts
          })}
        >
          <input className={styles.field} type="checkbox" id={id} />
          <label className={styles.paramController} htmlFor={id}>
            {title}
          </label>
          <div className={styles.dropDownListWrapper}>
            <SubFilters
              changeHandle={changeHandle}
              // router={router}
              // pathname={pathname}
              selected={selected}
              categoryName={categoryName}
              arrSelects={arrSelects}
              // classNameAdditional={classNameAdditional}
            />
          </div>
        </div>
      )) || (
        <ul className={styles.accordion} uk-accordion="multiple: true">
          <Accordion
            title={title}
            filters={selected}
            // isMobileFilterGiftBackets={isGifts}
            isFooterNav
            isFilter
            categoryName={categoryName}
          >
            <SubFilters
              // router={router}
              // pathname={pathname}
              changeHandle={changeHandle}
              selected={selected}
              categoryName={categoryName}
              arrSelects={arrSelects}
              isDesktopScreen={isDesktopScreen}
              // isGifts={isGifts}
            />
          </Accordion>
        </ul>
      )}
    </>
  );
};
SubFilters.propTypes = {
  arrSelects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      value_uk: PropTypes.string,
      name_ua: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.string,
      img_link: PropTypes.string
    })
  ),
  router: PropTypes.shape({
    query: PropTypes.object,
    push: PropTypes.func
  }),
  pathname: PropTypes.string,
  categoryName: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isGifts: PropTypes.bool,
  children: PropTypes.node,
  classNameAdditional: PropTypes.string
};
Filter.propTypes = {
  title: PropTypes.string,
  arrSelects: PropTypes.array,
  id: PropTypes.string,
  classNameWrapper: PropTypes.string,
  pathname: PropTypes.string,
  router: PropTypes.object,
  categoryName: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isGifts: PropTypes.bool,
  children: PropTypes.node,
  classNameAdditional: PropTypes.string
};
export default withResponse(Filter);