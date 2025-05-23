import Axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import configs from '../../configs';
import { History } from 'history';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppRoutes } from '../../enums/routes';

import { store } from "../../store/store";
// import { type } from "os";
// import { toggleNotification, signoutUser } from '../../actions';
// import { AuthState } from "../../interfaces/states";


export class AxiosGlobal {
    private _requestType: string
    public axios: AxiosInstance;
    private history: History;

    toJSON(strOrObject: string | object): object {
        if (typeof strOrObject === "object") {
            return strOrObject;
        } else if (typeof strOrObject === "string") {
            return this.toJSON(JSON.parse(strOrObject));
        } else {
            return strOrObject;
        }
    }

    get requestType() {
        return this._requestType;
    }

    set requestType(type: string) {
        this._requestType = type;
        this.axios.defaults.headers.common["Content-Type"] = type;
    }

    constructor() {
        this._requestType = '';
         const tokenObj =  store.getState().data.login.value.token;
        this.history = configs.history;
        let headers:any = {
            'Content-Type': 'application/json',
            callerType: 'web'
        };

        if (tokenObj) {
            headers['Authorization'] = `Bearer ${tokenObj}`;
        }

        this.axios = Axios.create({
            baseURL: `${configs.contextUser}`,
            timeout: configs.requestTimeOut,
            headers: headers
        });
        // Add a request interceptor
        this.axios.interceptors.request.use((config) => {
            return config;
        }, (error: AxiosError) => {
            if (error.request && error.request.data) {
                return Promise.reject(error.request);
            } else {
                return Promise.reject(error);

            }
        });

        // Add a response interceptor
        this.axios.interceptors.response.use((response: AxiosResponse) => {
            return response;
        }, (error: AxiosError) => {
            if (error && error.response && error.response.status && (error.response.status === 401)) {
                return 'please login to proceed';
                // if (error?.response?.data?.message || error?.response?.data?.ErrorMessage) {
                //     if (error.response.data.name && error.response.data.name === 'TokenExipredError') {
                //         store.dispatch(signoutUser());
                //     }
                //     notification.message = error.response.data.message || error.response.data?.ErrorMessage;
                // }
                // store.dispatch(toggleNotification(notification));
                // store.dispatch(signoutUser());

                // navigate(AppRoutes.Account, true);
                // return Promise.reject({ ...error });
            } else if (error && error.response && error.response.status === 403) {
                return 'Unauthorized';
                // if (error?.response?.data?.message || error?.response?.data?.ErrorMessage) {
                //     notification.message = error.response.data.message || error.response.data.ErrorMessage;
                // }
                // store.dispatch(toggleNotification(notification));
                // return Promise.reject({ ...error });
            } else if (error && error.response && error.response.status === 400) {
                return 'One of the field validation failed';

                // if (error && Array.isArray(error?.response?.data)) {
                //     const arrayOfErrors = error.response.data.map((item: { ErrorMessage: string }) => item?.ErrorMessage);
                //     notification.message = arrayOfErrors.join(", ");
                // } else if (error?.response?.data?.ErrorMessage) {
                //     notification.message = error.response.data?.ErrorMessage;
                // } else if (error?.response?.data) {
                //     notification.message = error.response.data;
                // }

                // store.dispatch(toggleNotification(notification));

                // return Promise.reject(error);
            } else if (error?.response?.status === 404) {
                 return 'record not found';

                // if (error && Array.isArray(error.response.data)) {
                //     const arrayOfErrors = error.response.data.map((item: { ErrorMessage: string }) => item.ErrorMessage);
                //     notification.message = arrayOfErrors.join(", ");
                // } else if (error && error.response && error.response.data && error.response.data?.ErrorMessage) {
                //     notification.message = error.response.data.ErrorMessage;
                // }

                // store.dispatch(toggleNotification(notification));

                // return Promise.reject(error);
            } else if (error && error.response && error.response.status === 500) {
                return 'internal server error';
                // store.dispatch(toggleNotification(notification));

                // return Promise.reject(error);
            } else {
                return Promise.reject(error);
            }
        });
    }
}