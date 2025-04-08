import { validateName } from './utils.js'
import XMLBase from './XMLBase.js'

/**
 * @typedef {(string | XMLBase)} XMLChild - A child node of an XML element: text or any XML node.
 */

/**
 * @typedef {object} XMLElementOptions
 * @property {string} name - Tag name for the element
 * @property {XMLChild[]} [children] - Children of the element
 * @property {Object.<string, string>} [attributes] - Optional attributes for the element
 */

/**
 * Represents an XML element node.
 * @class
 * @augments XMLBase
 */
class XMLElement extends XMLBase {
    /**
     * @param {XMLElementOptions} options - XML element options
     */
    constructor( { name, children = [], attributes = {} } ) {
        super()
        validateName( name, 'Tag' )
        this.name = name
        this.children = []
        this.attributes = {}

        for ( const [key, value] of Object.entries( attributes ) ) {
            this.setAttr( key, value )
        }

        children.forEach( child => this.addChild( child ) )
    }

    /**
     * Adds an attribute to the element.
     * @param {string} key - Attribute name
     * @param {string} value - Attribute value
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
     * Adds a child node or text content.
     * @param {XMLChild} child
     * @returns {this}
     */
    addChild( child ) {
        if ( typeof child === 'string' || child instanceof XMLBase ) {
            this.children.push( child )
        } else {
            console.log( child )
            console.log( typeof child )
            throw new Error( 'Invalid child node: must be string or instance of XMLBase' )
        }
        return this
    }

    /**
     * Adds one or more child nodes.
     * @param {XMLChild[]} children
     * @returns {this}
     */
    addChildren( ...children ) {
        children.flat().forEach( child => this.addChild( child ) )
        return this
    }

    /**
     * Serializes this XML element and its children into a compact XML string.
     * @returns {string}
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
     * Serializes this XML element and its children into a pretty-printed XML string.
     * @param {number} indent - Indentation level.
     * @returns {string}
     */
    toPrettyXML( indent = 0 ) {
        const tab = '  '.repeat( indent )
        let result = `${tab}<${this.name}`

        if ( Object.keys( this.attributes ).length > 0 ) {
            result += ' ' + Object.entries( this.attributes )
                .map( ( [key, value] ) => `${key}="${value}"` )
                .join( ' ' )
        }

        if ( this.children.length === 0 ) {
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
