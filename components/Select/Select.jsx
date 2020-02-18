import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

const customStylesForUserDataEdit = {
  option: provided => ({
    ...provided,
    color: '#0e0e0e',
    fontSize: '16px',
    fontFamily: '"InterRegular"',
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
    width: '20px',
    height: '20px',
  }),

  dropdownIndicator: () => ({
    color: '#0e0e0e',
    position: 'absolute',
    left: '-9px',
    top: '8px',
  }),

  placeholder: () => ({
    color: '#b6b6b6',
    fontSize: '16px',
    fontFamily: '"InterRegular"',
    marginLeft: '-8px',
  }),

  singleValue: () => ({
    color: '#0e0e0e',
    fontSize: '16px',
    fontFamily: '"InterRegular"',
  }),
};

const customStylesForUserForm = {
  option: provided => ({
    ...provided,
    color: '#0e0e0e',
    fontSize: '20px',
    fontFamily: '"InterRegular"',
    width: '100%',
    backgroundColor: 'white',
    border: 'none',
  }),

  control: () => ({
    borderRadius: '0',
    border: '1px solid #b6b6b6',
    display: 'flex',
    padding: '8px 1px 8px 6px',
    width: '100%',
  }),

  indicatorsContainer: () => ({
    border: 'none',
    position: 'relative',
    width: '20px',
    height: '20px',
  }),

  dropdownIndicator: () => ({
    color: '#b6b6b6',
    position: 'absolute',
    left: '-9px',
    top: '6px',
  }),

  placeholder: () => ({
    color: '#b6b6b6',
    fontSize: '20px',
    fontFamily: '"InterRegular"',
  }),

  singleValue: () => ({
    color: '#0e0e0e',
    fontSize: '20px',
    fontFamily: '"InterRegular"',
  }),
};

const SelectCustom = ({
  value,
  onChange,
  classNameWrapper,
  placeholder,
  options,
  promiseOptions,
  onChangeCustom,
  viewType,
}) => {
  const SelectComponent = promiseOptions ? AsyncSelect : Select;

  return (
    <SelectComponent
      value={value}
      onChange={(e) => {
        onChange(e);
        if (onChangeCustom) {
          onChangeCustom(e);
        }
      }}
      options={options}
      styles={
        viewType === 'userForm'
          ? customStylesForUserForm
          : customStylesForUserDataEdit
      }
      placeholder={placeholder}
      className={classNameWrapper}
      loadOptions={inputValue => promiseOptions(inputValue)}
      cacheOptions
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
  promiseOptions: PropTypes.func,
  onChangeCustom: PropTypes.func,
  viewType: PropTypes.oneOf(['userForm', 'userDataEdit']),
};

export default SelectCustom;