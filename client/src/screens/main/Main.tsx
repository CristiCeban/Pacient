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

    const [medicamente,setMedicamente] = useState<any>({})


    useEffect(()=>{
        (async () => {
            try {
                setInProgress(true)
                const response = await ApiService.getWithBody('stat/medicamentpermedic', {page: 0, size: 10})
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
                const response = await ApiService.getWithBody('medicament',{page : 0,size : 10});
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
        })()
    },[])

    const columns = [
        {title: "Medicul",field : 'medicId'},
        {title: 'medicament', field: 'codmedicament', lookup: medicamente },
        {title: "cantitate", field: "cantitate",type: 'numeric'},

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
                        // editable={{
                        //     onRowAdd: (newData) =>
                        //         new Promise((resolve) => {
                        //             handleRowAdd(newData, resolve)
                        //         }),
                        //     onRowUpdate: (newData, oldData) =>
                        //         new Promise((resolve) => {
                        //             handleRowUpdate(newData, oldData, resolve);
                        //         }),
                        //     onRowDelete: (oldData) =>
                        //         new Promise((resolve) => {
                        //             handleRowDelete(oldData, resolve)
                        //         }),
                        // }}
                        options={{
                            search: true
                        }}
                    />
                    <h1>Consumul total de medicamente este {data[data.length -1].cantitate}</h1>
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
