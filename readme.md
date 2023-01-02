# GitHub Batch Bump Year <!-- omit in toc -->

> Batch updates the current year in all license and readme files for your public GitHub repos.

[![Build Status](https://github.com/transitive-bullshit/github-batch-bump-year/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/github-batch-bump-year/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/transitive-bullshit/github-batch-bump-year/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

- [Intro](#intro)
- [Usage](#usage)
- [How it works](#how-it-works)
- [License](#license)

## Intro

This repo contains a script for batch-updating the current year in license and readme files across all of your public GitHub repos.

## Usage

_Requires Node.js 16 or later._

_You'll need a `GITHUB_ACCESS_TOKEN` environment variable._

```bash
git clone git@github.com:transitive-bullshit/github-batch-bump-year.git
cd github-batch-bump-year
pnpm install # (or npm install or yarn install)
npx tsx src/bin.ts
```

## How it works

The script fetches all of your public, non-forked repos and then performs a shallow clone to a temp directory for each one. License and readme file dates are processed with a simple regex, and if any changes are found, then a `chore` commit is made and pushed for that repo ([example commit](https://github.com/transitive-bullshit/chatgpt-api/commit/9ce1b0cf4f131751f7c0417aacef919e71749eda)).

The script is idempotent, so you can run it as many times as you want, and if it doesn't find any files that should be updated, then no commits will be made.

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my open source work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
