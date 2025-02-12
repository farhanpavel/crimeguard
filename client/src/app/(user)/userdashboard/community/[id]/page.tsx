"use client"
import { X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { GiSecurityGate } from 'react-icons/gi'

const SinglePostPreview = () => {
    const {id} = useParams()
    const [selected, setselected] = useState<string>('')

    

  return (
    <div>
        <div className="p-9 space-y-2">
                <div className="flex gap-x-2 items-center text-green-600">
                  <GiSecurityGate className="text-3xl" />
                  <h1 className="text-2xl font-bold">Post Title</h1>
                </div>
                <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, voluptatem.
                </p>
                <div className="flex items-center">
                    <div>
                        {/* <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar> */}
                    </div>
                </div>
              <div className="flex overflow-x-scroll gap-3 ">
                {Array(5).fill("/images/detective-notebook.jpg").map((v,i)=>{
                    return <img onClick={e=> setselected(v)} key={i} src={v} className='w-[400px] rounded-lg'/>
                })}
              </div>
              <h1 className="text-center text-2xl md:text-4xl font-bold pt-10">Post Title</h1>
              <div>
                <p className='font-semibold text-sm text-green-600'>Description</p>
                <p className="text-gray-500 text-xs mt-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate explicabo eaque labore aut alias animi obcaecati sed asperiores quidem! Voluptates facilis illum magnam, nulla doloribus rem molestias mollitia pariatur dolorum.</p>
              </div>
        </div>
        {selected&&<div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center flex-col bg-black/50">
        <div className="w-1/2 flex justify-end text-white py-2">
        <button onClick={e=> setselected("")}><X size={23}/></button>
        </div>
        <img src={selected} className='w-1/2'/>
        </div>}
    </div>
  )
}

export default SinglePostPreview