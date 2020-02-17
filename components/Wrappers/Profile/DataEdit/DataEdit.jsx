import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import styles from './DataEdit.scss';
import { isAuthSelector, userDataSelector } from '../../../../utils/selectors';
import Loader from '../../../Loader/Loader';
import ChangePasswordForm from '../../../ChangePasswordForm/ChangePasswordForm';
import Button from '../../../Layout/Button/Button';
import {
  composeValidators,
  snpValidation,
  emailValidation,
  required,
  numberValidation,
} from '../../../../utils/validation';
import {
  getArrOptionsCities,
  getNewPostOffice,
} from '../../../../utils/helpers';
import { renderInput, renderSelect } from '../../../../utils/renderInputs';
import { getNewPostData } from '../../../../services/order';

const getArrOptionsAddress = async (value, cityRef) => {
  if (value.length > 0) {
    const result = await getNewPostData({
      params: {},
      calledMethod: 'searchSettlementStreets',
      filterObject: {
        StreetName: value,
        SettlementRef: cityRef,
        Limit: 5,
      },
      modelName: 'Address',
    }).then(response => response.data[0].Addresses.map(item => ({
      value: item.SettlementStreetRef,
      label: item.Present,
    })));
    return result;
  }
};

const DataEdit = () => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);

  const [arrOptionsPostOffices, setArrOptionsPostOffices] = useState([]);
  const [cityRef, setCityRef] = useState('');

  if (!isAuth) {
    return <Loader />;
  }
  const onSubmit = (values) => {
    console.log({
      ...values,
      department_post: values.department_post.label,
      address: values.address.label,
      role_id: userData.role.id,
      mailing: userData.mailing,
    });
  };

  return (
    <div className={styles.profileDataEdit}>
      <h3>Мои данные</h3>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid, submitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>ФИО</p>
              <Field
                name="snp"
                defaultValue={userData.snp}
                validate={composeValidators(required, snpValidation)}
              >
                {renderInput({
                  placeholder: 'ФИО',
                  type: 'text',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>Номер телефона</p>
              <Field
                name="phone"
                defaultValue={userData.phone || ''}
                validate={composeValidators(required, numberValidation)}
                parse={formatString('+99 (999) 999 99 99')}
              >
                {renderInput({
                  placeholder: 'введите номер',
                  type: 'text',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>Почта</p>
              <Field
                name="email"
                defaultValue={userData.email}
                validate={composeValidators(required, emailValidation)}
              >
                {renderInput({
                  placeholder: 'введите email',
                  type: 'email',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>Дата рождения</p>
              <Field
                name="date_birth"
                defaultValue={userData.date_birth || ''}
                validate={required}
                parse={formatString('99.99.9999')}
              >
                {renderInput({
                  placeholder: 'Дата рождения',
                  type: 'text',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <hr className={styles.line} />
            <div className={styles.formGroup}>
              <p className={styles.formGroupTitle}>Адрес доставки</p>
              <div className={styles.formGroupChild}>
                <Field
                  name="city"
                  component={renderSelect({
                    placeholder: 'Город',
                    classNameWrapper: styles.selectWrapper,
                    viewType: 'userDataEdit',
                    promiseOptions: getArrOptionsCities,
                    onChangeCustom: (e) => {
                      getNewPostOffice(e, setArrOptionsPostOffices);
                      setCityRef(e.value);
                    },
                  })}
                />
                <Field
                  name="department_post"
                  options={arrOptionsPostOffices}
                  component={renderSelect({
                    placeholder: 'Отделение НП',
                    classNameWrapper: styles.selectWrapper,
                    viewType: 'userDataEdit',
                  })}
                />
                <Field
                  name="address"
                  component={renderSelect({
                    placeholder: 'Адресс для курьера',
                    classNameWrapper: styles.selectWrapper,
                    viewType: 'userDataEdit',
                    promiseOptions: value => getArrOptionsAddress(value, cityRef),
                  })}
                />
                <Button
                  classNameWrapper={styles.formGroupButton}
                  buttonType="submit"
                  title="Сохранить"
                  viewType="black"
                  disable={invalid || submitting}
                />
              </div>
            </div>
            <hr className={`${styles.line} ${styles.secondLine}`} />
          </form>
        )}
      />
      <h5>Пароль</h5>
      <ChangePasswordForm viewTypeButton="white" />
    </div>
  );
};

export default DataEdit;
