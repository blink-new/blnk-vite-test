import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { getDocBySlug, getDocsByCategory } from '../data/docs'
import { DocItem } from '../data/docs'

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
            <div className="mb-4">
              <Link to="/docs" className="text-sm text-primary hover:underline">
                ← Back to Documentation
              </Link>
            </div>
            
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(doc.content) }} />
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
    .replace(/^# (.*$)/gm, '<h1 id="$1">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 id="$1">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 id="$1">$1</h3>')
    // Bold
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gm, '<code>$1</code>')
    // Lists
    .replace(/^\- (.*$)/gm, '<ul><li>$1</li></ul>')
    // Fix lists (this is a hack)
    .replace(/<\/ul>\n<ul>/gm, '')
    // Paragraphs
    .replace(/^(?!<[a-z])(.*$)/gm, '<p>$1</p>')
    // Fix empty paragraphs
    .replace(/<p><\/p>/gm, '')

  return html
}