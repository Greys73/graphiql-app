import React, { FC, useEffect, useRef, useState } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import graphqlFormat from '@src/utils/graphql/graphqlFormat';
import { graphql, updateSchema } from 'cm6-graphql';
import templateSchema from '@src/lib/templateSchema';
import { GraphQLSchema } from 'graphql';

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

const CodeArea: FC = () => {
  const [value, setValue] = useState(codeExample2);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const areaRef = useRef<ReactCodeMirrorRef | null>(null);

  useEffect(() => {
    if (schema) updateSchema(areaRef.current!.view, schema);
  }, [schema]);

  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.code === 'KeyS') {
      e.preventDefault();
      graphqlFormat(value).then((e) => {
        setValue(e);
      });
      templateSchema().then((e) => setSchema(e));
    }
  };

  return (
    <CodeMirror
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
      extensions={[graphql(schema)]}
      ref={areaRef}
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
