import { ReactNode } from "react"
import AppHeader from "../layout/AppHeader"

type MainWrapperProps = {
  title: string
  children: ReactNode
}

function MainWrapper({ title, children }: MainWrapperProps) {
  return (
    <div>
      <AppHeader title={title} />
      <div className="p-6">{children}</div>
    </div>
  )
}

export default MainWrapper
