function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold">DocsCMS</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Modern Documentation Platform</h2>
        <p className="text-lg mb-6">Create beautiful documentation with our easy-to-use CMS.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Beautiful Docs</h3>
            <p>Create beautiful, responsive documentation that looks great on all devices.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Markdown Support</h3>
            <p>Write your documentation in Markdown with support for code highlighting.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
            <p>Collaborate with your team to create and manage documentation.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App