import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'

export function CMSPage() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // In a real app, we would check if the user is authenticated
    // For now, we'll just redirect to the dashboard after a short delay
    const timer = setTimeout(() => {
      navigate('/cms/dashboard')
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-center h-60vh">
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl font-bold mb-4">Redirecting to CMS Dashboard...</h1>
            <div className="flex justify-center items-center gap-2">
              <div className="animate-bounce" style={{ 
                width: '0.75rem', 
                height: '0.75rem', 
                borderRadius: '9999px', 
                backgroundColor: 'var(--primary)' 
              }}></div>
              <div className="animate-bounce" style={{ 
                width: '0.75rem', 
                height: '0.75rem', 
                borderRadius: '9999px', 
                backgroundColor: 'var(--primary)',
                animationDelay: '0.2s'
              }}></div>
              <div className="animate-bounce" style={{ 
                width: '0.75rem', 
                height: '0.75rem', 
                borderRadius: '9999px', 
                backgroundColor: 'var(--primary)',
                animationDelay: '0.4s'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}