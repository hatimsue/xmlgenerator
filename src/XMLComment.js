import XMLBase from './XMLBase.js'

/**
 * Represents an xml comment
 * @class
 */
class XMLComment extends XMLBase {

    /**
     * constructor.
     * @param {string} content
     */
    constructor( content ) {
        super()
        if ( /--/.test( content ) ) {
            throw new Error( 'XML comments cannot contain \'--\'' )
        }
        if ( content.endsWith( '-' ) ) {
            throw new Error( 'XML comments cannot end with a single \'-\' before the closing -->' )
        }
        this.content = content
    }

    /**
     * Returns a one-line XML comment string.
     * @returns {string} A single-line XML comment.
     */
    toXML() {
        return `<!-- ${this.content} -->`
    }

    /**
     * Returns a formatted (indented and multiline) XML comment string.
     * @param {number} indent - The indentation level (number of tab levels).
     * @returns {string} A pretty-printed XML comment string.
     */
    toPrettyXML( indent = 0 ) {
        const tab = '  '.repeat( indent )
        return `${tab}<!--\n${tab}${this.content.split( '\n' ).join( `\n${tab}` )}\n${tab}-->`
    }

}

export default XMLComment
