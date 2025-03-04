import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export function Layout({ children, className = '' }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const location = useLocation()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
              className={`text-sm font-medium ${isActive('/docs') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Documentation
            </Link>
            <Link 
              to="/guides" 
              className={`text-sm font-medium ${isActive('/guides') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Guides
            </Link>
            <Link 
              to="/api" 
              className={`text-sm font-medium ${isActive('/api') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              API
            </Link>
            <Link 
              to="/examples" 
              className={`text-sm font-medium ${isActive('/examples') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Examples
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center rounded-md bg-blue-600 dark:bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Sign In
            </Link>
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="container mx-auto py-4 px-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/docs" 
                className={`text-sm font-medium ${isActive('/docs') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link 
                to="/guides" 
                className={`text-sm font-medium ${isActive('/guides') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Guides
              </Link>
              <Link 
                to="/api" 
                className={`text-sm font-medium ${isActive('/api') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                API
              </Link>
              <Link 
                to="/examples" 
                className={`text-sm font-medium ${isActive('/examples') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Examples
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className={`flex-1 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 ${className}`}>
        {children}
      </main>

      <footer className="border-t bg-white dark:bg-gray-950">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 px-4 md:h-24 md:flex-row md:py-0">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            Built with ❤️ by DocsCMS. The source code is available on GitHub.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Twitter
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}