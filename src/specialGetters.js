/**
 * Returns a function that serializes the element to a compact XML string.
 * @param {XMLElement} element - The XML element to serialize.
 * @returns {Function} - A function that returns the XML string.
 */
function toXMLGetter( element ) {
    return element.toXML.bind( element )
}

/**
 * Returns a function that serializes the element to a pretty-formatted XML string.
 * @param {XMLElement} element - The XML element to serialize.
 * @returns {Function} - A function that returns the formatted XML string.
 */
function toPrettyXMLGetter( element ) {
    return element.toPrettyXML.bind( element )
}

/**
 * Returns a proxy that handles namespace declarations.
 * @param {XMLElement} element - The element to apply namespace attributes to.
 * @param {XMLGenerator} generator - The XMLGenerator instance.
 * @param {Function} proxy - The proxy representing the XML element.
 * @returns {Proxy} - A proxy for handling namespace declarations.
 */
function xmlnsGetter( element, generator, proxy ) {
    return new Proxy( () => {}, {
        apply: ( _, __, [url] ) => {
            element.setAttr( 'xmlns', url )
            return proxy
        },
        get: ( _, nsPrefix ) => {
            return ( url ) => {
                element.setAttr( `xmlns:${nsPrefix}`, url )
                generator.declaredNamespaces.add( nsPrefix )
                return proxy
            }
        }
    } )
}

const specialGetters = {
    toXML: toXMLGetter,
    toPrettyXML: toPrettyXMLGetter,
    xmlns: xmlnsGetter
}

export default specialGetters
