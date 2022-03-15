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
  // prefix?: any;
  // suffix?: any;
  placeholder?: string;
  className?: string;
  options: OptionSelect[];
  // restric: Restrict;
  // type?: string;
  required?: boolean;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldDate: FC<FieldDateType> = ({ label, placeholder, required, options, className, field }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);
  // const [value, setValue] = useState(new Date());

  // const styles = fieldSelectStyle();

  const handleChange = (newValue): any => {
    setFieldValue(field?.name as string, newValue);
  };

  // label = `${label}${required && ' *'}`;

  const value = field?.value instanceof dayjs ? field.value : dayjs(field?.value || new Date());

  return (
    <div className={clsx(className)}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label="Basic example"
          value={value}
          inputFormat="MM/DD/YYYY"
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} helperText={fieldTouch && fieldError} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default FieldDate;
