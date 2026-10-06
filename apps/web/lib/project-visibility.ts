// Withdrawn from Crafter's public catalog and activity surfaces.
const withdrawnRepositories = new Set(["cuevaio/normal", "cuevaio/normal-poc"])

export function isListedRepository(fullName: string) {
  return !withdrawnRepositories.has(fullName.toLowerCase())
}
