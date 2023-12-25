import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { gql, request } from 'graphql-request';
import { DefaultAPI } from './constants/editor';
import { ERROR } from './constants/error';
import { TQuery } from './types/types';

const API = DefaultAPI;

export const templateSchema = async () => {
  try {
    const schemaResponse = await request<IntrospectionQuery>(
      API,
      gql`
        ${getIntrospectionQuery()}
      `
    );
    return { schemaResponse, error: null };
  } catch (error) {
    return { schema: null, error: `${ERROR.API_GET_SCHEMA}: ${(error as Error).message}` };
  }
};

export const makeRequest = async (url: string = API, { query, variables, headers }: TQuery) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {...(JSON.parse(headers!)), 'Content-type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    console.log({...(JSON.parse(headers!)), 'Content-type': 'application/json' });
    return await response.json();
  } catch (error) {
    return { data: null, errors: [{ message: `${(error as Error).message}. ${ERROR.INVALID_URL}` }] };
  }
};
export default templateSchema;
