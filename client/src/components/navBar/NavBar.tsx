import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagnoses,faHome,faNotesMedical,faHospitalUser,faPills } from "@fortawesome/free-solid-svg-icons";
import {useLocation} from "react-router";

enum routerEnum {
    main = '/',
    patient = '/patient',
    diagnostic = '/diagnostic',
    treatment = '/treatment',
    recipe = '/recipe',
}

const NavBar = () => {
    const classes = useStyles();
    const location = useLocation();
    const {pathname} = location;

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
                            <FontAwesomeIcon icon={faPills} className={pathname.includes(routerEnum.treatment)
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        color : 'black'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    selectedNavIcon : {
        color:'#a50101'
    }
}));

export default NavBar;
