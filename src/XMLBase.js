
/**
 * Abstract base class for XML nodes that defines the common interface.
 * @class
 */
class XMLBase {
    /**
     * Returns the XML string representation of the node.
     * Must be implemented by subclasses.
     * @returns {string} XML representation of the node.
     * @throws {Error} If not implemented in the subclass.
     */
    toXML() {
        throw new Error( 'toXML() must be implemented by subclass' )
    }

    /**
     * Returns the formatted (pretty-printed) XML representation of the node.
     * @returns {string} Formatted XML representation.
     */
    toPrettyXML() {
        return this.toXML()
    }
}

export default XMLBase


