import { AxiosPromise } from "axios";
import configs from "../../configs";

import { UserLiveApis } from "../live/userLive/userLiveApis";



export class UserApis {
    private static authLiveApis: UserLiveApis = new UserLiveApis();
    
    static login(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.loginUser(data);
        }
    }  

    static register(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.registerUser(data);
        }
    }  

    static verifyMail(pageNo:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.verifyMail(pageNo);
        }
    } 

    static resendVerificationCode(pageNo:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.resendVerificationCode(pageNo);
        }
    } 

    // static forgotPassword(data: any): AxiosPromise<any> {
    //     if (configs.type === "LOCAL") {
    //         return {} as AxiosPromise;
    //     } else {
    //         return this.authLiveApis.forgotPassword(data);
    //     }
    // }

    // static resetPassword(data: any): AxiosPromise<any> {
    //     if (configs.type === "LOCAL") {
    //         return {} as AxiosPromise;
    //     } else {
    //         return this.authLiveApis.resetPassword(data);
    //     }
    // }

    static createStore(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.createStore(data);
        }
    }

    static getStore(): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getStore();
        }
    } 

    static getSingleStore(identifier:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleStore(identifier);
        }
    } 

    static updateStore(store_id:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.updateStore(store_id, data);
        }
    } 

    static deleteStore(id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.deleteStore(id);
        }
    } 

    static createCategory(storeCode:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.createCategory(storeCode,data);
        }
    }

    static getCategory(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getCategory(storeCode);
        }
    } 

    static getSingleCategory(store_code:any, category_id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleCategory(store_code, category_id);
        }
    } 

    static createProduct(storeCode:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.createProduct(storeCode,data);
        }
    }

    static addProductToSale(storeCode:any, product_id:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.addProductToSale(storeCode, product_id, data);
        }
    }

    static getProduct(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getProduct(storeCode);
        }
    } 

    static getSingleProduct(store_code:any, category_id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleProduct(store_code, category_id);
        }
    } 

    
    static getOrder(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getOrder(storeCode, data);
        }
    } 

    static getSingleOrder(store_code:any, order_code:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleOrder(store_code, order_code);
        }
    } 

    static getSingleTransaction(store_code:any, transaction_ref:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleTransaction(store_code, transaction_ref);
        }
    } 

    static getTransaction(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getTransaction(storeCode, data);
        }
    } 

    static updateProduct(store_code:any, product_id:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.updateProduct(store_code, product_id, data);
        }
    } 

    static createCustomer(storeCode:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.createCustomer(storeCode,data);
        }
    }

    static getAllCustomer(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getAllCustomer(storeCode);
        }
    } 

    static getSingleCustomer(store_code:any, customer_id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleCustomer(store_code, customer_id);
        }
    } 

    static updateCustomer(store_code:any, customer_id:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.updateCustomer(store_code, customer_id, data);
        }
    } 

    static updateSettings(store_code:any, setcionName:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.updateSettings(store_code, setcionName, data);
        }
    }

    static getStoreSettings(store_code:any, sectionName:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getStoreSettings(store_code, sectionName);
        }
    } 

    static logout(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.logout(data);
        }
    }


}