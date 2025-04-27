## Classes

<dl>
<dt><a href="#XMLGenerator">XMLGenerator</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#toXMLGetter">toXMLGetter(element)</a> ⇒ <code>function</code></dt>
<dd><p>Returns a function that serializes the element to a compact XML string.</p>
</dd>
<dt><a href="#toPrettyXMLGetter">toPrettyXMLGetter(element)</a> ⇒ <code>function</code></dt>
<dd><p>Returns a function that serializes the element to a pretty-formatted XML string.</p>
</dd>
<dt><a href="#xmlnsGetter">xmlnsGetter(element, generator, proxy)</a> ⇒ <code>Proxy</code></dt>
<dd><p>Returns a proxy that handles namespace declarations.</p>
</dd>
<dt><a href="#escapeText">escapeText(text)</a> ⇒ <code>string</code></dt>
<dd><p>Escapes special characters in XML text content.</p>
</dd>
<dt><a href="#escapeAttribute">escapeAttribute(value)</a> ⇒ <code>string</code></dt>
<dd><p>Escapes special characters in XML attribute values.</p>
</dd>
<dt><a href="#validateName">validateName(name, [context])</a></dt>
<dd><p>Validates a tag or attribute name for XML.</p>
</dd>
</dl>

<a name="XMLGenerator"></a>

## XMLGenerator
**Kind**: global class  

* [XMLGenerator](#XMLGenerator)
    * [new XMLGenerator()](#new_XMLGenerator_new)
    * [.createElement(name)](#XMLGenerator+createElement) ⇒ <code>Proxy</code>
    * [.createComment(content)](#XMLGenerator+createComment) ⇒ <code>XMLComment</code>
    * [.createCData(content)](#XMLGenerator+createCData) ⇒ <code>XMLCData</code>

<a name="new_XMLGenerator_new"></a>

### new XMLGenerator()
Initializes the XMLGenerator instance.

<a name="XMLGenerator+createElement"></a>

### xmlGenerator.createElement(name) ⇒ <code>Proxy</code>
Creates a proxied XML element with the given tag name.

**Kind**: instance method of [<code>XMLGenerator</code>](#XMLGenerator)  
**Returns**: <code>Proxy</code> - - A proxied function that acts as both an element builder and container.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The tag name of the XML element to create. |

<a name="XMLGenerator+createComment"></a>

### xmlGenerator.createComment(content) ⇒ <code>XMLComment</code>
Creates a new XML comment node.

**Kind**: instance method of [<code>XMLGenerator</code>](#XMLGenerator)  
**Returns**: <code>XMLComment</code> - - A new comment node.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The text content of the comment. |

<a name="XMLGenerator+createCData"></a>

### xmlGenerator.createCData(content) ⇒ <code>XMLCData</code>
Creates a new CDATA node.

**Kind**: instance method of [<code>XMLGenerator</code>](#XMLGenerator)  
**Returns**: <code>XMLCData</code> - - A new CDATA node.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The text content of the CDATA section. |

<a name="toXMLGetter"></a>

## toXMLGetter(element) ⇒ <code>function</code>
Returns a function that serializes the element to a compact XML string.

**Kind**: global function  
**Returns**: <code>function</code> - - A function that returns the XML string.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>XMLElement</code> | The XML element to serialize. |

<a name="toPrettyXMLGetter"></a>

## toPrettyXMLGetter(element) ⇒ <code>function</code>
Returns a function that serializes the element to a pretty-formatted XML string.

**Kind**: global function  
**Returns**: <code>function</code> - - A function that returns the formatted XML string.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>XMLElement</code> | The XML element to serialize. |

<a name="xmlnsGetter"></a>

## xmlnsGetter(element, generator, proxy) ⇒ <code>Proxy</code>
Returns a proxy that handles namespace declarations.

**Kind**: global function  
**Returns**: <code>Proxy</code> - - A proxy for handling namespace declarations.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>XMLElement</code> | The element to apply namespace attributes to. |
| generator | [<code>XMLGenerator</code>](#XMLGenerator) | The XMLGenerator instance. |
| proxy | <code>function</code> | The proxy representing the XML element. |

<a name="escapeText"></a>

## escapeText(text) ⇒ <code>string</code>
Escapes special characters in XML text content.

**Kind**: global function  
**Returns**: <code>string</code> - The escaped text.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text content to escape. |

<a name="escapeAttribute"></a>

## escapeAttribute(value) ⇒ <code>string</code>
Escapes special characters in XML attribute values.

**Kind**: global function  
**Returns**: <code>string</code> - The escaped attribute value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The attribute value to escape. |

<a name="validateName"></a>

## validateName(name, [context])
Validates a tag or attribute name for XML.

**Kind**: global function  
**Throws**:

- <code>Error</code> If the name is not a non-empty string or contains invalid characters.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name to validate. |
| [context] | <code>string</code> | <code>&quot;Tag&quot;</code> | The context of the name, used in the error message. |

