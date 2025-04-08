import XMLBase from '../src/XMLBase.js'

describe( 'XMLBase', () => {
    it( 'should throw error if toXML is called directly', () => {
        const node = new XMLBase()
        expect( () => node.toXML() ).toThrow( 'toXML() must be implemented by subclass' )
    } )

    it( 'toPrettyXML should also throw because it calls toXML', () => {
        const node = new XMLBase()
        expect( () => node.toPrettyXML() ).toThrow( 'toXML() must be implemented by subclass' )
    } )

    it( 'should allow subclasses to implement toXML()', () => {
        class CustomNode extends XMLBase {
            toXML() {
                return '<custom/>'
            }
        }

        const node = new CustomNode()
        expect( node.toXML() ).toBe( '<custom/>' )
        expect( node.toPrettyXML() ).toBe( '<custom/>' )
    } )
} )
