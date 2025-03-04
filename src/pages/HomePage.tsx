import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { categories } from '../data/docs'
import { Rocket, BookOpen, Code, Folder, Edit, Search, Palette, Users } from 'lucide-react'

// Map category IDs to icons
const categoryIcons: Record<string, JSX.Element> = {
  'getting-started': <Rocket size={24} className="text-primary" />,
  'guides': <BookOpen size={24} className="text-primary" />,
  'api': <Code size={24} className="text-primary" />,
  'examples': <Folder size={24} className="text-primary" />
}

export function HomePage() {
  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <h2 className="animate-fade-in">Modern Documentation Platform</h2>
          <p className="animate-fade-in">Create beautiful documentation with our easy-to-use CMS. Perfect for developers, teams, and organizations.</p>
          <div className="hero-actions animate-slide-up">
            <Link to="/docs/introduction" className="primary-button">Get Started</Link>
            <Link to="/docs" className="secondary-button">Browse Docs</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-header">
            <h2>Powerful Features</h2>
            <p>Everything you need to create and manage your documentation</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Edit size={32} className="text-white" />
              </div>
              <h3>Beautiful Docs</h3>
              <p>Create beautiful, responsive documentation that looks great on all devices. Support for rich media and interactive elements.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3>Markdown Support</h3>
              <p>Write your documentation in Markdown with support for code highlighting, tables, and other formatting options.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Code size={32} className="text-white" />
              </div>
              <h3>Versioning</h3>
              <p>Support for multiple versions of your documentation. Keep track of changes and allow users to access previous versions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Search size={32} className="text-white" />
              </div>
              <h3>Powerful Search</h3>
              <p>Advanced search functionality with filters and suggestions to help users find exactly what they need quickly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Palette size={32} className="text-white" />
              </div>
              <h3>Customization</h3>
              <p>Customize the look and feel to match your brand. Choose from pre-built themes or create your own custom design.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} className="text-white" />
              </div>
              <h3>Team Collaboration</h3>
              <p>Collaborate with your team to create and manage documentation. Role-based access control and review workflows.</p>
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
                <div className="category-icon">
                  {categoryIcons[category.id] || <div>{category.icon}</div>}
                </div>
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