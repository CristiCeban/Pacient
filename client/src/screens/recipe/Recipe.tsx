import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {PatientInterface} from "../patient/Patient";
import ApiService from "../../services/api";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Colors";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";

export interface retetaInterface {
    nrreteta : number,
    codfiscal : string,
    judet : string,
    nrasigmed : string,
    unitatemedicala : string
}

const Recipe = () => {
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
                const response = await ApiService.getWithBody('reteta', {page: 0, size: 10})
                console.log(response)
                setData(response.pacients);
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

    const columns = [
        {title: 'nr reteta', field: "nrreteta", hidden: true},
        {title: "cod fiscal", field: "codfiscal"},
        {title: "judet", field: "judet"},
        {title: "nr casa asigurari medicale", field: "nrasigmed"},
        {title: "Unitate medicala", field: "unitatemedicala"},
    ]


    const handleRowAdd = async (newData: any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.codfiscal === undefined) {
            errorList.push("Please enter cod_fiscal")
        }
        if (newData.judet === undefined) {
            errorList.push("Please enter judet")
        }
        if (newData.nrasigmed === undefined) {
            errorList.push("Please enter nr_casa_asig_medic")
        }
        if (newData.unitatemedicala === undefined) {
            errorList.push("Please enter unitatemedicala")
        }

        if (errorList.length < 1) { //no error
            try {
                const response = await ApiService.post('reteta', newData)
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
        if (newData.codfiscal === undefined) {
            errorList.push("Please enter cod_fiscal")
        }
        if (newData.judet === undefined) {
            errorList.push("Please enter judet")
        }
        if (newData.nrasigmed === undefined) {
            errorList.push("Please enter nr_casa_asig_medic")
        }
        if (newData.unitatemedicala === undefined) {
            errorList.push("Please enter unitatemedicala")
        }

        if (errorList.length < 1) { //no error
            try {
                const response = await ApiService.post('reteta/update', newData)
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
        try {
            const response = await ApiService.getWithBody('reteta/delete', {id:oldData.nrreteta})
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
            setErrorMessages(['Server error']);
            resolve()
        }
    }


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
                        title={'Recipe managment'}
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

export default Recipe
