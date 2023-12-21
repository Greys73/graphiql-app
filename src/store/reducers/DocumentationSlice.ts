import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IntrospectionField, IntrospectionSchema } from 'graphql';

export type IDocPathEntry = string | IntrospectionField;
export interface IDocumentationState {
  paths: IDocPathEntry[];
  schema: IntrospectionSchema | null | undefined;
}

const initialState: IDocumentationState = {
  paths: [],
  schema: undefined,
};

export const documentationSlice = createSlice({
  name: 'Documentation',
  initialState,
  reducers: {
    setSchema: (
      state: IDocumentationState,
      action: PayloadAction<IntrospectionSchema | null | undefined>
    ) => {
      state.schema = action.payload;
      state.paths = [];
    },
    pushPath: (state: IDocumentationState, action: PayloadAction<IDocPathEntry>) => {
      state.paths.push(action.payload);
    },
    popPath: (state) => {
      state.paths.pop();
    },
  },
});

export const { setSchema, pushPath, popPath } = documentationSlice.actions;
export default documentationSlice.reducer;
