import CardWrapper from '@/components/Card';
import React from 'react'

export default function SkeletonLoaderLoggedInDevices() {
  return (
    <CardWrapper name="Logged in Devices">
      {[1, 2, 3, 4, 5].map((_, index) => {
        return (
          <div className="flex items-center justify-between p-4 animate-pulse" key={index}>
            <div className="flex flex-col text-xs space-y-0.5">
              <div className="h-3 w-24 bg-gray-300  rounded"></div>
              <div className="h-3 w-32 bg-gray-300  rounded"></div> 
              <div className="h-2 w-40 bg-gray-300  rounded"></div>
            </div>
            <div className="h-8 w-8 bg-gray-300  rounded-sm"></div> 
          </div>
        );
      })}
    </CardWrapper>
  )
}
