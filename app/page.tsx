import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-normal text-gray-900 mb-2">
            Welcome
          </h1>
          <p className="text-base text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/login"
            className="block w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md transition-colors shadow-sm"
          >
            Sign in
          </Link>
          <Link 
            href="/signup"
            className="block w-full py-3.5 px-4 bg-white hover:bg-gray-50 text-blue-600 text-center font-medium rounded-md border border-gray-300 transition-colors"
          >
            Create account
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Secure authentication system
          </p>
        </div>
      </div>
    </main>
  )
}
