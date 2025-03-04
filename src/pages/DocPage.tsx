import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { getDocBySlug, getDocsByCategory } from '../lib/data'
import { ChevronRight, ChevronLeft, Clock, Calendar, Tag, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { DocItem } from '../types'
import { format } from 'date-fns'

export function DocPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [doc, setDoc] = useState<DocItem | null>(null)
  const [relatedDocs, setRelatedDocs] = useState<DocItem[]>([])
  
  useEffect(() => {
    if (slug) {
      const currentDoc = getDocBySlug(slug)
      if (currentDoc) {
        setDoc(currentDoc)
        // Get related docs from the same category
        const related = getDocsByCategory(currentDoc.category)
          .filter(d => d.id !== currentDoc.id)
          .slice(0, 3)
        setRelatedDocs(related)
      } else {
        navigate('/docs', { replace: true })
      }
    }
  }, [slug, navigate])
  
  if (!doc) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-muted rounded mb-4"></div>
              <div className="h-4 w-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/docs" className="hover:text-foreground">Docs</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to={`/docs/category/${doc.category}`} className="hover:text-foreground">
                  {doc.category.charAt(0).toUpperCase() + doc.category.slice(1).replace('-', ' ')}
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground">{doc.title}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {doc.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={doc.createdAt}>
                    {format(new Date(doc.createdAt), 'MMMM d, yyyy')}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <time dateTime={doc.updatedAt}>
                    Updated {format(new Date(doc.updatedAt), 'MMMM d, yyyy')}
                  </time>
                </div>
                {doc.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{doc.author}</span>
                  </div>
                )}
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown>
                {doc.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 flex items-center justify-between border-t pt-6">
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to docs
              </Link>
              {doc.version && (
                <div className="text-sm text-muted-foreground">
                  Version: {doc.version}
                </div>
              )}
            </div>
          </main>
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-20">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">On This Page</h3>
                <nav className="space-y-1 text-sm">
                  {/* This would ideally be generated from the markdown headings */}
                  <a href="#introduction" className="block py-1 hover:text-primary">Introduction</a>
                  <a href="#features" className="block py-1 hover:text-primary">Features</a>
                  <a href="#getting-started" className="block py-1 hover:text-primary">Getting Started</a>
                </nav>
              </div>
              
              {relatedDocs.length > 0 && (
                <div className="mt-6 rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Related Documents</h3>
                  <div className="space-y-3">
                    {relatedDocs.map((relatedDoc) => (
                      <Link
                        key={relatedDoc.id}
                        to={`/docs/${relatedDoc.slug}`}
                        className="block text-sm hover:text-primary"
                      >
                        {relatedDoc.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}