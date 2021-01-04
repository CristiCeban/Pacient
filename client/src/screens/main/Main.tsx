import React, {useEffect, useState} from 'react'
import {PatientInterface} from "../patient/Patient";
import {makeStyles} from "@material-ui/core/styles";
import ApiService from "../../services/api";
import {TreatmentInterface} from "../treatment/Treatment";
import {pillsInterface} from "../Pills/Pills";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Colors";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";

export interface tratamenteMedicamente {
    medicId : number,
    codmedicament : number,
    cantitate : number,
}

const Main = () => {
    const classes = useStyles();

    const [data, setData] = useState<any>([]); //table data
    const [nextPage,setNextPage] = useState<number>(0);
    const [lastPage,setLastPage] = useState<number>(0);
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const [data2, setData2] = useState<any>([]); //table data
    const [inProgress2,setInProgress2] = useState<boolean>(true)
    const [iserror2, setIserror2] = useState<boolean>(false)
    const [errorMessages2, setErrorMessages2] = useState<string[]>([])

    const [medicamente,setMedicamente] = useState<any>({})
    const [users,setUsers] = useState<any>({})
    const [pacients,setPacients] = useState<any>({})



    useEffect(()=>{
        (async () => {
            try {
                setInProgress2(true)
                const response = await ApiService.getWithBody('stat/reteteperpacient', {page: 0, size: 100})
                setData2(response.retetePacienti);
            } catch (e) {
                console.log(e);
                setIserror(true);
            } finally {
                setInProgress2(false)
            }

            try {
                setInProgress(true)
                const response = await ApiService.getWithBody('stat/medicamentpermedic', {page: 0, size: 100})
                setData(response.tratamenteMedicamente);
                setNextPage(prev => prev + 1);
                setLastPage(response.totalPages - 1);
            } catch (e) {
                console.log(e);
                setIserror(true);
            } finally {
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
                const response = await ApiService.getWithBody('users',{page : 0,size : 100});
                const payload = {};
                response.users.map((medicament : any) => {
                    const {id,userName} = medicament
                    //@ts-ignore
                    payload[id] = userName
                })
                setUsers(payload)
            }
            catch (e) {
                console.log(e)
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

    const columns = [
        {title: "Medicul",field : 'medicId', lookup: {...users, '-1' : 'TOTAL' }},
        {title: 'medicament', field: 'codmedicament', lookup: {...medicamente, '-1' : 'TOTAL' }},
        {title: "cantitate", field: "cantitate",type: 'numeric'},
    ]

    const columns2 = [
        {title: "pacient",field : 'pacientId', lookup: {...pacients, '-1' : 'TOTAL' }},
        {title: 'Numarul retete', field: 'nrRetete'},
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
                        title={'Medicaments per medic'}
                        //@ts-ignore
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        options={{
                            search: true,
                            exportButton: true,
                        }}
                    />
                    <h1>Consumul total de medicamente este {data[data.length -1].cantitate}</h1>
                </>
            }
            {inProgress2 ?
                <div className={classes.center}>
                    <Loader type={'Puff'} color={Color.secondaryColor}/>
                </div>
                :
                <>
                    <div>
                        {iserror &&
                        <Alert severity="error">
                            {errorMessages2.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                        }
                    </div>
                    <MaterialTable
                        title={'Retete per Pacient'}
                        //@ts-ignore
                        columns={columns2}
                        data={data2}
                        icons={tableIcons}
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

export default Main
