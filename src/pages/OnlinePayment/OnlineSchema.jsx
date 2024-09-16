export const OnlinePaymentValidationSchema = (payload) => {
    let err = "";
    if (payload?.RateTypeId === "") {
      err = { ...err, RateTypeId: "This Field is Required" };
    }
    if (payload?.Amount === "") {
      err = { ...err, Amount: "This Field is Required" };
    }
}