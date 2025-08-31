import { useNavigate, useParams } from "react-router-dom";
import CoreScaffoldImage from "../assets/svg/ItemGrid/CoreScaffold.svg";
// @ts-ignore
import { getJobSiteCategoriesById } from "../api/JobSites";
import BackArrow from "../assets/svg/ItemGrid/BackArrow.svg";
import { useEffect, useState } from "react";
import type { JobSiteCategory } from "../types/JobSiteCategory";
import type { JobSiteItem } from "../types/JobSiteItem";
import info from "../assets/svg/table/info.svg";
import check from "../assets/svg/table/checkMark.svg";
// @ts-ignore
import { getItems } from "../api/Items";
import type { CreateJobSiteItem } from "../types/CreateItemForJobSite";
// @ts-ignore
import { getAllItems } from "../api/Items";
import type { Item } from "../types/Item";
// @ts-ignore
import { createItemForJobSite } from "../api/Items";
// @ts-ignore
import { updateItemForJobSite } from "../api/Items";
import type { UpdateItemJobSiteType } from "../types/UpdateItemJobSite";
import toast from "react-hot-toast";

function JobSite() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<JobSiteCategory[]>([]);
  const [items, setItems] = useState<JobSiteItem[] | null>(null);
  const [toggleCreateItem, setToggleCreateItem] = useState(false);
  const [updateItemId, setUpdateItemId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobSiteCategoriesById(id);
        setCategories(data.data);
      } catch (err) {
        console.error("Failed to load job site categories:", err);
      }
    }
    fetchData();
  }, [id]);

  const getItemsByCategoryId = async (categoryId: number) => {
    try {
      const response = await getItems(categoryId);
      setItems(response.data);
    } catch (err) {
      setItems([]);
      console.error("Failed to load items:", err);
    }
  };

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  return (
    <div className="container 3xl:max-width-[1920px] mx-auto h-screen p-2.5 grid grid-cols-[20%_1fr] bg-white gap-2.5">
      {toggleCreateItem && (
        <CreateItem
          setToggleCreateItem={setToggleCreateItem}
          id={activeCategoryId}
          // @ts-ignore
          setParentItems={setItems}
          ItemJobSiteID={updateItemId}
          setUpdateItemId={setUpdateItemId}
          parentItems={items}
        />
      )}
      <div className="h-[500px] grid grid-rows-[45px_1fr] gap-2.5 rounded-[10px] shadow overflow-hidden">
        <div className="w-full px-5 flex items-center bg-[#F8F8FA]">
          <p className="openSans font-semibold text-[#323338]">
            262 3rd Avenue, New York
          </p>
        </div>
        <div className="w-full flex flex-col bg-white px-2.5 justify-between">
          <div className="w-full flex flex-col gap-2.5">
            {categories.map((category) => {
              let bgColor = "#F8F8FA";
              switch (category.category.id) {
                case 1:
                  bgColor = "#67AA3C";
                  break;
                case 2:
                  bgColor = "#EFD652";
                  break;
                case 3:
                  bgColor = "#9640BE";
                  break;
                default:
                  bgColor = "#F8F8FA";
              }
              return (
                <div
                  key={category.id}
                  className={`w-full h-[32px] flex justify-center items-center bg-[#F8F8FA] rounded-[5px] cursor-pointer`}
                  onClick={() => {
                    getItemsByCategoryId(category.id);
                    setActiveCategoryId(category.id);
                    setUpdateItemId(null);
                  }}
                  style={{
                    backgroundColor:
                      activeCategoryId === category.id ? bgColor : "#F8F8FA",
                    color: activeCategoryId === category.id ? "white" : "black",
                    fontWeight: activeCategoryId === category.id ? "600" : "400",
                  }}
                >
                  <p>{category.category.name}</p>
                </div>
              );
            })}
          </div>
          <div className="w-full h-[32px] flex justify-center items-center gap-2.5">
            <div
              className="w-[150px] h-full flex bg-[#1264A3] rounded-[5px] mb-5 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <div className="w-[80%] h-full border-r border-[#0F5C97] flex items-center justify-center">
                <p className="text-[14px] text-white">Go Back</p>
              </div>
              <div className="w-[20%] h-full flex justify-center items-center">
                <img src={BackArrow} className="max-w-[17px]" alt="" />
              </div>
            </div>
            <div
              className="w-[150px] h-full flex bg-[#71CF48] rounded-[5px] mb-5 cursor-pointer"
              onClick={() => {
                setToggleCreateItem(true);
                setUpdateItemId(null);
              }}
            >
              <div className="w-[80%] h-full border-r border-[#68C142] flex items-center justify-center">
                <p className="text-[14px] text-white">Create</p>
              </div>
              <div className="w-[20%] h-full flex justify-center items-center">
                <p className="font-bold text-white text-[28px]">+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[500px] grid grid-rows-[45px_1fr] gap-2.5 rounded-[10px] shadow overflow-hidden">
        <div className="w-full px-5 flex items-center bg-[#F8F8FA]">
          <p className="openSans font-semibold text-[#323338]">Data Grid</p>
        </div>
        {items === null ? (
          <div className="w-full bg-white flex justify-center items-center flex-col gap-2.5">
            <img src={CoreScaffoldImage} className="max-w-[190px]" alt="" />
            <div className="flex flex-col items-center gap-[2px]">
              <p className="openSans font-semibold">No Service Selected</p>
              <p className="openSans">
                Please select a service on your left to proceed.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8f8fa] text-left">
                  <th className="p-2 openSans">ID</th>
                  <th className="p-2 openSans">Item Name</th>
                  <th className="p-2 openSans">Quantity</th>
                  <th className="p-2 openSans">Description</th>
                  <th className="p-2 openSans">Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-[#f8f8fa]"}`}
                    onClick={() => {
                      setUpdateItemId(item.id);
                      setToggleCreateItem(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="p-2 openSans">{item.id}</td>
                    <td className="p-2 openSans">{item.item.name}</td>
                    <td className="p-2 openSans">{item.quantity}</td>
                    <td className="p-2 openSans">{item.description}</td>
                    <td className="p-2 openSans">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSite;

function CreateItem({
  setToggleCreateItem,
  id,
  setParentItems,
  ItemJobSiteID = null,
  setUpdateItemId,
  parentItems
}: {
  setToggleCreateItem: (value: boolean) => void;
  id?: number | null;
  setParentItems: React.Dispatch<React.SetStateAction<JobSiteItem[] | null>>;
  ItemJobSiteID?: number | null;
  setUpdateItemId: (value: number | null) => void;
  parentItems: JobSiteItem[] | null;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [initialItemData, setInitialItemData] = useState<JobSiteItem | null>(null);

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const data = await getAllItems();
        setItems(data.data);
      } catch (err) {
        console.error("Failed to load all items:", err);
      }
    }
    fetchAllItems();
  }, []);

  useEffect(() => {
    if (ItemJobSiteID !== null && parentItems) {
      const itemToUpdate = parentItems.find(item => item.id === ItemJobSiteID);
      if (itemToUpdate) {
        setInitialItemData(itemToUpdate);
        setCreatedItem({
          jobSiteCategoryId: itemToUpdate.jobSiteCategoryId,
          itemId: itemToUpdate.itemId,
          quantity: itemToUpdate.quantity,
          description: itemToUpdate.description,
          note: itemToUpdate.note,
        });
      }
    } else {
      setInitialItemData(null);
      setCreatedItem({
        jobSiteCategoryId: id ?? 0,
        itemId: 0,
        quantity: 0,
        description: "",
        note: "",
      });
    }
  }, [ItemJobSiteID, parentItems, id]);

  const [createdItem, setCreatedItem] = useState<CreateJobSiteItem>({
    jobSiteCategoryId: id ?? 0,
    itemId: 0,
    quantity: 0,
    description: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ItemJobSiteID !== null) {
      handleUpdateItem();
    } else {
      handleCreateItem();
    }
  };

  const handleCreateItem = async () => {
    try {
      if (id === null) {
        toast.error("Job Site Category ID is not set.");
        return;
      }
      if (createdItem.itemId === 0 || createdItem.quantity <= 0) {
        toast.error("Item name and quantity must be valid.");
        return;
      }
      const data = await createItemForJobSite(createdItem);
      console.log("Item created successfully:", data.data);

      const selectedItem = items.find((item) => item.id === createdItem.itemId);
      if (!selectedItem) {
        toast.error("Selected item not found.");
        return;
      }

      setParentItems((prevItems) => {
        if (!prevItems) return null;
        return [
          ...prevItems,
          {
            id: data.data.id,
            item: selectedItem,
            quantity: createdItem.quantity,
            description: createdItem.description,
            note: createdItem.note,
            jobSiteCategoryId: createdItem.jobSiteCategoryId,
            itemId: createdItem.itemId,
            jobSiteCategory: {
              id: createdItem.jobSiteCategoryId,
              name: "",
            },
          },
        ];
      });
      setToggleCreateItem(false);
      setUpdateItemId(null);
      toast.success("Item created successfully!");
    } catch (error) {
      // @ts-ignore
      toast.error(error.response?.data?.errorMessage || "Error creating item for job site");
      console.error("Error creating item for job site:", error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      if (ItemJobSiteID === null) {
        toast.error("Item Job Site ID is not set for update.");
        return;
      }
      if (createdItem.itemId === 0 || createdItem.quantity <= 0) {
        toast.error("Item name and quantity must be valid.");
        return;
      }

      const updatedItem: UpdateItemJobSiteType = {
        itemJobSiteId: ItemJobSiteID,
        jobSiteCategoryId: createdItem.jobSiteCategoryId,
        itemId: createdItem.itemId,
        quantity: createdItem.quantity,
        description: createdItem.description,
        note: createdItem.note,
      };

      await updateItemForJobSite(updatedItem);
      console.log("Item updated successfully:", updatedItem);

      const selectedItem = items.find((item) => item.id === updatedItem.itemId);
      if (!selectedItem) {
        toast.error("Selected item not found.");
        return;
      }

      setParentItems((prevItems) => {
        if (!prevItems) return null;
        const updatedItems = prevItems.map((item) =>
          item.id === updatedItem.itemJobSiteId
            ? {
                ...item,
                item: selectedItem,
                quantity: updatedItem.quantity,
                description: updatedItem.description,
                note: updatedItem.note,
                jobSiteCategoryId: updatedItem.jobSiteCategoryId,
                itemId: updatedItem.itemId,
              }
            : item
        );
        return updatedItems;
      });
      setToggleCreateItem(false);
      setUpdateItemId(null);
      toast.success("Item updated successfully!");
    } catch (error) {
      // @ts-ignore
      toast.error(error.response?.data?.errorMessage || "Error updating item for job site");
      console.error("Error updating item for job site:", error);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-20 bg-[#21254B4D] flex justify-center items-center">
      <div className="w-[868px] h-auto bg-white flex flex-col gap-5 rounded-[10px] shadow-lg overflow-hidden">
        <div className="w-full h-[45px] bg-[#F8F8FA] flex justify-between px-5 items-center">
          <p>Title</p>
          <p
            className="font-bold text-[20px] cursor-pointer"
            onClick={() => {
              setToggleCreateItem(false);
              setUpdateItemId(null);
            }}
          >
            X
          </p>
        </div>
        <div className="flex gap-2.5 px-5">
          <img src={info} alt="" />
          <p>
            Informative piece of text that can be used regarding this modal.
          </p>
        </div>
        <form className="flex flex-col gap-2.5 px-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-0.5">
              <label className="openSans text-[14px] font-semibold">
                Item Name
              </label>
              <select
                className="h-[32px] bg-[#F5F5F7] placeholder:text-[#E0E0E1] px-3 rounded-md border-none focus:outline-none appearance-none overflow-y-auto"
                value={createdItem.itemId}
                onChange={(e) =>
                  setCreatedItem({ ...createdItem, itemId: parseInt(e.target.value, 10) })
                }
              >
                <option value={0} disabled className="text-[#E0E0E1]">
                  Select an item
                </option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="openSans text-[14px] font-semibold">
                Quantity
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter number"
                value={createdItem.quantity === 0 ? "" : createdItem.quantity}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCreatedItem({
                    ...createdItem,
                    quantity: value === "" ? 0 : parseInt(value, 10),
                  });
                }}
                className="h-[32px] w-full bg-[#F5F5F7] placeholder:text-[#E0E0E1] px-3 rounded-md border-none focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="openSans text-[14px] font-semibold">
              Description
            </label>
            <textarea
              placeholder="Type the description..."
              value={createdItem.description}
              onChange={(e) =>
                setCreatedItem({ ...createdItem, description: e.target.value })
              }
              className="min-h-[114px] w-full bg-[#F5F5F7] placeholder:text-[#E0E0E1] p-3 rounded-md border-none focus:outline-none resize-none"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="openSans text-[14px] font-semibold">Notes</label>
            <textarea
              placeholder="Type a note..."
              value={createdItem.note}
              onChange={(e) =>
                setCreatedItem({ ...createdItem, note: e.target.value })
              }
              className="min-h-[114px] w-full bg-[#F5F5F7] placeholder:text-[#E0E0E1] p-3 rounded-md border-none focus:outline-none resize-none"
            />
          </div>
        </form>
        <div className="mb-5 w-full h-[32px] flex justify-end px-5">
          <div
            className="w-[150px] h-full flex bg-[#71CF48] rounded-[5px] cursor-pointer"
            onClick={handleSubmit}
          >
            <div className="w-[80%] h-full border-r border-[#68C142] flex justify-center items-center text-white">
              <p>{ItemJobSiteID? "Update":"Save Changes"}</p>
            </div>
            <div className="w-[20%] h-full flex items-center justify-center">
              <img src={check} className="max-w-[14px]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}