import specialGetters from './specialGetters.js'
import XMLComment from './XMLComment.js'
import XMLElement from './XMLElement.js'

/**
 * @class
 */
class XMLGenerator {
    /**
     * Initializes the XMLGenerator instance.
     */
    constructor() {

        this.declaredNamespaces = new Set()
        this._ = new Proxy( {}, {
            get: ( _, tag ) => {
                if ( tag === 'comment' ) {
                    return ( text ) => this.createComment( text )
                }
                if ( this.declaredNamespaces.has( tag ) ) {
                    return new Proxy( {}, {
                        get: ( _, nsTag ) => this.createElement( `${tag}:${nsTag}` )
                    } )
                }
                return this.createElement( tag )
            }
        } )
    }

    /**
     * Creates a proxied XML element with the given tag name.
     * @param {string} name - The tag name of the XML element to create.
     * @returns {Proxy} - A proxied function that acts as both an element builder and container.
     */
    createElement( name ) {
        const element = new XMLElement( { name } )
        const fn = ( ...args ) => {
            element.addChildren( ...args )
            return proxy
        }

        const handler = {
            get: ( _, prop ) => {
                //special getters
                if ( prop in specialGetters ) {
                    return specialGetters[prop]( element, this, proxy )
                }
                //attributes
                return ( value ) => {
                    element.setAttr( prop, value )
                    return proxy
                }
            },
            //add childrens
            apply: ( _, __, args ) => fn( ...args )
        }

        const proxy = new Proxy( fn, handler )
        return proxy
    }

    /**
     * Creates a new XML comment node.
     * @param {string} content - The text content of the comment.
     * @returns {XMLComment} - A new comment node.
     */
    createComment( content ) {
        return new XMLComment( content )
    }
}

export default XMLGenerator

