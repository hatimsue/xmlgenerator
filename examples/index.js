import XMLComment from '../src/XMLComment.js'
import XMLElement from '../src/XMLElement.js'
import XMLGenerator from '../src/XMLGenerator.js'

const builder = new XMLGenerator()
const _ = builder._

const block = ( data ) => {
    return (
        _.div(
            _.div.class( 'xxx' )(
                _.span( data.name )
            ),
            _.div.class( 'yyy' )(
                _.span( data.description )
            )

        )
    )
}
const data = [
    { name: 'Title 1', description: 'Description 1' },
    { name: 'Title 2', description: 'Description 2' },
    { name: 'Title 3', description: 'Description 3' }
]

const el =
    _.section.xmlns( 'https://www.w3.org/2000/svg' ).xmlns.ns( 'https://xxx.sss.sss' ).class( 'content-wrapper' ).id( 'intro-section' )(
        _.ns.h1.class( 'title' ).lang( 'en' )( 'Welcome' ),
        _.p.class( 'description' ).style( 'font-size: 14px' )(
            'This is a ',
            _.strong.style( 'font-weight: bold' )( 'simple' ),
            ' example of mixed content.'
        ),
        _.ul.class( 'features' )(
            _.comment( 'this is a test' ),
            _.li( 'Clean syntax' ),
            _.li( 'Composable elements' ),
            _.li( 'Mixed content support' )
        ),
        _.subsection( ...data.map( val => block( val ) ) )
    )

console.log( el.toPrettyXML() )


const comment = new XMLComment( 'comment' )
const child = new XMLElement( { name: 'child' } ).addChild( 'hello' )
const root = new XMLElement( { name: 'root' } ).addChildren( 'text', comment, child )



console.log( root.toPrettyXML() )

