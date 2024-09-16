import React, { Fragment } from 'react'
import PatientRegistration from "../../pages/frontOffice/PatientRegistration/Index";


export default function SeeMoreList(BindSeeMoreListData, PatientID) {
    let seeMore = []
    BindSeeMoreListData?.map((item) => {
        let obj = {}
        if (item?.MenuURL === "PatientRegistration") {
            obj.name = item?.MenuName
            obj.component = <PatientRegistration PatientID={PatientID} type={"update"} />
        } else {
            obj.name = item?.MenuName
            obj.component = <Fragment />
        }
        seeMore.push(obj);
    });



    return seeMore;
}
