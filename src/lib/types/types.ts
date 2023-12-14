import { ReactCodeMirrorProps, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { MutableRefObject } from 'react';

export type TArea = {
  ref: MutableRefObject<ReactCodeMirrorRef>;
  format?: Function;
  readOnly?: ReactCodeMirrorProps['readOnly'];
  extensions?: ReactCodeMirrorProps['extensions'];
};