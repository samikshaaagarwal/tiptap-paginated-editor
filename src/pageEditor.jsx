import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function PageEditor({ blocks, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: blocks.map(b => b.html).join(''),
    autofocus: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Keep editor in sync when pagination changes
  useEffect(() => {
    if (!editor) return
    const html = blocks.map(b => b.html).join('')
    if (editor.getHTML() !== html) {
      editor.commands.setContent(html, false)
    }
  }, [blocks, editor])

  if (!editor) return null

  return <EditorContent editor={editor} className="editor-content" />
}
