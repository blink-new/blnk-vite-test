import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export function Layout({ children, className = '' }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <div className={`min-h-screen flex flex-col`}>
      <header className="header">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              style={{ color: 'var(--primary)' }}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl">DocsCMS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/docs" 
              className={`text-sm font-medium ${isActive('/docs') ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Documentation
            </Link>
            <Link 
              to="/guides" 
              className={`text-sm font-medium ${isActive('/guides') ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Guides
            </Link>
            <Link 
              to="/api" 
              className={`text-sm font-medium ${isActive('/api') ? 'text-blue-600' : 'text-gray-600'}`}
            >
              API
            </Link>
            <Link 
              to="/examples" 
              className={`text-sm font-medium ${isActive('/examples') ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Examples
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link 
              to="/login" 
              className="btn btn-primary"
            >
              Sign In
            </Link>
            <button
              className="p-2 rounded-md md:hidden"
              style={{ color: 'var(--secondary)' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="container py-4 md:hidden border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/docs" 
                className={`text-sm font-medium ${isActive('/docs') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link 
                to="/guides" 
                className={`text-sm font-medium ${isActive('/guides') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Guides
              </Link>
              <Link 
                to="/api" 
                className={`text-sm font-medium ${isActive('/api') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                API
              </Link>
              <Link 
                to="/examples" 
                className={`text-sm font-medium ${isActive('/examples') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Examples
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      <footer className="footer">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:flex-row md:h-24 md:py-0">
          <p className="text-center text-sm text-gray-500 md:text-left">
            Built with ❤️ by DocsCMS. The source code is available on GitHub.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}