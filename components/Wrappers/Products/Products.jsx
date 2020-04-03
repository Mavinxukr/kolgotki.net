import React from 'react';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Products.scss';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import { createBodyForRequestCatalog } from '../../../utils/helpers';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Products = ({
  products,
  classNameWrapper,
  router,
  pathname,
  action,
  filters,
  categories,
}) => (
  <div className={cx(styles.productsWrapper, classNameWrapper)}>
    <div className={styles.leftSide}>
      <div className={styles.leftSideControllerWrapper}>
        <Filter
          title="Торговая марка"
          id="marks"
          arrSelects={filters[0].brands}
          router={router}
          pathname={pathname}
          categoryName="brands"
        />
      </div>
      <Categories
        classNameWrapper={styles.categoriesWrapper}
        arrSubCategories={categories}
        router={router}
        pathname={pathname}
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
          pathname={pathname}
          categoryName="sizes"
        />
        <Filter
          classNameWrapper={styles.filtersWrapper}
          title="Цвет"
          arrSelects={filters[0].colors}
          id="color"
          router={router}
          pathname={pathname}
          categoryName="colors"
        />
        <Filter
          classNameWrapper={styles.filtersWrapper}
          title="Плотность"
          arrSelects={filters[1].attributes[0].value}
          id="destiny"
          router={router}
          pathname={pathname}
          categoryName="attribute"
        />
        <Filter
          classNameWrapper={styles.filtersWrapper}
          title="Материал"
          arrSelects={filters[1].attributes[1].value}
          id="stuff"
          router={router}
          pathname={pathname}
          categoryName="attribute"
        />
      </div>
      <Sort router={router} pathname={pathname} />
      <div className={styles.cards}>
        {products.data.length > 0 ? (
          products.data.map(item => (
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
      {products.data.length > 0 && (
      <div className={styles.addElements}>
        <Pagination
          pageCount={products.last_page}
          currentPage={products.current_page}
          pathName={pathname}
        />
        <Button
          buttonType="button"
          title="Показать ещё +25"
          viewType="pagination"
          width="246px"
          disabled={products.current_page + 1 > products.last_page}
          onClick={action}
        />
      </div>
      )}
    </div>
  </div>
);

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
  action: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
};

export default Products;
