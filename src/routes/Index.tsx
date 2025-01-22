import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const PersonalPage = lazy(() => import("../pages/auth/PersonalSignup"));
const VerifyEmailPage = lazy(() => import("../pages/auth/VerifyEmail"));
const AddStorePage = lazy(() => import("../pages/auth/AddStore"));
const ChooseProfessionPage = lazy(() => import("../pages/auth/Profession"));
const UsagePage = lazy(() => import("../pages/auth/Usage"));
const HoldOnPage = lazy(() => import("../pages/auth/Holdon"));
const DashboardPage = lazy(() => import("../pages/dashboard/home/Home"));
const CustomerPage = lazy(() => import("../pages/dashboard/customers/Customers"));
const CustomerDetailsPage = lazy(() => import("../pages/dashboard/customers/CustomerDetails"));
const ProductPage = lazy(() => import("../pages/dashboard/products/Products"));
const ProductDetailsPage = lazy(() => import("../pages/dashboard/products/ProductDetails"));
const OrderPage = lazy(() => import("../pages/dashboard/orders/Orders"));
const OrderDetailPage = lazy(() => import("../pages/dashboard/orders/OrderDetails"));
const CreateOrderPage = lazy(() => import("../pages/dashboard/orders/CreateOrder"));
const ThemePage = lazy(() => import("../pages/dashboard/theme/Theme"));
const FinancesPage = lazy(() => import("../pages/dashboard/finances/Finance"));
const GiftCardPage = lazy(() => import("../pages/dashboard/giftCards/GiftCards"));
const DiscountsPage = lazy(() => import("../pages/dashboard/discounts/Discounts"));
const AnalyticsPage = lazy(() => import("../pages/dashboard/analytics/Analytics"));
const MarketingPage = lazy(() => import("../pages/dashboard/marketing/Marketing"));
const SettingsPage = lazy(() => import("../pages/dashboard/settings/Settings"));
const GeneralInfoPage = lazy(() => import("../pages/dashboard/settings/inner/GeneralInfo"));
const StaffAndPermissionPage = lazy(() => import("../pages/dashboard/settings/inner/StaffAndPermission"));
const ThemeSetupPage = lazy(() => import("../pages/dashboard/themeSetup/ThemeSetup"));
const SubscriptionPage = lazy(() => import("../pages/dashboard/subscription/Subscription"));
const HelpPage = lazy(() => import("../pages/dashboard/help/Help"));
// const AnalyticsPage = lazy(() => import("../pages/dashboard/discounts/Discounts"));

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/auth/signup",
    component: PersonalPage,
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
    path: "/dashboard/product-details/:productId",
    component: ProductDetailsPage,
  },
  {
    path: "/dashboard/order",
    component: OrderPage,
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
    path: "/dashboard/theme",
    component: ThemePage,
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
