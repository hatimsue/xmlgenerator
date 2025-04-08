## Classes

<dl>
<dt><a href="#XMLComment">XMLComment</a></dt>
<dd><p>Represents an xml comment</p>
</dd>
<dt><a href="#XMLElement">XMLElement</a></dt>
<dd><p>Represents an XMLelement</p>
</dd>
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

## Typedefs

<dl>
<dt><a href="#XMLChild">XMLChild</a> : <code>string</code> | <code><a href="#XMLComment">XMLComment</a></code> | <code><a href="#XMLElement">XMLElement</a></code></dt>
<dd><p>A child node of an XML element: text, a comment, or a nested element.</p>
</dd>
<dt><a href="#XMLElementOptions">XMLElementOptions</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="XMLComment"></a>

## XMLComment
Represents an xml comment

**Kind**: global class  

* [XMLComment](#XMLComment)
    * [new XMLComment(content)](#new_XMLComment_new)
    * [.toXML()](#XMLComment+toXML) ⇒ <code>string</code>
    * [.toPrettyXML(indent)](#XMLComment+toPrettyXML) ⇒ <code>string</code>

<a name="new_XMLComment_new"></a>

### new XMLComment(content)
constructor.


| Param | Type |
| --- | --- |
| content | <code>string</code> | 

<a name="XMLComment+toXML"></a>

### xmlComment.toXML() ⇒ <code>string</code>
Returns a one-line XML comment string.

**Kind**: instance method of [<code>XMLComment</code>](#XMLComment)  
**Returns**: <code>string</code> - A single-line XML comment.  
<a name="XMLComment+toPrettyXML"></a>

### xmlComment.toPrettyXML(indent) ⇒ <code>string</code>
Returns a formatted (indented and multiline) XML comment string.

**Kind**: instance method of [<code>XMLComment</code>](#XMLComment)  
**Returns**: <code>string</code> - A pretty-printed XML comment string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| indent | <code>number</code> | <code>0</code> | The indentation level (number of tab levels). |

<a name="XMLElement"></a>

## XMLElement
Represents an XMLelement

**Kind**: global class  

* [XMLElement](#XMLElement)
    * [new XMLElement(options)](#new_XMLElement_new)
    * [.setAttr(key, value)](#XMLElement+setAttr) ⇒ <code>this</code>
    * [.addChild(child)](#XMLElement+addChild) ⇒ <code>this</code>
    * [.addChildren(...children)](#XMLElement+addChildren) ⇒ <code>this</code>
    * [.toXML()](#XMLElement+toXML) ⇒ <code>string</code>
    * [.toPrettyXML(indent)](#XMLElement+toPrettyXML) ⇒ <code>string</code>

<a name="new_XMLElement_new"></a>

### new XMLElement(options)

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>XMLElementOptions</code>](#XMLElementOptions) | xml element options |

<a name="XMLElement+setAttr"></a>

### xmlElement.setAttr(key, value) ⇒ <code>this</code>
Add an attribute to the xml element

**Kind**: instance method of [<code>XMLElement</code>](#XMLElement)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | attribute name |
| value | <code>string</code> | attribute value |

<a name="XMLElement+addChild"></a>

### xmlElement.addChild(child) ⇒ <code>this</code>
add an xml child element to the xml element.

**Kind**: instance method of [<code>XMLElement</code>](#XMLElement)  

| Param | Type |
| --- | --- |
| child | [<code>XMLChild</code>](#XMLChild) | 

<a name="XMLElement+addChildren"></a>

### xmlElement.addChildren(...children) ⇒ <code>this</code>
add one or more xml children to the xml element.

**Kind**: instance method of [<code>XMLElement</code>](#XMLElement)  

| Param | Type |
| --- | --- |
| ...children | [<code>Array.&lt;XMLChild&gt;</code>](#XMLChild) | 

<a name="XMLElement+toXML"></a>

### xmlElement.toXML() ⇒ <code>string</code>
Serializes this XML element and its children into an XML string.
The resulting string does not include line breaks or indentation.

**Kind**: instance method of [<code>XMLElement</code>](#XMLElement)  
**Returns**: <code>string</code> - xmlString - A compact XML string representation of the element.  
<a name="XMLElement+toPrettyXML"></a>

### xmlElement.toPrettyXML(indent) ⇒ <code>string</code>
Serializes this XML element and its children into a formatted, human-readable XML string.

**Kind**: instance method of [<code>XMLElement</code>](#XMLElement)  
**Returns**: <code>string</code> - prettyXML - A formatted XML string with indentation and line breaks.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| indent | <code>number</code> | <code>0</code> | The current indentation level. Used internally for recursive formatting. |

<a name="XMLGenerator"></a>

## XMLGenerator
**Kind**: global class  

* [XMLGenerator](#XMLGenerator)
    * [new XMLGenerator()](#new_XMLGenerator_new)
    * [.createElement(name)](#XMLGenerator+createElement) ⇒ <code>Proxy</code>
    * [.createComment(content)](#XMLGenerator+createComment) ⇒ [<code>XMLComment</code>](#XMLComment)

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

### xmlGenerator.createComment(content) ⇒ [<code>XMLComment</code>](#XMLComment)
Creates a new XML comment node.

**Kind**: instance method of [<code>XMLGenerator</code>](#XMLGenerator)  
**Returns**: [<code>XMLComment</code>](#XMLComment) - - A new comment node.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The text content of the comment. |

<a name="toXMLGetter"></a>

## toXMLGetter(element) ⇒ <code>function</code>
Returns a function that serializes the element to a compact XML string.

**Kind**: global function  
**Returns**: <code>function</code> - - A function that returns the XML string.  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>XMLElement</code>](#XMLElement) | The XML element to serialize. |

<a name="toPrettyXMLGetter"></a>

## toPrettyXMLGetter(element) ⇒ <code>function</code>
Returns a function that serializes the element to a pretty-formatted XML string.

**Kind**: global function  
**Returns**: <code>function</code> - - A function that returns the formatted XML string.  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>XMLElement</code>](#XMLElement) | The XML element to serialize. |

<a name="xmlnsGetter"></a>

## xmlnsGetter(element, generator, proxy) ⇒ <code>Proxy</code>
Returns a proxy that handles namespace declarations.

**Kind**: global function  
**Returns**: <code>Proxy</code> - - A proxy for handling namespace declarations.  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>XMLElement</code>](#XMLElement) | The element to apply namespace attributes to. |
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

<a name="XMLChild"></a>

## XMLChild : <code>string</code> \| [<code>XMLComment</code>](#XMLComment) \| [<code>XMLElement</code>](#XMLElement)
A child node of an XML element: text, a comment, or a nested element.

**Kind**: global typedef  
<a name="XMLElementOptions"></a>

## XMLElementOptions : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Tag name for the element |
| [children] | [<code>Array.&lt;XMLChild&gt;</code>](#XMLChild) | Children of the element |
| [attributes] | <code>Object.&lt;string, string&gt;</code> | Optional attributes for the element |

