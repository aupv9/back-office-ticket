import {
    AutocompleteInput,
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    Edit,
    SimpleForm,
    FormTab,
    Loading,
    NumberField,
    Pagination,
    PasswordInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    Tab,
    TabbedForm,
    TabbedShowLayout,
    TextField,
    TextInput,
    useEditContext,
    useGetList,
    useShowContext,
    Toolbar,
    SaveButton,
    TabbedFormTabs,
    useMutation, FormWithRedirect, DateInput, DeleteButton, useDataProvider, useRefresh
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {Fragment, useCallback, useEffect, useState} from "react";

import { DateKeyInput} from '../../datepicker/Picker';
import keyBy from "lodash/keyBy";
import {Box, Button, Card, CardContent, Container, Grid, Typography} from "@material-ui/core";
import {LocationCard} from "../location/LocationCard";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {Bookmark, Money} from "@material-ui/icons";
import findIndex from 'lodash/findIndex';

const useStyles = makeStyles(theme=> ({
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
    tab: {
        // maxWidth: '40em',
        display: 'block',
        justifyContent:'center'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    seat:{
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.7)',
        borderRadius: 3,
        padding: theme.spacing(2),
        margin: theme.spacing(0.5),
        fontWeight: 600,
        '&:hover': {
            background: 'rgb(120, 205, 4)'
        }
    },
    bannerTitle: {
        fontSize: theme.spacing(1.4),
        textTransform: 'uppercase',
        color: 'rgb(93, 93, 97)',
        marginBottom: theme.spacing(1)
    },
    bannerContent: {
        fontSize: theme.spacing(2),
        textTransform: 'capitalize',
        color: theme.palette.common.white
    },
    [theme.breakpoints.down('sm')]: {
        hideOnSmall: {
            display: 'none'
        }
    }

}));


export const ShowEdit = (props) =>{
    const classes = useStyles();
    const [yourSeats,setYourSeats] = useState([]);
    const [price,setPrice] = useState(0);
    const thoughSeatAndPrice = (seats,price) =>{
        setYourSeats(seats);
        setPrice(price);
    }

    useEffect(()=>{

    },[])
    return(
        <Edit {...props}
            aside={<Aside seats={yourSeats} price={price}/>}
        >
            <CustomMyForm thoughSeatPrice={(seats,price) => thoughSeatAndPrice(seats,price)} {...props}/>
        </Edit>
    )
};
const useAsideStyles = makeStyles(theme => ({
    root: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));
const Aside = ({seats,price}) =>{
        const classes = useAsideStyles();
    return (
        <div className={classes.root}>
            <Box m="0 0 1em 1em">
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom style={{color:"black"}}>
                            {
                                'Your Seat'
                            }
                        </Typography>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <Bookmark
                                            fontSize="small"
                                            color="disabled"
                                        />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {
                                               seats.map((value,index) => (
                                                   <Typography key={index}>
                                                       {
                                                           value["tier"]
                                                       }
                                                       {
                                                           value["numbers"]
                                                       }
                                                   </Typography>
                                               ))
                                            }
                                        </Typography>

                                    </Box>
                                </Box>

                            </Box>

                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <Money
                                            fontSize="small"
                                            color="disabled"
                                        />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {
                                                'Price'
                                            }
                                        </Typography>
                                        {
                                            price
                                        }
                                        {' '}
                                        {
                                            'vnd'
                                        }
                                    </Box>
                                </Box>
                        </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}


const CustomMyForm = props =>{

    const {record} = useEditContext();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();
    const {ids,data} = useGetList("seats-room", {},
        { field: 'id', order: 'DESC' }, {   showTimesId:record.id,
            room:record.roomId},{});

    const [arrSeat,setArrSeat] = useState([]);
    const [arrSeatSelected,setArrSeatSelected] = useState([]);
    const [price,setPrice] = useState(0);

    const  handleUpdate = value =>{
        const arrSeat = arrSeatSelected.map((value) => value["id"]);
        // for (const seat of arrSeat) {
        //     console.log(seat);
        //     dataProvider.getList("reserved", {
        //             pagination:{},
        //             filter:{
        //                 seat:seat, showTime:record.id,
        //                 room:record.roomId,
        //              }
        //         },
        //     {
        //
        //     }).then(response => {
        //
        //         console.log(response)
        //         // success side effects go here
        //         // redirect('/comments');
        //         // notify('Comment approved');
        //         return Promise.resolve();
        //     }).catch(error => {
        //             // failure side effects go here
        //             // notify(`Comment approval error: ${error.message}`, { type: 'warning' });
        //         });
        // }

            dataProvider
                .update('reserved', { id: record.id, data: {
                            seats: arrSeat,
                            showTime:record.id,
                            room:record.roomId,
                            user:0 }
                    }
                )
                .then(response => {
                    console.log(response);
                    refresh()
                    // success side effects go here
                    // redirect('/comments');
                    // notify('Comment approved');
                })
                .catch(error => {
                    // failure side effects go here
                    // notify(`Comment approval error: ${error.message}`, { type: 'warning' });
                });


    };

    const calSeat = (arrSeatSelected) => {
        return arrSeatSelected.reduce(((previousValue, currentValue) => {
             return previousValue + currentValue["price"]
        }),0);
    }

    useEffect(() => {
        let seats = new Map();
        for (const index of ids) {
            const seat = data[index];
            const key = seat["tier"];
            if(seats.get(key)){
                let arr = seats.get(key);
                arr.push(seat);
                seats.set(key,arr);
            }else{
                seats.set(key,[]);
                let arr = seats.get(key);
                arr.push(seat);
                seats.set(key,arr);
            }
        }
        const arrSeatRow = Array.from(seats.values());
        setArrSeat(arrSeatRow);
        setArrSeatSelected([]);
    },[data, ids])

    const onSelectedSeat = (idSeat,tier) =>{
        if(findIndex(arrSeatSelected, function(o) { return o.id === idSeat }) !== -1){
            const index = arrSeatSelected.findIndex(value => value["id"] === idSeat);
            const arrSelected = Object.assign([],arrSeatSelected);
            arrSelected.splice(index,1);
            setArrSeatSelected(arrSelected);

            const arrUpdate = Object.assign([],arrSeat);
            const arr = arrUpdate[tier];
            for (const arrElement of arr) {
                if(arrElement["id"] === idSeat){
                    arrElement["status"] = 2;
                    break;
                }
            }
            arrUpdate[tier] = arr;
            setArrSeat(arrUpdate);
            setPrice(calSeat(arrSelected));
            props.thoughSeatPrice(arrSelected,calSeat(arrSelected));

        }else{
            const arrUpdate = Object.assign([],arrSeat);
            const arrSelectedUpdate = Object.assign([],arrSeatSelected);
            const arr = arrUpdate[tier];
            for (const arrElement of arr) {
                if(arrElement["id"] === idSeat){
                    arrElement["status"] = 1;
                    arrSelectedUpdate.push(arrElement);
                    break;
                }
            }
            arrUpdate[tier] = arr;
            setArrSeat(arrUpdate);
            setArrSeatSelected(arrSelectedUpdate);
            setPrice(calSeat(arrSelectedUpdate));
            props.thoughSeatPrice(arrSelectedUpdate,calSeat(arrSelectedUpdate));

        }

    }

    return  (
        <FormWithRedirect
            {...props}
            render={formProps => (
                // here starts the custom form layout
                <form >
                    <Screen />
                    <Box display="flex" justifyContent="center" p={5} flexWrap={"noWrap"}>
                        <Stage arrSeatRow={arrSeat} onSelectedSeat={(idSeat,row) => onSelectedSeat(idSeat,row)}/>
                    </Box>
                    <Toolbar>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <SaveButton
                                saving={formProps.saving}
                                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                // onSuccess={(values, redirect) => handleUpdate(values)}
                                onSave={handleUpdate}
                            />
                            <DeleteButton record={formProps.record} />
                        </Box>
                    </Toolbar>
                </form>
            )}
        />
    )
}



const Screen = () =>{

    return (
        <Box display="flex" justifyContent="center" p={5} flexWrap={"noWrap"} >
            <Box bgcolor={"#ede7f6"} p={5} width={"500px"} borderRadius={"5px"}>
                <Typography align={"center"}>
                    SCREEN
                </Typography>
            </Box>
        </Box>
    )
}


const Stage = ({arrSeatRow,onSelectedSeat}) =>{
    const classes = useStyles();
    const onSelectSeat = (seatId,indexRow) =>{
        onSelectedSeat(seatId,indexRow);
    };

    return(
        <>
            <Box  display="block" flexWrap={"noWrap"} color={"text.primary"}>
                    {arrSeatRow.map((value,indexRow) => (
                        <Box marginY={"20px"}>
                            <Row key={indexRow} data={value} onSelectedSeat={(idSeat) => onSelectSeat(idSeat,indexRow)}/>
                        </Box>
                    ))}
            </Box>
        </>

    )
}

const Row = ({data,onSelectedSeat}) =>{
    const classes = useStyles();
    const onSelected = (seatId) =>{
        onSelectedSeat(seatId);
    };
    return (
        <Box className={classes.gridList}  flexDirection={"row-reverse"} flexWrap={"noWrap"}  >
            {data.map((value, key) => (
                <Button className={classes.seat} key={key} disabled={value["isSelected"]}
                     onClick={(idSeat) => onSelected(data[key]["id"])}

                        variant={"contained"}
                        color={ value["status"] === 1
                            ? 'primary'
                            :  value["status"] === 2
                                ? 'secondary'
                                :  value["status"] === 3
                                    ? 'default'
                                    : ''}
                    >

                    {value["tier"]}{' '}{value["numbers"]}
                </Button>
            ))}
        </Box>
    )
}

