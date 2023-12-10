import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { request, gql } from 'graphql-request';

const API = 'https://rickandmortyapi.com/graphql';

const templateSchema = async () => {
  try {
    const schemaResponcse = await request<IntrospectionQuery>(
      API,
      gql`
        ${getIntrospectionQuery()}
      `
    );
    return buildClientSchema(schemaResponcse);
  } catch (error) {
    console.log((error as Error).message);
  }
};

export default templateSchema;
