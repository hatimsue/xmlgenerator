/**
 * Escapes special characters in XML text content.
 * @param {string} text - The text content to escape.
 * @returns {string} The escaped text.
 */
function escapeText( text ) {
    return text.replace( /&/g, '&amp;' )
        .replace( /</g, '&lt;' )
        .replace( />/g, '&gt;' )
}

/**
 * Escapes special characters in XML attribute values.
 * @param {string} value - The attribute value to escape.
 * @returns {string} The escaped attribute value.
 */
function escapeAttribute( value ) {
    return value.replace( /&/g, '&amp;' )
        .replace( /"/g, '&quot;' )
}

/**
 * Validates a tag or attribute name for XML.
 * @param {string} name - The name to validate.
 * @param {string} [context] - The context of the name, used in the error message.
 * @throws {Error} If the name is not a non-empty string or contains invalid characters.
 */
function validateName( name, context = 'Tag' ) {
    if ( typeof name !== 'string' || !name.trim() ) {
        throw new Error( `${context} name must be a non-empty string` )
    }
    if ( /[\s<>"'&]/.test( name ) ) {
        throw new Error( `Invalid ${context} name: "${name}"` )
    }
}

export {
    escapeText,
    escapeAttribute,
    validateName,
}
