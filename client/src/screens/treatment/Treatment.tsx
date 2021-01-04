import React, {useEffect, useState} from "react";
import {diagnosticInterface} from "../diagnostic/Diagnostic";
import {pillsInterface} from "../Pills/Pills";
import {PatientInterface} from "../patient/Patient";
import {makeStyles} from "@material-ui/core/styles";
import ApiService from "../../services/api";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Colors";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";

export interface UserInterface {
    id : number,
    userName : string,
    email : string,
    imagePath : null,
    phone : string,
    pacients : PatientInterface[]
}

export interface TreatmentInterface {
    pozitie : number,
    cantitate : number,
    diagnostic : diagnosticInterface,
    medicament : pillsInterface,
    pacient : PatientInterface,
    user : UserInterface,
}

const Treatment = () => {
    const classes = useStyles();

    const [data, setData] = useState<PatientInterface[]>([]); //table data
    const [nextPage,setNextPage] = useState<number>(0);
    const [lastPage,setLastPage] = useState<number>(0);
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])


    const [medicamente,setMedicamente] = useState<any>({})
    const [diagnostice,setDiagnostice] = useState<any>({});
    const [pacients,setPacients] = useState<any>({})


    useEffect(()=>{
        (async () => {
            try{
                setInProgress(true)
                const response = await ApiService.getWithBody('tratament', {page: 0, size: 100})
                const payload = response.tratamente.map((el:TreatmentInterface) => (
                    {
                        ...el,
                        medicament : el.medicament.codmedicament,
                        diagnostic : el.diagnostic.codboala,
                        pacient : el.pacient.id,
                        user : el.user.userName,
                    }))
                setData(payload);
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

            try{
                const response = await ApiService.getWithBody('medicament',{page : 0,size : 100});
                const payload = {};
                response.medicamente.map((medicament : pillsInterface) => {
                    const {codmedicament,denumiremedicament} = medicament
                    //@ts-ignore
                    payload[codmedicament] = denumiremedicament
                })
                setMedicamente(payload)
            }
            catch (e) {
                console.log(e)
            }

            try{
                const response = await ApiService.getWithBody('diagnostic',{page: 0,size : 100})
                const payload = {};
                response.diagnoze.map((diagnoza : diagnosticInterface) => {
                    const {codboala,denumire,tip} = diagnoza;
                    //@ts-ignore
                    payload[codboala] = denumire + ' ' + tip
                })
                setDiagnostice(payload)
            }
            catch (e) {
                console.log(e);
            }

            try{
                const response = await ApiService.getWithBody('pacient', {page: 0, size: 100})
                const payload = {}
                response.pacients.map((pacient : PatientInterface) => {
                    const {id,nume,prenume} = pacient;
                    //@ts-ignore
                    payload[id] = nume + ' ' + prenume;
                })
                setPacients(payload);
                console.log(payload)
            }
            catch (e) {
                console.log(e);
            }
        })()
    },[])

    const handleRowAdd = async (newData: any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.cantitate === undefined) {
            errorList.push("Please enter cantitate")
        }
        if (newData.diagnostic === undefined) {
            errorList.push("Please enter diagnostic")
        }
        if (newData.medicament === undefined) {
            errorList.push("Please enter medicament")
        }
        if(newData.pacient === undefined) {
            errorList.push("Please select pacient");
        }

        if (errorList.length < 1) { //no error
            try {
                const payload = {
                    ...newData,
                    pacientId : +newData.pacient,
                    diagnosticId : +newData.diagnostic,
                    codmedicament : +newData.medicament,
                }
                console.log(payload)
                const response = await ApiService.post('tratament', payload)
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


    const handleRowUpdate = async (newData: any, oldData : any,resolve: Function) => {
        //validation
        let errorList = []
        if (newData.cantitate === undefined) {
            errorList.push("Please enter cantitate")
        }
        if (newData.diagnostic === undefined) {
            errorList.push("Please enter diagnostic")
        }
        if (newData.medicament === undefined) {
            errorList.push("Please enter medicament")
        }
        if(newData.pacient === undefined) {
            errorList.push("Please select pacient");
        }

        if (errorList.length < 1) { //no error
            try {
                const payload = {
                    ...newData,
                    pacientId : +newData.pacient,
                    diagnosticId : +newData.diagnostic,
                    codmedicament : +newData.medicament,
                }
                console.log(payload)
                const response = await ApiService.post('tratament/update', payload)
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
            const response = await ApiService.getWithBody('tratament/delete', {id:oldData.pozitie})
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

    const columns = [
        {title: 'pozitie', field: "pozitie", hidden: true},
        {title: 'diagnoza', field: 'diagnostic',lookup: diagnostice},
        {title: "Medicament", field: "medicament",lookup:medicamente},
        {title: "cantitate", field: "cantitate",type: 'numeric'},
        {title: 'Pacient details', field: 'pacient', lookup: pacients },
        {title: "Medicul",field : 'user',editable: 'never'}
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
                        title={'Treatment managment'}
                        //@ts-ignore
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
                            search: true,
                            exportButton: true,
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

export default Treatment
