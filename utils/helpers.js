import _ from 'lodash';
import uniqid from 'uniqid';
import {
  getNewPostData,
  getShopCities,
  getShopByCity,
} from '../services/order';
import { addToCart } from '../redux/actions/cart';
import { cookies } from './getCookies';

export const calculateBonusSum = (bonuses) => {
  let sum = 0;
  if (bonuses) {
    for (let i = 0; i < bonuses.length; i += 1) {
      sum += bonuses[i].count;
    }
  }
  return sum;
};

export const calculateTotalSum = (cartData, products) => {
  let sum = 0;
  const arrProducts = !cartData.length ? products : cartData;
  for (let i = 0; i < arrProducts.length; i += 1) {
    const item = arrProducts[i].good || arrProducts[i].present;
    sum +=
      item.new_price * arrProducts[i].count
      || item.price * arrProducts[i].count;
  }
  return +sum.toFixed(2);
};

export const calculateSumWithoutStock = (cartData, products) => {
  let sum = 0;
  const arrProducts = !cartData.length ? products : cartData;
  for (let i = 0; i < arrProducts.length; i += 1) {
    const item = arrProducts[i].good || arrProducts[i].present;
    sum += item.new_price ? 0 : item.price * arrProducts[i].count;
  }
  return +sum.toFixed(2);
};

export const getArrOptionsCities = async (value) => {
  if (value.length > 0) {
    const result = await getNewPostData({
      params: {},
      calledMethod: 'searchSettlements',
      filterObject: {
        CityName: value,
        Limit: 8,
      },
      modelName: 'Address',
    }).then(response => response.data[0].Addresses.filter(item => item.Warehouses > 0).map(
      item => ({
        value: item.Ref,
        label: item.MainDescription,
      }),
    ));
    return result;
  }
};

export const getNewPostOffice = (e, setArrOptions) => {
  getNewPostData({
    params: {},
    calledMethod: 'getWarehouses',
    filterObject: {
      CityName: e.label,
    },
    modelName: 'AddressGeneral',
  }).then(response => setArrOptions(
    response.data.map(item => ({
      value: item.Description,
      label: item.Description,
    })),
  ));
};

export const getCitiesShops = (setArrOptionsCitiesShops) => {
  getShopCities({}).then(response => setArrOptionsCitiesShops(
    response.data.map(item => ({
      value: item,
      label: item,
    })),
  ));
};

export const getCityShops = (setArrOptionsShops, cityRef) => {
  getShopByCity({ city: cityRef }).then(response => setArrOptionsShops(
    response.data.map(item => ({
      value: item.id,
      label: item.address,
    })),
  ));
};

export const saveToken = (shouldRememberedUser, token) => {
  if (shouldRememberedUser) {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 * 30 });
  } else {
    cookies.set('token', token, { maxAge: 60 * 60 * 24 });
  }
};

export const addToCartFromLocale = (dispatch) => {
  if (
    localStorage.getItem('arrOfIdProduct')
    || localStorage.getItem('arrOfIdPresent')
  ) {
    dispatch(
      addToCart({
        params: {},
        body: {
          goods: localStorage.getItem('arrOfIdProduct') || '[]',
          presents: localStorage.getItem('arrOfIdPresent') || '[]',
        },
        isAddDataByArray: true,
      }),
    );
    localStorage.removeItem('arrOfIdProduct');
    localStorage.removeItem('arrOfIdPresent');
  }
};

export const createBodyForRequestCatalog = (body) => {
  const arr = ['categories', 'brands', 'colors', 'sizes', 'attribute', 'tags'];
  const obj = {};
  _.forIn(body, (value, key) => {
    if (arr.some(item => item === key)) {
      obj[key] = JSON.stringify(
        value.map(item => (key !== 'attribute' ? item.id : item.name)),
      );
      return;
    }
    obj[key] = value;
  });
  return obj;
};

export const definiteUrlAndFunc = (
  query,
  isAuth,
  getPresentSetFunc,
  getProductDataFunc,
) => {
  if (query.present) {
    return {
      url: isAuth ? 'presentsetbyid' : 'presentbyid',
      func: getPresentSetFunc,
    };
  }
  return {
    url: isAuth ? 'goodbyid' : 'goods',
    func: getProductDataFunc,
  };
};

export const prepareStr = str => str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '';

export const checkHaveIndex = (item, idsPresent, idsGoods) => {
  if (item.presentset) {
    return idsPresent.find(itemChild => itemChild === item.presentset.id);
  }
  return idsGoods.find(itemChild => itemChild === item.good.id);
};

