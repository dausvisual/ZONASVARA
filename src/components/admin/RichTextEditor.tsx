"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, 
  Quote, Undo, Redo, Link as LinkIcon, Image as ImageIcon, Heading2
} from 'lucide-react';
import { useState } from 'react';

interface RichTextEditorProps {
  name: string;
  initialContent?: string;
}

export default function RichTextEditor({ name, initialContent = '' }: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Disable StarterKit's link so we can use our own Link extension
        // StarterKit does NOT include link by default — this fixes the duplicate warning
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });


  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL Gambar:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL Tautan:', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border border-input rounded-md overflow-hidden bg-background">
      {/* Hidden input to pass data to server action */}
      <input type="hidden" name={name} value={content} />
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2 bg-slate-50 dark:bg-slate-900/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('strike') ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1"></div>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1"></div>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('blockquote') ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1"></div>
        
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${editor.isActive('link') ? 'bg-slate-200 dark:bg-slate-800 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
          title="Tautan"
        >
          <LinkIcon size={16} />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          title="Gambar"
        >
          <ImageIcon size={16} />
        </button>
        
        <div className="flex-grow"></div>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 disabled:opacity-50"
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 disabled:opacity-50"
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>
      
      {/* Editor Area */}
      <div className="bg-white dark:bg-slate-950 max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
