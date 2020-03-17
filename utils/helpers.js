import {
  getNewPostData,
  getShopCities,
  getShopByCity,
} from '../services/order';
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
    const count = arrProducts[i].count
      ? arrProducts[i].count
      : JSON.parse(localStorage.getItem('arrOfIdProduct'))[i].count;
    sum += arrProducts[i].good.price * count;
  }
  return sum;
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
  getShopByCity({ city: cityRef } ).then(response => setArrOptionsShops(
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

export const checkHaveIndex = (orderId, ids) => ids.find(item => item === orderId);
