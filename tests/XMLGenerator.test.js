import XMLComment from '../src/XMLComment.js'
import XMLGenerator from '../src/XMLGenerator.js'

describe( 'XMLGenerator - creación básica', () => {
    let _

    beforeEach( () => {
        _ = ( new XMLGenerator() ).builder
    } )

    test( 'debe crear un elemento con nombre de etiqueta', () => {
        const el = _.foo
        expect( el ).toBeDefined()
        expect( typeof el.$toXML ).toBe( 'function' )
    } )

    test( 'debe permitir añadir atributos a un elemento', () => {
        const el = _.foo().id( '123' ).class( 'test' )
        const xmlString = el.$toXML()
        expect( xmlString ).toContain( 'id="123"' )
        expect( xmlString ).toContain( 'class="test"' )
    } )

    test( 'debe permitir añadir hijos y texto', () => {
        const el = _.foo(
            _.bar( 'hello' ),
            'world'
        )
        const xmlString = el.$toXML()
        expect( xmlString ).toContain( '<bar>hello</bar>' )
        expect( xmlString ).toContain( 'world' )
    } )

    test( 'debe soportar toPrettyXML()', () => {
        const el = _.foo().id( 'x' )
        const pretty = el.$toPrettyXML()
        expect( pretty ).toContain( '<foo id="x"' )
        expect( pretty ).toMatch( /<foo id="x" ?\/?>/ )
    } )
} )

describe( 'XMLGenerator - comentarios', () => {
    let _

    beforeEach( () => {
        _ = ( new XMLGenerator() ).builder
    } )

    test( 'debe crear un nodo de comentario', () => {
        const comment = _.$comment( 'hello' )
        expect( comment ).toBeInstanceOf( XMLComment )
        expect( comment.content ).toBe( 'hello' )
    } )
} )

describe( 'XMLGenerator - namespaces', () => {
    let _

    beforeEach( () => {
        _ = ( new XMLGenerator() ).builder
    } )

    test( 'debe soportar declaración xmlns', () => {
        const el = _.foo().$xmlns( 'http://default.namespace' )
        const str = el.$toXML()
        expect( str ).toContain( 'xmlns="http://default.namespace"' )
    } )

    test( 'debe soportar declaración xmlns con prefijo', () => {
        const el = _.foo().$xmlns.bar( 'http://bar.namespace' )
        const str = el.$toXML()
        expect( str ).toContain( 'xmlns:bar="http://bar.namespace"' )
    } )

    test( 'debe permitir elementos con prefijos después de declarar xmlns', () => {
        _.foo().$xmlns.bar( 'http://bar.namespace' )
        const el = _.bar.baz( 'test' )
        const xmlStr = el.$toXML()
        expect( xmlStr ).toContain( '<bar:baz>test</bar:baz>' )
    } )
} )

describe( 'XMLGenerator - estructuras complejas', () => {
    let _

    beforeEach( () => {
        _ = ( new XMLGenerator() ).builder
    } )

    test( 'debe generar estructura XML anidada con namespaces, atributos y contenido mixto', () => {
        const data = ['one', 'two', 'three']
        const block = val => _.div.class( 'block' )( val )

        const el = _.section
            .$xmlns( 'https://www.w3.org/2000/svg' )
            .$xmlns.ns( 'https://xxx.sss.sss' )
            .class( 'content-wrapper' )
            .id( 'intro-section' )(
                _.ns.h1.class( 'title' ).lang( 'en' )( 'Welcome' ),
                _.p.class( 'description' ).style( 'font-size: 14px' )(
                    'This is a ',
                    _.strong.style( 'font-weight: bold' )( 'simple' ),
                    ' example of mixed content.'
                ),
                _.ul.class( 'features' )(
                    _.$comment( 'this is a test' ),
                    _.li( 'Clean syntax' ),
                    _.li( 'Composable elements' ),
                    _.li( 'Mixed content support' )
                ),
                _.subsection( ...data.map( val => block( val ) ) )
            )

        const xml = el.$toXML()

        expect( xml ).toContain( 'xmlns="https://www.w3.org/2000/svg"' )
        expect( xml ).toContain( 'xmlns:ns="https://xxx.sss.sss"' )
        expect( xml ).toContain( '<ns:h1 class="title" lang="en">Welcome</ns:h1>' )
        expect( xml ).toContain( '<p class="description" style="font-size: 14px">' )
        expect( xml ).toContain( '<strong style="font-weight: bold">simple</strong>' )
        expect( xml ).toContain( '<!-- this is a test -->' )
        expect( xml ).toContain( '<li>Clean syntax</li>' )
        expect( xml ).toContain( '<subsection>' )
        expect( xml ).toContain( '<div class="block">one</div>' )
        expect( xml ).toContain( '<div class="block">two</div>' )
        expect( xml ).toContain( '<div class="block">three</div>' )
    } )
} )


describe( 'XMLGenerator - CDATA', () => {
    let _
    beforeEach( () => {
        _ = new XMLGenerator().builder
    } )

    test( 'should insert CDATA inside an element', () => {
        const root = _.root(
            _.$cdata( 'some <encoded> content' )
        )
        const result = root.$element.toXML()
        expect( result ).toContain( '<root>' )
        expect( result ).toContain( '<![CDATA[some <encoded> content]]>' )
        expect( result ).toContain( '</root>' )
    } )
} )

