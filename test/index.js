var test = require('tape')
var through = require('through2').obj
var PipeGraph = require('../')

test('can produce graph from some streams', function(t) {
  var a = through()
  a.name = 'STREAM-A'
  var b = through()
  b.name = 'STREAM-B'
  var c = through()
  c.name = 'STREAM-C'

  a.pipe(b).pipe(c)

  var graph = PipeGraph()
  graph.add(a)
  verify(t)

  // check the structure is correct
  function verify(t) {
    t.ok(graph.has(a))
    t.ok(graph.has(b))
    t.ok(graph.has(c))
    t.ok(graph.from(a).has(b))
    t.ok(graph.from(b).has(c))
    t.equal(graph.from(a).size, 1)
    t.equal(graph.from(b).size, 1)
    t.equal(graph.from(c).size, 0)
  }

  t.test('re-adding streams does not change graph', function(t) {
    graph.add(a)
    graph.add(b)
    graph.add(c)
    verify(t)
    t.end()
  })

  t.end()
})

test('can produce graph from forky streams', function(t) {
  var a = through()
  a.name = 'STREAM-A'
  var b = through()
  b.name = 'STREAM-B'
  var c = through()
  c.name = 'STREAM-C'

  a.pipe(b)
  a.pipe(c)

  var graph = PipeGraph()
  graph.add(a)

  t.ok(graph.has(a))
  t.ok(graph.has(b))
  t.ok(graph.has(c))
  t.ok(graph.from(a).has(b))
  t.ok(graph.from(a).has(c))
  t.equal(graph.from(a).size, 2)
  t.equal(graph.from(b).size, 0)
  t.equal(graph.from(c).size, 0)
  t.end()
})
