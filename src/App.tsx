import { useState } from 'react'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="container">
          <div className="header-logo">
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
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          <nav>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Examples</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <a href="#" className="sign-in-button">Sign In</a>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Examples</a></li>
          </ul>
        </div>
      )}

      <main>
        <section className="hero">
          <div className="container">
            <h2>Modern Documentation Platform</h2>
            <p>Create beautiful documentation with our easy-to-use CMS. Perfect for developers, teams, and organizations.</p>
            <div className="hero-actions">
              <a href="#" className="primary-button">Get Started</a>
              <a href="#" className="secondary-button">Documentation</a>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="features-header">
              <h2>Features</h2>
              <p>Everything you need to create and manage your documentation</p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>Beautiful Docs</h3>
                <p>Create beautiful, responsive documentation that looks great on all devices.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Markdown Support</h3>
                <p>Write your documentation in Markdown with support for code highlighting.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Versioning</h3>
                <p>Support for multiple versions of your documentation.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3>Search</h3>
                <p>Powerful search functionality to help users find what they need.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Customization</h3>
                <p>Customize the look and feel to match your brand.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Team Collaboration</h3>
                <p>Collaborate with your team to create and manage documentation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <div className="container">
            <div className="categories-header">
              <h2>Documentation Categories</h2>
              <p>Browse our documentation by category</p>
            </div>

            <div className="category-grid">
              <a href="#" className="category-card">
                <div className="category-icon">🚀</div>
                <div>
                  <h3>Getting Started</h3>
                  <p>Learn how to get started with our platform</p>
                </div>
              </a>
              <a href="#" className="category-card">
                <div className="category-icon">📚</div>
                <div>
                  <h3>Guides</h3>
                  <p>Step-by-step guides for common tasks</p>
                </div>
              </a>
              <a href="#" className="category-card">
                <div className="category-icon">⚙️</div>
                <div>
                  <h3>API Reference</h3>
                  <p>Detailed API documentation</p>
                </div>
              </a>
              <a href="#" className="category-card">
                <div className="category-icon">📁</div>
                <div>
                  <h3>Examples</h3>
                  <p>Example projects and code snippets</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <p>Create beautiful documentation for your project today</p>
            <div className="cta-actions">
              <a href="#" className="primary-button">Get Started</a>
              <a href="#" className="secondary-button">Sign In</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>Built with ❤️ by DocsCMS. The source code is available on GitHub.</p>
          <div className="footer-links">
            <a href="#">GitHub</a>
            <a href="#">Twitter</a>
            <a href="#">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App