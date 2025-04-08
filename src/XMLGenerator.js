import XMLComment from './XMLComment.js'
import XMLElement from './XMLElement.js'

class XMLGenerator {
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

    createElement( name ) {
        const element = new XMLElement( { name } )

        const fn = ( ...args ) => {
            element.addChildren( ...args )
            return proxy
        }

        const handler = {
            get: ( _, prop ) => {
                if ( prop === 'toXML' ) return element.toXML.bind( element )
                if ( prop === 'toPrettyXML' ) return element.toPrettyXML.bind( element )

                if ( prop === 'xmlns' ) {
                    const nsHandler = {
                        apply: ( _, __, [url] ) => {
                            element.setAttr( 'xmlns', url )
                            return proxy
                        },
                        get: ( _, nsPrefix ) => {
                            return ( url ) => {
                                element.setAttr( `xmlns:${nsPrefix}`, url )
                                this.declaredNamespaces.add( nsPrefix )
                                return proxy
                            }
                        }
                    }
                    return new Proxy( () => {}, nsHandler )
                }

                return ( ...args ) => {
                    element.setAttr( prop, args[0] )
                    return proxy
                }
            },
            apply: ( _, __, args ) => fn( ...args )
        }

        const proxy = new Proxy( fn, handler )
        return proxy
    }
    createComment( content ) {
        return new XMLComment( content )
    }
}
export default XMLGenerator
