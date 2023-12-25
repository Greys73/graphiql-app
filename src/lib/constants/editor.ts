export const DefaultAPI = 'https://rickandmortyapi.com/graphql';

export const DefaultGraphQL = `query {
  characters(page: 2) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
}
`;

export const DefaultViewer = `{
  "data": {
    "characters": {
      "info": {
        "count": 2
      },
      "results": [
        {
          "name": "Aqua Morty"
        },
        {
          "name": "Aqua Rick"
        },
      ]
    },
    "location": {
      "id": "1"
    }
  }
}`;

export const DefaultVariables = '{ "name": "Rick" }';

export const DefaultHeaders = '{ "Content-Length": "1000" }';
