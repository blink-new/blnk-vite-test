import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { categories, getDocsByCategory, getAllDocs } from '../data/docs'

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
            <div className="mb-4">
              <input
                type="search"
                placeholder="Search documentation..."
                className="form-input"
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
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="docs-content">
            <h1>{selectedCategory ? selectedCategory.title : 'Documentation'}</h1>
            {selectedCategory && (
              <p className="mb-6">{selectedCategory.description}</p>
            )}
            
            {filteredDocs.length === 0 ? (
              <div className="p-6 border rounded-lg text-center">
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p>
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
                    className="p-4 border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
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