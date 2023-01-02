import fs from 'node:fs/promises'
import path from 'node:path'

import dotenv from 'dotenv-safe'
import { globby } from 'globby'
import { Octokit } from 'octokit'
import pMap from 'p-map'
import rmfr from 'rmfr'
import { simpleGit } from 'simple-git'
import { temporaryDirectory } from 'tempy'

import { getAllPublicRepos } from './github'

dotenv.config()

async function main() {
  const newYear = new Date().getFullYear()
  const oldYear = newYear - 1

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
  })

  const repos = (await getAllPublicRepos(octokit)).filter((repo) => !repo.fork)
  console.log(
    `processing ${repos.length} repos`,
    repos.map((repo) => repo.full_name)
  )

  let numUpdates = 0

  await pMap(
    repos,
    async (repo) => {
      const repoName = repo.full_name
      const baseDir = temporaryDirectory()
      // console.log(repoName, baseDir)

      try {
        const git = simpleGit({ baseDir })
        await git.clone(repo.git_url, baseDir, ['--depth=1'])

        const licenseFiles = await globby(['license', 'license.md'], {
          cwd: baseDir,
          caseSensitiveMatch: false
        })
        if (licenseFiles.length > 1) {
          console.warn(
            'warning: multiple license files found for repo',
            repoName,
            licenseFiles
          )
        } else if (licenseFiles.length === 1) {
          const licenseFile = path.join(baseDir, licenseFiles[0])
          let license = await fs.readFile(licenseFile, 'utf-8')
          license = license.replaceAll(
            new RegExp(`\\b${oldYear}\\b`, 'gi'),
            `${newYear}`
          )
          await fs.writeFile(licenseFile, license, 'utf-8')
        }

        const readmeFiles = await globby(['readme', 'readme.md'], {
          cwd: baseDir,
          caseSensitiveMatch: false
        })
        if (readmeFiles.length > 1) {
          console.warn(
            'warning: multiple readme files found for repo',
            repoName,
            readmeFiles
          )
        } else if (readmeFiles.length === 1) {
          const readmeFile = path.join(baseDir, readmeFiles[0])
          let readme = await fs.readFile(readmeFile, 'utf-8')
          readme = readme.replaceAll(
            new RegExp(`\\b(copyright *)${oldYear}\\b`, 'gi'),
            `$1${newYear}`
          )
          readme = readme.replaceAll(
            new RegExp(`\\b(copyright *\(c\) *)${oldYear}\\b`, 'gi'),
            `$1${newYear}`
          )
          await fs.writeFile(readmeFile, readme, 'utf-8')
        }

        const status = await git.status()
        if (!status.isClean()) {
          await git.commit(`chore: update year to ${newYear}`, ['-a'])
          await git.push()
          console.log(repoName, 'updated')
          ++numUpdates
        } else {
          console.log(repoName, 'clean')
        }
      } catch (err) {
        console.error('error processing', repoName, err)
      } finally {
        await rmfr(baseDir)
      }
    },
    {
      concurrency: 16
    }
  )

  console.log(`processed ${repos.length} repos; updated ${numUpdates}`)
}

main()
