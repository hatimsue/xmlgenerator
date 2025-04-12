## ✅ TODO: Class Documentation

### README.md

| File                 | Documented |
|----------------------|------------|
| `XMLBase.js`         | ⬜ No       |
| `XMLCData.js`        | ⬜ No       |
| `XMLComment.js`      | ⬜ No       |
| `XMLElement.js`      | ⬜ No       |
| `XMLGenerator.js`    | ✅ No       |

### XMLGenerator

| Task                                                                     | Status | Notes                                                             |
|--------------------------------------------------------------------------|--------|-------------------------------------------------------------------|
| Review behavior in `toPrettyXML()` when an element has only one child    | ⬜     | Should render on the same line instead of multiline               |

### XMLElement

| Task                                                                                 | Status  | Notes                                                                 |
|--------------------------------------------------------------------------------------|---------|-----------------------------------------------------------------------|
| Add method to insert raw strings content without escaping characters like `<` or `>` | ⬜      | Useful for advanced use cases, bypasses automatic escaping            |
| Evaluate support for non-string content (e.g. numbers)                               | ⬜      | Currently only strings are allowed as text content                    |
| Validate tag names using `name` and `qname` rules from external validation package   | ⬜      | Ensure conformance to XML naming standards                           |
| Improve error messages when invalid children or attributes are added                 | ⬜      | Better DX (developer experience)                                      |

### DEBUG

| Task                                                                 | Status  | Notes                                                                 |
|----------------------------------------------------------------------|---------|-----------------------------------------------------------------------|
| Improve error logs to better identify root causes during debugging   | ⬜      | Include context like tag name, method, or invalid input              |
