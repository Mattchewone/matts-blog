'use client'

import { useEffect, useId, useMemo } from 'react'

type Props = {
  id: string
  file?: string | null
}

function buildGistScriptSrc(id: string, file?: string | null) {
  const base = `https://gist.github.com/${id}.js`
  return file ? `${base}?file=${encodeURIComponent(file)}` : base
}

export default function GistEmbed({ id, file }: Props) {
  const reactId = useId()
  const containerId = useMemo(() => `gist-${id}-${reactId}`, [id, reactId])

  useEffect(() => {
    const el = document.getElementById(containerId)
    if (!el) return

    el.innerHTML = ''
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = buildGistScriptSrc(id, file)
    el.appendChild(script)

    // Basic restyle so gist embeds don’t clash in dark mode.
    // Gist markup uses inline styles; we override the common ones.
    const style = document.createElement('style')
    style.textContent = `
      .gist .gist-file { border: 1px solid rgba(148, 163, 184, 0.35); border-radius: 0.5rem; overflow: hidden; }
      .gist .gist-meta { font-size: 0.875rem; }
      html.dark .gist .gist-file { border-color: rgba(148, 163, 184, 0.2); }
      html.dark .gist .gist-data { background: #0b1220; }
      html.dark .gist .gist-meta { background: #0b1220; color: rgba(226, 232, 240, 0.8); }
      html.dark .gist .pl-c { color: #94a3b8; }
      html.dark .gist .pl-k { color: #f472b6; }
      html.dark .gist .pl-s, html.dark .gist .pl-pds, html.dark .gist .pl-s1 { color: #e2e8f0; }
    `
    document.head.appendChild(style)

    return () => {
      el.innerHTML = ''
      style.remove()
    }
  }, [containerId, id, file])

  return (
    <div className="my-6">
      <div id={containerId} />
    </div>
  )
}

