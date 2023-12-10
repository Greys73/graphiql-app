import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import graphqlFormat from '@src/utils/graphql/graphqlFormat';

const code = `query ($filmId: ID!, $planetId: ID!) {
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

const CodeArea = () => {
  const [value, setValue] = useState(code);
  const onChange = React.useCallback((val: string) => {
    graphqlFormat(val).then((e) => console.log(e));
    setValue(val);
  }, []);
  return <CodeMirror value={value} onChange={onChange} />;
};
export default CodeArea;
