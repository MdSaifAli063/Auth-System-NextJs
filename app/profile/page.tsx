"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error);
            toast.error(error.response?.data?.error || error.message || "Logout failed")
        }
    }

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/me')
            console.log(res.data);
            setData(res.data.data)
        } catch (error:any) {
            console.log(error);
            toast.error(error.response?.data?.error || error.message || "Failed to get user details")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-normal text-gray-900 mb-1">Profile</h1>
                        <p className="text-sm text-gray-600">Manage your account information</p>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-4 sm:mt-0 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md border border-gray-300 transition-colors"
                    >
                        Sign out
                    </button>
                </div>

                <div className="card p-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-sm text-gray-600">Loading profile...</p>
                        </div>
                    ) : data ? (
                        <div className="space-y-8">
                            {/* Profile Header */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start pb-8 border-b border-gray-200">
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-medium text-blue-600 mb-4 sm:mb-0 sm:mr-6">
                                    {data.username?.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-center sm:text-left">
                                    <h2 className="text-2xl font-normal text-gray-900 mb-1">{data.username}</h2>
                                    <p className="text-sm text-gray-600">{data.email}</p>
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                            data.isVerfied 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {data.isVerfied ? '✓ Verified' : '⚠ Not Verified'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Sections */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <p className="text-base text-gray-900">{data.username}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="text-base text-gray-900 break-all">{data.email}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Verification Status</label>
                                    <p className={`text-base ${data.isVerfied ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {data.isVerfied ? 'Verified' : 'Not Verified'}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                                    <Link 
                                        href={`/profile/${data._id}`}
                                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-mono break-all"
                                    >
                                        {data._id}
                                    </Link>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-6 border-t border-gray-200">
                                <button
                                    onClick={getUserDetails}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                                >
                                    Refresh
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-sm text-gray-600 mb-4">No user data available</p>
                            <button
                                onClick={getUserDetails}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                            >
                                Load User Data
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
