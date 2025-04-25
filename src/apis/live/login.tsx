import axios from "axios"
import { toast } from "react-toastify"


// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.myappspace.net/v1/user",
  headers: {
    "Content-Type": "application/json",
  },
})


// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = error.response?.data?.message || "An error occurred while making the request"
    // console.error("API Error:", message)
    toast.error(message)
    return Promise.reject(error)
  },
)

// Auth services
export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post("auth/login", credentials)
      return { success: true, data: response.data }
    } catch (error:any) {
      // Error is already handled by the interceptor
      return { success: false, error: error.response?.data?.message || "Login failed" }
    }
  },

  forgotPassword: async (data:any) => {
    try {
      const response = await api.post("auth/forgot-password", data)
      return { success: true, data: response.data }
    } catch (error:any) {
      // Error is already handled by the interceptor
      return { success: false, error: error.response?.data?.message || "Login failed" }
    }
  },

  resetPassword: async (data:any) => {
    try {
      const response = await api.post("auth/reset-password", data)
      return { success: true, data: response.data }
    } catch (error:any) {
      // Error is already handled by the interceptor
      return { success: false, error: error.response?.data?.message || "Login failed" }
    }
  },

  createSite: async (credentials:any) => {
    try {
      const response = await api.post("/store/create", credentials, {
        headers: {
          'Content-Type': 'multipart/form-data', // Override the default Content-Type
        },
      })
      return { success: true, data: response.data }
    } catch (error:any) {
      // Error is already handled by the interceptor
      return { success: false, error: error.response?.data?.message || "Login failed" }
    }
  },

  updateSite: async (store_id:any, credentials:any) => {
    try {
      const response = await api.post(`/store/${store_id}/update`, credentials, {
        headers: {
          'Content-Type': 'multipart/form-data', // Override the default Content-Type
        },
      })
      return { success: true, data: response.data }
    } catch (error:any) {
      // Error is already handled by the interceptor
      return { success: false, error: error.response?.data?.message || "Login failed" }
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/admin/logout")
      return { success: true, data: response.data }
    } catch (error:any) {
      return { success: false, error: error.response?.data?.message || "Logout failed" }
    }
  },

  createAdmin: async (adminData: any) => {
    try {
      const response = await api.post("/admin/create", adminData)
      return { success: true, data: response.data }
    } catch (error:any) {
      return { success: false, error: error.response?.data?.message || "Failed to create admin" }
    }
  },
}

