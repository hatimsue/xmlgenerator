import {XMLBase, XMLCData, XMLComment, XMLElement} from '@hatimsue/xml-core'

import specialGetters from './specialGetters.js'

/**
 * @class
 */
class XMLGenerator {
    /**
     * Initializes the XMLGenerator instance.
     */
    constructor() {

        //stores the namespaces in the current instance (node)
        this.declaredNamespaces = new Set()
        //this creates a proxy to a XMLElement|XMLComment instance
        this.builder = new Proxy( {}, {
            get: ( _, tag ) => {
                if ( tag === '$comment' ) {
                    return ( text ) => this.createComment( text )
                }
                if ( tag === '$cdata' ) {
                    return ( text ) => this.createCData( text )
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
            // solo pasar strings o elementos válidos (como `element.element`)
            const children = args.map( arg => {
                if ( typeof arg === 'string' ) return arg
                if ( arg instanceof XMLBase ) return arg
                if ( arg?.$element instanceof XMLBase ) return arg.$element
            } )

            element.addChildren( ...children )
            return proxy
        }


        const handler = {
            get: ( _, prop ) => {
                //returns the xmlelement instance
                if ( prop === '$element' ) {
                    return element // 👈 Aquí devolvemos el real
                }
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
        proxy.$element = element
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

    /**
     * Creates a new CDATA node.
     * @param {string} content - The text content of the CDATA section.
     * @returns {XMLCData} - A new CDATA node.
     */
    createCData( content ) {
        return new XMLCData( content )
    }

}

export default XMLGenerator

