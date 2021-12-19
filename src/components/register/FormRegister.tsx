import FieldText from '@common/FieldInput';
import { Button, TextField } from '@material-ui/core';
import { Field } from 'formik';
import { FC } from 'react';

const FormRegister: FC<any> = () => {
  return (
    <div>
      <Field name="email" label="Email" component={FieldText} />
      <TextField
        fullWidth
        // id="password"
        name="password"
        label="Password"
        type="password"
        // value={formik.values.password}
        // onChange={formik.handleChange}
        // error={formik.touched.password && Boolean(formik.errors.password)}
        // helperText={formik.touched.password && formik.errors.password}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>{' '}
    </div>
  );
};

export default FormRegister;
