import type { ReactNode } from 'react'

import '@/components/css/tailwind.css'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

export default Wrapper
