import XMLBase from './XMLBase.js'

/**
 * Represents a CDATA section in an XML document.
 * @class
 */
class XMLCData extends XMLBase {
    /**
     * @param {string} content - The content of the CDATA section.
     */
    constructor( content ) {
        super()
        this.content = content
    }

    /**
     * Returns the CDATA section as an XML string.
     * @returns {string}
     */
    toXML() {
        return `<![CDATA[${this.content}]]>`
    }
}

export default XMLCData
