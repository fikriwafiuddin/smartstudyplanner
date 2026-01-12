import { ReactNode } from "react"
import AppHeader from "../layout/AppHeader"

type MainWrapperProps = {
  title: string
  subtitle: string
  children: ReactNode
}

function MainWrapper({ title, subtitle, children }: MainWrapperProps) {
  return (
    <div>
      <AppHeader title={title} subtitle={subtitle} />
      <div className="p-6">{children}</div>
    </div>
  )
}

export default MainWrapper
