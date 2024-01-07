export const DefaultAPI = 'https://rickandmortyapi.com/graphql';

export const DefaultGraphQL = `query Ricks($name: String){
  characters ( filter: {name: $name}){
    results {
      name
      gender
      location {
        name
      }
    }
  }
}
`;

export const DefaultViewer = '';

export const DefaultVariables = '{ "name": "Rick" }';

export const DefaultHeaders = '{ "Cache-Control": "max-age=20" }';
