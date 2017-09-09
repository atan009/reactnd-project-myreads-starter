import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
	state = {
		query: '',
		trackedBooks: [],
		bookResults: []
	}

	updateQuery = (query) => {
		this.setState({query: query})
	}

	handleKeyPress = (e) => {
		var storedbooks = []
		var self = this

		if (e.key === 'Enter') {
			BooksAPI.search(self.state.query, 20).then(function(value) {
				storedbooks = value.map(book => {
					for (var i = 0; i < self.state.trackedBooks.length; i++) {
						if (book.id === self.state.trackedBooks[i].id) {
							book.shelf = self.state.trackedBooks[i].shelf
							break;
						}
						else {
							book.shelf = "none"
						}
					}

					return book
				})
				self.setState({bookResults: storedbooks})
			})
		}
	}

	componentWillMount() {
		var self = this
		BooksAPI.getAll().then(function(value) {
			self.setState({
				trackedBooks: value,
			})
		})
	}

	moveBook = (book: any, shelf: string) => {
		if (shelf !== undefined) {
				BooksAPI.update(book, shelf)
		}
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
                onKeyPress={this.handleKeyPress}/>

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
	                      <select value={book.shelf} onChange={event => this.moveBook(book, event.target.value)}>
	                        <option value="none" disabled>Move to...</option>
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