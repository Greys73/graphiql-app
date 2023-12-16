/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { EditorView, ReactCodeMirrorProps } from '@uiw/react-codemirror';

import { TArea } from '@src/lib/types/types';

const CodeArea = ({ options }: { options: TArea }) => {
  const { value, setValue, ref, readOnly, extensions, format } = options;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.code === 'KeyS') {
      e.preventDefault();
      if (format) setValue(format(value));
    }
  };

  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const cmProps: ReactCodeMirrorProps = {
    height: '100%',
    value: value,
    readOnly: readOnly,
    onKeyDown: onKeyDown,
    basicSetup: {
      syntaxHighlighting: true,
      defaultKeymap: false,
      completionKeymap: false,
      bracketMatching: true,
      closeBrackets: true,
      history: true,
      drawSelection: true,
      indentOnInput: true,
      lineNumbers: true,
    },
  };
  if (!readOnly) cmProps.onChange = onChange;

  const theme = EditorView.theme({
    '&.cm-editor': { backgroundColor: readOnly ? '#f5f5f5' : '#fff' },

    '&.cm-focused': {
      outline: 'none',
    },
  });

  cmProps.extensions = extensions;
  cmProps.extensions?.push(theme);

  return <CodeMirror ref={ref} {...cmProps} theme={githubLight}/>;
};
export default CodeArea;
