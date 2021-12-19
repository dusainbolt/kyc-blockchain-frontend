import { FC } from 'react';
import { withWidth } from '@material-ui/core';

const HomePageComponent: FC<any> = (props: any) => {
  return <div>1232132 {props}</div>;
};

export default withWidth({ noSSR: true })(HomePageComponent);
