"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful!");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error);
            toast.error(error.response?.data?.error || error.message || "Login failed");
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            <div className="w-full max-w-md animate-fade-in">
                <div className="card p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-normal text-gray-900 mb-1">
                            Sign in
                        </h1>
                        <p className="text-sm text-gray-600">
                            Use your email and password to continue
                        </p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input 
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link href="/forgotpassword" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <input 
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={buttonDisabled || loading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-md transition-colors shadow-sm"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}
