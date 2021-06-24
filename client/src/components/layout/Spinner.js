import React, { Fragment } from 'react';
import spinner from './spinner.gif';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <>
    <img src={spinner} style={{ width: '120px', margin: '120px auto', display: 'block' }} alt='Loading...' />
  </>
);
