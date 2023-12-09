import React from 'react';
import CodeMirror from '@uiw/react-codemirror';

const CodeArea = () => {
  const code = "console.log('Code Mirror!');";
  return <CodeMirror value={code} height='100px' />;
};
export default CodeArea;
