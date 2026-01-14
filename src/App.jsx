import { useState, useMemo } from 'react'
import PageEditor from './pageEditor'
import { paginateBlocks } from './paginate'

let blockId = 1

const initialBlocks = [
  { id: blockId++, html: '<p>Start typing your legal document...</p>' },
]

export default function App() {
  const [blocks, setBlocks] = useState(initialBlocks)

  // ✅ DERIVED STATE — NO setState, NO effect
  const pages = useMemo(() => {
    return paginateBlocks(blocks)
  }, [blocks])

  const handlePageChange = (pageIndex, html) => {
  // 1. Split updated page into blocks
    const updatedPageBlocks = html
      .split(/<\/p>/)
      .filter(Boolean)
      .map(p => ({
        id: Date.now() + Math.random(),
        html: p.endsWith('</p>') ? p : p + '</p>',
      }))

    // 2. Build new document by replacing ONLY this page
    const newBlocks = []
    pages.forEach((pageBlocks, i) => {
      if (i === pageIndex) {
        newBlocks.push(...updatedPageBlocks)
      } else {
        newBlocks.push(...pageBlocks)
      }
  })

  setBlocks(newBlocks)
  }



  return (
    <div className="editor-wrapper">
      {pages.map((pageBlocks, i) => (
        <div className="page" key={i}>
          <div className="page-header" />

          <div className="page-body">
            <PageEditor
              blocks={pageBlocks}
              onChange={html => handlePageChange(i, html)}
            />
          </div>

          <div className="page-footer">Page {i + 1}</div>
        </div>
      ))}
    </div>
  )
}
