import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Categories from '../../Categories/Categories';
import StocksCard from '../../StocksCard/StocksCard';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { getStocks } from '../../../redux/actions/stocks';
import { dataStocksSelector, isDataReceivedForStocks } from '../../../utils/selectors';
import { getStockCategories } from '../../../services/stocks';
import styles from './Stocks.scss';

const getArraysForStocks = (stocks) => {
  const activeStocks = stocks.filter(item => item.active);
  const notActiveStocks = stocks.filter(item => !item.active);
  return {
    activeStocks,
    notActiveStocks,
  };
};

const Stocks = () => {
  const [categories, setCategories] = useState(null);

  const stocks = useSelector(dataStocksSelector);
  const isDataReceived = useSelector(isDataReceivedForStocks);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStocks({}, {
      category_id: router.query.categories || '',
      page: router.query.page || '',
    }));
    getStockCategories({}).then(response => setCategories(response.data));
  }, []);

  useEffect(() => {
    dispatch(getStocks({}, {
      category_id: router.query.categories || '',
      page: router.query.page || '',
    }));
  }, [router.query]);

  if (!categories || !isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <BreadCrumbs items={['Главная', 'Акции']} />
        <div className={styles.row}>
          <div className={styles.leftBlock}>
            <Categories
              arrSubCategories={categories}
              pathname="/stock"
              router={router}
              stock
            />
          </div>
          {stocks.data.length > 0 && (
            <div className={styles.rightBlock}>
              {!!getArraysForStocks(stocks.data).activeStocks.length && (
                <>
                  <h3 className={styles.title}>Акции</h3>
                  <div className={styles.Cards}>
                    {getArraysForStocks(stocks.data).activeStocks.map(item => (
                      <StocksCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
              {!!getArraysForStocks(stocks.data).notActiveStocks.length && (
                <>
                  <h3 className={styles.title}>Архив акций</h3>
                  <div className={styles.Cards}>
                    {getArraysForStocks(stocks.data).notActiveStocks.map(item => (
                      <StocksCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
              <div className={styles.pagination}>
                <Pagination
                  pathName="/stock"
                  pageCount={stocks.last_page}
                  currentPage={stocks.current_page}
                />
                <Button
                  buttonType="button"
                  title="Показать ещё +25"
                  viewType="pagination"
                  disabled={stocks.current_page + 1 > stocks.last_page}
                  onClick={() => {
                    dispatch(getStocks({}, {
                      category_id: router.query.categories || '',
                      page: stocks.current_page + 1 || 1,
                    }, true));
                  }}
                  width="246px"
                />
              </div>
            </div>
          ) || <p className={styles.notFoundText}>Ничего не найдено</p>}
        </div>
      </div>
    </MainLayout>
  );
};

export default Stocks;