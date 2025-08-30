import info from "../assets/svg/table/info.svg";
import arrow from "../assets/svg/table/Arrow.svg";

import check from "../assets/svg/table/checkMark.svg";

import selected from "../assets/svg/table/SelectedCategory.svg";
import SearchInput from "./SearchInput";
import JobSiteTableData from "./JobSiteTableData";
import type { JobSite } from "../types/JobSiteType";
import { useEffect, useState } from "react";
// @ts-ignore
import { createJobSite } from "../api/JobSites";
import toast from "react-hot-toast";
function JobSiteTable({ jobSites }: { jobSites?: JobSite[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const [JobSitesList, setJobSitesList] = useState<JobSite[]>(jobSites || []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (jobSites) {
      setJobSitesList(jobSites);
    }
  }, [jobSites]);
  return (
    <div className="w-full h-full flex flex-col rounded-[10px] overflow-hidden bg-white">
      <div className="h-[45px] bg-[#F8F8FA] px-5 py-3">
        <p>Title</p>
      </div>
      <div className="flex justify-between px-5 h-[52px] items-center">
        <div className="flex gap-2.5">
          <img src={info} alt="info" className="max-w-[20px] max-h-[20px]" />
          <p className="openSans text-[14px] font-normal text-[#323338]">
            Informative piece of text that can be used regarding this modal.
          </p>
        </div>
        <div className="flex gap-5 py-5">
          <SearchInput />
          <div
            className="w-[150px] bg-[#71CF48] rounded-[5px] flex hover:bg-[#68C142] cursor-pointer"
            onClick={openModal}
          >
            <div className="w-[80%] h-full border-r border-[#68C142] flex justify-center items-center  ">
              <p className="openSans text-white ">Create</p>
            </div>
            <div className="w-[20%] h-full flex justify-center items-center">
              <p className="openSans text-white font-bold text-2xl">+</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <ShowForm closeModal={closeModal} setJobSitesList={setJobSitesList} />
      )}
      <JobSiteTableData jobSites={JobSitesList} />
    </div>
  );
}

