import { EditorView } from '@codemirror/view';

export const toOneWord = (words: string) => words.split(' ').join('').toLowerCase().trim();

export const jsonFormat = (code: string) => {
  try {
    return { text: JSON.stringify(JSON.parse(code), null, 2), error: null };
  } catch (error) {
    return { text: null, error: `error formatting JSON: ${(error as Error).message}` };
  }
};

export const setViewText = (view: EditorView, text: string) => {
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: text },
  });
};
