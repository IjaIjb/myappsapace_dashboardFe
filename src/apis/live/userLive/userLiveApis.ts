import { AxiosGlobal } from "../../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../../configs";
import { store } from "../../../store/store";



export class UserLiveApis extends AxiosGlobal{
    
    loginUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${configs.apiList.LOGIN}`, data,
            {
                headers: {
                  "Content-Type": "application/json",
                },
              }
        );
    }


    registerUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${configs.apiList.REGISTER}`, data);
    } 

    verifyMail(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/auth/verify-account`, data);
    }

    resendVerificationCode(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/auth/resend-code`, data);
    }

    // forgotPassword(data:any): AxiosPromise<any> {
    //     return this.axios.post(`${configs.contextUser}/forgot`, data);
    // }

    // resetPassword(data:any): AxiosPromise<any> {
    //     return this.axios.post(`${configs.contextUser}/reset`, data);
    // }

    createStore(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/store/create`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getStore(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/store/allStores`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSingleStore(identifier:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/store/${identifier}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    updateStore(store_id:any, data:any): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.contextUser}/store/${store_id}/update`,  data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    deleteStore(id: any): AxiosPromise<Array<any>> {
        return this.axios.delete(`${configs.contextUser}/store/${id}/remove`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }
    
    createCategory(storeCode:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${storeCode}/categories/createOne`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getCategory(storeCode:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${storeCode}/categories/fetchAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSingleCategory(store_code:any, category_id:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/categories/${category_id}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    createProduct(storeCode:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${storeCode}/products`, data,{
            headers: { "Content-Type": "aplication/json", "Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }
 
    getProduct(storeCode:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${storeCode}/products`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSingleProduct(store_code:any, product_id:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/products/${product_id}`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    
    updateProduct(store_code:any, product_id:any, data:any): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.contextUser}/${store_code}/products/${product_id}`,  data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }


    createCustomer(storeCode:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${storeCode}/customers/create`, data,{
            headers: { "Content-Type": "aplication/json", "Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getAllCustomer(storeCode:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${storeCode}/customers/getAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSingleCustomer(store_code:any, customer_id:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/customers/getOne/${customer_id}`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    updateCustomer(store_code:any, customer_id:any, data:any): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.contextUser}/${store_code}/customers/update/${customer_id}`,  data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    logout(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/logout`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }
    
    // getAllHouses(cursor:any): AxiosPromise<Array<any>> {
    //     return this.axios.get(`${configs.context}/${configs.apiList.HOSTELS}/${configs.apiList.GET_ALL_HOSTEL}?cursor=${cursor}`,{
    //         headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
    //       });
    // }


    // getAllUsers(cursor:any): AxiosPromise<Array<any>> {
    //     return this.axios.get(`${configs.context}/${configs.apiList.GET_ALL_USERS}?cursor=${cursor}`,{
    //         headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
    //       });
    // }



    //  loginUser(data:any): AxiosPromise<any> {
    //      return this.axios.post(`${configs.context}/login`, data,{
    //         headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":'Bearer 2|X4dvppS3EugstZmfvKwPbf4jBF7Y70OYvKGjdFnQ',"Access-Control-Allow-Origin":"*" },
    //       });
    // }


}