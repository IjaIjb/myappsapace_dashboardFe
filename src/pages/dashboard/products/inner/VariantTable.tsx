import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

interface Variant {
  id: number;
  name: string;
  price: string;
  available: string;
}

const VariantTable = () => {
  const [variants, setVariants] = useState<Variant[]>([
    { id: 1, name: "Blue", price: "$13.99", available: "" },
    { id: 2, name: "Purple", price: "$13.99", available: "" },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { id: variants.length + 1, name: "", price: "", available: "" },
    ]);
  };

  return (
    <div>
      <div className="p-4">
        <div className="">
          <div className="flex justify-end pb-3">
            <button
              onClick={addVariant}
              className="flex items-center bg-[#796BEB1A]/[10%] px-3 w-fit py-1 mt-4 rounded-[5px] gap-2"
            >
              <IoAddCircleOutline className="" />

              <h5 className="text-[10px] font-[400]">Add Variant</h5>
            </button>
            {/* <button
        onClick={addVariant}
        className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300 focus:outline-none"
      >
        Add Variant
      </button> */}
          </div>
          <table className="w-fit ">
            <thead className="w-full">
              <tr className="bg-[#F1F1FB] w-full rounded-[6px]">
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Variant
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Price
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Available
                </th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr
                  key={variant.id}
                  className=" border-gray-200 w-fit hover:bg-gray-50"
                >
                  <td className=" py-2 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm10 2a3 3 0 11-6 0 3 3 0 016 0zm-4 7a4 4 0 01-4-4H4a5 5 0 005 5v-1zm2 0v1a5 5 0 005-5h-2a4 4 0 01-4 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) =>
                        setVariants(
                          variants.map((v) =>
                            v.id === variant.id
                              ? { ...v, name: e.target.value }
                              : v
                          )
                        )
                      }
                      placeholder="Variant Name"
                      // className="border border-gray-300 rounded-md px-2 py-1 focus:ring focus:ring-indigo-200 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={variant.price}
                      onChange={(e) =>
                        setVariants(
                          variants.map((v) =>
                            v.id === variant.id
                              ? { ...v, price: e.target.value }
                              : v
                          )
                        )
                      }
                      placeholder="$0.00"
                      className="border w-full border-gray-300 rounded-md px-2 py-1 focus:ring focus:ring-indigo-200 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={variant.available}
                      onChange={(e) =>
                        setVariants(
                          variants.map((v) =>
                            v.id === variant.id
                              ? { ...v, available: e.target.value }
                              : v
                          )
                        )
                      }
                      placeholder="Available"
                      className="border w-full border-gray-300 rounded-md px-2 py-1 focus:ring focus:ring-indigo-200 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VariantTable;
