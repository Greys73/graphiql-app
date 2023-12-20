import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { request, gql } from 'graphql-request';
import { DefaultAPI } from './constants/editor';

const API = DefaultAPI;

export const templateSchema = async () => {
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

export const makeRequest = async (url: string = DefaultAPI, query: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({query})
    });
    return { response, error: null };
  } catch (error) {
    return { response: null, error: `error: ${(error as Error).message}` };
  }
}
export default templateSchema;
