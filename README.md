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

| **Concept**                    | **Description**                                                                 | **Syntax / Example**                              | **Expected XML Output**                   |
|--------------------------------|---------------------------------------------------------------------------------|---------------------------------------------------|--------------------------------------------|
| **Create a tag**               | Use a method named after the tag to create it. Must be called with `()`.        | `_.Book()`                                        | `<Book/>`                                  |
| **Add content**                | Pass strings or nested tags as arguments inside the parentheses.                | `_.Book('Title')`                                 | `<Book>Title</Book>`                       |
| **Add attribute**              | Chain attribute methods before calling the tag with `()`.                       | `_.Book.lang('en')()`                             | `<Book lang="en"/>`                        |
| **Chain attributes**           | Chain multiple attribute methods before final `()`.                             | `_.Book.lang('en').year('2001')()`                | `<Book lang="en" year="2001"/>`           |
| **Add default namespace**      | Call `_$xmlns(url)` on the element before `()`.                                | `_.Books._$xmlns('http://example.org')()`         | `<Books xmlns="http://example.org"/>`     |
| **Add namespaced prefix**      | Use `_$xmlns.prefix(url)` to declare namespaced prefixes.                       | `_.Books._$xmlns.lib('http://example.org/lib')()` | `<Books xmlns:lib="http://example.org/lib"/>` |
| **Use namespaced tags**        | Use prefix as property (e.g., `_.lib.TagName()`) after declaring it.            | `_.lib.Book()`                                    | `<lib:Book/>`                              |
| **Add comment**                | Insert with `_.$comment('text')` as a child element.                           | `_.$comment('Note here')`                         | `<!-- Note here -->`                       |
| **Add CDATA section**          | Use `_.$cdata('value')` to wrap raw XML content safely.                         | `_.$cdata('<tag>')`                               | `<![CDATA[<tag>]]>`                        |
| **Use a loop/dynamic content** | Use spread syntax with `.map()` or other loops that return tag arrays.          | `...['a','b'].map(n => _.Name(n))`                | `<Name>a</Name>\n<Name>b</Name>`          |
| **Single line output**         | Use `$toXML()` to generate compact XML string.                                 | `element.$toXML()`                                | `<Book><Author>J.K.</Author></Book>`      |
| **Multiline XML output**       | Use `$toPrettyXML()` to output indented XML for readability.                   | `element.$toPrettyXML()`                          | Formatted multi-line XML                  |
| **Root element**               | Start your XML tree from a top-level tag like `_.Library(...)`.                 | `const xml = _.Library(...)`                      | `<Library>...</Library>`                   |
| **Output XML**                 | Log or return the result from `$toXML()` or `$toPrettyXML()`.                  | `console.log(xml.$toPrettyXML())`                 | Console output of the XML                 |


