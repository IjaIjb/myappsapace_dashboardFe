import { AxiosGlobal } from "../../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../../configs";
import { store } from "../../../store/store";



export class UserLiveApis extends AxiosGlobal{
    
    loginUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextUser}/${configs.apiList.LOGIN}`, data);
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