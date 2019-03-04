import test from 'ava'
import React from 'react'

import entry from '../'
import flexibleStringReplace from '../src'

test('entry exports', t => {
  t.not(entry, undefined)
})

test('flexibleStringReplace is defined', t => {
  t.not(flexibleStringReplace, undefined)
})

test('string pattern & string replacement for first match', t => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = 'Spain'
  const replacement = 'foo bar baz'
  const res = flexibleStringReplace(pattern, replacement, str)

  t.deepEqual(res, [
    'The rain in ',
    'foo bar baz',
    ' falls mainly on the plain. Spain is nice.'
  ])
})

test('string pattern & html interpolation for first match', t => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = 'Spain'
  const replacement = match => `<mark>${match}</mark>`
  const res = flexibleStringReplace(pattern, replacement, str)

  t.deepEqual(res, [
    'The rain in ',
    '<mark>Spain</mark>',
    ' falls mainly on the plain. Spain is nice.'
  ])
})

test('regexp pattern & html string interpolation function with matches', t => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = new RegExp('Spain', 'igm')
  const replacement = match => `<mark>${match}</mark>`
  const res = flexibleStringReplace(pattern, replacement, str)

  t.deepEqual(res, [
    'The rain in ',
    '<mark>Spain</mark>',
    ' falls mainly on the plain. ',
    '<mark>Spain</mark>',
    ' is nice.'
  ])
})

test('forwards matching group parts in Replacement params', t => {
  const str = 'Dear @diary, I hope this test #passes #pray'
  const pattern = /\s(@\w+)|\s(#\w+)/gm
  const ats = []
  const tags = []
  const replacement = (_, at, tag) => {
    if (at) { ats.push(at) }
    if (tag) { tags.push(tag) }
  }
  flexibleStringReplace(pattern, replacement, str)

  t.deepEqual({ ats, tags }, {
    ats: [ '@diary' ],
    tags: [ '#passes', '#pray' ]
  })
})

test('regexp pattern & react interpolation function', t => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = new RegExp('Spain', 'igm')
  const replacement = (match, offset) => <mark key={offset}>{match}</mark>
  const res = flexibleStringReplace(pattern, replacement, str)

  t.deepEqual(res, [
    'The rain in ',
    <mark key={12}>Spain</mark>,
    ' falls mainly on the plain. ',
    <mark key={45}>Spain</mark>,
    ' is nice.'
  ])
})
