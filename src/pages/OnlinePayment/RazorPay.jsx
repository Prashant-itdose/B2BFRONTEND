import React, { useEffect } from "react";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

const RazorPay = ({
  AnotherPageCommonFunction,
  IsOpen,
  payload,
  setIsRazorPayOpen,
}) => {
  const key = "12345678123456781234567812345678";

  function otpDecrypt(ciphertext, key) {
    let decryptedText = "";

    for (let i = 0; i < ciphertext.length; i++) {
      const ciphertextCharCode = ciphertext.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i);
      const decryptedCharCode = ciphertextCharCode ^ keyCharCode; // XOR operation

      decryptedText += String.fromCharCode(decryptedCharCode);
    }

    return decryptedText;
  }

  useEffect(() => {
    if (IsOpen) {
      checkoutHandler(payload);
    } else {
      getRazorPayDetails();
    }
  }, [IsOpen]);

  const getRazorPayDetails = () => {
    // Simulate fetching payment details
    const mockPaymentDetails = {
      payment_capture: 1,
      DueDate: new Date(new Date().setDate(new Date().getDate() + 10)), // Mock due date 10 days from now
      SuperAdmin: 1,
      amount: 50000, // Mock amount: 500.00 INR
      key_secret: "mock_key_secret",
    };

    const current = new Date();
    const due = new Date(mockPaymentDetails.DueDate);
    const timeDifference = due - current;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (
      mockPaymentDetails.payment_capture === 1 &&
      daysDifference <= 15 &&
      mockPaymentDetails.SuperAdmin === 1
    ) {
      checkoutHandler(mockPaymentDetails);
    }
  };

  const checkoutHandler = (payload) => {
    // Mock order creation
    const mockOrderData = {
      id: "order_mock_12345",
      amount: payload?.amount || 50000, // Mock amount: 500.00 INR
      currency: "INR",
    };

    const options = {
      key: otpDecrypt(payload?.key_id, key) || "mock_key_id",
      amount: mockOrderData.amount,
      currency: "INR",
      name: "ElabPro",
      description: "Test Transaction",
      image: "https://s3.ap-south-1.amazonaws.com/frontend.elabpro.in/logo.jpg",
      order_id: mockOrderData.id,
      notes: {
        payload: mockOrderData,
      },
      prefill: {
        name: "Elab",
        email: "elab@itdoseinfo.com",
        contact: "9999999999",
      },
      theme: {
        color: "#7470ba",
      },
      handler: function (response) {
        const mockResponse = {
          razorpay_payment_id: "pay_mock_12345",
          razorpay_order_id: mockOrderData.id,
          razorpay_signature: "mock_signature",
        };

        const datas = {
          ...payload,
          receipt: payload?.receipt,
          key_secret: payload?.key_secret,
          KeyID: mockOrderData.id,
          razorpay_payment_id: mockResponse.razorpay_payment_id,
          razorpay_order_id: mockResponse.razorpay_order_id,
          razorpay_signature: mockResponse.razorpay_signature,
        };

        console.log("Mock Payment Successful", datas);
        toast.success("Mock Payment Successful!");

        if (IsOpen) {
          AnotherPageCommonFunction({ ...datas });
        } else {
          window.location.reload();
        }
      },
      modal: {
        ondismiss: function () {
          IsOpen && setIsRazorPayOpen(false);
        },
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return <></>;
};

export default RazorPay;
