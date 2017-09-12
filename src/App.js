import React from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import TrackedBooks from './TrackedBooks'

class BooksApp extends React.Component {
  state = {
    Books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  resetBooks = () => {
    var self = this
    BooksAPI.getAll().then((books) => {
      self.setState({Books: books})
    })
  }

  componentDidMount() {
    this.resetBooks()
  }

  onUpdateBookShelf = (book: any, shelf: string) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(response => {
      this.resetBooks()
    })
  }

  onAddOrChangeShelf = (book: any, shelf: string) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(response => {
      this.resetBooks()
    })
  }

  render() {
    const currentlyReading = this.state.Books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = this.state.Books.filter(book => book.shelf === 'wantToRead')
    const read = this.state.Books.filter(book => book.shelf === 'read')
    return (
      <div className="app">
          <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              
              <TrackedBooks onUpdateBookShelf={this.onUpdateBookShelf}
              books={currentlyReading}
              shelfTitle={"Currently Reading"}
              />
              <TrackedBooks onUpdateBookShelf={this.onUpdateBookShelf}
              books={wantToRead}
              shelfTitle={"Want To Read"}
              />
              <TrackedBooks onUpdateBookShelf={this.onUpdateBookShelf}
              books={read}
              shelfTitle={"Read"}
              />
              
            </div>
            <div className="open-search">
                <Link to='/search' >Add a book</Link>
            </div>
          </div>
          )}/>
          <Route path='/search' render={() => (
            <ListBooks
            onAddOrChangeShelf={this.onAddOrChangeShelf}
            books={this.state.Books}
            />
            //book list
          )}/>
      </div>
    )
  }
}

export default BooksApp
