import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { getDocBySlug, getDocsByCategory } from '../data/docs'
import { DocItem } from '../data/docs'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

export function DocPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [doc, setDoc] = useState<DocItem | null>(null)
  const [relatedDocs, setRelatedDocs] = useState<DocItem[]>([])
  
  useEffect(() => {
    if (slug) {
      const currentDoc = getDocBySlug(slug)
      if (currentDoc) {
        // Add createdAt if it doesn't exist
        const docWithDate = {
          ...currentDoc,
          createdAt: currentDoc.createdAt || new Date().toISOString()
        }
        setDoc(docWithDate)
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
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-64 bg-border rounded"></div>
              <div className="h-4 w-96 bg-border rounded"></div>
              <div className="h-4 w-80 bg-border rounded"></div>
              <div className="h-4 w-72 bg-border rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="docs-container">
          <div className="docs-sidebar">
            <h3>On This Page</h3>
            <ul>
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#getting-started">Getting Started</a></li>
            </ul>
            
            {relatedDocs.length > 0 && (
              <>
                <h3 className="mt-6">Related Documents</h3>
                <ul>
                  {relatedDocs.map(relatedDoc => (
                    <li key={relatedDoc.id}>
                      <Link to={`/docs/${relatedDoc.slug}`}>
                        {relatedDoc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          <div className="docs-content">
            <div className="mb-6">
              <Link to="/docs" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
                <ArrowLeft size={16} className="mr-1" />
                Back to Documentation
              </Link>
              
              <h1>{doc.title}</h1>
              
              <div className="flex items-center text-sm text-secondary mb-6">
                <div className="flex items-center mr-4">
                  <Calendar size={14} className="mr-1" />
                  <span>
                    {new Date(doc.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {Math.ceil(doc.content.split(' ').length / 200)} min read
                  </span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(doc.content) }} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  // This is a very basic implementation
  // In a real app, you would use a proper markdown parser
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1 id="$1" class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 id="$1" class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 id="$1" class="text-xl font-bold mt-5 mb-2">$1</h3>')
    // Bold
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
    // Code blocks
    .replace(/```([^`]+)```/gm, '<pre class="bg-background p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gm, '<code class="bg-background px-1 py-0.5 rounded text-primary">$1</code>')
    // Lists
    .replace(/^- (.*$)/gm, '<ul class="list-disc pl-6 mb-4"><li>$1</li></ul>')
    // Fix lists (this is a hack)
    .replace(/<\/ul>\n<ul class="list-disc pl-6 mb-4">/gm, '')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Paragraphs
    .replace(/^(?!<[a-z])(.*$)/gm, '<p class="mb-4">$1</p>')
    // Fix empty paragraphs
    .replace(/<p class="mb-4"><\/p>/gm, '')

  return html
}