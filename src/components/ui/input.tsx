import * as React from "react"

import { cn } from "@/utils/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full  bg-white border rounded-sm focus-within:ring-1 focus-within:ring-blue-700">
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border-none bg-transparent px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
