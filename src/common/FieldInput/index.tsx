import { TextField } from '@material-ui/core';
import Constant from '@services/constant';
import Helper from '@services/helper';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC, FormEvent } from 'react';

export interface FieldTextType {
  label?: string;
  prefix?: any;
  suffix?: any;
  placeholder?: string;
  className?: string;
  type?: string;
  required?: boolean;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldText: FC<FieldTextType> = ({ label, placeholder, className, type, field, required }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  const onChangeInput = (e: FormEvent<HTMLInputElement>) => {
    setFieldValue(field?.name as string, e.currentTarget.value);
  };

  return (
    <div className={clsx(className)}>
      <TextField
        fullWidth
        id={field?.name}
        name={field?.name}
        placeholder={placeholder || ''}
        label={label || Constant.FORM.UNKNOWN_LABEL}
        type={type || Constant.FORM.TYPE_TEXT}
        value={field?.value}
        required={required as boolean}
        onChange={onChangeInput as any}
        error={isError}
        helperText={fieldTouch && fieldError}
        variant="outlined"
      />
    </div>
  );
};

export default FieldText;
