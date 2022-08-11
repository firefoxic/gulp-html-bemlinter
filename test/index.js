import { htmlBemlinter, htmlBemlinterResult } from '../src/index.js'
import assert from 'assert'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('gulp-html-bemlinter', () => {
	describe('should work in buffer mode', () => {
		it('should not be errors because a valid bem html is passed', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/valid.html'))
			const { countBemWarning } = htmlBemlinter({ content: html.toString() })

			assert.equal(countBemWarning, 0)
		})

		it('should be one error bem', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/no-valid-error-1.html'))
			const { countBemWarning } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(countBemWarning, 1)
		})

		it('should be one error bem(prefix)', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/prefix-error.html'))
			const { countBemWarning } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(countBemWarning, 1)
		})

		it('should be one error element-within-an-element', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/element-within-an-element.html'))
			const { countBemWarning } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(countBemWarning, 1)
		})

		it('should not be errors because a valid bem html is passed', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/page__elements.html'))
			const { countBemWarning } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(countBemWarning, 0)
		})

		it('output the success result to the console', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/valid.html'))

			htmlBemlinterResult({ name: 'valid.html', content: html.toString() })
		})

		it('output the error result to the console', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/no-valid-error-1.html'))

			htmlBemlinterResult({ name: 'no-valid-error-1.html', content: html.toString() })
		})

		it('output the error result to the console', () => {
			const html = fs.readFileSync(join(__dirname, '/fixtures/element-within-an-element.html'))

			htmlBemlinterResult({ name: 'element-within-an-element.html', content: html.toString() })
		})
	})
})
