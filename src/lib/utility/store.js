import { writable } from 'svelte/store'

export const readMeContent = writable('')

export const isInit = writable(true)

export const repoOwner = writable('PyTorch')
export const repoName = writable('PyTorch')
export const perPage = writable(10)
export const numContributions = writable(5)

export const showReadme = writable(false)
export const showHelp = writable(true)
export const showOptions = writable(false)
export const showNavigation = writable(false)
