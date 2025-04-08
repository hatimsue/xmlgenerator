import XMLGenerator from '../src/XMLGenerator.js'

const generator = new XMLGenerator()
const _ = generator.builder

const multilineComment = `
This XML describes a library system.
It includes detailed info about libraries, books, and authors.
All elements are properly namespaced and attributed.
`

const xml =
  _.Libraries
      .$xmlns.lib( 'http://example.org/library' )
      .$xmlns.book( 'http://example.org/book' )
      .$xmlns.auth( 'http://example.org/author' )(

          _.$comment( multilineComment ),

          _.lib_Library
              .id( 'LIB001' )
              .country( 'USA' )
              .status( 'active' )(

                  _.lib_Name( 'Downtown Public Library' ),

                  _.lib_Location
                      .city( 'New York' )
                      .zipcode( '10001' )(
                          _.lib_Address( '456 Library Ave' ),
                          _.lib_Phone( '+1 212-555-0198' )
                      ),

                  _.$comment( 'Books available in the library' ),

                  _.lib_Books(
                      _.book_Book
                          .isbn( '9780141439518' )
                          .language( 'en' )
                          .status( 'available' )(
                              _.book_Title( 'Pride and Prejudice' ),
                              _.book_Author( 'Jane Austen' ),
                              _.book_Year( '1813' ),
                              _.book_Genre( 'Classic Literature' )
                          ),

                      _.book_Book
                          .isbn( '9780743273565' )
                          .language( 'en' )
                          .status( 'checked-out' )(
                              _.book_Title( 'The Great Gatsby' ),
                              _.book_Author( 'F. Scott Fitzgerald' ),
                              _.book_Year( '1925' ),
                              _.book_Genre( 'Novel' )
                          ),

                      _.book_Book
                          .isbn( '9780062315007' )
                          .language( 'es' )
                          .status( 'available' )(
                              _.book_Title( 'One Hundred Years of Solitude' ),
                              _.book_Author( 'Gabriel García Márquez' ),
                              _.book_Year( '1967' ),
                              _.book_Genre( 'Magical Realism' )
                          )
                  ),

                  _.$comment( 'Notable authors featured' ),

                  _.lib_Authors(
                      ...[
                          { name: 'Jane Austen', country: 'UK', birth: '1775', deceased: '1817' },
                          { name: 'F. Scott Fitzgerald', country: 'USA', birth: '1896', deceased: '1940' },
                          { name: 'Gabriel García Márquez', country: 'Colombia', birth: '1927', deceased: '2014' }
                      ].map( author =>
                          _.auth_Author
                              .country( author.country )
                              .birthYear( author.birth )
                              .deceasedYear( author.deceased )(
                                  _['<']( author.name )
                              )
                      )
                  )
              )
      )

console.log( xml.$element.toPrettyXML() )
