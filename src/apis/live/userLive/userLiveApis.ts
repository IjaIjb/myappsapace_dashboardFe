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

    submitKycQuestionaire(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/business-questionnaire/submit`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    resendVerificationCode(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/auth/resend-code`, data);
    }

    forgotPassword(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/auth/forgot-password`, data);
    }

    resetPassword(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/auth/reset-password`, data);
    }

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

    updateStoreLogo(store_id:any, data:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.contextUser}/store/${store_id}/updateLogo`,  data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    deleteStore(id: any): AxiosPromise<Array<any>> {
        return this.axios.delete(`${configs.contextUser}/store/${id}/remove`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }
    
    getDeliveries(store_code:any, company_name:any ): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/deliveries/fetchAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
            params: { company_name }
        });
    }

    getTrackOneOrder(store_code:any, trackingNumber:any ): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/deliveries/${trackingNumber}/trackOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" }
        });
    }

    getOneOrder(store_code:any, trackingNumber:any ): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/deliveries/${trackingNumber}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" }
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

    createCoupon(storeCode:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${storeCode}/coupons/addNew`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getCoupon(storeCode:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${storeCode}/coupons/getAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    updateCoupon(storeCode:any, coupon_id:any, data:any): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.contextUser}/${storeCode}/coupons/${coupon_id}/update`,  data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSingleCoupon(store_code:any, coupon_id:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/coupons/${coupon_id}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    deleteCoupon(storeCode:any, coupon_id: any): AxiosPromise<Array<any>> {
        return this.axios.delete(`${configs.contextUser}/${storeCode}/coupons/${coupon_id}/remove`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }
  

    createProduct(storeCode:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${storeCode}/products`, data,{
            headers: { "Content-Type": "aplication/json", "Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    addProductToSale(storeCode:any, product_id:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${storeCode}/products/${product_id}/sale`, data,{
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

    getOrder(storeCode:any, params ={}): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${storeCode}/orders/getAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
            params,
        });
    }

    getSingleOrder(store_code:any, order_code:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/orders/${order_code}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }
    
    getSingleTransaction(store_code:any, transaction_reference:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/transactions/${transaction_reference}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getTransaction(storeCode:any, params ={}): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${storeCode}/transactions/getAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
            params,
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

    updateSettings(store_code:any,sectionName:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${store_code}/settings/${sectionName}/updateSection`, data,{
            headers: { "Content-Type": "aplication/json", "Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getStoreSettings(store_code:any, sectionName:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/${store_code}/settings/getSection/${sectionName}`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getCountry(page = 1): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextUser}/location/countries?page=${page}`, {
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