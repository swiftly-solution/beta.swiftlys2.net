import * as React from "react"

import { cn } from "~/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { error?: string | undefined }>(
  ({ className, type, error, ...props }, ref) => {
    const [touched, setTouched] = React.useState(false)
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            error && touched ? "border-red-500 focus-visible:ring-red-600" : ""
          )}
          ref={ref}
          onChange={() => {
            if (touched == false) setTouched(true)
          }}
          {...props}
        />
        {error && touched ? <p className="text-red-500 text-xs">{error}</p> : null}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }