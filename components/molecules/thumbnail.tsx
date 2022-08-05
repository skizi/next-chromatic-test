import React from 'react';
import { css } from '@emotion/react';

interface Props {
  title: string;
  outline: string;
}

export const Thumbnail: React.FC<Props> = (props) => {
  return (
    <div
      css={{
        width: '200px',
        margin: '0 5px',
        padding: '5px',
        border: '1px solid #aaa',
        borderRadius: '10px',
      }}
    >
      <h4>{props.title}</h4>
      <p>{props.outline}</p>
    </div>
  );
};
