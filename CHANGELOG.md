<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] — 2023–11–23

### Changed

- Mixing an element to its own block is now considered an error.

## [2.1.4] — 2023–05–12

### Fixed

- The output in the terminal is no longer clogged with success messages.

## [2.1.3] — 2023–03–20

### Fixed

- File lists to ignore.

## [2.1.2] — 2022–09–22

No significant changes

## [2.1.1] — 2022–08–14

### Fixed

- A bug that was present since v2.0.0 and dropped all BEM linting.

## [2.1.0] — 2022–08–14

### Added

- The result of linting an invalid bem-tree now has an error status.

## [2.0.3] — 2022–08–14

### Fixed

- The versions in this changelog are now links to comparisons with previous versions.

## [2.0.2] — 2022–08–13

### Fixed

- The result styling.

## [2.0.1] — 2022–08–13

### Added

- Badges for tests, license and vulnerability counter.

## [2.0.0] — 2022–08–12

### Changed

- The project has been converted to ESM.

## [1.2.3] — 2022–07–27

### Fixed

- The project name has been updated in all files.

### Updated

- The report styling.

## [1.2.0] — 2022–07–26

### Fixed

- `page` block elements on the `html` tag are no longer treated as “element outside of its block” errors.

## [1.1.0] — 2022–07–26

### Fixed

- The elements of the elements, such as `block__elem1__elem2`, are now also flagged as a bem naming error (thanks to [@SampetovaN](https://github.com/SampetovaN)).

## [1.0.0] — 2022–07–26

### Added

- Basic functionality via a fork of the [gulp-html-bem-validator](https://github.com/dDenysS/gulp-html-bem-validator/) project.

[unreleased]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.1.4...HEAD
[2.1.4]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.1.3...v2.1.4
[2.1.3]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.1.2...v2.1.3
[2.1.2]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.3...v2.1.0
[2.0.3]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.2.3...v2.0.0
[1.2.3]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.2.0...v1.2.3
[1.2.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/firefoxic/gulp-html-bemlinter/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/firefoxic/gulp-html-bemlinter/releases/tag/v1.0.0
