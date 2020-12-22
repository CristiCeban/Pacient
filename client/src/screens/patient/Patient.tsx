import React, {useState} from "react";
import MaterialTable from "material-table";

const Patient = () => {
    const [data, setData] = useState([]); //table data
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])


    var columns = [
        {title: 'id', field: "id", hidden: true},
        {title: "First name", field: "first_name"},
        {title: "Last name", field: "last_name"},
        {title: "email", field: "email"}
    ]

    return(
        <div style={{marginTop:100}}>
            <h1>Patient</h1>
            {/*<MaterialTable*/}
            {/*    title={'Patient management'}*/}
            {/*    columns={}*/}
            {/*    data={}*/}
            {/*/>*/}
        </div>
    )
}

export default Patient
