import XMLCData from '../src/XMLCData.js'

describe( 'XMLCData', () => {
    it( 'should return correct CDATA XML', () => {
        const content = 'Some <raw> & encoded "stuff"'
        const cdata = new XMLCData( content )
        expect( cdata.toXML() ).toBe( `<![CDATA[${content}]]>` )
    } )

    it( 'should inherit from XMLBase', () => {
        const cdata = new XMLCData( 'data' )
        expect( typeof cdata.toPrettyXML ).toBe( 'function' )
        expect( cdata.toPrettyXML() ).toBe( cdata.toXML() )
    } )
} )
