import React from 'react'
import flexibleStringReplace from '../source'

test('flexibleStringReplace is defined', () => {
  expect(flexibleStringReplace).toBeDefined()
})

test('string pattern & string replacer for first match', () => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = 'Spain'
  const replacer = 'foo bar baz'
  const res = flexibleStringReplace(pattern, replacer, str)

  expect(res).toEqual([
    'The rain in ',
    'foo bar baz',
    ' falls mainly on the plain. Spain is nice.'
  ])
})

test('string pattern & html interpolation for first match', () => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = 'Spain'
  const replacer = (match: string): string => `<mark>${match}</mark>`
  const res = flexibleStringReplace(pattern, replacer, str)

  expect(res).toEqual([
    'The rain in ',
    '<mark>Spain</mark>',
    ' falls mainly on the plain. Spain is nice.'
  ])
})

test('regexp pattern & html string interpolation function with matches', () => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = new RegExp('Spain', 'igm')
  const replacer = (match: string): string => `<mark>${match}</mark>`
  const res = flexibleStringReplace(pattern, replacer, str)

  expect(res).toEqual([
    'The rain in ',
    '<mark>Spain</mark>',
    ' falls mainly on the plain. ',
    '<mark>Spain</mark>',
    ' is nice.'
  ])
})

test('forwards matching group parts in replacer params', () => {
  const str = 'Dear @diary, I hope this test #passes #pray'
  const pattern = /\s(@\w+)|\s(#\w+)/gm
  const ats: string[] = []
  const tags: string[] = []
  const replacer = (match: string, at: string, tag: string): void => {
    if (at) {
      ats.push(at)
    }
    if (tag) {
      tags.push(tag)
    }
  }
  flexibleStringReplace(pattern, replacer, str)

  expect(ats).toEqual(['@diary'])
  expect(tags).toEqual(['#passes', '#pray'])
})

test('regexp pattern & react interpolation function', () => {
  const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
  const pattern = new RegExp('Spain', 'igm')
  const replacer = (match: string, offset: string): JSX.Element => (
    <mark key={offset}>{match}</mark>
  )
  const res = flexibleStringReplace(pattern, replacer, str)

  expect(res).toEqual([
    'The rain in ',
    <mark key={12}>Spain</mark>,
    ' falls mainly on the plain. ',
    <mark key={45}>Spain</mark>,
    ' is nice.'
  ])
})
