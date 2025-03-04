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
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl font-bold mb-4">Redirecting to CMS Dashboard...</h1>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}