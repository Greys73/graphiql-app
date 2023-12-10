const graphqlFormat = async (code: string) => {
  const formatter = await import('./prettier/formatter.mjs'!);
  const graphqlPlugin = await import('./prettier/graphql.mjs');

  let result = code;
  try {
    result = formatter.default.format(code, {
      parser: 'graphql',
      plugins: [graphqlPlugin.default]
    });
  } catch (error) {
    console.log((error as Error).message);
  }
  return result;
}

export default graphqlFormat;

