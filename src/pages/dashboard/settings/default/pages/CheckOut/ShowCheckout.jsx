import React, { Suspense, useEffect } from 'react';
import useAuth from '../../../../../features/hooks/useAuth';
import { useFormik } from "formik";
import * as Yup from "yup";
import useCart from '../../../../../features/hooks/useCart';
import useAddress from '../../../../../features/hooks/useAddress';
import useCheckout from '../../../../../features/hooks/useCheckout';

const AuthAddressDetails = React.lazy(() => import('./AuthAddressDetails'));
const GuestAddressDetails = React.lazy(() => import('./GuestAddressDetails'));
const CheckOuSummary = React.lazy(() => import('./CheckOuSummary'));
const PaymentMethod = React.lazy(() => import('./PaymentMethod'));
const NoCartSection = React.lazy(() => import('../Cart/NoCartSection'));
const DeliveryMethod = React.lazy(() => import('./DeliveryMethod'));

const CheckOutSkeleton = React.lazy(() => import('../../skeletons/Cart/CheckOutSkeleton'));


function ShowCheckout() {
    const { isAuthenticated, user } = useAuth();

    const { fetchAddresses, activeAddress } = useAddress();

    const { processCheckout } = useCheckout();

    const fetchAuthAddresses = async () => {
        await fetchAddresses();
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchAuthAddresses();   
        }
    }, [isAuthenticated]);

    const { items } = useCart();

    const storePaymentGateWays = ["flutterwave", "paystack", "pay_on_delivery", "stripe"];

    const formik = useFormik({
        initialValues: {
            recipient_name: "",
            phone_number: "",
            address_line_1: "",
            address_line_2: "",
            country: "",
            state: "",
            city: "",
            postal_code: "",
            email: "",
            payment_method: "",  // Common for both
            delivery_method: "", // Common for both
            coupon_code: null,     // Optional for both
        },
        validationSchema: Yup.object({
            recipient_name: isAuthenticated 
                ? Yup.string() 
                : Yup.string()
                    .min(8, "Full Name must be at least 8 characters long")
                    .required("Full Name is required"),
        
            phone_number: isAuthenticated 
                ? Yup.string() 
                : Yup.string()
                    .matches(
                        /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                        "Enter a valid phone number"
                    )
                    .required("Phone number is required"),
        
            address_line_1: isAuthenticated 
                ? Yup.string() 
                : Yup.string()
                    .min(8, "Address must be at least 8 characters long")
                    .required("Address Line 1 is required"),
        
            address_line_2: Yup.string(),
        
            country: isAuthenticated 
                ? Yup.string() 
                : Yup.string().required("Country is required"),
        
            state: isAuthenticated 
                ? Yup.string() 
                : Yup.string().required("State is required"),
        
            city: isAuthenticated 
                ? Yup.string() 
                : Yup.string().required("City is required"),
        
            postal_code: Yup.string(),
        
            email: isAuthenticated 
                ? Yup.string() 
                : Yup.string()
                    .email("Enter a valid email address")
                    .required("Email is required"),
        
            payment_method: Yup.string().required("Payment method is required"),
        
            delivery_method: Yup.string().required("Delivery method is required"),
        }),        
        onSubmit: async (values) => {
            let payload;
            if (isAuthenticated) {
                payload = {
                    customer_address_id: activeAddress ? activeAddress.id : null, // Fetch from user profile
                    delivery_method: values.delivery_method,
                    payment_method: values.payment_method,
                    coupon_code: values.coupon_code,
                };
            } else {
                payload = {
                    ...values,
                };
            }

            await processCheckout(payload, {
                onSuccess: (res) => {
                    window.location.href = res.paymentLink;
                }
            });

        },
    });
      
    const isAddressSelected = isAuthenticated
    ? !!activeAddress  // Ensure it doesn't crash if undefined
    : !!formik.values.recipient_name &&
      !!formik.values.phone_number &&
      !!formik.values.address_line_1 &&
      !!formik.values.country &&
      !!formik.values.state &&
      !!formik.values.city &&
      !formik.errors.recipient_name &&
      !formik.errors.phone_number &&
      !formik.errors.address_line_1 &&
      !formik.errors.country &&
      !formik.errors.state &&
      !formik.errors.city;


    const isDeliverySelected = !!formik.values.delivery_method && !formik.errors.delivery_method;

    const isPaymentSelected = !!formik.values.payment_method && !formik.errors.payment_method;

    const canProceed = isAddressSelected && isDeliverySelected && isPaymentSelected;

    return (
        <Suspense fallback={<CheckOutSkeleton />}>
            <>
        {items.length == 0 ? <NoCartSection /> : (
            <form onSubmit={formik.handleSubmit} className='w-full flex flex-col md:flex-row gap-6 p-4'>
            
                {/* Address, Card/ Payment Section */}
                <div className='w-full md:w-2/3 bg-white rounded-lg p-6 border self-start'>
                
                    {/* Delivery Section */}
                    <div className='mb-6'>

                        {
                            !isAuthenticated ? (
                                <GuestAddressDetails isAddressSelected={isAddressSelected} formik={formik} />
                            ) : (
                                <AuthAddressDetails />
                            )
                        }

                    </div>
                    
                    {/* Payment Options - Collapsed if no address */}
                    <PaymentMethod formik={formik} storePaymentGateWays={storePaymentGateWays} isAddressSelected={isAddressSelected} isPaymentSelected={isPaymentSelected} />

                    <div className="mt-5">
                        <DeliveryMethod
                            formik={formik} 
                            storeDeliveryMethods={["standard", "express", "pickup"]} 
                            isPaymentSelected={isPaymentSelected} 
                            isDeliverySelected={!!formik.values.delivery_method} 
                        />
                    </div>
                    

                </div>
                
                {/* Cart Summary Section */}
                <CheckOuSummary canProceed={canProceed} />

            </form>
        )}
        </>
        </Suspense>
    );
}

export default ShowCheckout;
