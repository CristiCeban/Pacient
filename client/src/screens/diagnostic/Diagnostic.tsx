import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {PatientInterface} from "../patient/Patient";
import ApiService from "../../services/api";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Colors";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";

export interface diagnosticInterface {
    codBoala : number,
    denumire : string,
    tip : string,
}

const Diagnostic = () => {
    const classes = useStyles();

    const [data, setData] = useState<PatientInterface[]>([]); //table data
    const [nextPage,setNextPage] = useState<number>(0);
    const [lastPage,setLastPage] = useState<number>(0);
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    useEffect(()=>{
        (async () => {
            try{
                setInProgress(true)
                const response = await ApiService.getWithBody('diagnostic', {page: 0, size: 10})
                setData(response.diagnoze);
                setNextPage(prev => prev +1);
                setLastPage(response.totalPages -1);
            }
            catch (e) {
                console.log(e);
                setIserror(true);
            }
            finally {
                setInProgress(false)
            }
        })()
    },[])


    const handleRowAdd = async (newData: any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.denumire === undefined) {
            errorList.push("Please enter denumirea")
        }

        if (newData.tip === undefined) {
            errorList.push("Please enter tipul")
        }

        if (errorList.length < 1) { //no error
            try {
                const response = await ApiService.post('diagnostic', newData)
                const dataToAdd = [...data];
                dataToAdd.push(newData);
                setData(dataToAdd);
                resolve();
                setIserror(false)
                setErrorMessages([])
            }
            catch (e) {
                console.log(e)
                setIserror(true)
                setErrorMessages(["Error server"]);
                resolve();
            }
        }
        else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowUpdate = async (newData : any, oldData : any, resolve : Function) => {
        //validation
        let errorList = []
        if (newData.denumire === undefined) {
            errorList.push("Please enter denumirea")
        }

        if (newData.tip === undefined) {
            errorList.push("Please enter tipul")
        }
        if (errorList.length < 1) { //no error
            try {
                const response = await ApiService.post('diagnostic/update', newData)
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve()
                setIserror(false)
                setErrorMessages([])
            }
            catch (e) {
                console.log(e)
                setIserror(true)
                setErrorMessages(["Error server"]);
                resolve();
            }
        }
        else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowDelete = async (oldData: any, resolve: Function) => {
        console.log(oldData)
        try {
            const response = await ApiService.getWithBody('diagnostic/delete', {id:oldData.codboala})
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index,1);
            setData([...dataDelete]);
            setIserror(false)
            resolve();
        }
        catch (e) {
            console.log(e);
            setIserror(true)
            setErrorMessages(['Server error','Cannot delete diagnostic which is a part of treatment']);
            resolve()
        }
    }


    const columns = [
        {title: 'codBoala', field: "codBoala", hidden: true},
        {title: "denumire", field: "denumire"},
        {title: "tip", field: "tip"},
    ]

    return(
        <div style={{marginTop:100}}>
            {inProgress ?
                <div className={classes.center}>
                    <Loader type={'Puff'} color={Color.secondaryColor}/>
                </div>
                :
                <>
                    <div>
                        {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                        }
                    </div>
                    <MaterialTable
                        title={'Diagnostic managment'}
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                        options={{
                            search: true
                        }}
                    />
                </>
            }
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    center: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    footer: {
        height : 200,
    }
}));

export default Diagnostic
