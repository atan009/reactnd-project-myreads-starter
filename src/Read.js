import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class Read extends Component {
	state = {
		books: []
	}

	componentWillMount() {
		var tempBooks = []
		var self = this
		BooksAPI.getAll().then(function(value) {
			value.filter(key => key.shelf === "read").map((book) => (
				tempBooks.push(book)
			))
			self.setState({books: tempBooks})
		})
	}

	render() {
	    return (
	    	<div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    {this.state.books.map((book) => (

                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option selected value="read">Read</option>
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
	    )   
	}
}


export default Read