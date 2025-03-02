import React from 'react'
import { NavLink } from "react-router-dom";

const PWordResetSuccess = () => {
      // const [storeLogo, setStoreLogo] = useState<any>(null); // Store logo URL
    
            // useEffect(() => {
            // const storedLogo = localStorage.getItem("storeLogo");
           
            //     if (storedLogo) {
            //         setStoreLogo(storedLogo);
            //     }
            // }, []);
  return (
    <>
    {/* <!-- Start block --> */}
    <section className="bg-[#FBFBFB] min-h-screen pt-16 pb-32">
        <div className="container flex flex-col md:justify-center mx-auto items-center rounded-lg p-6 md:max-w-3xl">
        
        <div>
            <div className='flex justify-center'>
            <a href="https://myappspace.net/" rel="noreferrer" target="_blank">
            <img
              src="/images/auth/MyAppspace (3).png"
              className="w-[170px] h-full"
              alt="Logo"
            />
            </a>
          </div>
            <h1 className="mt-6 text-[#000] lg:text-[32px] text-[28px] font-semibold text-center">  All done!</h1>
            <p className='mt-4 text-center text-[#00000080] text-[14px] font-normal'> Your password has been reset.</p>
          </div>

        
           

            <div className="mt-20">
              <form>

               <NavLink to={"/"} className=" ">
                  <button
                    type="button"
                    className="w-full disabled:bg-gray-500  text-white bg-secondary hover:bg-secondary/[70%] focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"

                  >
                    Continue to Login
                  </button>
                </NavLink>
               
              </form>

             
            </div>
        
        </div>
      </section>

      {/* <!-- End block --> */}
    </>
  )
}

export default PWordResetSuccess