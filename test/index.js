import { htmlBemlinter, htmlBemlinterResult } from "../src/index.js"
import assert from "assert"
import fs from "fs"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import { describe, it } from "mocha"

let __filename = fileURLToPath(import.meta.url)
let __dirname = dirname(__filename)

describe("gulp-html-bemlinter", () => {
	describe("Should work in buffer mode.", () => {
		it("Should be no errors with correct bem html.", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/valid.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.equal(warningCount, 0)
		})

		it("Should be one error in bem: element not inside its block.", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/error-in-element-without-block.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 1)
		})

		it("Should be two errors in bem: modifiers without modifiable entity.", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/error-in-modifiers.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 2)
		})

		it("Should be one error in bem: element of element.", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/error-in-element-of-element.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 1)
		})

		it("Should be one error in bem: invalid html should be ignored.", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/error-in-markup.html"))
			let { warningCount } = htmlBemlinter({ content: html.toString() })

			assert.strictEqual(warningCount, 1)
		})

		it("Error output example.", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/error-in-element-of-element.html"))

			htmlBemlinterResult({ name: "error-in-element-of-element.html", content: html.toString() })
		})

		it("Successful output example.", () => {
			let html = fs.readFileSync(join(__dirname, "/fixtures/valid.html"))

			htmlBemlinterResult({ name: "valid.html", content: html.toString() })
		})
	})
})