export const setFiltersInCookies = (cookie, obj) => {
  cookie.set('filters', obj);
};

export const selectRoute = ({
  type, router, item, cookie,
}) => {
  switch (type) {
    case 'brands':
      setFiltersInCookies(cookie, {
        brands: [
          {
            id: item.id,
            name: item.name,
          },
        ],
      });
      router.push({
        pathname: `/Brands/${item.id}`,
        query: {
          brand_id: item.id,
        },
      });
      break;

    case 'categories':
      setFiltersInCookies(cookie, {
        categories: [
          {
            id: item.id,
            name: item.slug,
            categoryName: item.name,
          },
        ],
      });
      router.push('/Products');
      break;

    case 'goods':
      router.push('/Products/[pid]', `/Products/${item.id}`);
      break;

    case 'actions':
      router.push('/stock');
      break;

    case 'present_sets':
      router.push({
        pathname: `/Products/${item.id}`,
        query: {
          present: true,
        },
      });
      break;

    default:
      router.push('/Products');
      break;
  }
};

export const createCleanUrl = (cookie) => {
  const filters = cookie.get('filters');
  const arrResult = [];
  _.forIn(filters, (value, key) => {
    if (Array.isArray(value)) {
      value.forEach(item => arrResult.push(item.name));
      return;
    }
    if (key.indexOf('sort') !== -1) {
      arrResult.push(key.replace('_', '-'));
      return;
    }
    if (key.indexOf('price') !== -1) {
      arrResult.push(`${key.replace('_', '-')}-${value}`);
      return;
    }
    if (key === 'page') {
      return;
    }
    arrResult.push(value);
  });
  return arrResult;
};

export const getCorrectPrice = value => String(value).replace(/[.-]/g, ',');

export const getArrOfFilters = (arrSelect, cookie) => {
  const filters = cookie.get('filters');
  const arr = [];
  _.forIn(filters, (value, key) => {
    if (arrSelect.some(item => item === key)) {
      arr.push(...value);
    }
  });
  return arr;
};

const findElemInCategories = (categories, item) => {
  let finalItem;
  categories.forEach((itemChild) => {
    if (itemChild.slug === item) {
      finalItem = itemChild;
    }
    const newItem = findElemInCategories(itemChild.subcategory, item);
    if (newItem) {
      finalItem = newItem;
    }
  });
  return finalItem;
};

const createAppropriateFilters = (filters) => {
  let newObj = {};
  filters.forEach((item) => {
    if (!item.max && !_.isNull(item.max) && !item.attributes) {
      newObj = {
        ...newObj,
        ...item,
      };
    }
    if (item.attributes) {
      newObj = {
        ...newObj,
        attribute: [...item.attributes[0].value, ...item.attributes[1].value],
      };
    }
  });
  return newObj;
};

export const getUrlArr = (url) => {
  const lastItemUrl = url.split('/')[url.split('/').length - 1];
  return lastItemUrl.split('_').slice(1);
};

export const readFiltersFromUrl = (url, categories, filters) => {
  let result = {};
  getUrlArr(url).forEach((item) => {
    const findElemCategory = findElemInCategories(categories, item);
    if (findElemCategory) {
      result = {
        ...result,
        categories: [
          {
            id: findElemCategory.id,
            name: findElemCategory.slug,
            categoryName: findElemCategory.name,
          },
        ],
      };
      return;
    }
    _.forIn(createAppropriateFilters(filters), (value, key) => {
      const findElem = value.find(
        val => val.name === item
          || val.size === item
          || val.value === item
          || val.slug === item,
      );
      if (findElem) {
        const prevValue = result[key] || [];
        const newObj =
          key === 'tags'
            ? {
              id: findElem.id,
              name: findElem.slug,
              nameSpec: findElem.name,
            }
            : {
              id: findElem.id || uniqid(),
              name:
                  findElem.slug
                  || findElem.name
                  || findElem.value
                  || findElem.size,
            };
        result = {
          ...result,
          [key]: [...prevValue, newObj],
        };
      }
    });
    if (item.indexOf('sort') !== -1 || item.indexOf('price-') !== -1) {
      const arrWords = item.split('-');
      result = {
        ...result,
        [`${arrWords[0]}_${arrWords[1]}`]: arrWords[2] || 'desc',
      };
    }
  });

  return result;
};

export const deleteFiltersFromCookie = cookie => cookie.remove('filters');
