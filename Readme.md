# pipe-graph

Generate [graphs](https://github.com/timoxley/graphs) of your streams.

## Example

```js
var a = through()
var b = through()
var c = through()

a.pipe(b)
a.pipe(c)

var graph = PipeGraph()

// adding a single stream to the graph will populate the graph
// from the current stream and below.
graph.add(a)

graph.has(a)         // => true
graph.has(b)         // => true
graph.has(c)         // => true
graph.from(a).has(b) // => true
graph.from(a).has(c) // => true
graph.from(a).size   // => 2
graph.from(b).size   // => 0
graph.from(c).size   // => 0
```

## License

MIT
