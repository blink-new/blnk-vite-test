import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'
import { DocPage } from './pages/DocPage'
import { LoginPage } from './pages/LoginPage'
import { CMSPage } from './pages/CMSPage'
import { DashboardPage } from './pages/cms/DashboardPage'
import { DocumentEditorPage } from './pages/cms/DocumentEditorPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/category/:categoryId" element={<DocsPage />} />
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cms" element={<CMSPage />} />
        <Route path="/cms/dashboard" element={<DashboardPage />} />
        <Route path="/cms/documents/new" element={<DocumentEditorPage />} />
        <Route path="/cms/documents/edit/:id" element={<DocumentEditorPage />} />
        <Route path="/guides" element={<DocsPage />} />
        <Route path="/api" element={<DocsPage />} />
        <Route path="/examples" element={<DocsPage />} />
      </Routes>
    </Router>
  )
}

export default App