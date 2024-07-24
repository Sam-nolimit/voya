
const DashboardSearchBar = () => {
  return (
    <div>
     <div className="relative hidden justify-between items-center w-[500px] bg-[#F0F2F5] border px-[1em] py-[2px] rounded-[5px] border-solid border-gray-200 lg:flex gap-4">
        <span className="absolute left-2">
          <MagnifyingGlassIcon className="m-auto h-5 w-5 text-[#667185]" />
        </span>
        <input
          className="flex text-xs text-[#667185] pl-4 py-[0.5em] border-[none] outline-none w-[2700px] bg-inherit"
          type="search"
          placeholder='Search here...'
        />
      </div>
    </div>
  )
}

export default DashboardSearchBar