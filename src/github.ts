import type { Octokit } from 'octokit'

export async function getAllPublicRepos(
  octokit: Octokit,
  opts: { pageSize?: number } = { pageSize: 100 }
) {
  const user = await octokit.request('GET /user', {})
  const repos = await octokit.paginate(octokit.rest.repos.listForUser, {
    username: user.data.login,
    per_page: opts.pageSize
  })

  return repos
}
