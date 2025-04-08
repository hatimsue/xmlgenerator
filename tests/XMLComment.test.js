// __tests__/XMLComment.test.js
import XMLComment from '../src/XMLComment'

describe( 'XMLComment', () => {

    test( 'should create an instance with content', () => {
        const comment = new XMLComment( 'Hello' )
        expect( comment.content ).toBe( 'Hello' )
    } )

    test( 'toXML should return single-line comment', () => {
        const comment = new XMLComment( 'Hello World' )
        expect( comment.toXML() ).toBe( '<!-- Hello World -->' )
    } )

    test( 'toPrettyXML should return formatted comment with default indent', () => {
        const comment = new XMLComment( 'Line 1\nLine 2' )
        const expected = '<!--\nLine 1\nLine 2\n-->'
        expect( comment.toPrettyXML() ).toBe( expected )
    } )

    test( 'toPrettyXML should return formatted comment with indent = 1', () => {
        const comment = new XMLComment( 'Line A\nLine B' )
        const expected = '  <!--\n  Line A\n  Line B\n  -->'
        expect( comment.toPrettyXML( 1 ) ).toBe( expected )
    } )

    test( 'toPrettyXML should handle empty content', () => {
        const comment = new XMLComment( '' )
        const expected = '<!--  -->'
        expect( comment.toPrettyXML() ).toBe( expected )
    } )

    test( 'throws error if comment contains "--"', () => {
        expect( () => new XMLComment( 'Invalid -- comment' ) ).toThrow( /cannot contain '--'/ )
    } )

    test( 'throws error if comment ends with -', () => {
        expect( () => new XMLComment( 'Invalid -' ) ).toThrow( /cannot end with a single '-'/ )
    } )

} )
