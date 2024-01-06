'use client';
import { Box, Button, Heading, Link, Text } from '@chakra-ui/react';
import {
  IntrospectionEnumType,
  IntrospectionField,
  IntrospectionInputObjectType,
  IntrospectionInputTypeRef,
  IntrospectionInputValue,
  IntrospectionInterfaceType,
  IntrospectionNamedTypeRef,
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionScalarType,
  IntrospectionSchema,
} from 'graphql';
import React, { ReactNode, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '@src/lib/hooks/redux';
import { popPath, pushPath } from '@src/store/reducers/DocumentationSlice';
import DocumentationRoot from './DocumentationRoot';
import LangContext from '@src/lib/LangContext';

const getType = (type: IntrospectionOutputTypeRef | IntrospectionInputTypeRef): string => {
  switch (type.kind) {
    case 'SCALAR':
    case 'OBJECT':
    case 'INPUT_OBJECT':
      return type.name;

    case 'NON_NULL':
      return getType(type.ofType) + '!';

    case 'LIST':
      return '[' + getType(type.ofType) + ']';

    default:
      return 'getType error ' + type.kind;
  }
};

export function DocumentationExplorer() {
  const dispatch = useAppDispatch();
  const { schema, paths } = useAppSelector((state) => state.documentationReducer);

  const {
    lang: {
      texts: { docs },
    },
  } = useContext(LangContext);

  if (!schema) return null;

  let content: ReactNode = null;
  if (!paths.length) content = <DocumentationRoot schema={schema} />;
  else {
    const path = paths[paths.length - 1];

    if (typeof path === 'string') {
      const data = schema.types.find((item) => item.name === path);
      if (!data) return <Text>DocumentationExplorer Error - data is null?</Text>;

      switch (data.kind) {
        case 'OBJECT':
        case 'INPUT_OBJECT':
        case 'INTERFACE':
          content = <DocPrintObject data={data} />;
          break;

        case 'SCALAR':
          content = <DocPrintScalar data={data} />;
          break;

        case 'ENUM':
          content = <DocPrintEnum data={data} />;
          break;

        default:
          content = <Heading size='sm'>Something going wrong</Heading>;
      }
    } else content = <DocPrintFieldDetailed field={path} schema={schema} />;
  }

  return (
    <div>
      {!!paths.length && <Button onClick={() => dispatch(popPath())}>&lt; {docs.back}</Button>}

      {content}
    </div>
  );
}

function DocPrintScalar({ data }: { data: IntrospectionScalarType }) {
  return (
    <>
      <Heading size='xl' my={8}>
        {data.name}
      </Heading>

      {data.description && <Text>{data.description}</Text>}
    </>
  );
}

function DocPrintEnum({ data }: { data: IntrospectionEnumType }) {
  return (
    <>
      <Heading size='xl' my={8}>
        {data.name}
      </Heading>

      {data.description && <Text>{data.description}</Text>}

      {data.enumValues.length ? (
        <>
          <Heading size='md' my={8}>
            Enum Values
          </Heading>

          {data.enumValues.map((item) => (
            <Box marginLeft={4} marginTop={1} key={item.name}>
              <Text as='span' color={'orange'}>
                {item.name}
              </Text>
              {item.description && <Text as='span'> - {item.description}</Text>}
            </Box>
          ))}
        </>
      ) : null}
    </>
  );
}

function DocPrintObject({
  data,
}: {
  data: IntrospectionObjectType | IntrospectionInputObjectType | IntrospectionInterfaceType;
}) {
  return (
    <>
      <Heading size='xl' my={8}>
        {data.name}
      </Heading>

      {data.description && <Text>{data.description}</Text>}

      {'inputFields' in data && data.inputFields ? (
        <DocPrintFields fields={data.inputFields} />
      ) : (
        'fields' in data && data.fields && <DocPrintFields fields={data.fields} />
      )}
    </>
  );
}

function DocPrintFields({ fields }: { fields: ReadonlyArray<IntrospectionField | IntrospectionInputValue> }) {
  const dispatch = useAppDispatch();
  const {
    lang: {
      texts: { docs },
    },
  } = useContext(LangContext);
  if (!fields) return <Text>DocPrintFields Error - fields is null?</Text>;

  return (
    <>
      <Heading size='md' my={8}>
        {docs.fields}:
      </Heading>

      {fields.map((field) => (
        <Box marginLeft={4} marginTop={1} key={field.name}>
          {'args' in field ? (
            <Link color={'blue'} onClick={() => dispatch(pushPath(field))}>
              {field.name}
            </Link>
          ) : (
            <Text as='span'>{field.name}</Text>
          )}
          :{' '}
          <Link
            color={'orange'}
            onClick={() => dispatch(pushPath(getType(field.type).replaceAll(/[!\[\]]/g, '')))}
          >
            {getType(field.type)}
          </Link>
          <Text pb={4}>{field.description}</Text>
        </Box>
      ))}
    </>
  );
}

function DocPrintFieldDetailed({
  field,
  schema,
}: {
  field: IntrospectionField;
  schema: IntrospectionSchema;
}) {
  const {
    lang: {
      texts: { docs },
    },
  } = useContext(LangContext);
  const { name, description, args, type } = field;
  const typeName = (type as IntrospectionNamedTypeRef).name;

  const data = schema.types.find((item) => item.name === typeName);
  const fieldsContent: React.ReactNode =
    data && 'fields' in data && data.fields ? <DocPrintFields fields={data.fields} /> : null;

  return (
    <>
      <Heading size='xl' my={8}>
        {name}
      </Heading>

      {description && <Text>{description}</Text>}

      {!!args.length && (
        <>
          <Heading size='md' my={8}>
            {docs.args}:
          </Heading>

          {args.map((arg: IntrospectionInputValue) => (
            <DocPrintArgument key={arg.name} arg={arg} />
          ))}
        </>
      )}

      {fieldsContent}
    </>
  );
}

function DocPrintArgument({ arg }: { arg: IntrospectionInputValue }) {
  const dispatch = useAppDispatch();
  const argType = getType(arg.type);

  return (
    <Box marginLeft={4} marginTop={1}>
      {arg.name}:{' '}
      <Link color={'blue'} onClick={() => dispatch(pushPath(argType.replaceAll(/[![\]]/g, '')))}>
        {argType}
      </Link>
    </Box>
  );
}
