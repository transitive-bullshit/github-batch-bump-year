# GitHub Batch Bump Year <!-- omit in toc -->

> TODO

[![Build Status](https://github.com/transitive-bullshit/github-batch-bump-year/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/github-batch-bump-year/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/transitive-bullshit/github-batch-bump-year/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

- [Intro](#intro)
- [Usage](#usage)
- [License](#license)

## Intro

This repo contains a script for batch-updating the current year in license and readme files across all of your public GitHub repos.

## Usage

_Requires Node.js 16 or later._

_You'll need a `GITHUB_ACCESS_TOKEN` environment variable._

```bash
pnpm install
npx tsx src/bin.ts
```

The script is idempotent, so if you run it again and it doesn't find any files that should be updated, then no commits will be pushed.

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my open source work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
