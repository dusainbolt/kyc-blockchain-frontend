import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { registerField } from '@type/authentication';
import { IField } from '@type/field';
import { Field, useFormikContext } from 'formik';
import { FC } from 'react';

const useStyles = makeStyles(() => ({
  inputField: {
    marginTop: 12,
  },
  formWrapper: {
    maxWidth: 500,
    width: '100%',
  },
  buttonSubmit: {
    marginTop: 20,
  },
}));

const FormRegister: FC<any> = () => {
  const classes = useStyles();
  const { handleSubmit } = useFormikContext();
  return (
    <div className={classes.formWrapper}>
      {Object.entries(registerField).map((item: any[], index: number) => {
        const field: IField = item[1];
        return (
          <Field
            key={index}
            className={classes.inputField}
            name={field.name}
            label={field.label}
            component={field.component}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            restric={field.restric}
          />
        );
      })}

      <Button
        color="primary"
        variant="contained"
        className={classes.buttonSubmit}
        onClick={handleSubmit as any}
        fullWidth
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
};

export default FormRegister;
