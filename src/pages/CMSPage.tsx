import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'

export function CMSPage() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // In a real app, we would check if the user is authenticated
    // For now, we'll just redirect to the dashboard
    navigate('/cms/dashboard')
  }, [navigate])

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Redirecting to CMS Dashboard...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}