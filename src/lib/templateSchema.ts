import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { request, gql } from 'graphql-request';
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
    return { schema: buildClientSchema(schemaResponse), error: null };
  } catch (error) {
    return { schema: null, error: `error creating GraphQL schema: ${(error as Error).message}` };
  }
};

export default templateSchema;
