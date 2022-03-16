import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import Helper from '@services/helper';
import { OptionSelect } from '@type/field';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import dayjs from 'dayjs';
import Date from '@services/date';
import Constant from '@services/constant';

export const fieldSelectStyle = makeStyles({
  label: {
    top: -7,
    '&.MuiInputLabel-shrink': {
      top: 0,
    },
  },
});

export interface FieldDateType {
  label?: string;
  placeholder?: string;
  className?: string;
  options: OptionSelect[];
  required?: boolean;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldDate: FC<FieldDateType> = ({ label, placeholder, required, options, className, field }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  const handleChange = (newValue): any => {
    setFieldValue(field?.name as string, newValue);
  };

  return (
    <div className={clsx(className)}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label={label}
          value={Date.renderDayjs(field?.value)}
          inputFormat={Constant.DATE.D_M_Y}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
              error={isError}
              required={required as boolean}
              helperText={fieldTouch && fieldError}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default FieldDate;
