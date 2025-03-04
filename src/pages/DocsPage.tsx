import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { getAllDocs, getCategories, getDocsByCategory } from '../lib/data'
import { ChevronRight, Search } from 'lucide-react'
import { DocCategory, DocItem } from '../types'

export function DocsPage() {
  const { categoryId } = useParams<{ categoryId?: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  
  const categories = getCategories()
  const allDocs = getAllDocs()
  
  let docs: DocItem[] = []
  let selectedCategory: DocCategory | undefined
  
  if (categoryId) {
    docs = getDocsByCategory(categoryId)
    selectedCategory = categories.find(cat => cat.id === categoryId)
  } else {
    docs = allDocs
  }
  
  const filteredDocs = searchQuery
    ? docs.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : docs

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-20">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search documentation..."
                    className="w-full pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/docs"
                        className={`block rounded-md px-3 py-2 text-sm hover:bg-muted ${!categoryId ? 'bg-muted font-medium' : ''}`}
                      >
                        All Documentation
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/docs/category/${category.id}`}
                          className={`block rounded-md px-3 py-2 text-sm hover:bg-muted ${categoryId === category.id ? 'bg-muted font-medium' : ''}`}
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/docs" className="hover:text-foreground">Docs</Link>
                {categoryId && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground">{selectedCategory?.title || categoryId}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {selectedCategory ? selectedCategory.title : 'Documentation'}
              </h1>
              {selectedCategory && (
                <p className="mt-2 text-muted-foreground">
                  {selectedCategory.description}
                </p>
              )}
            </div>

            {filteredDocs.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try a different search term.` 
                    : 'No documents available in this category yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocs.map((doc) => (
                  <Link
                    key={doc.id}
                    to={`/docs/${doc.slug}`}
                    className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <h2 className="text-xl font-semibold group-hover:text-primary">
                      {doc.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary">
                      Read more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  )
}