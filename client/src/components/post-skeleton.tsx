import React from 'react'
import { Skeleton } from './ui/skeleton'

type Props = {}

const PostSkeleton = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-200 p-5 rounded-xl animate-pulse">
            <div className='flex flex-row justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className='flex flex-col'>
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-4 w-full" />
            <div>
              <Skeleton className="h-96 w-full rounded-lg object-cover" />
            </div>
            <div className='flex flex-row justify-between px-2'>
              <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className='flex gap-4'>
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
          </div>
  )
}

export default PostSkeleton