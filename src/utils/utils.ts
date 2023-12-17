export const toOneWord = (words: string) => words.split(' ').join('').toLowerCase().trim();

export const jsonFormat = (code: string) => {
  try {
    return { text: JSON.stringify(JSON.parse(code)), error: null };
  } catch (error) {
    return { text: null, error: `error formatting JSON: ${(error as Error).message}` };
  }
};
