import { useState } from 'react'
import { Layout } from '../components/Layout'
import { getAllDocs } from '../data/docs'

export function CMSPage() {
  const [activeTab, setActiveTab] = useState('documents')
  const docs = getAllDocs()

  return (
    <Layout>
      <div className="container py-8">
        <div className="dashboard-header">
          <h1>CMS Dashboard</h1>
          <button className="primary-button">
            New Document
          </button>
        </div>
        
        <div className="dashboard-container">
          <div className="dashboard-sidebar">
            <ul>
              <li>
                <button
                  className={activeTab === 'documents' ? 'active' : ''}
                  onClick={() => setActiveTab('documents')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Documents
                </button>
              </li>
              <li>
                <button
                  className={activeTab === 'categories' ? 'active' : ''}
                  onClick={() => setActiveTab('categories')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3zM12 3v18" />
                    <path d="M3 12h18" />
                  </svg>
                  Categories
                </button>
              </li>
              <li>
                <button
                  className={activeTab === 'users' ? 'active' : ''}
                  onClick={() => setActiveTab('users')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Users
                </button>
              </li>
              <li>
                <button
                  className={activeTab === 'settings' ? 'active' : ''}
                  onClick={() => setActiveTab('settings')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Settings
                </button>
              </li>
            </ul>
          </div>
          
          <div className="dashboard-content">
            {activeTab === 'documents' && (
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2>Documents</h2>
                  <div className="flex items-center gap-2">
                    <input
                      type="search"
                      placeholder="Search documents..."
                      className="form-input h-9 w-64"
                    />
                    <select className="form-select h-9">
                      <option value="">All Categories</option>
                      <option value="getting-started">Getting Started</option>
                      <option value="guides">Guides</option>
                      <option value="api">API</option>
                      <option value="examples">Examples</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map(doc => (
                        <tr key={doc.id}>
                          <td>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-xs text-muted-foreground">{doc.description}</div>
                          </td>
                          <td>{doc.category}</td>
                          <td>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Published
                            </span>
                          </td>
                          <td>
                            <div className="dashboard-table-actions">
                              <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                              </button>
                              <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'categories' && (
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2>Categories</h2>
                  <button className="primary-button">
                    New Category
                  </button>
                </div>
                
                <p className="p-4 text-center">
                  Category management would be implemented in a real app.
                </p>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2>Users</h2>
                  <button className="primary-button">
                    New User
                  </button>
                </div>
                
                <p className="p-4 text-center">
                  User management would be implemented in a real app.
                </p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h2>Settings</h2>
                </div>
                
                <div className="p-4">
                  <div className="form-group">
                    <label className="form-label">Site Name</label>
                    <input type="text" className="form-input" defaultValue="DocsCMS" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Site Description</label>
                    <input type="text" className="form-input" defaultValue="Modern Documentation Platform" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Theme</label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="theme-light" name="theme" defaultChecked />
                        <label htmlFor="theme-light">Light</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="theme-dark" name="theme" />
                        <label htmlFor="theme-dark">Dark</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="theme-system" name="theme" />
                        <label htmlFor="theme-system">System</label>
                      </div>
                    </div>
                  </div>
                  
                  <button className="primary-button">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}