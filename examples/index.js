import XMLGenerator from '../src/XMLGenerator.js'

const generator = new XMLGenerator()
const _ = generator.builder

const authors = ['J.K. Rowling', 'J.R.R. Tolkien', 'George R.R. Martin']

// Start building the XML document
const xml = _.Library
    .$xmlns( 'http://example.org/library' )              // Declare default namespace
    .$xmlns.bk( 'http://example.org/book' )              // Declare prefixed namespace "bk"
    .location( 'UK' )(                                     // Add attribute "location"
        _.$comment( 'This is a library XML document' ),     // Insert an XML comment

        _.bk.Books.genre( 'fantasy' )(                      // Create <bk:Books genre="fantasy">
            ...authors.map( author =>                        // Spread multiple <bk:Book> elements
                _.bk.Book.lang( 'en' )(                          // <bk:Book lang="en">
                    _.bk.Author( author ),                         // Add <bk:Author>Author Name</bk:Author>
                    _.bk.Name( `A book by ${author}` )             // Add <bk:Name>Title</bk:Name>
                )
            )
        ),

        _.bk.ExtraInfo(                                   // Another element with CDATA section
            _.$cdata( 'Some unparsed <CDATA> content goes here & should not be escaped.' )
        )
    )

// Pretty-print the final XML
console.log( xml.$toPrettyXML() )
