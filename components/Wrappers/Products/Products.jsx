import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Products.scss';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { getAllCategories, getAllFilters } from '../../../services/home';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Products = ({ products, classNameWrapper, router }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    getAllCategories({}).then(response => setCategories(response.data));
    getAllFilters({
      category_id: router.query.categories && router.query.categories[0] || '',
    }).then(response => setFilters(response.data));
  }, []);

  useEffect(() => {
    getAllFilters({
      category_id: router.query.categories && router.query.categories[0] || '',
    }).then(response => setFilters(response.data));
  }, [router.query]);

  if (!filters) {
    return Loader;
  }

  return (
    <div className={cx(styles.productsWrapper, classNameWrapper)}>
      <div className={styles.leftSide}>
        <div className={styles.leftSideControllerWrapper}>
          <Filter
            title="Торговая марка"
            id="marks"
            arrSelects={filters[0].brands}
            router={router}
            pathname="/Products"
          />
        </div>
        <Categories
          classNameWrapper={styles.categoriesWrapper}
          arrSubCategories={categories}
          router={router}
        />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.controllersWrapper}>
          <Filter
            classNameWrapper={styles.filtersWrapper}
            title="Размер"
            arrSelects={filters[3].sizes}
            id="size"
            router={router}
            pathname="/Products"
          />
          <Filter
            classNameWrapper={styles.filtersWrapper}
            title="Цвет"
            arrSelects={filters[0].colors}
            id="color"
            router={router}
            pathname="/Products"
          />
          <Filter
            classNameWrapper={styles.filtersWrapper}
            title="Плотность"
            arrSelects={filters[1].attributes[0].value}
            id="destiny"
            router={router}
            pathname="/Products"
          />
          <Filter
            classNameWrapper={styles.filtersWrapper}
            title="Материал"
            arrSelects={filters[1].attributes[1].value}
            id="stuff"
            router={router}
            pathname="/Products"
          />
        </div>
        <Sort />
        <div className={styles.cards}>
          {products ? (
            products.map(item => (
              <DynamicComponentWithNoSSRProductCard
                key={item.id}
                classNameWrapper={styles.card}
                item={item}
              />
            ))
          ) : (
            <p className={styles.notFoundText}>Ничего не найдено</p>
          )}
        </div>
        {products && (
          <div className={styles.addElements}>
            <Pagination />
            <Button
              buttonType="button"
              title="Показать ещё +25"
              viewType="pagination"
              width="246px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
};

export default Products;
