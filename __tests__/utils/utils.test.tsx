import { jsonFormat, toOneWord } from '@src/utils/utils';
import { describe, expect, test } from 'vitest';

describe('utils tests', () => {
  test('test formatting JSON', () => {
    const entry = '{"name":"value"}';
    const expected = `{
  "name": "value"
}`;
    expect(jsonFormat(entry).text).toMatch(expected);
  });

  test('test toOneWord function', () => {
    const entry = ' This is testing string ';
    const expected = 'thisistestingstring';
    expect(toOneWord(entry)).toMatch(expected);
  });
});
