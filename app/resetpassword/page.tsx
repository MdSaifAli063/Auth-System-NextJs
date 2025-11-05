"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (urlToken) {
            setToken(urlToken);
            setVerified(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", { 
                token, 
                password 
            });
            console.log("Reset password success", response.data);
            toast.success("Password reset successful! Redirecting to login...");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error:any) {
            console.log("Reset password failed", error);
            toast.error(error.response?.data?.error || error.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    if (!verified) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-white">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="card p-10 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-normal text-gray-900 mb-2">Invalid Token</h1>
                        <p className="text-sm text-gray-600 mb-6">
                            The password reset link is invalid or has expired.
                        </p>
                        <Link 
                            href="/forgotpassword"
                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                        >
                            Request New Link
                        </Link>
                    </div>
                </div>
            </div>
        );
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
                            Enter your new password below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input 
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input 
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password || !confirmPassword}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors shadow-sm"
                        >
                            {loading ? "Resetting password..." : "Reset password"}
                        </button>
                    </form>

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

