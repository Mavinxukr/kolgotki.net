import React from 'react';
import classes from './SubcategoriesItem.scss';
import { TiPlus, TiMinus } from 'react-icons/ti';
import _ from 'lodash';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

const SubcategoriesItem = React.memo(
  ({ subcategory, filters, setCategoryInFilters, sale, present, products }) => {
    const [open, setOpen] = React.useState(false);
    const [itemClassList, setItemClassesList] = React.useState([
      classes.subcategory
    ]);
    const [countClassList, setCountClassesList] = React.useState([
      classes.counter
    ]);

    const subcategoryСounter = list => {
      const counter = list.reduce((total, item) => {
        let answer = total;
        if (item.count_goods) {
          answer += item.count_goods;
        }
        if (item.count_stok_goods) {
          answer += item.count_stok_goods;
        }
        if (item.count_presents) {
          answer += item.count_presents;
        }
        return answer;
      }, 0);
      return counter;
    };

    React.useEffect(() => {
      if (filters.hasOwnProperty('categories')) {
        if (JSON.parse(filters.categories)[0].id === subcategory.id) {
          setItemClassesList(prev => [...prev, classes.active]);
          setOpen(true);
        } else {
          setItemClassesList(prev =>
            prev.filter(item => item === classes.subcategory)
          );
          setOpen(false);
        }
        if (subcategory.subcategory.length > 0) {
          if (
            search(subcategory.subcategory, JSON.parse(filters.categories)[0])
          ) {
            setOpen(true);
          }
        } else {
          setOpen(false);
        }
      }
      if (filters.hasOwnProperty('category_id')) {
        if (filters.category_id.id === subcategory.id) {
          setItemClassesList(prev => [...prev, classes.active]);
          setOpen(true);
        } else {
          setItemClassesList(prev =>
            prev.filter(item => item === classes.subcategory)
          );
          setOpen(false);
        }
        if (subcategory.subcategory.length > 0) {
          if (search(subcategory.subcategory, filters.category_id)) {
            setOpen(true);
          } else {
            setOpen(false);
          }
        }
      }
      if (
        _.isEmpty(subcategory.subcategory) ||
        !subcategoryСounter(subcategory.subcategory)
      ) {
        setCountClassesList(prev => [...prev, classes.rightFix]);
      }
    }, [filters]);

    const search = (array, pattern) => {
      let answer = false;
      answer = array.some(item => {
        if (item.id === pattern.id) {
          return item;
        }
        if (item.subcategory.length > 0) {
          if (search(item.subcategory, pattern)) {
            return item;
          }
        }
      });
      return answer;
    };

    const clickHandle = () => {
      setItemClassesList(prev => [...prev, classes.active]);
      setOpen(true);
      setCategoryInFilters(subcategory);
    };

    if (
      subcategory.count_goods > 0 ||
      subcategory.count_stok_goods > 0 ||
      subcategory.count_presents > 0
    ) {
      return (
        <ul className={classes.list}>
          <div className={classes.block}>
            <div className={classes.subcategoriesBlock}>
              <li
                onClick={() => clickHandle()}
                className={itemClassList.join(' ')}
              >
                {parseText(cookies, subcategory.name, subcategory.name_ua)}
              </li>
              {products && subcategory.count_goods && (
                <li
                  className={countClassList.join(' ')}
                >{`(${subcategory.count_goods})`}</li>
              )}
              {sale && subcategory.count_stok_goods && (
                <li
                  className={countClassList.join(' ')}
                >{`(${subcategory.count_stok_goods})`}</li>
              )}
              {present && subcategory.count_presents && (
                <li
                  className={countClassList.join(' ')}
                >{`(${subcategory.count_presents})`}</li>
              )}
              {!_.isEmpty(subcategory.subcategory) &&
              subcategoryСounter(subcategory.subcategory) ? (
                open ? (
                  <TiMinus onClick={() => setOpen(prev => !prev)} />
                ) : (
                  <TiPlus onClick={() => setOpen(prev => !prev)} />
                )
              ) : null}
            </div>

            {open && !_.isEmpty(subcategory.subcategory)
              ? subcategory.subcategory.map(subcategory => {
                  return (
                    <SubcategoriesItem
                      key={subcategory.id}
                      subcategory={subcategory}
                      setCategoryInFilters={setCategoryInFilters}
                      filters={filters}
                      sale={sale}
                      products={products}
                    />
                  );
                })
              : null}
          </div>
        </ul>
      );
    } else {
      return null;
    }
  }
);

export default SubcategoriesItem;
