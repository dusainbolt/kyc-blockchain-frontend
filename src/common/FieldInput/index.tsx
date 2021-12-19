import { TextField } from '@material-ui/core';
import Constant from '@services/constant';
import Helper from '@services/helper';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC } from 'react';

export interface FieldTextType {
  label?: string;
  prefix?: any;
  suffix?: any;
  placeholder?: string;
  className?: string;
  passwordMode?: boolean;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldText: FC<FieldTextType> = ({ label, prefix, suffix, placeholder, className, passwordMode, field }) => {
  const { touched, errors } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  return (
    <TextField
      fullWidth
      id={field?.name}
      name={field?.name}
      label={label || Constant.FORM.UNKNOWN_LABEL}
      type={passwordMode ? Constant.FORM.TYPE_PASSWORD : Constant.FORM.TYPE_TEXT}
      className={clsx([className] && !!className)}
      value={field?.value}
      // onChange={formik.handleChange}
      error={isError}
      // helperText={formik.touched.password && formik.errors.password}
    />
  );
};

export default FieldText;
