import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { gql, request } from 'graphql-request';
import { DefaultAPI } from './constants/editor';

const API = DefaultAPI;

const templateSchema = async () => {
  try {
    const schemaResponse = await request<IntrospectionQuery>(
      API,
      gql`
        ${getIntrospectionQuery()}
      `
    );

    return { schemaResponse, error: null };
  } catch (error) {
    return { schema: null, error: `error creating GraphQL schema: ${(error as Error).message}` };
  }
};

export default templateSchema;
