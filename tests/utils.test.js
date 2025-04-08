import * as utils from '../src/utils.js'

describe( 'escapeText', () => {
    it( 'escapes &, <, and > characters', () => {
        expect( utils.escapeText( '5 < 10 & 8 > 3' ) ).toBe( '5 &lt; 10 &amp; 8 &gt; 3' )
    } )

    it( 'returns unchanged string when no special characters', () => {
        expect( utils.escapeText( 'Hello world' ) ).toBe( 'Hello world' )
    } )

    it( 'handles empty string', () => {
        expect( utils.escapeText( '' ) ).toBe( '' )
    } )
} )

describe( 'escapeAttribute', () => {
    it( 'escapes & and " characters', () => {
        expect( utils.escapeAttribute( 'Tom & "Jerry"' ) ).toBe( 'Tom &amp; &quot;Jerry&quot;' )
    } )

    it( 'returns unchanged string when no special characters', () => {
        expect( utils.escapeAttribute( 'PlainValue' ) ).toBe( 'PlainValue' )
    } )

    it( 'handles empty string', () => {
        expect( utils.escapeAttribute( '' ) ).toBe( '' )
    } )
} )

describe( 'validateName', () => {
    it( 'allows valid names', () => {
        expect( () => utils.validateName( 'node' ) ).not.toThrow()
        expect( () => utils.validateName( 'attribute123' ) ).not.toThrow()
    } )

    it( 'throws if name is empty or whitespace', () => {
        expect( () => utils.validateName( '' ) ).toThrow( /non-empty string/ )
        expect( () => utils.validateName( '   ' ) ).toThrow( /non-empty string/ )
    } )

    it( 'throws if name contains invalid characters', () => {
        const invalidNames = ['<tag>', 'a b', '"attr"', 'quote\'s', '&name']
        for ( const name of invalidNames ) {
            expect( () => utils.validateName( name ) ).toThrow( /Invalid/ )
        }
    } )

    it( 'uses custom context in error message', () => {
        try {
            utils.validateName( '', 'Attribute' )
        } catch ( e ) {
            expect( e.message ).toMatch( /Attribute name must be a non-empty string/ )
        }
    } )
} )
