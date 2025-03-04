import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { categories } from '../data/docs'

export function HomePage() {
  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <h2>Modern Documentation Platform</h2>
          <p>Create beautiful documentation with our easy-to-use CMS. Perfect for developers, teams, and organizations.</p>
          <div className="hero-actions">
            <Link to="/docs/introduction" className="primary-button">Get Started</Link>
            <Link to="/docs" className="secondary-button">Documentation</Link>
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
            {categories.map(category => (
              <Link key={category.id} to={`/docs/category/${category.id}`} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Create beautiful documentation for your project today</p>
          <div className="cta-actions">
            <Link to="/docs/introduction" className="primary-button">Get Started</Link>
            <Link to="/login" className="secondary-button">Sign In</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}