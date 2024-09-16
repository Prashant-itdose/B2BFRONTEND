import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const RazorPayLink = ({
  payload,
  IsOpen,
  AnotherPageCommonFunction,
  setIsRazorPayOpen,
}) => {
  const checkPaymentStatus = async (order_id, pLink) => {
    try {
      const { data } = await axios.post("/api/v1/RazorPay/paymentstatus", {
        order_id: order_id,
        pLink: pLink,
      });
      if (data.success) {
        toast.success("Payment successful!");
        return true;
      } else {
        console.log("Payment not completed yet.");
        return false;
      }
    } catch (error) {
      toast.error("Error checking payment status.");
      return false;
    }
  };

  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  const guidNumber = () => {
    const guidNumber =
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4();
    return guidNumber;
  };

  const getPaymentLink = () => {
    axios
      .post("/api/v1/RazorPay/createPaymentLink", {
        amount: payload?.amount,
        receipt: guidNumber(),
        mobile: payload?.Mobile,
        email: payload?.Email,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.paymentLink.short_url);
          const order_id = res.data.paymentLink.notes.order_id;
          let intervalId = setInterval(async () => {
            const success = await checkPaymentStatus(
              order_id,
              res.data.paymentLink.id
            );
            if (success) {
              setIsRazorPayOpen(false);
              AnotherPageCommonFunction(order_id);
              clearInterval(intervalId);
            }
          }, 2000);
          setTimeout(() => {
            setIsRazorPayOpen(false);
            clearInterval(intervalId);
            toast.info("Payment status check timeout.");
          }, 180000);
        } else {
          setIsRazorPayOpen(false);
          toast.error("Failed to create payment link");
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occur"
        );
      });
  };

  useEffect(() => {
    getPaymentLink();
  }, []);

  return <></>;
};

export default RazorPayLink;
