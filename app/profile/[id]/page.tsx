import Link from 'next/link'

export default async function UserProfile({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link 
                        href="/profile"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Profile
                    </Link>
                    <h1 className="text-3xl font-normal text-gray-900">User Profile</h1>
                    <p className="text-sm text-gray-600 mt-1">View user details</p>
                </div>

                <div className="card p-8">
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-medium text-blue-600 mx-auto mb-4">
                            {id.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-normal text-gray-900 mb-2">User Identifier</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">User ID</label>
                            <p className="text-sm text-gray-900 font-mono break-all bg-gray-50 p-3 rounded border border-gray-200">
                                {id}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-4">
                                This is the unique identifier for this user profile. You can use this ID to reference the user in other parts of the application.
                            </p>
                            <Link 
                                href="/profile"
                                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                            >
                                View Full Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
