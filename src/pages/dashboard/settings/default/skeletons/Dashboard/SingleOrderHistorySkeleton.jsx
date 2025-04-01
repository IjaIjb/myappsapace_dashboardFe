import React from 'react'

function SingleOrderHistorySkeleton() {
  return (
    <div className="flex gap-x-10">

        <div className="w-[20%] self-start py-3 rounded-lg bg-white border shadow-md animate-pulse">
            <ul className="space-y-2">
            {Array.from({ length: 9 }).map((_, index) => (
                <li key={index} className="flex items-center gap-3 py-3 px-6">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                </li>
            ))}
            </ul>
        </div>

        <div className="w-[80%] p-2">
          <div className="w-full border rounded-lg my-5 overflow-hidden animate-pulse">
            {/* Header */}
            <div className="flex justify-between border-b px-3 py-4 items-center bg-gray-200">
              <div className="h-6 w-40 bg-gray-300 rounded"></div>
              <div className="h-6 w-20 bg-gray-300 rounded"></div>
            </div>

            {/* Order Summary */}
            <div className="middleSection border-b p-6 space-y-5">
              <div className="bg-gray-200 rounded-md p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="h-6 w-32 bg-gray-300 rounded"></div>
                  <div className="h-8 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center justify-between p-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Activity */}
            <div className="p-4 md:p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-300 rounded mt-2"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Items */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 bg-gray-300 h-6 w-40 rounded"></h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      {["Products", "Price", "Quantity", "Action"].map((title, index) => (
                        <th key={index} className="text-left py-3 px-4 font-lato text-xs font-semibold">
                          {title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 2 }).map((_, index) => (
                      <tr key={index} className="border-b bg-gray-100">
                        <td className="py-4 px-4 flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gray-300 rounded-md"></div>
                          <div className="flex-1">
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                            <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          <div className="h-4 w-12 bg-gray-300 rounded"></div>
                        </td>
                        <td className="text-center py-4 px-4">
                          <div className="h-4 w-8 bg-gray-300 rounded"></div>
                        </td>
                        <td className="text-right py-4 px-4">
                          <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SingleOrderHistorySkeleton