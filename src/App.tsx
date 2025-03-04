import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>DocsCMS</h1>
          <nav>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Examples</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="theme-toggle">🌙</button>
            <a href="#" className="sign-in-button">Sign In</a>
          </div>
        </div>
      </header>
      
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
            <h2>Features</h2>
            <p>Everything you need to create and manage your documentation</p>
            
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
            <h2>Documentation Categories</h2>
            <p>Browse our documentation by category</p>
            
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