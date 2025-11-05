"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
            toast.success("Email verified successfully!");
        } catch (error:any) {
            setError(true);
            console.log(error.response?.data);
            toast.error(error.response?.data?.error || "Verification failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (urlToken) {
            setToken(urlToken);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(token.length > 0 && !verified && !error) {
            verifyUserEmail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            <div className="w-full max-w-md animate-fade-in">
                <div className="card p-10 text-center">
                    {loading ? (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h1 className="text-2xl font-normal text-gray-900">Verifying Email</h1>
                            <p className="text-sm text-gray-600">Please wait while we verify your email address</p>
                        </div>
                    ) : verified ? (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-normal text-gray-900 mb-2">Email Verified</h1>
                                <p className="text-sm text-gray-600 mb-6">
                                    Your email has been successfully verified. You can now sign in to your account.
                                </p>
                            </div>
                            <Link 
                                href="/login"
                                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                            >
                                Continue to Sign in
                            </Link>
                        </div>
                    ) : error ? (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-normal text-gray-900 mb-2">Verification Failed</h1>
                                <p className="text-sm text-gray-600 mb-6">
                                    The verification link is invalid or has expired. Please request a new verification email.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Link 
                                    href="/signup"
                                    className="block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                                >
                                    Sign Up Again
                                </Link>
                                <Link 
                                    href="/login"
                                    className="block px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-md border border-gray-300 transition-colors"
                                >
                                    Go to Sign in
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-2xl font-normal text-gray-900">No Token Found</h1>
                            <p className="text-sm text-gray-600 mb-6">
                                Please check your email for the verification link.
                            </p>
                            <Link 
                                href="/login"
                                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                            >
                                Go to Sign in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
