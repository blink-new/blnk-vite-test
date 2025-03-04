import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { categories, getDocsByCategory, getAllDocs } from '../data/docs'
import { Search, BookOpen, Code, Folder, Rocket } from 'lucide-react'

// Map category IDs to icons
const categoryIcons = {
  'getting-started': <Rocket size={18} />,
  'guides': <BookOpen size={18} />,
  'api': <Code size={18} />,
  'examples': <Folder size={18} />
}

export function DocsPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  
  const allDocs = getAllDocs()
  const docs = categoryId ? getDocsByCategory(categoryId) : allDocs
  
  const filteredDocs = searchQuery
    ? docs.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : docs
  
  const selectedCategory = categoryId 
    ? categories.find(cat => cat.id === categoryId) 
    : null

  return (
    <Layout>
      <div className="container py-8">
        <div className="docs-container">
          <div className="docs-sidebar">
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search documentation..."
                className="form-input pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <h3>Categories</h3>
            <ul>
              <li>
                <Link 
                  to="/docs" 
                  className={!categoryId ? 'active' : ''}
                >
                  All Documentation
                </Link>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <Link 
                    to={`/docs/category/${category.id}`} 
                    className={categoryId === category.id ? 'active' : ''}
                  >
                    {categoryIcons[category.id as keyof typeof categoryIcons] || category.icon} 
                    <span>{category.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="docs-content">
            <h1>{selectedCategory ? selectedCategory.title : 'Documentation'}</h1>
            {selectedCategory && (
              <p className="mb-6 text-muted-foreground">{selectedCategory.description}</p>
            )}
            
            {filteredDocs.length === 0 ? (
              <div className="p-6 border rounded-lg text-center bg-background">
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try a different search term.` 
                    : 'No documents available in this category yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocs.map(doc => (
                  <Link 
                    key={doc.id} 
                    to={`/docs/${doc.slug}`} 
                    className="p-5 border border-border rounded-lg hover:bg-background transition-colors group"
                  >
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{doc.title}</h2>
                    <p className="text-sm text-text-secondary mb-4">{doc.description}</p>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Read more
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}