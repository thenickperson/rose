import { search } from '../server/engine'
import features from './features'

describe('engine', () => {
  describe('.search()', () => {
    const gitAddFeature = [{
      name: 'add files',
      examples: [
        { technology: 'Git', snippet: 'git add' },
        { technology: 'Mercurial', snippet: 'hg add' },
        { technology: 'Subversion', snippet: 'svn add' }
      ]
    }]

    describe('with an empty query', () => {
      it('finds all features', () => {
        return expect(search(features, '')).toHaveLength(7)
      })
    })

    describe('with a feature query', () => {
      it('finds all matching features', () => {
        return expect(search(features, 'add files')).toEqual(gitAddFeature)
      })
    })

    describe('with a technology query', () => {
      it('finds all matching features', () => {
        return expect(search(features, 'git')).toHaveLength(6)
      })
    })

    describe('with a command query', () => {
      it('finds all matching features', () => {
        return expect(search(features, 'git ADD')).toEqual(gitAddFeature)
      })
    })

    describe('with a command query for a command that does not exist', () => {
      it('finds no features', () => {
        return expect(search(features, 'git yolo')).toHaveLength(0)
      })
    })
  })
})
