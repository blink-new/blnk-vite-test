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
      <div className="container">
        <div className="page-with-sidebar">
          <div>
            <div className="search-container">
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
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="categories">
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
                      {category.icon} {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h1 className="page-title">{selectedCategory ? selectedCategory.title : 'Documentation'}</h1>
            {selectedCategory && (
              <p className="page-description">{selectedCategory.description}</p>
            )}
            
            {filteredDocs.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                <h3 style={{ marginTop: 0 }}>No documents found</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try a different search term.` 
                    : 'No documents available in this category yet.'}
                </p>
              </div>
            ) : (
              <div className="docs-grid">
                {filteredDocs.map(doc => (
                  <Link 
                    key={doc.id} 
                    to={`/docs/${doc.slug}`} 
                    className="doc-card"
                  >
                    <h2>{doc.title}</h2>
                    <p>{doc.description}</p>
                    <div className="read-more">
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