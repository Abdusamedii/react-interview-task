
function StatusOverview({counts}: {counts: { [key: number]: number }}) {
  return (
    <div className="w-full h-auto bg-white p-2.5 rounded-[10px]">
        <div className="grid grid-cols-3 gap-2.5 h-[104px] *:rounded-[10px]">
            <div className="h-full bg-[#ECDE7C] flex justify-center items-center">
                <p className="openSans font-semibold text-[30px] text-white"> {counts[1]} On Road</p>
            </div>
             <div className="h-full bg-[#7AC14D] flex justify-center items-center">
                <p className="openSans font-semibold text-[30px] text-white"> {counts[2]} Completed</p>
            </div> <div className="h-full bg-[#FE4C4A] flex justify-center items-center">
                <p className="openSans font-semibold text-[30px] text-white"> {counts[0]} On Hold</p>
            </div>
        </div>
    </div>
  )
}

export default StatusOverview