import { equal } from "node:assert/strict"
import { readFileSync } from "node:fs"
import process from "node:process"
import { describe, it } from "node:test"

import { htmlBemlinter, htmlBemlinterResult } from "../src/index.js"


describe("gulp-html-bemlinter", () => {
	it("Should be no errors with correct bem html.", () => {
		let html = readFileSync(new URL("./fixtures/valid.html", import.meta.url))
		let { warningCount } = htmlBemlinter({ content: html.toString() })

		equal(warningCount, 0)
	})

	it("Should be one error in bem: element not inside its block.", () => {
		let html = readFileSync(new URL("./fixtures/error-in-element-without-block.html", import.meta.url))
		let { warningCount } = htmlBemlinter({ content: html.toString() })

		equal(warningCount, 1)
	})

	it("Should be two errors in bem: modifiers without modifiable entity.", () => {
		let html = readFileSync(new URL("./fixtures/error-in-modifiers.html", import.meta.url))
		let { warningCount } = htmlBemlinter({ content: html.toString() })

		equal(warningCount, 2)
	})

	it("Should be one error in bem: element of element.", () => {
		let html = readFileSync(new URL("./fixtures/error-in-element-of-element.html", import.meta.url))
		let { warningCount } = htmlBemlinter({ content: html.toString() })

		equal(warningCount, 1)
	})

	it("Should be one error in bem: invalid html should be ignored.", () => {
		let html = readFileSync(new URL("./fixtures/error-in-markup.html", import.meta.url))
		let { warningCount } = htmlBemlinter({ content: html.toString() })

		equal(warningCount, 1)
	})

	it("Error output example.", () => {
		let html = readFileSync(new URL("./fixtures/error-in-element-of-element.html", import.meta.url))

		htmlBemlinterResult({ name: "error-in-element-of-element.html", content: html.toString() })

		process.exitCode = process.exitCode === 1 ? 0 : 1
	})

	it("Successful output example.", () => {
		let html = readFileSync(new URL("./fixtures/valid.html", import.meta.url))

		htmlBemlinterResult({ name: "valid.html", content: html.toString() })
	})
})
