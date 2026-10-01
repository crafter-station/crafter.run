import type { OssRepo } from "./oss"

export function filterOssRepos<T extends OssRepo>(repos: T[], { query = "", owner = "all", language = "all" }: {
  query?: string; owner?: string; language?: string;
}): T[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return repos.filter((repo) => {
    if (owner !== "all" && repo.repo.split("/")[0] !== owner) return false
    if (language !== "all" && repo.language !== language) return false
    const text = `${repo.repo} ${repo.name} ${repo.description ?? ""} ${repo.language ?? ""}`.toLocaleLowerCase()
    return terms.every((term) => text.includes(term))
  })
}
