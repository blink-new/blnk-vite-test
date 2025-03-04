import { useState } from 'react'
import { Layout } from '../../components/Layout'
import { getAllDocs, getCategories } from '../../lib/data'
import { Link } from 'react-router-dom'
import { Edit, Trash, Plus, FileText, Users, Settings, BarChart } from 'lucide-react'
import { format } from 'date-fns'

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('documents')
  const docs = getAllDocs()
  const categories = getCategories()

  return (
    <Layout className="bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-20">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted ${activeTab === 'documents' ? 'bg-muted font-medium' : ''}`}
                >
                  <FileText className="h-4 w-4" />
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted ${activeTab === 'users' ? 'bg-muted font-medium' : ''}`}
                >
                  <Users className="h-4 w-4" />
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted ${activeTab === 'analytics' ? 'bg-muted font-medium' : ''}`}
                >
                  <BarChart className="h-4 w-4" />
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted ${activeTab === 'settings' ? 'bg-muted font-medium' : ''}`}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </div>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            {activeTab === 'documents' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
                  <Link
                    to="/cms/documents/new"
                    className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                    New Document
                  </Link>
                </div>

                <div className="rounded-md border bg-background">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="relative">
                        <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                          <option value="">All Categories</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative">
                        <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                          <option value="">All Status</option>
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="search"
                          placeholder="Search documents..."
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Title
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Category
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Status
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Updated
                            </th>
                            <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {docs.map((doc) => (
                            <tr
                              key={doc.id}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">
                                <div className="font-medium">{doc.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {doc.description.length > 50
                                    ? `${doc.description.substring(0, 50)}...`
                                    : doc.description}
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                  {doc.category}
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  doc.published
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                }`}>
                                  {doc.published ? 'Published' : 'Draft'}
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                {format(new Date(doc.updatedAt), 'MMM d, yyyy')}
                              </td>
                              <td className="p-4 align-middle text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Link
                                    to={`/cms/documents/edit/${doc.id}`}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Link>
                                  <button
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                  >
                                    <Trash className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>1</strong> to <strong>{docs.length}</strong> of{" "}
                      <strong>{docs.length}</strong> results
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        disabled
                      >
                        Previous
                      </button>
                      <button
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        disabled
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                  <button
                    className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                    New User
                  </button>
                </div>

                <div className="rounded-md border bg-background">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                          <option value="">All Roles</option>
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="search"
                          placeholder="Search users..."
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Name
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Email
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Role
                            </th>
                            <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                  <User className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium">John Doe</div>
                                  <div className="text-xs text-muted-foreground">
                                    Joined Apr 2023
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">john@example.com</td>
                            <td className="p-4 align-middle">
                              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                Admin
                              </div>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </button>
                                <button
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                  <User className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium">Jane Smith</div>
                                  <div className="text-xs text-muted-foreground">
                                    Joined May 2023
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">jane@example.com</td>
                            <td className="p-4 align-middle">
                              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                Editor
                              </div>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </button>
                                <button
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="rounded-lg border bg-background p-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Total Documents</h3>
                    </div>
                    <div className="mt-3">
                      <p className="text-3xl font-bold">{docs.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        +2 from last month
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-background p-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Total Users</h3>
                    </div>
                    <div className="mt-3">
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        +3 from last month
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-background p-6">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Page Views</h3>
                    </div>
                    <div className="mt-3">
                      <p className="text-3xl font-bold">1,234</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        +21% from last month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <h3 className="text-lg font-medium mb-4">Page Views Over Time</h3>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Chart will be displayed here
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                </div>

                <div className="rounded-lg border bg-background">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="site-name" className="block text-sm font-medium mb-1">
                          Site Name
                        </label>
                        <input
                          id="site-name"
                          type="text"
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          defaultValue="DocsCMS"
                        />
                      </div>
                      <div>
                        <label htmlFor="site-description" className="block text-sm font-medium mb-1">
                          Site Description
                        </label>
                        <input
                          id="site-description"
                          type="text"
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          defaultValue="Modern Documentation Platform"
                        />
                      </div>
                      <div>
                        <label htmlFor="site-url" className="block text-sm font-medium mb-1">
                          Site URL
                        </label>
                        <input
                          id="site-url"
                          type="url"
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          defaultValue="https://docscms.example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t p-6">
                    <h3 className="text-lg font-medium mb-4">Appearance</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Theme
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              id="theme-light"
                              type="radio"
                              name="theme"
                              className="h-4 w-4 border-primary text-primary focus:ring-primary"
                              defaultChecked
                            />
                            <label htmlFor="theme-light" className="text-sm">
                              Light
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              id="theme-dark"
                              type="radio"
                              name="theme"
                              className="h-4 w-4 border-primary text-primary focus:ring-primary"
                            />
                            <label htmlFor="theme-dark" className="text-sm">
                              Dark
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              id="theme-system"
                              type="radio"
                              name="theme"
                              className="h-4 w-4 border-primary text-primary focus:ring-primary"
                            />
                            <label htmlFor="theme-system" className="text-sm">
                              System
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="primary-color" className="block text-sm font-medium mb-1">
                          Primary Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            id="primary-color"
                            type="color"
                            className="h-9 w-16 rounded-md border border-input bg-background p-1"
                            defaultValue="#0ea5e9"
                          />
                          <input
                            type="text"
                            className="w-32 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            defaultValue="#0ea5e9"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t p-6">
                    <button
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  )
}

function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}