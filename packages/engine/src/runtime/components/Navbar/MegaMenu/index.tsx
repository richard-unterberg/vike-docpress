import { cmMerge } from '@classmatejs/react'
import { LayoutComponent } from '../../LayoutComponent'

export const MegaMenu = ({ isActive }: { isActive: boolean }) => {
  return (
    <div
      className={cmMerge(
        !isActive && 'pointer-events-none',
        'fixed top-0 left-0 w-full min-h-[calc(100svh-16*var(--spacing))] mt-16 z-4',
      )}
    >
      <div
        className={cmMerge(
          isActive ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-300 absolute inset-0 top-0 left-0 w-full h-full z-4 backdrop-blur-sm',
        )}
      >
        <div className="absolute -mt-16 h-full bg-linear-to-t via-base-100 to-base-100 w-full top-0 left-0" />
      </div>
      <div
        className={cmMerge(
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0  translate-y-10',
          'transition-all duration-300 relative z-4 ease-in-out',
        )}
      >
        <LayoutComponent $size="lg" className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Mega Menu</h2>
            <p className="text-base-muted mt-2">This is a placeholder for the mega menu content.</p>
          </div>
        </LayoutComponent>
      </div>
    </div>
  )
}
