"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')

        } catch (error: any) {
            console.log(error.message);
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }
    return (
        <div  className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <span>Profile Page</span>
            <h2>{data === 'nothing' ? "Nothing" : <Link href={'/profile/${data}'}>{data}
            </Link>}</h2>
            <button
                className="bg-blue-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >
                Logout
            </button>

            <button
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    )
}