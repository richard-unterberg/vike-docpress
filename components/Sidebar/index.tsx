import MenuTab from '@/components/Sidebar/MenuTab'
import baseAssets from '@/lib/baseAssets'

const Sidebar = () => {
  return (
    <div className="-ml-4 sticky top-16 shadow-lg shadow-base-300 ">
      <img
        src={`${baseAssets}decorators/nav-shade.avif`}
        alt=""
        width={400}
        height={400}
        className="w-150 absolute right-px top-0 hidden dark:block opacity-100 z-2 pointer-events-none"
      />
      <div className="absolute h-full w-px right-0 top-0 bg-linear-to-t to-mdex-grey via-mdex-grey from-mdex-grey/20 pointer-events-none z-1"></div>
      <div className="pr-4 h-[calc(100svh-16*var(--spacing))] overflow-y-scroll overflow-x-hidden  relative z-10">
        <MenuTab />
      </div>
    </div>
  )
}

export default Sidebar
