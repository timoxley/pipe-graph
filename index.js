"use strict"

var Graph = require('graphs')

module.exports = PipeGraph

function PipeGraph() {
  var graph = new Graph()
  graph.after('add', function findPipes(src) {
    getPiped(src).forEach(function(dst) {
      if (graph.from(src).has(dst)) return
      graph.link(src, dst)
    })
  })
  return graph
}

PipeGraph.getPiped = getPiped
PipeGraph.isPiped = isPiped

function getPiped(stream) {
  var pipes = []
  if (!stream._readableState || !stream._readableState.pipes) return [] // no pipes
  if (!stream._readableState.pipes.forEach) {
    // if only 1 pipe, pipes is an object
    return [stream._readableState.pipes]
  }

  return stream._readableState.pipes.slice()
}

function isPiped(a, b) {
  return getPiped(a).indexOf(b) !== -1
}
