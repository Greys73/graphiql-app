'use client';
import { KeyboardEvent, useCallback, useState } from 'react';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { EditorView, ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { useToast } from '@chakra-ui/react';
import { TArea } from '@src/lib/types/types';
import { showErrorToast } from '@src/utils/toasts';

const CodeArea = ({ options }: { options: TArea }) => {
  const toast = useToast();
  const [value, setValue] = useState(options.initialState);
  const { ref, readOnly, extensions, format } = options;

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.code === 'KeyS') {
      e.preventDefault();
      if (format) {
        const result = format(value);
        if (result.text) setValue(result.text);
        if (result.error) showErrorToast(toast, result.error);
      }
    }
  };

  const onChange = useCallback((val: string) => {
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
    '&.cm-focused': { outline: 'none' },
  });

  cmProps.extensions = extensions;
  cmProps.extensions?.push(theme);
  cmProps.extensions?.push(EditorView.lineWrapping);

  return <CodeMirror ref={ref} {...cmProps} theme={githubLight} />;
};
export default CodeArea;
