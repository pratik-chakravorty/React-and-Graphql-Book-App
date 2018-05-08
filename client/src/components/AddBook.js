import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
//construct the query
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.getName.value,
        genre: this.getGenre.value,
        authorId: this.getAuthorId.value
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name</label>
          <input type="text" ref={input => (this.getName = input)} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" ref={input => (this.getGenre = input)} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select ref={input => (this.getAuthorId = input)}>
            <option>Select Author:</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
