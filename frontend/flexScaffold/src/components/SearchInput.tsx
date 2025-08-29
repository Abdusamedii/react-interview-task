import SearchLogo from "../assets/svg/table/SearchLogo.svg";
function SearchInput() {
  return (
    <div className="relative h-auto ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
       <img src={SearchLogo} className="max-w-[15px] max-h-[15px]" alt="" />
      </div>

      <input
        type="text"
        placeholder="Search a job site"
        className="w-full px-[35px] py-1.5 border border-[#EAEAEA] rounded-[5px] "
      />
    </div>
  );
}

export default SearchInput;
