import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardCreateCategory = () => {
  // const [productName, setProductName] = useState('');
  // const [loader, setLoader] = React.useState(false);
  const [img12, setImg12] = React.useState('empty');
  // const [img1, setImg1] = React.useState('No selected file');

  function uploadImg1(e:any) {
    let size = (e.target.files[0].size / 1048576.0)
    setImg12(URL.createObjectURL(e.target.files[0]))
    if (e.target.files && e.target.files[0]) {
      if (size > 1) {
        if (e.target.name == 'uploadImg1') {
          e.target.value = ''
          toast.warn('Image too large')
        }
      }
      if (size <= 1) {
        if (e.target.name == 'uploadImg1') {
          // setImg1(e.target.files[0]);
        }
      }
    }
  };

  return (
    <form 
    // onSubmit={createProduct} 
    className="pb-32 sm:px-3">
    <div className="flex mt-4 justify-between items-center">
                    {/* Back button */}
 {/* <button type="button" onClick={handleBackClick} className="flex items-center text-gray-600 mb-4">
      <FaArrowLeft className="mr-2" />
      <span>Back</span>
    </button> */}
      <div className="md:flex md:justify-end">
        {/* <div className="bg-blue-100 md:w-2/5 rounded-lg m-1 p-2">
          <span className=" bg-blue-100  rounded-lg  text-gray-500 text-[12px]"><span className=" text-red-500 bg-red-200 p-1 px-3 rounded-full text-[15px]">!</span><br />  ATTENTION : Please kindly note that the market link is the link where your customers will see the list of your products</span>
        </div> */}


        <div className="flex justify-end gap-2 mt-5">
         

          <button
            type="submit"
            className=" text-white h-10 bg-[#0071BC] hover:bg-[#103f5e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center "
          >
            Add Category
          </button>


        </div>

      </div>
</div>

      <div className={"lg:grid lg:grid-cols-2 gap-2 mt-10 " 
        // + (loader ? 'shadow animate-pulse ' : '')
        }>
        <div className="mb-10">
          <div className=" lg:w-4/5">
            <label htmlFor="first_name" className="block mb-2 mt-6 text-sm  text-gray-900 dark:text-gray-600">Category Name</label>
            <input required type="text"
            //  onChange={(e) => setProductName(e?.target?.value)} 
             id="first_name" className="bg-[#F4FBFF] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Category Name" />

          </div>
        </div>




        {/* second Div */}
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <label className="flex flex-col items-center justify-center w-full  rounded-[5px] cursor-pointer ">
              <div className="flex flex-col items-center justify-center  ">
                {img12 == 'empty' ? <img src="/images/img1.png" style={{ minHeight: '200px', maxHeight: "200px" }} /> : <img src={img12} style={{ minHeight: '200px', maxHeight: "200px" }} />}
              </div>
              <input id="dropzone-file" onChange={uploadImg1} accept="image/x-png,image/gif,image/jpeg" name='uploadImg1' type="file" className={"hidden mb-2 text-sm text-[#6C757D] font-medium"} />
            </label>
          </div>

         

        </div>

      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </form>
  )
}

export default CardCreateCategory