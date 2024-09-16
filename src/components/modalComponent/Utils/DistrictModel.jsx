import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import Input from "@app/components/formComponent/Input";

export default function DistrictModel({ handleChangeModel ,inputData}) {
  const [t] = useTranslation();
  const [inputs, setInputs] = useState(inputData)
  const handlechange = (e) => {
    setInputs((val) => ({ ...val, [e.target.name]: e.target.value }))
  }
  useEffect(() => {
    handleChangeModel(inputs)
  }, [inputs])
  return (
    <div className="row p-2">
    <Input
      type="text"
      className="form-control"
      id="district"
      name="district"
      lable={t("modalComponent.Utils.DistrictModel.District")}
      placeholder=" "
      respclass="col-12"
      onChange={handlechange}
    />
 
  </div>
  )
}
