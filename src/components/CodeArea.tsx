import React, { FC, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import graphqlFormat from '@src/utils/graphql/graphqlFormat';
import { graphql } from 'cm6-graphql';

const codeExample = `query ($filmId: ID!, $planetId: ID!) {
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

const CodeArea: FC = () => {
  const [value, setValue] = useState(codeExample);

  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.altKey && e.ctrlKey && e.key === 'f') {
      graphqlFormat(value).then((e) => {
        setValue(e)
      });
    }
  };

  return <CodeMirror value={value} onKeyDown={onKeyDown} onChange={onChange} extensions={[graphql()]} />;
};
export default CodeArea;
