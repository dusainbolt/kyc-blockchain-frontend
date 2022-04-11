/* eslint-disable jsx-a11y/alt-text */
import { Restrict } from '@type/field';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC, useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { CircularProgressCustom } from '@common/Progress/CircularProgress';

const client = ipfsHttpClient(`https://ipfs.infura.io:5001/api/v0` as any);

export interface FieldUploadType {
  label?: string;
  prefix?: any;
  suffix?: any;
  placeholder?: string;
  className?: string;
  restric: Restrict;
  type?: string;
  required?: boolean;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldUpload: FC<FieldUploadType> = ({ label, className, field }) => {
  const { setFieldValue } = useFormikContext();
  const [loading, setLoading] = useState<boolean>(false);
  // const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  // const fieldError: string = Helper.objValue(errors, field?.name);
  // const isError: boolean = fieldTouch && Boolean(fieldError);

  async function onChange(e) {
    const file = e.target.files[0];
    setLoading(true);
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setLoading(false);
      setFieldValue(field?.name as string, url);
    } catch (error) {
      setLoading(false);
      console.log('Error uploading file: ', error);
    }
  }

  return (
    <div className={clsx(className)}>
      <div style={{ fontWeight: 600 }}>{label}</div>
      {loading ? (
        <CircularProgressCustom />
      ) : (
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
      )}
      {field?.value && <img style={{ maxWidth: '100%' }} src={field?.value} />}
    </div>
  );
};

export default FieldUpload;
