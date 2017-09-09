import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class TrackedBooks extends Component {
	state = {
		currentlyReadingBooks: [],
		wantToReadBooks:[],
		readBooks: [],
		crValue: "currentlyReading",
		wtrValue: "wantToRead",
		rValue: "read"
	}

	componentWillMount() {
		var tempBooks1 = []
		var tempBooks2 = []
		var tempBooks3 = []
		var self = this
		BooksAPI.getAll().then(function(value) {
			value.filter(key => key.shelf === "currentlyReading").map((book) => (
				tempBooks1.push(book)
			))
			value.filter(key => key.shelf === "wantToRead").map((book) => (
				tempBooks2.push(book)
			))
			value.filter(key => key.shelf === "read").map((book) => (
				tempBooks3.push(book)
			))
			self.setState({currentlyReadingBooks: tempBooks1, wantToReadBooks: tempBooks2, readBooks: tempBooks3})
		})
	}

	moveBook = (book: any, shelf: string) => {
		var tempBooks1 = []
		var tempBooks2 = []
		var tempBooks3 = []
		var self = this
		if (shelf !== undefined) {
			BooksAPI.update(book, shelf).then(response => {
				BooksAPI.getAll().then(function(value) {
					value.filter(key => key.shelf === "currentlyReading").map((book) => (
						tempBooks1.push(book)
					))
					value.filter(key => key.shelf === "wantToRead").map((book) => (
						tempBooks2.push(book)
					))
					value.filter(key => key.shelf === "read").map((book) => (
						tempBooks3.push(book)
					))
					console.log(tempBooks1)
					self.setState((state) => ({
						currentlyReadingBooks: tempBooks1,
						wantToReadBooks: tempBooks2,
						readBooks: tempBooks3
					}))
				})
			})
		}
	}

	render() {
	    return (
	    	<div>
		    	<div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    {this.state.currentlyReadingBooks.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={this.state.crValue} onChange={event => this.moveBook(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option selected value="currentlyReading">Currently Reading</option>
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

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    {this.state.wantToReadBooks.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={this.state.wtrValue} onChange={event => this.moveBook(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option selected value="wantToRead">Want to Read</option>
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


                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    {this.state.readBooks.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select  defaultValue={this.state.rValue} onChange={event => this.moveBook(book, event.target.value)}>
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
            </div>
	    )
	    
	}
}


export default TrackedBooks