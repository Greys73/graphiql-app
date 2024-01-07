import graphqlFormat from '@src/utils/graphql/graphqlFormat';
import { describe, expect, test } from 'vitest';

describe('GraphQL', () => {
  test('test formatting function', async () => {
    const entry =
      'query($name: String){characters(filter:{name:$name}){results{name gender location{name}}}}';
    const expected = `query($name: String) {
  characters(filter:{name:$name}) {
    results {
      name
      gender
      location {
        name
      }
    }
  }
}`;
    expect(await graphqlFormat(entry).text).toMatch(expected);
  });
});
