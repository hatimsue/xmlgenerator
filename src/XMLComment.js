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
        const lines = this.content.split( '\n' )

        if ( lines.length === 1 ) {
        // Una sola línea: mostrar en línea
            return `${tab}<!-- ${lines[0]} -->`
        } else {
        // Varias líneas: formato indentado
            const indented = lines.map( line => `${tab}${line}` ).join( '\n' )
            return `${tab}<!--\n${indented}\n${tab}-->`
        }
    }


}

export default XMLComment
