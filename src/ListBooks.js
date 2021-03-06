import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
	state = {
		query: '',
		bookResults: [],
	}

	updateQuery = (query) => {
		this.setState({query: query})

		var storedbooks = []
		var self = this

		BooksAPI.search(self.state.query, 20).then(function(value) {
			storedbooks = value.map(book => {
				book.shelf="none"
				for (var i = 0; i < self.props.books.length; i++) {
					if (book.id === self.props.books[i].id) {
						book.shelf = self.props.books[i].shelf
						break
					}
				}
				return book
			})
			self.setState({bookResults: storedbooks})
		})
	}


	render() {
		const { query } = this.state
	    return (<div>
	    	<div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

              {this.state.bookResults.map((book) => (
              	<li key={book.id}>
	                <div className="book">
	                  <div className="book-top">
	                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
	                    <div className="book-shelf-changer">
	                      <select value={book.shelf} onChange={event => this.props.onAddOrChangeShelf(book, event.target.value)}>
	                        <option value="unselectable" disabled>Move to...</option>
	                        <option value="currentlyReading">Currently Reading</option>
	                        <option value="wantToRead">Want to Read</option>
	                        <option value="read">Read</option>
	                        <option value="none">None</option>
	                      </select>
	                    </div>
	                  </div>
	                  <div className="book-title">{book.title}</div>
	                  <div className="book-authors">{book.authors}</div>
	                </div>
	            </li>
	            ))}

              </ol>
            </div>
          </div>
	    </div>)
	    
	}
}


export default ListBooks