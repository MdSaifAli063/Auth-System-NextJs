"use client";
import Link from "next/link";
import React, {useState} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", { email });
            console.log("Forgot password success", response.data);
            toast.success("Password reset email sent! Please check your inbox.");
            setSent(true);
        } catch (error:any) {
            console.log("Forgot password failed", error);
            toast.error(error.response?.data?.error || error.message || "Failed to send reset email");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            <div className="w-full max-w-md animate-fade-in">
                <div className="card p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-normal text-gray-900 mb-1">
                            Reset password
                        </h1>
                        <p className="text-sm text-gray-600">
                            {sent 
                                ? "Check your email for password reset instructions"
                                : "Enter your email address and we'll send you a link to reset your password"
                            }
                        </p>
                    </div>

                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input 
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors shadow-sm"
                            >
                                {loading ? "Sending..." : "Send reset link"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                            <p className="text-xs text-gray-500">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>
                            <button
                                onClick={() => {
                                    setSent(false);
                                    setEmail("");
                                }}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Try different email
                            </button>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            ← Back to Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

