export { getRepoHref, RepoLink }

import React from 'react'

function RepoLink({ path, text }: { path: string; text?: string | React.ReactNode }) {
  text = text || path
  const href = getRepoHref(path)
  return <a href={href}>{text}</a>
}

function getRepoHref(path: string, editMode = false, repoBase = 'https://github.com/vikejs/vike') {
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  const viewMode = path.endsWith('/') && !editMode ? 'tree' : 'blob'
  let href = `${repoBase}/${viewMode}/main${path}`
  if (editMode) href += '?plain=1'
  return href
}
