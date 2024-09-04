'use client';

import React, {forwardRef} from 'react'
import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Editor as CodeMirrorEditor } from 'codemirror';

type SimpleMDEWrapperProps = SimpleMDEReactProps & {
  placeholder?: string;
};

const SimpleMDEWrapper = forwardRef<typeof SimpleMDE, SimpleMDEWrapperProps>(
  (props, ref) => (
    <SimpleMDE 
      {...props} 
      getMdeInstance={(editor) => {
        if (ref && typeof ref === 'object') {
          (ref as React.MutableRefObject<CodeMirrorEditor>).current = editor;
        }
      }} 
    />
  )
);

export default SimpleMDEWrapper;