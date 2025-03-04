import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/Layout'
import { getCategories, getDocBySlug } from '../../lib/data'
import { ChevronLeft, Save, Eye, Trash, Clock } from 'lucide-react'
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
      }
    }
  }, [id, isNewDoc])
  
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
    // In a real app, we would save the document to the database
    console.log('Saving document:', formData)
    navigate('/cms')
  }

  return (
    <Layout className="bg-muted/30">
      <div className="container py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/cms"
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
                  className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </button>
              )}
              <button
                type="submit"
                form="document-form"
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                <Save className="h-4 w-4" />
                Save
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
              <div dangerouslySetInnerHTML={{ __html: formData.content }} />
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
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-6">
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content (Markdown)
                  </label>
                  <div className="border rounded-md">
                    <div className="flex items-center gap-2 p-2 border-b">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Bold"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M14 12a4 4 0 0 0 0-8H6v8" />
                          <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Italic"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <line x1="19" x2="10" y1="4" y2="4" />
                          <line x1="14" x2="5" y1="20" y2="20" />
                          <line x1="15" x2="9" y1="4" y2="20" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Code"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      </button>
                      <div className="h-4 w-px bg-border mx-2" />
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Heading 1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M4 12h8" />
                          <path d="M4 18V6" />
                          <path d="M12 18V6" />
                          <path d="M17 12a5 5 0 0 0 5-5" />
                          <path d="M17 12a5 5 0 0 1 5 5" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Heading 2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M4 12h8" />
                          <path d="M4 18V6" />
                          <path d="M12 18V6" />
                          <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
                        </svg>
                      </button>
                    </div>
                    <textarea
                      id="content"
                      name="content"
                      rows={15}
                      className="w-full rounded-b-md border-0 bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-0"
                      value={formData.content}
                      onChange={handleChange}
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