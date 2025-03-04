import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/Layout'
import { getCategories, getDocBySlug } from '../../lib/data'
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Trash, 
  Clock, 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  Code, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Image
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function DocumentEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNewDoc = id === 'new'
  const categories = getCategories()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categories[0]?.id || '',
    content: '',
    published: false,
    tags: '',
  })
  
  const [previewMode, setPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    if (!isNewDoc && id) {
      // In a real app, we would fetch the document by ID
      // For now, we'll just use the slug to find a document
      const doc = getDocBySlug(id)
      if (doc) {
        setFormData({
          title: doc.title,
          description: doc.description,
          category: doc.category,
          content: doc.content,
          published: doc.published,
          tags: doc.tags?.join(', ') || '',
        })
      } else {
        // If document not found, redirect to dashboard
        navigate('/cms/dashboard')
      }
    }
  }, [id, isNewDoc, navigate])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate saving delay
    setTimeout(() => {
      // In a real app, we would save the document to the database
      console.log('Saving document:', formData)
      setIsSaving(false)
      navigate('/cms/dashboard')
    }, 1000)
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      // In a real app, we would delete the document
      console.log('Deleting document:', id)
      navigate('/cms/dashboard')
    }
  }
  
  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)
    
    const newText = beforeText + prefix + selectedText + suffix + afterText
    setFormData(prev => ({ ...prev, content: newText }))
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      )
    }, 0)
  }

  return (
    <Layout className="bg-muted/30">
      <div className="container py-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/cms/dashboard"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">
                {isNewDoc ? 'Create New Document' : 'Edit Document'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                <Eye className="h-4 w-4" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
              {!isNewDoc && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1 rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive shadow-sm hover:bg-destructive/20"
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </button>
              )}
              <button
                type="submit"
                form="document-form"
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
          {!isNewDoc && (
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: June 15, 2023</span>
            </div>
          )}
        </div>

        {previewMode ? (
          <div className="rounded-lg border bg-background p-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h1>{formData.title || 'Untitled Document'}</h1>
              <p className="lead">{formData.description}</p>
              <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ) : (
          <form id="document-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg border bg-background p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter document title"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <input
                      id="description"
                      name="description"
                      type="text"
                      required
                      className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of the document"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        id="tags"
                        name="tags"
                        type="text"
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="e.g. getting-started, tutorial"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        id="published"
                        name="published"
                        type="checkbox"
                        className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                        checked={formData.published}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="published" className="text-sm font-medium">
                        Published
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Published documents are visible to all users
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-6">
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content (Markdown)
                  </label>
                  <div className="border rounded-md">
                    <div className="flex flex-wrap items-center gap-1 p-2 border-b">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Bold"
                        onClick={() => insertMarkdown('**', '**')}
                      >
                        <Bold className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Italic"
                        onClick={() => insertMarkdown('*', '*')}
                      >
                        <Italic className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Link"
                        onClick={() => insertMarkdown('[', '](url)')}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Code"
                        onClick={() => insertMarkdown('`', '`')}
                      >
                        <Code className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-px bg-border mx-1" />
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Heading 1"
                        onClick={() => insertMarkdown('# ')}
                      >
                        <Heading1 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Heading 2"
                        onClick={() => insertMarkdown('## ')}
                      >
                        <Heading2 className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-px bg-border mx-1" />
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Bulleted List"
                        onClick={() => insertMarkdown('- ')}
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Numbered List"
                        onClick={() => insertMarkdown('1. ')}
                      >
                        <ListOrdered className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Image"
                        onClick={() => insertMarkdown('![alt text](', ')')}
                      >
                        <Image className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-px bg-border mx-1" />
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-2"
                        title="Code Block"
                        onClick={() => insertMarkdown('```\n', '\n```')}
                      >
                        Code Block
                      </button>
                    </div>
                    <textarea
                      id="content"
                      name="content"
                      rows={15}
                      className="w-full rounded-b-md border-0 bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-0"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your content in Markdown format..."
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Use Markdown to format your content. You can use headings, lists, links, code blocks, and more.
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}