import { TEntity } from '@src/lib/types/types';

const innerTrim = (text: string) => text.replaceAll(/[\r\n]+/g, '').replaceAll(/ +/g, ' ');

const getField = (text: string) => {
  const stack = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') stack.push('{');
    if (text[i] === '}') {
      stack.pop();
      if (!stack.length) return text.slice(0, i).trim();
    }
  }
  return text;
};

const parseSection = (text: string) => {
  const entities: TEntity[] = [];
  let nameStart: number | null = null;
  let nameEnd: number | null = null;
  for (let i = 0; i < text.length; i++) {
    switch (true) {
      case text[i] === '(':
        if (nameStart === null) nameStart = i;
        i += text.slice(i, text.length).indexOf(')');
        break;
      case text[i] === '{':
        if (nameStart != null) {
          const field = getField(text.slice(i, text.length));
          entities.push({
            name: text.slice(nameStart, i).trim(),
            field,
          });
          nameStart = null;
          nameEnd = null;
          i += field.length;
        }
        break;
      case i === text.length - 1:
        nameEnd = i + 1;
      case text[i].search(/[a-zA-Z_0-9]/i) >= 0:
        if (nameStart != null && nameEnd != null) {
          entities.push({
            name: text.slice(nameStart, nameEnd).trim(),
            field: null,
          });
          nameStart = null;
          nameEnd = null;
        }
        if (nameStart === null) nameStart = i;
        break;
      case text[i] === ' ' || text[i] === '\n':
        if (nameStart != null) nameEnd = i;
        break;
      default:
        break;
    }
  }
  return entities;
};

const formatSection = (field: string, indent: string) => {
  let result = '';
  const entities = parseSection(field);
  entities.forEach((entity) => {
    result += `${indent}${innerTrim(entity.name)}`;
    result += entity.field ? ` {\n${formatSection(entity.field, indent + '  ')}${indent}}\n` : '\n';
  });
  return result;
};

const graphqlFormat = (code: string) => {
  const braceStart = code.indexOf('{');
  const braceEnd = code.lastIndexOf('}');
  const query = innerTrim(code.slice(0, braceStart).trim());
  const field = formatSection(code.slice(braceStart, braceEnd), '  ');
  return { text: `${query} {\n${field}}\n`, error: null };
};

export default graphqlFormat;
