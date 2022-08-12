import { htmlBemlinter, htmlBemlinterResult } from "../src/index.js"
import assert from "assert"
import fs from "fs"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import { describe, it } from "mocha"

let __filename = fileURLToPath(import.meta.url)
let __dirname = dirname(__filename)

describe("gulp-html-bemlinter", () => {
	describe("should work in buffer mode", () => {
		it("should not be errors because a valid bem html is passed", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/valid.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.equal(warningCount, 0)
		})

		it("should be one error bem", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/no-valid-error-1.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 1)
		})

		it("should be one error bem(prefix)", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/prefix-error.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 1)
		})

		it("should be one error element-within-an-element", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/element-within-an-element.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 1)
		})

		it("should not be errors because a valid bem html is passed", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/page__elements.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 0)
		})

		it("output the success result to the console", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/valid.html"))

			htmlBemlinterResult({ name: "valid.html", content: html.toString() })
		})

		it("output the error result to the console", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/no-valid-error-1.html"))

			htmlBemlinterResult({ name: "no-valid-error-1.html", content: html.toString() })
		})

		it("output the error result to the console", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/element-within-an-element.html"))

			htmlBemlinterResult({ name: "element-within-an-element.html", content: html.toString() })
		})
	})
})
