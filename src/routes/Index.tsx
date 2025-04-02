import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const PersonalPage = lazy(() => import("../pages/auth/PersonalSignup"));
const VerifyEmailPage = lazy(() => import("../pages/auth/VerifyEmail"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPassword"));
const OTPVerifyPage = lazy(() => import("../pages/auth/OTPVerify"));
const PasswordResetSuccessPage = lazy(() => import("../pages/auth/PWordResetSuccess"));
const AddStorePage = lazy(() => import("../pages/auth/AddStore"));
const ChooseProfessionPage = lazy(() => import("../pages/auth/Profession"));
const UsagePage = lazy(() => import("../pages/auth/Usage"));
const HoldOnPage = lazy(() => import("../pages/auth/Holdon"));
const KycPage = lazy(() => import("../pages/auth/Kyc"));
const DashboardPage = lazy(() => import("../pages/dashboard/home/Home"));
const CustomerPage = lazy(() => import("../pages/dashboard/customers/Customers"));
const CreateCustomerPage = lazy(() => import("../pages/dashboard/customers/CreateCustomer"));
const CustomerDetailsPage = lazy(() => import("../pages/dashboard/customers/CustomerDetails"));
const ProductPage = lazy(() => import("../pages/dashboard/products/Products"));
const CreateProductPage = lazy(() => import("../pages/dashboard/products/CreateProduct"));
const ProductDetailsPage = lazy(() => import("../pages/dashboard/products/ProductDetails"));
const OrderPage = lazy(() => import("../pages/dashboard/orders/Orders"));
const TransactionPage = lazy(() => import("../pages/dashboard/transaction/Transaction"));
const TransactionDetailsPage = lazy(() => import("../pages/dashboard/transaction/TransactionDetails"));
const OrderDetailPage = lazy(() => import("../pages/dashboard/orders/OrderDetails"));
const CreateOrderPage = lazy(() => import("../pages/dashboard/orders/CreateOrder"));
const CategoryPage = lazy(() => import("../pages/dashboard/category/Category"));
const CouponPage = lazy(() => import("../pages/dashboard/coupon/Coupon"));
const CreateCouponPage = lazy(() => import("../pages/dashboard/coupon/CreateCoupon"));
const EditCouponPage = lazy(() => import("../pages/dashboard/coupon/EditCoupon"));
const CreateCategoryPage = lazy(() => import("../pages/dashboard/category/inner/CreateCategory"));
const StorePage = lazy(() => import("../pages/dashboard/store/Store"));
const EditStorePage = lazy(() => import("../pages/dashboard/store/EditStore"));
const CreateStorePage = lazy(() => import("../pages/dashboard/store/CreateStore"));
const ThemePage = lazy(() => import("../pages/dashboard/theme/Theme"));
const ClassicThemePage = lazy(() => import("../pages/dashboard/theme/previewTemplates/classicYoga/ClassicYoga"));
const FinancesPage = lazy(() => import("../pages/dashboard/finances/Finance"));
const GiftCardPage = lazy(() => import("../pages/dashboard/giftCards/GiftCards"));
const DiscountsPage = lazy(() => import("../pages/dashboard/discounts/Discounts"));
const AnalyticsPage = lazy(() => import("../pages/dashboard/analytics/Analytics"));
const MarketingPage = lazy(() => import("../pages/dashboard/marketing/Marketing"));
const SettingsPage = lazy(() => import("../pages/dashboard/settings/Settings"));
const GeneralInfoPage = lazy(() => import("../pages/dashboard/settings/inner/GeneralInfo"));
const PaymentPreferencePage = lazy(() => import("../pages/dashboard/settings/payment/Payment"));
const AboutPreferencePage = lazy(() => import("../pages/dashboard/settings/about/About"));
const PolicyPreferencePage = lazy(() => import("../pages/dashboard/settings/policy/Policy"));
const FaqPreferencePage = lazy(() => import("../pages/dashboard/settings/faq/Faq"));
const StaffAndPermissionPage = lazy(() => import("../pages/dashboard/settings/inner/StaffAndPermission"));
const ThemeSetupPage = lazy(() => import("../pages/dashboard/themeSetup/ThemeSetup"));
const SubscriptionPage = lazy(() => import("../pages/dashboard/subscription/Subscription"));
const HelpPage = lazy(() => import("../pages/dashboard/help/Help"));
const AddFlashSalesPage = lazy(() => import("../pages/dashboard/products/AddFlashSales"));
// const AnalyticsPage = lazy(() => import("../pages/dashboard/discounts/Discounts"));

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
  },
  {
    path: "/reset-success",
    component: PasswordResetSuccessPage,
  },
  {
    path: "/otp-verify",
    component: OTPVerifyPage,
  },
  {
    path: "/auth/signup",
    component: PersonalPage,
  },
  {
    path: "/auth/kyc",
    component: KycPage,
  },
  {
    path: "/auth/verify-email",
    component: VerifyEmailPage,
  },
  {
    path: "/auth/add-store",
    component: AddStorePage,
  },
  {
    path: "/auth/choose-profession",
    component: ChooseProfessionPage,
  },
  {
    path: "/auth/usage",
    component: UsagePage,
  },
  {
    path: "/auth/waiting",
    component: HoldOnPage,
  },
  {
    path: "/dashboard/home",
    component: DashboardPage,
  },
  {
    path: "/dashboard/customers",
    component: CustomerPage,
  },

  {
    path: "/dashboard/products",
    component: ProductPage,
  },
  {
    path: "/dashboard/create-product",
    component: CreateProductPage,
  },
  {
    path: "/dashboard/product-details/:productId",
    component: ProductDetailsPage,
  },
  {
    path: "/dashboard/add-flash-sales",
    component: AddFlashSalesPage,
  },
  {
    path: "/dashboard/order",
    component: OrderPage,
  },
  {
    path: "/dashboard/transaction",
    component: TransactionPage,
  },
  {
    path: "/dashboard/transaction-details/:trx_ref",
    component: TransactionDetailsPage,
  },
  {
    path: "/dashboard/order-details/:orderId",
    component: OrderDetailPage,
  },

  {
    path: "/dashboard/create-an-order",
    component: CreateOrderPage,
  },
  {
    path: "/dashboard/category",
    component: CategoryPage,
  },
  {
    path: "/dashboard/create-category",
    component: CreateCategoryPage,
  },
  {
    path: "/dashboard/coupon",
    component: CouponPage,
  },
  {
    path: "/dashboard/create-coupon",
    component: CreateCouponPage,
  },
  {
    path: "/dashboard/edit-coupon/:id",
    component: EditCouponPage,
  },
  {
    path: "/dashboard/site",
    component: StorePage,
  },
  {
    path: "/edit-store/:id",
    component: EditStorePage,
  },
  {
    path: "/dashboard/create-site",
    component: CreateStorePage,
  },
  {
    path: "/dashboard/theme",
    component: ThemePage,
  },
  {
    path: "/theme-preview/classic",
    component: ClassicThemePage,
  },
  {
    path: "/dashboard/finances",
    component: FinancesPage,
  },
  {
    path: "/dashboard/gift-cards",
    component: GiftCardPage,
  }, 
  {
    path: "/dashboard/discounts",
    component: DiscountsPage,
  }, 
  {
    path: "/dashboard/analytics",
    component: AnalyticsPage,
  }, 
  {
    path: "/dashboard/customers",
    component: CustomerPage,
  }, 
  {
    path: "/dashboard/create-customer",
    component: CreateCustomerPage,
  }, 
  {
    path: "/dashboard/customer-details/:customerId",
    component: CustomerDetailsPage,
  }, 
  {
    path: "/dashboard/marketing",
    component: MarketingPage,
  },
   {
    path: "/dashboard/settings",
    component: SettingsPage,
  }, 
  {
    path: "/dashboard/settings/general-information",
    component: GeneralInfoPage,
  }, 
  {
    path: "/dashboard/settings/payment-preference",
    component: PaymentPreferencePage,
  }, 
  {
    path: "/dashboard/settings/about-preference",
    component: AboutPreferencePage,
  }, 
  {
    path: "/dashboard/settings/faq-preference",
    component: FaqPreferencePage,
  }, 
  {
    path: "/dashboard/settings/policy-preference",
    component: PolicyPreferencePage,
  }, 
  {
    path: "/dashboard/settings/staff-and-permission",
    component: StaffAndPermissionPage,
  }, 
  {
    path: "/dashboard/setup-theme",
    component: ThemeSetupPage,
  }, 
  {
    path: "/dashboard/subscription",
    component: SubscriptionPage,
  }, 
  {
    path: "/dashboard/help-and-support",
    component: HelpPage,
  }, 
  
];

export default routes;
