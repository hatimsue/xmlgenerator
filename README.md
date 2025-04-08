## xmlgenerator

A lightweight JavaScript library for building XML documents using a clean, declarative syntax.

### Installation

```bash
npm install @hatimsue/xmlgenerator
```
### Overview
This is a complete example showcasing the core features of the xmlgenerator library:

```javascript
import {XMLGenerator} from '@hatimsue/xmlgenerator'

const _ = new XMLGenerator().builder

// Array of authors to demonstrate loops using spread + map
const authors = ['J.K. Rowling', 'J.R.R. Tolkien', 'George R.R. Martin']

// Start building the XML document
const xml = _.Library
  .$xmlns('http://example.org/library')              // Declare default namespace
  .$xmlns.bk('http://example.org/book')              // Declare prefixed namespace "bk"
  .location('UK')                                     // Add attribute "location"
  (
    _.$comment('This is a library XML document'),     // Insert an XML comment

    _.bk.Books.genre('fantasy')(                      // Create <bk:Books genre="fantasy">
      ...authors.map(author =>                        // Spread multiple <bk:Book> elements
        _.bk.Book.lang('en')(                          // <bk:Book lang="en">
          _.bk.Author(author),                         // Add <bk:Author>Author Name</bk:Author>
          _.bk.Name(`A book by ${author}`)             // Add <bk:Name>Title</bk:Name>
        )
      )
    ),

    _.bk.ExtraInfo(                                   // Another element with CDATA section
      _.$cdata('Some unparsed <CDATA> content goes here & should not be escaped.')
    )
  )

// Pretty-print the final XML
console.log(xml.$toPrettyXML())

```
### Examples

<details>
<summary><strong>Basic usage</strong></summary>

```javascript
import {XMLGenerator} from '@hatimsue/xmlgenerator'

const _ = new XMLGenerator().builder

const xmlDocument = _.Books(
  _.Book(
    _.Author('J.K. Rowling'),
    _.Name('Harry Potter and the Philosopher\'s Stone')
  )
)

console.log(xmlDocument.$toPrettyXML())
/**
 * <Books>
 *   <Book>
 *     <Author>J.K. Rowling</Author>
 *     <Name>Harry Potter and the Philosopher's Stone</Name>
 *   </Book>
 * </Books>
 */
```
</details>
<details> <summary><strong>With attributes</strong></summary>

```javascript
import {XMLGenerator} from '@hatimsue/xmlgenerator'

const _ = new XMLGenerator().builder

const xmlDocument = 
_.Books.category('fiction').country('UK')(
  _.Book.lang('en')(
    _.Author('J.K. Rowling'),
    _.Name('Harry Potter and the Philosopher\'s Stone')
  )
)

console.log(xmlDocument.$toPrettyXML())
/**
 * <Books category="fiction" country="UK">
 *   <Book lang="en">
 *     <Author>J.K. Rowling</Author>
 *     <Name>Harry Potter and the Philosopher's Stone</Name>
 *   </Book>
 * </Books>
 */

```
</details> 
<details> <summary><strong>With namespaces</strong></summary>

```javascript

import {XMLGenerator} from '@hatimsue/xmlgenerator'

const _ = new XMLGenerator().builder

const xmlDocument = 
_.Books
  .$xmlns('http://example.org/books') // default namespace
  .$xmlns.bk('http://example.org/book') // prefix namespace
  .$xmlns.ss('http://example.org/ss')  // prefix namespace
  .category('fiction')
  .country('UK')(
    _.bk.Book.lang('en')(
      _.bk.Author('J.K. Rowling'),
      _.bk.Name('Harry Potter and the Philosopher\'s Stone')
    )
)

console.log(xmlDocument.$toPrettyXML())
/**
 * <Books xmlns="http://example.org/books" xmlns:bk="http://example.org/book" category="fiction" country="UK">
 *   <bk:Book lang="en">
 *     <bk:Author>J.K. Rowling</bk:Author>
 *     <bk:Name>Harry Potter and the Philosopher's Stone</bk:Name>
 *   </bk:Book>
 * </Books>
 */
```
</details>

### Reference

| **Concept**                    | **Description**                                         | **Syntax / Example**                              | **Expected XML Output** |
|--------------------------------|---------------------------------------------------------|---------------------------------------------------|--------------------------|
| **Create a tag**               | Tags are created by calling a method with the tag name. | `_.Book()`                                        | `<Book/>`               |
| **Add content**                | Pass child nodes or text content as arguments.          | `_.Book('Title')`                                 | `<Book>Title</Book>`    |
| **Add attribute**              | Add attribute by chaining method before final `()`.     | `_.Book.lang('en')()`                             | `<Book lang="en"/>`     |
| **Chain attributes**           | Add multiple attributes.                                | `_.Book.lang('en').year('2001')()`                | `<Book lang="en" year="2001"/>` |
| **Add default namespace**      | Declare default XML namespace.                          | `_.Books._$xmlns('http://example.org')()`         | `<Books xmlns="http://example.org"/>` |
| **Add namespaced prefix**      | Add namespace with prefix.                              | `_.Books._$xmlns.lib('http://example.org/lib')()` | `<Books xmlns:lib="http://example.org/lib"/>` |
| **Use namespaced tags**        | Tags under a namespace prefix.                          | `_.lib.Book()`                                    | `<lib:Book/>`           |
| **Add comment**                | One-line or multiline comment.                          | `_._$comment('Note here')`                        | `<!-- Note here -->`    |
| **Add CDATA section**          | Escape content with special characters.                 | `_._$cdata('<tag>')`                              | `<![CDATA[<tag>]]>`     |
| **Use a loop/dynamic content** | Use any array function with `...`.                      | `...['a','b'].map(n => _.Name(n))`                | `<Name>a</Name>\n<Name>b</Name>` |
| **Single line output**         | One-line comments render inline.                        | `_._$comment('inline comment')`                   | `<!-- inline comment -->` |
| **Multiline XML output**       | Indented, readable XML.                                 | `element.$toPrettyXML()`                          | (pretty printed XML)    |
| **Minified XML output**        | Compact XML with no indentation.                        | `element.$toXML()`                                | (single-line XML)       |
| **Root element**               | Begin document with root node.                          | `const xml = _.Library(...)`                      | `<Library>...</Library>` |
| **Output XML**                 | Print XML string to console.                            | `console.log(xml.$toPrettyXML())`                 | Console output          |