function ShowForm({
  closeModal,
  setJobSitesList,
}: {
  closeModal: () => void;
  setJobSitesList?: React.Dispatch<React.SetStateAction<JobSite[]>>;
}) {
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [status, setStatus] = useState<number | "">("");

  const [showCategories, setShowCategories] = useState(false);

  const [showStatus, setshowStatus] = useState(false);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) => {
      const newArr = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];

      return newArr.sort((a, b) => a - b);
    });
  };

  const CreateJobSite = async () => {
    try {
      const data = {
        name: name,
        categoryIds: selectedCategories,
        status: status === "" ? 0 : status,
      };
      const response = await createJobSite(data);
      if (response.success && setJobSitesList) {
        setJobSitesList((prev) => [...prev, response.data]);
      }
      console.log(response);
    } catch (error) {
      console.error("Error creating job site:", error);
      toast.error(
      // @ts-ignore
        error.response?.data?.errorMessage || "Error creating item for job site"
      );
    }
    closeModal();
  };

  const statusText: Record<number | "", string> = {
    "": "Select One",
    0: "On Hold",
    1: "On Road",
    2: "Completed",
  };

  const statusColors: Record<number, string> = {
    0: "#FE4C4A",
    1: "#ECDE7C",
    2: "#7AC14D",
  };

  return (
    <div className="absolute inset-0 w-screen h-screen bg-[#21254B4D] flex justify-center items-center z-20">
      <div className="w-[868px] h-[388px] rounded-[10px] bg-white grid grid-rows-[45px_1fr] overflow-hidden">
        <div className="w-full  bg-[#F8F8FA] flex justify-between px-5 items-center">
          <p className="font-semibold text-[16px]">Title</p>
          <p
            className="cursor-pointer text-[#323338] font-bold"
            onClick={closeModal}
          >
            x
          </p>
        </div>
        <div className="w-full p-5 flex flex-col justify-between">
          <div>
            <div className="w-full h-auto flex gap-2.5">
              <img src={info} className="max-w-[20px]" alt="" />
              <p className="text-[#323338] text-[14px]">
                Informative piece of text that can be used regarding this modal.
              </p>
            </div>
            <form className="space-y-4">
              <div className="flex flex-col w-full">
                <label className="font-semibold mb-1 text-[#323338]">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full  rounded px-3 h-[32px]  bg-[#F5F5F7] focus:outline-none placeholder:text-[#E0E0E1] placeholder:font-normal placeholder:text-[14px]"
                  placeholder="Type the jobsite’s name"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-7/12">
                  <label className="font-semibold mb-1 text-[#323338]">
                    Category Included
                  </label>
                  <div className=" max-h-40  relative">
                    <div
                      className="w-full relative h-[32px] rounded-[5px] bg-[#F5F5F7] cursor-pointer flex justify-between px-2.5 items-center"
                      onClick={() => setShowCategories(!showCategories)}
                    >
                      <p className="openSans text-[14px] text-[#E0E0E1] select-none">
                        Select
                      </p>
                      <img
                        src={arrow}
                        className={`max-w-[11px] select-none  transition-all ${
                          showCategories ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    </div>
                    {showCategories && (
                      <div className="absolute w-full h-[96px] grid overflow-hidden grid-rows-3  bg-white  shadow-2xl rounded-b-[10px]">
                        <div
                          className={`px-2.5 flex justify-between items-center border-b border-[#EFEFEF]  cursor-pointer text-[#323338]  ${
                            selectedCategories.includes(1)
                              ? "bg-[#67AA3C] text-white"
                              : ""
                          }`}
                          onClick={() => toggleCategory(1)}
                        >
                          <p className="openSans text-[14px]">Sidewalk Shed</p>
                          <img src={check} alt="" />
                        </div>
                        <div
                          className={`px-2.5 flex justify-between items-center border-b border-[#EFEFEF]  cursor-pointer text-[#323338]  ${
                            selectedCategories.includes(2)
                              ? "bg-[#EFD652] text-white"
                              : ""
                          }`}
                          onClick={() => toggleCategory(2)}
                        >
                          <p className="openSans text-[14px]">Scaffold</p>
                          <img src={check} alt="" />
                        </div>
                        <div
                          className={`px-2.5 flex justify-between items-center border-b border-[#EFEFEF]  cursor-pointer text-[#323338] ${
                            selectedCategories.includes(3)
                              ? "bg-[#9640BE] text-white"
                              : ""
                          }`}
                          onClick={() => toggleCategory(3)}
                        >
                          <p className="openSans text-[14px]">Shoring</p>
                          <img src={check} alt="" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-5 mt-2.5">
                    {selectedCategories.map((id) => {
                      let bgColor = "";
                      let text = "";

                      if (id === 1) {
                        bgColor = "#67AA3C";
                        text = "Sidewalk Shed";
                      } else if (id === 2) {
                        bgColor = "#EFD652";
                        text = "Scaffold";
                      } else if (id === 3) {
                        bgColor = "#9640BE";
                        text = "Shoring";
                      }
                      return (
                        <div className="flex gap-1 items-center">
                          <div
                            className="rounded-full w-[10px] h-[10px] "
                            style={{
                              backgroundColor: bgColor,
                            }}
                          ></div>
                          <p className="openSans text-[12px] text-[#323338]">
                            {text}
                          </p>
                          <img src={selected} className="max-w-[18px]" alt="" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col w-5/12">
                  <label className="font-semibold mb-1 text-[#323338]">
                    Status
                  </label>
                  <div
                    className="relative w-full h-[32px] bg-[#F5F5F7] rounded-[5px]"
                    onClick={() => setshowStatus(!showStatus)}
                  >
                    <div className="flex justify-between items-center px-2.5 h-full">
                      {status === "" && (
                        <p className="openSans text-[14px] text-[#E0E0E1]">
                          Select One
                        </p>
                      )}
                      {status !== "" && (
                        <div className="flex gap-1 items-center">
                          <div
                            className="h-2.5 w-2.5 bg-[#7AC14D] rounded-full"
                            style={{ backgroundColor: statusColors[status] }}
                          ></div>
                          <p className="openSans text-[14px] text-[#323338]">
                            {statusText[status]}
                          </p>
                        </div>
                      )}
                      <img
                        src={arrow}
                        className={`max-w-[11px] select-none  transition-all ${
                          showStatus ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    </div>
                    {showStatus && (
                      <div className="absolute w-full h-[96px] grid grid-rows-3 overflow-hidden bg-white  shadow-2xl rounded-b-[10px] top-[32px] *:text-[14px] *:text-[#323338]">
                        <div
                          className="w-full h-full flex items-center px-2.5 hover:bg-[#7AC14D] hover:text-white"
                          onClick={() => setStatus(2)}
                        >
                          <p>Completed</p>
                        </div>
                        <div
                          className="w-full h-full flex items-center px-2.5 hover:bg-[#ECDE7C] hover:text-white"
                          onClick={() => setStatus(1)}
                        >
                          <p>On Road</p>
                        </div>
                        <div
                          className="w-full h-full flex items-center px-2.5 hover:bg-[#FE4C4A] hover:text-white"
                          onClick={() => setStatus(0)}
                        >
                          <p>On Hold</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-[32px] mb-5 px-5  flex justify-end items-center gap-5">
          <div className="w-[150px] h-full  bg-[#FE4C4A] flex rounded-[5px]">
            <div className="w-[80%] border-r border-[#EB4345] flex justify-center items-center">
              <p
                className="text-[14px] openSans text-white"
                onClick={closeModal}
              >
                Cancel Changes
              </p>
            </div>
            <div className="w-[20%] flex justify-center items-center">
              <img src={selected} className="max-w-[14px] h-full" alt="" />
            </div>
          </div>
          <div className="w-[150px] h-full bg-[#71CF48] flex rounded-[5px]">
            <div
              className="w-[80%] border-r border-[#68C142] flex justify-center items-center"
              onClick={CreateJobSite}
            >
              <p className="text-[14px] openSans text-white">Save Changes</p>
            </div>
            <div className="w-[20%] flex justify-center items-center">
              <img src={check} className="max-w-[14px] h-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSiteTable;
