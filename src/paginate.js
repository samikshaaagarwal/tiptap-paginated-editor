const PAGE_HEIGHT = 1123
const HEADER_HEIGHT = 60
const FOOTER_HEIGHT = 60
const PAGE_PADDING = 80

const CONTENT_HEIGHT =
  PAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - PAGE_PADDING * 2

export function paginateBlocks(blocks) {
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.visibility = 'hidden'
  container.style.width = '634px'
  container.style.fontFamily = 'serif'
  container.style.fontSize = '16px'
  container.style.lineHeight = '1.6'
  container.style.boxSizing = 'border-box'

  document.body.appendChild(container)

  const pages = []
  let currentPage = []
  let currentHeight = 0

  blocks.forEach(block => {
    const el = document.createElement('div')
    el.innerHTML = block.html

    // 🔥 MATCH EDITOR CSS
    el.style.marginBottom = '12px'
    el.style.lineHeight = '1.6'

    container.appendChild(el)

    const h = el.offsetHeight

    if (currentHeight + h > CONTENT_HEIGHT) {
      pages.push(currentPage)
      currentPage = [block]
      currentHeight = h
    } else {
      currentPage.push(block)
      currentHeight += h
    }

    container.removeChild(el)
  })

  if (currentPage.length) pages.push(currentPage)

  document.body.removeChild(container)
  return pages
}
