import { DocumentationExplorer } from '@components/Documentation/DocumentationExplorer';
import EditorPage from '@src/app/editor/components/EditorPage';
import { DefaultAPI } from '@src/lib/constants/editor';
import { getAPISchema } from '@src/lib/rootAPI';
import { setSchema as SetSchemaInStore } from '@src/store/reducers/DocumentationSlice';
import { setupStore } from '@src/store/store';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '../../test-utils';

vi.mock('cm6-graphql', () => {
  return {
    graphql: () => ({
      extension: [],
    }),
    updateSchema: () => {},
  };
});

vi.mock('@codemirror/lang-json', () => {
  return {
    json: () => ({
      extension: [],
    }),
  };
});

describe('DocumentationExplorer tests', () => {
  test('DocumentationExplorer should work well', async () => {
    //---------- 1 way

    // render(<EditorPage errorAuth={null} />);

    // const docsbtn = await screen.findByRole('button', { name: 'Docs' });
    // expect(docsbtn).toBeInTheDocument();

    // fireEvent.click(docsbtn);

    //---------- 2 way

    const store = setupStore();
    const { schemaResponse } = await getAPISchema(DefaultAPI);
    // console.log('---------------------------------------------------------------');
    // console.log(schemaResponse, error);
    store.dispatch(SetSchemaInStore(schemaResponse?.__schema));

    render(
      <Provider store={store}>
        <DocumentationExplorer />
      </Provider>
    );

    // ------------ common
    // root page
    expect(await screen.findByRole('heading', { name: 'Root Types:' }));
    expect(screen.getByRole('heading', { name: 'All Schema Types:' }));

    // go to Query page
    fireEvent.click(screen.getAllByText('Query')[0]);
    expect(screen.queryByRole('heading', { name: 'Root Types:' })).toBeFalsy();
    expect(screen.getByRole('heading', { name: 'Query' }));
    expect(screen.getByRole('heading', { name: 'Fields:' }));

    // [Episodes]
    fireEvent.click(screen.getByText('[Episode]'));
    expect(screen.getByRole('heading', { name: 'Episode' }));
    expect(screen.getByRole('heading', { name: 'Fields:' }));
    expect(screen.getByText('The air date of the episode.'));

    // try to return back to root - press Back twice
    fireEvent.click(screen.getByRole('button', { name: '< Back' }));
    fireEvent.click(screen.getByRole('button', { name: '< Back' }));
    expect(screen.getByRole('heading', { name: 'Root Types:' }));
    expect(screen.getByRole('heading', { name: 'All Schema Types:' }));

    // check for simple type page
    fireEvent.click(screen.getByText('ID'));

    expect(screen.queryByRole('heading', { name: 'Root Types:' })).toBeFalsy();
    expect(
      screen.getByText(
        'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.'
      )
    );

    //check ENUM type
    fireEvent.click(screen.getByRole('button', { name: '< Back' }));
    fireEvent.click(screen.getByText('CacheControlScope'));
    expect(screen.getByRole('heading', { name: 'CacheControlScope' }));
    expect(screen.getByRole('heading', { name: 'Enum Values' }));
    expect(screen.getByText('PUBLIC'));
    expect(screen.getByText('PRIVATE'));

    // try page with arguments
    fireEvent.click(screen.getByRole('button', { name: '< Back' }));
    fireEvent.click(screen.getAllByText('Query')[0]);
    fireEvent.click(screen.getByText('charactersByIds'));

    expect(screen.getByRole('heading', { name: 'charactersByIds' }));
    expect(screen.getByRole('heading', { name: 'Arguments:' }));
    expect(screen.getByText('[ID!]!'));
  });
});
