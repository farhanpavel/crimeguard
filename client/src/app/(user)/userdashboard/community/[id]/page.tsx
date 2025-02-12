"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { url } from '@/components/Url/page'
import { X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaSortUp } from 'react-icons/fa'
import { GiSecurityGate } from 'react-icons/gi'

export interface ApiResponse {
    id: string
    title: string
    description: string
    isAnnonymous: boolean
    division: string
    district: string
    hidden: boolean
    crimeTime: string
    postTime: string
    userId: string
    media: Medum[]
    comments: any[]
    user: User
    votes: any[]
    _count: Count
}

export interface Medum {
    id: string
    type: string
    url: string
    reportId: string
    commentId: any
}

export interface User {
    id: string
    email: string
    name: string
    phone: string
    password: string
    profileImage: any
    bio: any
    role: string
    isBanned: boolean
    deleted: boolean
    isVerified: boolean
    otp: any
    division: any
    district: any
    thana: any
    refreshToken: string
    registeredAt: string
}

export interface Count {
    comments: number
    votes: number
}

const SinglePostPreview = () => {
    const { id } = useParams()
    const [selected, setselected] = useState<string>('')
    const [postDetails, setpostDetails] = useState<ApiResponse>({
        id: '',
        title: '',
        description: '',
        division: '',
        district: '',
        hidden: false,
        crimeTime: '',
        postTime: '',
        userId: '',
        media: [],
        isAnnonymous: false,
        comments: [],
        user: {
            id: '',
            email: '',
            name: '',
            phone: '',
            password: '',
            profileImage: '',
            bio: '',
            role: '',
            isBanned: false,
            deleted: false,
            isVerified: false,
            otp: null,
            division: null,
            district: null,
            thana: null,
            refreshToken: '',
            registeredAt: ''
        },
        votes: [],
        _count: {
            comments: 0,
            votes: 0
        }
    })

    async function fetchReport() {
        try {
            console.log(`${url}/report/${id}`)
            const response = await fetch(`${url}/report/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const report = await response.json();
            return report;
        } catch (error) {
            console.error("Failed to fetch report:", error);
            return null;
        }
    }

    useEffect(() => {
        fetchReport().then((report) => {
            if (report) {
                setpostDetails(report)
            }
        });
    }, [])

    return (
        <div>
            {postDetails.user ? <div className="p-9 space-y-2">
                <div className="flex gap-x-2 items-center text-green-600">
                    <GiSecurityGate className="text-3xl" />
                    <h1 className="text-2xl font-bold">{postDetails.title}</h1>
                </div>
                <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
                    {postDetails.description.substring(0, 20)}...
                </p>
                <div className="flex flex-row items-center justify-between pt-10 pb-5">
                    <div className='flex items-center'>
                        <Avatar>
                            <AvatarImage src={postDetails.isAnnonymous ? "Anonymous User" : postDetails.user.profileImage} />
                            <AvatarFallback>{postDetails.isAnnonymous ? "A" : postDetails.user.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className='ml-2'>
                            <p className="font-bold text-green-600">{postDetails.isAnnonymous ? "Anonymous User" : postDetails.user.name}</p>
                            <p className="text-xs text-gray-600">{postDetails.user.role}</p>
                        </div>
                    </div>
                    <h1 className="text-center text-2xl md:text-4xl text-green-600 font-bold">{postDetails.title}</h1>
                </div>
                <p className="text-xs">Posted On: {postDetails.postTime}</p>
                <div className="flex overflow-x-scroll gap-3 ">
                    {postDetails.media.map((v, i) => {
                        return <img onClick={e => setselected(v.url)} key={i} src={v.url} className='w-[400px] rounded-lg' />
                    })}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 px-10 pt-5">
                        <div className="flex items-center">
                            <button><FaSortUp size={30} className='text-4xl text-green-600' /></button>
                            <Dialog>
                                <DialogTrigger className='text-sm flex items-center'>
                                    (
                                    {
                                        postDetails.votes.filter((v) => v.voteType == "UPVOTE").length
                                    }
                                    )
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>User Upvoted</DialogTitle>
                                        <DialogDescription>
                                            {
                                                postDetails.votes.filter((v) => v.voteType == "UPVOTE").map((v, i) => {
                                                    const user: User = v.user;
                                                    console.log(user)
                                                    return <div className='flex items-center gap-3 my-3'>
                                                        <Avatar>
                                                            {/* <AvatarImage src={user.profileImage} />
                                                            <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback> */}
                                                        </Avatar>
                                                        {/* <p className='text-green-600'>{user.name}</p> */}
                                                    </div>
                                                })
                                            }
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex items-center">
                            <button><FaSortUp size={30} className='text-4xl text-green-600' /></button>
                            <Dialog>
                                <DialogTrigger className='text-sm flex items-center'>
                                    (
                                    {
                                        postDetails.votes.filter((v) => v.voteType == "UPVOTE").length
                                    }
                                    )
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>User DownVoted</DialogTitle>
                                        <DialogDescription>
                                            {
                                                postDetails.votes.filter((v) => v.voteType == "DOWNVOTE").map((v, i) => {
                                                    const user: User = v.user;
                                                    console.log(v)
                                                    return <div className='flex items-center gap-3 my-3'>
                                                        {/* <Avatar>
                                                          <AvatarImage src={user.profileImage} />
                                                          <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
                                                        </Avatar>
                                                        <p className='text-green-600'>{user.name}</p> */}
                                                    </div>
                                                })
                                            }
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='font-semibold text-sm mt-10 text-green-800'>Description</p>
                    <p className="text-gray-500 text-xs mt-1">{postDetails.description}</p>
                </div>

                <p className='font-semibold text-sm pt-10 text-green-800'>Comments</p>
                {postDetails.comments.map((v, i) => {
                    return <div key={i}>
                        <p className='text-green-600 text-sm font-semibold'>{v.user.name}</p>
                        <p className="text-gray-500 text-xs mt-1 ml-2">{v.text}</p>
                        {v.media && v.media.map((v) => {
                            return v.type == "IMAGE" ? <img src={v.url} /> : v.type.toLowerCase().startsWith("video") ? <video
                                key={v.id}
                                src={v.url}
                                width={200}
                                height={200}
                                controls
                                className="rounded-xl w-1/2"
                            /> : null
                        })}
                    </div>
                })}

            </div> : <div>Loading...</div>}
            {selected && <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center flex-col bg-black/50">
                <div className="w-1/2 flex justify-end text-white py-2">
                    <button onClick={e => setselected("")}><X size={23} /></button>
                </div>
                {selected.endsWith('.mp4') || selected.endsWith('.webm') || selected.endsWith('.ogg') ? (
                    <video controls className="w-1/2">
                        <source src={selected} type={`video/${selected.split('.').pop()}`} />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img src={selected} className='w-1/2' />
                )}
            </div>}
        </div>
    )
}

export default SinglePostPreview