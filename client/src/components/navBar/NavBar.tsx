import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagnoses,faHome,faNotesMedical,faHospitalUser,faPills,faSignOutAlt,faProcedures } from "@fortawesome/free-solid-svg-icons";
import {useLocation} from "react-router";
import {onLogout} from "../../redux/actions/generalActions";
import {useDispatch} from "react-redux";

enum routerEnum {
    main = '/',
    patient = '/patient',
    diagnostic = '/diagnostic',
    treatment = '/treatment',
    recipe = '/recipe',
    pills = '/pills',
}

const NavBar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation();
    const {pathname} = location;

    const logout = async () => {
        dispatch(onLogout());
    }

    return(
        <div className={classes.root}>
            <AppBar position={"fixed"}
                    style={{backgroundColor:'#bbbfbc'}}
            >
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link href={'/'} style={{color:'black'}}>
                            Patients Management
                        </Link>
                    </Typography>

                    <Link href={'/'}>
                        <IconButton>
                            <FontAwesomeIcon icon={faHome} className={pathname === routerEnum.main
                                ? classes.selectedNavIcon
                                :
                                undefined}
                            />
                        </IconButton>
                    </Link>

                    <Link href={'/patient'}>
                        <IconButton>
                            <FontAwesomeIcon icon={faHospitalUser} className={pathname.includes(routerEnum.patient)
                                ? classes.selectedNavIcon
                                :
                                undefined}
                            />
                        </IconButton>
                    </Link>

                    <Link href={'/diagnostic'}>
                        <IconButton>
                            <FontAwesomeIcon icon={faDiagnoses} className={pathname.includes(routerEnum.diagnostic)
                                ? classes.selectedNavIcon
                                :
                                undefined}
                            />
                        </IconButton>
                    </Link>

                    <Link href={'/treatment'}>
                        <IconButton>
                            <FontAwesomeIcon icon={faProcedures} className={pathname.includes(routerEnum.treatment)
                                ? classes.selectedNavIcon
                                :
                                undefined}
                            />
                        </IconButton>
                    </Link>

                    <Link href={'/recipe'}>
                        <IconButton>
                            <FontAwesomeIcon icon={faNotesMedical} className={pathname.includes(routerEnum.recipe)
                                ? classes.selectedNavIcon
                                :
                                undefined}
                            />
                        </IconButton>
                    </Link>

                    <Link href={'/pills'}>
                        <IconButton>
                            <FontAwesomeIcon icon={faPills} className={pathname.includes(routerEnum.pills)
                                ? classes.selectedNavIcon
                                :
                                undefined}
                            />
                        </IconButton>
                    </Link>

                    <IconButton onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color : 'black'
    },
    selectedNavIcon : {
        color:'#a50101'
    }
}));

export default NavBar;
