import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Check system preference for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="container">
          <Link to="/" className="header-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <h1>DocsCMS</h1>
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav>
            <ul>
              <li>
                <Link 
                  to="/docs" 
                  className={location.pathname.includes('/docs') ? 'text-primary' : ''}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/guides" 
                  className={location.pathname.includes('/guides') ? 'text-primary' : ''}
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/api" 
                  className={location.pathname.includes('/api') ? 'text-primary' : ''}
                >
                  API
                </Link>
              </li>
              <li>
                <Link 
                  to="/examples" 
                  className={location.pathname.includes('/examples') ? 'text-primary' : ''}
                >
                  Examples
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/login" className="sign-in-button">Sign In</Link>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <Link 
                to="/docs" 
                className={location.pathname.includes('/docs') ? 'text-primary' : ''}
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link 
                to="/guides" 
                className={location.pathname.includes('/guides') ? 'text-primary' : ''}
              >
                Guides
              </Link>
            </li>
            <li>
              <Link 
                to="/api" 
                className={location.pathname.includes('/api') ? 'text-primary' : ''}
              >
                API
              </Link>
            </li>
            <li>
              <Link 
                to="/examples" 
                className={location.pathname.includes('/examples') ? 'text-primary' : ''}
              >
                Examples
              </Link>
            </li>
          </ul>
        </div>
      )}

      <main>
        {children}
      </main>

      <footer>
        <div className="container">
          <p>Built with ❤️ by DocsCMS. The source code is available on GitHub.</p>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  )
}