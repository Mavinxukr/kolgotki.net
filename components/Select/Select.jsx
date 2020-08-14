import React, { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';

const customStylesForUserDataEdit = () => ({
  option: provided => ({
    ...provided,
    color: '#0e0e0e',
    fontSize: '12px',
    fontFamily: '"InterMedium"',
    width: '100%',
    backgroundColor: 'white',
    border: 'none',
  }),

  control: () => ({
    borderRadius: '0',
    borderBottom: '1px solid #b6b6b6',
    display: 'flex',
    paddingBottom: '7px',
    paddingLeft: '0',
    width: '100%',
  }),

  indicatorsContainer: () => ({
    border: 'none',
    position: 'relative',
    width: '16px',
    height: '16px',
  }),

  dropdownIndicator: () => ({
    color: '#0e0e0e',
    position: 'absolute',
    left: '-11px',
    top: '8px',
    width: '15px',
  }),

  placeholder: () => ({
    color: '#b6b6b6',
    fontSize: '12px',
    fontFamily: '"InterMedium"',
    marginLeft: '-8px',
  }),

  singleValue: () => ({
    color: '#0e0e0e',
    fontSize: '12px',
    fontFamily: '"InterMedium"',
    marginLeft: '-8px',
  }),

  menu: () => ({
    border: '1px solid #b6b6b6',
    marginTop: '10px',
  }),
});

const customStylesForUserForm = (isDesktopScreen, isPickUpPointsMobile) => ({
  option: provided => ({
    ...provided,
    color: '#0e0e0e',
    fontSize: (isDesktopScreen && '14px') || '16px',
    fontFamily: '"InterRegular"',
    width: '100%',
    backgroundColor: 'white',
    border: 'none',
  }),

  control: () => ({
    borderRadius: '0',
    border: '1px solid #b6b6b6',
    display: 'flex',
    padding:
      (isDesktopScreen && '3px 1px 3px 6px')
      || (isPickUpPointsMobile && !isDesktopScreen && '10px 2% 12px 2%')
      || '10px 14px 12px 13px',
    width: (isPickUpPointsMobile && !isDesktopScreen && '97.8%') || !isDesktopScreen && '96%' || '100%',
  }),

  indicatorsContainer: () => ({
    border: 'none',
    position: 'relative',
    width: '16px',
    height: '16px',
  }),

  dropdownIndicator: () => ({
    color: '#b6b6b6',
    position: 'absolute',
    left: '-9px',
    top: '6px',
  }),

  placeholder: () => ({
    color: '#b6b6b6',
    fontSize: (isDesktopScreen && '14px') || '16px',
    fontFamily: '"InterRegular"',
  }),

  singleValue: () => ({
    color: '#0e0e0e',
    fontSize: (isDesktopScreen && '14px') || '16px',
    fontFamily: '"InterRegular"',
  }),

  menu: () => ({
    width: '101%',
    border: '1px solid #b6b6b6',
    marginTop: '10px',
  }),
});

const customStylesForHeaderSelect = () => ({
  option: provided => ({
    ...provided,
    color: '#0e0e0e',
    fontSize: '14px',
    fontFamily: '"InterRegular"',
    width: '100%',
    backgroundColor: 'white',
    border: 'none',
  }),

  control: () => ({
    borderRadius: '0',
    borderBottom: '1px solid #b6b6b6',
    display: 'flex',
    padding: '0 1px 9px 2px',
    width: '99%',
  }),

  indicatorsContainer: () => ({
    border: 'none',
    position: 'relative',
    width: '16px',
    height: '16px',
  }),

  dropdownIndicator: () => ({
    color: '#b6b6b6',
    position: 'absolute',
    left: '-4px',
    transform: 'rotate(-90deg)',
    top: '8px',
    width: '12px',
    height: '14px',
  }),

  placeholder: () => ({
    color: '#b6b6b6',
    fontSize: '14px',
    fontFamily: '"InterRegular"',
  }),

  singleValue: () => ({
    color: '#b6b6b6',
    fontSize: '14px',
    fontFamily: '"InterRegular"',
  }),

  input: () => ({
    position: 'absolute',
    top: '2px',
    left: '9px',
  }),

  menu: () => ({
    width: '101%',
    border: '1px solid #b6b6b6',
    marginTop: '10px',
  }),
});

const SelectCustom = ({
  value,
  onChange,
  classNameWrapper,
  placeholder,
  placeholderUa,
  options,
  promiseOptions,
  onChangeCustom,
  viewType,
  defaultInputValue,
  isDesktopScreen,
  isPickUpPointsMobile,
}) => {
  const SelectComponent = promiseOptions ? AsyncSelect : Select;

  const [placeholderValue, setPlaceholderValue] = useState('');

  const onSetValueForPlaceholder = (valueSelect, e) => {
    const inputElem = e.target.closest('.css-b8ldur-Input');
    const placeholderElem = inputElem.previousElementSibling;
    setPlaceholderValue(placeholderElem.innerHTML);
    placeholderElem.innerHTML = valueSelect;
  };

  return (
    <SelectComponent
      value={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
        if (onChangeCustom) {
          onChangeCustom(e);
        }
      }}
      options={options}
      styles={
        (viewType === 'userForm'
          && customStylesForUserForm(isDesktopScreen, isPickUpPointsMobile))
        || (viewType === 'userDataEdit'
          && customStylesForUserDataEdit())
        || (viewType === 'headerSelect'
          && customStylesForHeaderSelect(isDesktopScreen))
      }
      placeholder={parseText(cookies, placeholder, placeholderUa)}
      className={classNameWrapper}
      loadOptions={inputValue => promiseOptions(inputValue)}
      cacheOptions
      defaultInputValue={defaultInputValue || ''}
      noOptionsMessage={() => parseText(cookies, 'не найдено', 'не знайдено')}
      onFocus={e => onSetValueForPlaceholder('', e)}
      onBlur={e => onSetValueForPlaceholder(value.value || placeholderValue, e)}
      isFocused
    />
  );
};

SelectCustom.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderUa: PropTypes.string,
  promiseOptions: PropTypes.func,
  onChangeCustom: PropTypes.func,
  viewType: PropTypes.oneOf(['userForm', 'userDataEdit', 'headerSelect']),
  defaultInputValue: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isPickUpPointsMobile: PropTypes.bool,
};

export default withResponse(SelectCustom);
