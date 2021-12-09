import React from 'react';
import Gist from 'react-gist';

const Preview = ({value : {id, file}}) => {
  if(!id) return null;
  return <div style={{height: "100px", overflowY: 'scroll'}}><Gist id={id} file={file} /></div>
}

export default {
  name: 'gist',
  type: 'object',
  title: 'Gist Embed',
  fields: [
    {
      name: 'id',
      type: 'string',
      title: 'Gist Id'
    },
    {
      name: 'file',
      type: 'string',
      title: 'Gist file'
    }
  ],
  preview: {
    select: {
      id: 'id',
      file: 'file'
    },
    component: Preview
  }
}