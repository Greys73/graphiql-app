import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { gql, request } from 'graphql-request';
import { TQuery } from './types/types';
import { localizedMessage, minimizeMessage } from '@src/utils/utils';

export const getAPISchema = async (url: string, lang = 'en') => {
  try {
    const schemaResponse = await request<IntrospectionQuery>(
      url,
      gql`
        ${getIntrospectionQuery()}
      `
    );
    return { schemaResponse, error: null };
  } catch (error) {
    const message = (error as Error).message;
    return { schema: null, error: `${localizedMessage('apiError', lang)}: ${minimizeMessage(message)}` };
  }
};

export const makeRequest = async (url: string, { query, variables, headers }: TQuery, lang = 'en') => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...JSON.parse(headers || '{}'), 'Content-type': 'application/json' },
      body: JSON.stringify({ query, variables: JSON.parse(variables || '{}') }),
    });
    return await response.json();
  } catch (error) {
    const message = (error as Error).message;
    return {
      data: null,
      errors: [{ message: `${localizedMessage('requestError', lang)}: ${minimizeMessage(message)}` }],
    };
  }
};
