import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { TArea } from '@src/lib/types/types';

const codeExample1 = `query ($filmId: ID!, $planetId: ID!) {
  film(filmID: $filmId) {
    created
    director
    episodeID
    planetConnection {
      planets {
        name
      }
    }
  }
  planet(planetID: $planetId) {
    name
    diameter
  }
}`;

const codeExample2 = `query {
    characters {
        results {
            name
        }
    }
}`;

const CodeArea = ({ options }: { options: TArea }) => {
  // TODO: заменить на работу со store
  const [value, setValue] = useState(codeExample1);

  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.code === 'KeyS') {
      e.preventDefault();
      if (options.format) setValue(options.format(value));
    }
  };

  return (
    <CodeMirror
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
      extensions={options.extensions}
      ref={options.ref}
      readOnly={options.readOnly}
      basicSetup={{
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
        defaultKeymap: false,
        completionKeymap: false,
        bracketMatching: true,
        closeBrackets: true,
        history: true,
        drawSelection: true,
        indentOnInput: true,
        lineNumbers: true,
      }}
    />
  );
};
export default CodeArea;
