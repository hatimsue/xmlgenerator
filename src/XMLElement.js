import {validateName} from './utils.js'
import XMLComment from './XMLComment.js'
/**
 * @typedef {(string|XMLComment|XMLElement)} XMLChild - A child node of an XML element: text, a comment, or a nested element.
 */

/**
 * @typedef {object} XMLElementOptions
 * @property {string} name - Tag name for the element
 * @property {XMLChild[]} [children] - Children of the element
 * @property {Object.<string, string>} [attributes] - Optional attributes for the element
 */


/**
 * Represents an XMLelement
 * @class
 */
class XMLElement {
    /**
     * @param {XMLElementOptions} options - xml element options
     */
    constructor( { name, children = [], attributes = {} } ) {
        validateName( name, 'Tag' )
        this.name = name
        this.children = []
        this.attributes = {}

        for ( const [key, value] of Object.entries( attributes ) ) {
            this.setAttr( key, value )
        }

        children.forEach( child => this.addChild( child ) )    }

    /**
     * Add an attribute to the xml element
     * @param {string} key - attribute name
     * @param {string} value - attribute value
     * @returns {this}
     */
    setAttr( key, value ) {
        validateName( key, 'Attribute' )
        if ( typeof value !== 'string' ) {
            throw new Error( `Attribute value must be a string: ${key}` )
        }
        this.attributes[key] = value
        return this
    }

    /**
     * add an xml child element to the xml element.
     * @param {XMLChild} child
     * @returns {this}
     */
    addChild( child ) {
        if ( typeof child === 'string' || child instanceof XMLElement || child instanceof XMLComment ) {
            this.children.push( child )
        } else {
            throw new Error( 'Invalid child node' )
        }
        return this
    }

    /**
     * add one or more xml children to the xml element.
     * @param {XMLChild[]} children
     * @returns {this}
     */
    addChildren( ...children ) {
        this.children.push( ...children.flat() )
        return this
    }

    /**
     * Serializes this XML element and its children into an XML string.
     * The resulting string does not include line breaks or indentation.
     * @returns {string} xmlString - A compact XML string representation of the element.
     */
    toXML() {
        let xmlString = `<${this.name}`
        if ( Object.keys( this.attributes ).length > 0 ) {
            xmlString += ' ' + Object.entries( this.attributes )
                .map( ( [key, value] ) => `${key}="${value}"` )
                .join( ' ' )
        }
        xmlString += '>'

        this.children.forEach( child => {
            xmlString += ( typeof child === 'string' ) ? child : child.toXML()
        } )

        xmlString += `</${this.name}>`
        return xmlString
    }

    /**
     * Serializes this XML element and its children into a formatted, human-readable XML string.
     * @param {number} [indent] - The current indentation level. Used internally for recursive formatting.
     * @returns {string} prettyXML - A formatted XML string with indentation and line breaks.
     */
    toPrettyXML( indent = 0 ) {
        const tab = '  '.repeat( indent )
        let result = `${tab}<${this.name}`

        if ( Object.keys( this.attributes ).length > 0 ) {
            result += ' ' + Object.entries( this.attributes )
                .map( ( [key, value] ) => `${key}="${value}"` )
                .join( ' ' )
        }

        const hasChildren = this.children.length > 0

        if ( !hasChildren ) {
            result += ' />\n'
            return result
        }

        result += '>\n'

        this.children.forEach( child => {
            if ( typeof child === 'string' ) {
                result += `${tab}  ${child}\n`
            } else {
                const pretty = child.toPrettyXML( indent + 1 )
                result += pretty.endsWith( '\n' ) ? pretty : pretty + '\n'
            }
        } )

        result += `${tab}</${this.name}>\n`
        return result
    }

}

export default XMLElement
