import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'
import { DocPage } from './pages/DocPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/cms/DashboardPage'
import { DocumentEditorPage } from './pages/cms/DocumentEditorPage'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/category/:categoryId" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cms" element={<DashboardPage />} />
          <Route path="/cms/documents/new" element={<DocumentEditorPage />} />
          <Route path="/cms/documents/edit/:id" element={<DocumentEditorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App