import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import Loader from "react-loader-spinner";
import {makeStyles} from "@material-ui/core/styles";
import {Color} from "../../config/Colors";
import ApiService from '../../services/api'
import tableIcons from "../../components/table/TableIcons";
import Alert from '@material-ui/lab/Alert';

export interface PatientInterface {
    id : number,
    cnp : string,
    nume : string,
    prenume : string,
    varsta : number,
    tipasig : string,
}



const Patient = () => {
    const classes = useStyles();

    const [data, setData] = useState<PatientInterface[]>([]); //table data
    const [nextPage,setNextPage] = useState<number>(0);
    const [lastPage,setLastPage] = useState<number>(0);
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const cnpRegex = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/

    useEffect(()=>{
        (async () => {
            try{
                setInProgress(true)
                const response = await ApiService.getWithBody('pacient', {page: 0, size: 10})
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
        {title: 'id', field: "id", hidden: true},
        {title: "CNP", field: "cnp"},
        {title: "Nume", field: "nume"},
        {title: "Prenume", field: "prenume"},
        {title: "Tipul asigurarii", field: "tipasig"},
        {title: "Varsta", field: "varsta"}
    ]

    const handleRowAdd = async (newData: any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.cnp === undefined) {
            errorList.push("Please enter cnp")
        }
        if(!cnpRegex.test(newData.cnp)) {
            errorList.push('Please enter a valid cnp');
        }
        if (newData.nume === undefined) {
            errorList.push("Please enter first nume")
        }
        if (newData.prenume === undefined) {
            errorList.push("Please enter prenume")
        }
        if (newData.varsta === undefined) {
            errorList.push("Please enter varsta")
        }
        if (newData.tipasig === undefined) {
            errorList.push("Please enter tipul asigurarii")
        }
        if (Number.isNaN(parseInt(newData.varsta))) {
            errorList.push("Enter a number for varsta")
        }
        else{
            if(parseInt(newData.varsta) > 120)
                errorList.push("Enter varsta smaller than 120")
            else if(parseInt(newData.varsta) < 0)
                errorList.push("Enter varsta bigger than 0")
        }

        if (errorList.length < 1) { //no error
            try {
                const responseCNP = await ApiService.getWithBody('pacient/exist',{cnp :newData.cnp})
                if(responseCNP.exist) {
                    setIserror(true)
                    setErrorMessages(['This cnp already exist']);
                    resolve()
                }
                else{

                    try {
                        const response = await ApiService.post('pacient', newData)
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
            }
            catch (e) {
                console.log(e)
                setIserror(true)
                setErrorMessages(["Error server"]);
                resolve()
            }
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowUpdate = async (newData : any, oldData : any, resolve : Function) => {
        //validation
        const errorList = []

        if (newData.cnp === undefined) {
            errorList.push("Please enter cnp")
        }
        if (!cnpRegex.test(newData.cnp)) {
            errorList.push('Please enter a valid cnp');
        }
        if (newData.nume === undefined) {
            errorList.push("Please enter first nume")
        }
        if (newData.prenume === undefined) {
            errorList.push("Please enter prenume")
        }
        if (newData.varsta === undefined) {
            errorList.push("Please enter varsta")
        }
        if (newData.tipasig === undefined) {
            errorList.push("Please enter tipul asigurarii")
        }

        try {
            const responseCNP = await ApiService.getWithBody('pacient/exist', {cnp: newData.cnp})
            if (responseCNP.exist && newData.cnp !==oldData.cnp) {
                setIserror(true)
                setErrorMessages(['This cnp already exist']);
                resolve()
            }
            else {
                if (errorList.length < 1) {
                    try {
                        const response = await ApiService.post(`pacient/update?id=${newData.id}`, newData);
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);
                        resolve()
                        setIserror(false)
                        setErrorMessages([])

                    } catch (e) {
                        console.log(e)
                        setIserror(true)
                        setErrorMessages(["Error server"]);
                        resolve()
                    }
                } else {
                    setErrorMessages(errorList)
                    setIserror(true)
                    resolve()
                }
            }
        }
        catch (e) {
            console.log(e)
            setIserror(true)
            setErrorMessages(["Error server"]);
            resolve()
        }
    }

    const handleRowDelete = async (oldData: any, resolve: Function) => {

        try {
            const response = await ApiService.getWithBody('pacient/delete', {id:oldData.id})
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
                        title={'Patient management'}
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

export default Patient
