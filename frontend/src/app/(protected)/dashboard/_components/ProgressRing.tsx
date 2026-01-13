import { cn } from "@/lib/utils"

type ProgressRingProps = {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  label?: string
  sublabel?: string
}

function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  label,
  sublabel,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            className="text-secondary"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-primary transition-all duration-500 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">
            {progress}%
          </span>
        </div>
      </div>
      {label && (
        <div className="mt-3 text-center">
          <p className="font-medium text-foreground">{label}</p>
          {sublabel && (
            <p className="text-sm text-muted-foreground">{sublabel}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProgressRing
