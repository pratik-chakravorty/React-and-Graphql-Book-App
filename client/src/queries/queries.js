import { gql } from "apollo-boost";

//Get the list of Books
export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

//Get the list of Authors
export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      name
      genre
      author {
        name
        books {
          name
          id
        }
      }
    }
  }
`;
