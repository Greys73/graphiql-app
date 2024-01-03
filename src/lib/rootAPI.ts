import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { gql, request } from 'graphql-request';
import { ERROR } from './constants/error';
import { TQuery } from './types/types';

export const getAPISchema = async (url: string) => {
  try {
    const schemaResponse = await request<IntrospectionQuery>(
      url,
      gql`
        ${getIntrospectionQuery()}
      `
    );
    return { schemaResponse, error: null };
  } catch (error) {
    return { schema: null, error: `${ERROR.API_GET_SCHEMA}: ${(error as Error).message}` };
  }
};

export const makeRequest = async (url: string, { query, variables, headers }: TQuery) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...JSON.parse(headers || '{}'), 'Content-type': 'application/json' },
      body: JSON.stringify({ query, variables: JSON.parse(variables || '{}') }),
    });
    return await response.json();
  } catch (error) {
    return { data: null, errors: [{ message: `${(error as Error).message}. ${ERROR.INVALID_URL}` }] };
  }
};
