# JS 语法
## export
```javascript
// ES5 syntax
module.exports = xxx
const xxx = require('relative-path/xxx.js')

// ES6 syntax
export default xxx
import xxx from 'relative-path/xxx' // postfix can be omitted
```

## Array
splice(index, howmany, [item1, ..., itemX])

```javascript
var list = ["A", "B", "C", "D", "E"];
var res = list.splice(2, 1, "X", "Y");  // A,B,X,Y,D,E
```
**slice(start, end)**
```javascript
var list = ["A", "B", "C", "D", "E"];
var res = list.slice(1, 3);  // B, C
```
## JSON
- JSON.stringfy(object) -> string
- JSON.parse(string) -> object
***