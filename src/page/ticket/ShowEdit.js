import {
    Edit,
    useEditContext,
    useGetList,
    Toolbar,
    SaveButton,
    FormWithRedirect, useDataProvider, useRefresh, useRedirect
} from "react-admin";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useEffect, useState} from "react";


import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from "@material-ui/core";

import {Bookmark, Delete, Error, Fastfood, Money, RemoveCircle} from "@material-ui/icons";
import findIndex from 'lodash/findIndex';
import NumberFormat from "react-number-format";
import useCountDown from "react-countdown-hook";


const useStyles = makeStyles(theme=> ({
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
    tab: {
        // maxWidth: '40em',
        display: 'flex',
        justifyContent:'center',
        width:"100%"
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
    },
    thumbnail:{
        maxWidth:"50px",
        maxHeight:"50px"
    }

}));


export const ShowEdit = (props) =>{
    const classes = useStyles();
    const [yourSeats,setYourSeats] = useState([]);
    const [price,setPrice] = useState(0);
    const [refresh,setRefresh] = useState(false);
    const thoughSeatAndPrice = (seats,price) =>{
        setYourSeats(seats);
        setPrice(price);
        setRefresh(!refresh);
    }
    useEffect(() =>{
        const arrSeat = localStorage.getItem("seats");
        if(arrSeat){
            setYourSeats(JSON.parse(arrSeat));
            
        }
    },[refresh])

    useEffect(()=>{
        localStorage.removeItem("reserved");

    },[]);


    return(
        <>
            <Edit {...props}
                  aside={<Aside seats={yourSeats} price={price}/>}
            >
                <CustomMyForm thoughSeatPrice={(seats,price) => thoughSeatAndPrice(seats,price)} {...props}/>
            </Edit>

        </>

    )
};
const useAsideStyles = makeStyles(theme => ({
    root: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    removeConcession:{
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.7)',
        borderRadius: 3,
        padding: theme.spacing(2),
        margin: theme.spacing(0.5),
        fontWeight: 600,
        '&:hover': {
            background: 'rgb(120, 205, 4)'
        }
    }
}));

const Concessions = ({addConcessionOrder}) =>{

    const [concessions,setConcessions] = useState([]);
    const [yourConcession,setYourConcession] = useState([]);

    const {data, ids} = useGetList("concessions", {page:1,perPage:100}, {}, {},{});
    useEffect(() =>{
        let concessions = new Map();
        for (const index of ids) {
            const concession = data[index];
            const key = concession["categoryId"];
            if(concessions.has(key)){
                let arr = concessions.get(key);
                arr.push(concession);
                concessions.set(key,arr);
            }else{
                concessions.set(key,[]);
                let arr = concessions.get(key);
                arr.push(concession);
                concessions.set(key,arr);
            }
        }
        const arrConcession = Array.from(concessions.values());
        setConcessions(arrConcession);
    },[ids,data]);

    useEffect(() =>{

    },[]);

    const addConcession = value =>{
        addConcessionOrder(value);
    }


    return(
        <>
            {
                concessions.length > 0 ?
                    concessions.map((value, index) => (
                        <ConcessionsItem key={index} data={value} addConcession={(value) => addConcession(value)}/>
                    ))
                    : null
            }

        </>

    )
}

const ConcessionsItem = ({data,addConcession}) =>{

    const classes = useStyles();
    const addConcessionToOrder = (concession) =>{
       addConcession(concession);
    };

    return(
        <>
            <Typography variant="h6" gutterBottom style={{color:"black"}}>
                {
                    data[0]["categoryName"]
                }
            </Typography>
            {
                data.length > 0 ?
                    data.map((concession,index) =>(
                        <Box display="flex" justifyContent="space-between" width="100%" key={index} alignItems={"center"}>
                            <Box flexGrow={4} maxWidth={"250px"}  alignItems={"center"}>
                                <Box display="flex" mb="1em" alignItems={"center"}>
                                    <Box mr="1em" >
                                        <img src={concession["thumbnail"]} className={classes.thumbnail}/>
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {
                                                concession.name
                                            }
                                        </Typography>
                                        <Typography>
                                            <NumberFormat value={concession.price} displayType={'text'} thousandSeparator={true} suffix={' vnd'} />
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Button variant={"contained"} color={"primary"} onClick={(value) => addConcessionToOrder(concession)}>Add</Button>
                                </Box>
                            </Box>
                        </Box>
                    )) : null
            }
        </>

    )
}

const initialTime = 50 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000

const Aside = ({seats,price}) =>{
    const classes = useAsideStyles();
    const [arrSeat,setSeats] = useState([]);
    const [yourPriceSeats,setPriceSeats] = useState(0);
    const [concessions,setConcession] = useState([]);
    const [subTotal,setSubTotal] = useState(0);
    const dataProvider = useDataProvider();

    const calConcession = () => {
        return concessions.reduce(((previousValue, currentValue) => {
            return previousValue + currentValue["price"]
        }),0);
    }

    useEffect(()=> {
        setSeats(seats);
        setPriceSeats(price);
        setSubTotal(calConcession() + price);
    },[seats,price,concessions])


    const addConcessionOrder = value =>{
        let arrYourConcession = Object.assign([],concessions);
        arrYourConcession.push(value);
        setConcession(arrYourConcession);
    };

    const handleOrder = () => {
        const reserved  = JSON.parse(localStorage.getItem("reserved"));
        if(reserved){
            const arrConcession = concessions.map((value =>  value.id));

            const order = {
                seats:reserved["seats"],
                concessionId:arrConcession,
                creation:reserved["userId"],
                showTimesDetailId:reserved["showTime"]
            }
            dataProvider.create("orders",
                {
                    data:order
                },{})
                .then(response =>{

                })
                .catch(reason => {

                })
        }
    }

    const removeConcession = (value) =>{
        let arrConcession = Object.assign([],concessions);
        const index = arrConcession.findIndex(value1 => value1["id"] === value);
        arrConcession.splice(index,1);
        setConcession(arrConcession);
    }

    return (
        <div className={classes.root}>
            <Box m="0 0 1em 1em">
                <Card>
                    <CardContent>
                        <Concessions addConcessionOrder={(value) => addConcessionOrder(value)}  />
                    </CardContent>
                </Card>
            </Box>
            <Box m="0 0 1em 1em">
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom style={{color:"black"}}>
                            {
                                'Your Seat'
                            }
                        </Typography>
                        <Box display="flex">
                            <Box flexGrow={4}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {
                                               arrSeat.map((value,index) => (
                                                   <div key={index} style={{display:"inline-block"}}>
                                                       {
                                                           value["tier"]
                                                       }
                                                       {
                                                           value["numbers"]
                                                       }
                                                       {
                                                           arrSeat.length > 1 ? "," : ""
                                                       }
                                                   </div>
                                               ))
                                            }
                                        </Typography>

                                    </Box>
                                </Box>
                            </Box>

                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        {/*<Money*/}
                                        {/*    fontSize="small"*/}
                                        {/*    color="disabled"*/}
                                        {/*/>*/}
                                    </Box>
                                    <Box flexGrow={1}>
                                        <NumberFormat value={yourPriceSeats} displayType={'text'} thousandSeparator={true} suffix={' vnd'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="h6" gutterBottom style={{color:"black"}}>
                            {
                                'Your Concession'
                            }
                        </Typography>
                        <Box display="flex">
                            <Box flexGrow={2}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                    </Box>
                                    <Box flexGrow={1}>
                                            {
                                                concessions.length > 0 ? concessions.map((value,index) => (
                                                    <Box key={index} style={{padding:"6px 0"}}>
                                                        {
                                                            value["name"]
                                                        }

                                                    </Box>
                                                )) : null
                                            }
                                    </Box>
                                </Box>

                            </Box>

                            <Box flexGrow={2}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                    </Box>
                                    <Box flexGrow={1}>
                                        {
                                            concessions.length > 0 ? concessions.map((concession,index) => (
                                                <>
                                                    <Box key={index}>
                                                        <NumberFormat value={concession.price} displayType={'text'} thousandSeparator={true} suffix={' vnd'} />
                                                        <Button onClick={(value) => removeConcession(concession)} style={{marginLeft:"2px"}}>
                                                            <RemoveCircle classes={classes.removeConcession}/>
                                                        </Button>
                                                    </Box>
                                                </>
                                            )) : null
                                        }
                                    </Box>

                                </Box>
                            </Box>

                        </Box>
                        <Typography variant="h6" gutterBottom style={{color:"black"}}>
                            {
                                'SUBTOTAL'
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
                                </Box>
                            </Box>

                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em" flexGrow={1}>
                                        {/*<Money*/}
                                        {/*    fontSize="small"*/}
                                        {/*    color="disabled"*/}
                                        {/*/>*/}
                                    </Box>
                                    <Box flexGrow={1}>
                                        <NumberFormat value={subTotal} displayType={'text'} thousandSeparator={true} suffix={' vnd'} />

                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box flexGrow={1} display={"flex"} justifyContent={"flex-end"}>
                            <Box display="flex" mb="1em">
                                <Box mr="1em">
                                    <Button variant={"contained"} color={"primary"} onClick={handleOrder}>{"Order"}</Button>
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
    const classes = useStyles();

    const {record} = useEditContext();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const {ids,data} = useGetList("seats-room", {},
        { field: 'id', order: 'DESC' }, {  showTimesId:record.id, room:record.roomId },{});

    const [arrSeat,setArrSeat] = useState([]);
    const [arrSeatSelected,setArrSeatSelected] = useState([]);
    const [price,setPrice] = useState(0);
    const [reserved,setReserved] = useState(true);

    const  handleUpdate = value =>{
        const arrSeat = arrSeatSelected.map((value) => value["id"]);
        localStorage.setItem("seats",JSON.stringify(arrSeatSelected));
        setArrSeatSelected([]);
            dataProvider
                .update('reserved', { id: record.id, data: {
                            seats: arrSeat,
                            showTime:record.id,
                            room:record.roomId,
                            user:0 }
                    }
                )
                .then(response => {
                    refresh();
                    if(response && response.data && response.data.id){
                        localStorage.setItem("reserved",JSON.stringify(response.data["data"]))

                    }
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
        if(data){
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
        }

    },[data, ids])

    useEffect(() =>{
        props.thoughSeatPrice(arrSeatSelected,calSeat(arrSeatSelected));
    },[arrSeatSelected,price])


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
        }

    }

    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handRedirect = () =>{
    }
    return  (
        <FormWithRedirect
            {...props}
            render={formProps => (
                        <form >
                            <Box>
                                <Box style={{marginTop:"0px !important"}}>
                                    <Toolbar >
                                        <Box display="flex" justifyContent="space-between" width="100%" height={"auto"}>
                                            <SaveButton
                                                saving={formProps.saving}
                                                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                                onSave={handleUpdate}
                                                label={"Reserved"}
                                            />
                                            {/*<DeleteButton record={formProps.record} />*/}
                                        </Box>

                                    </Toolbar>
                                </Box>
                                <Screen />
                                <Box display="flex" justifyContent="center" p={5} flexWrap={"noWrap"}>
                                    <Stage arrSeatRow={arrSeat} onSelectedSeat={(idSeat,row) => onSelectedSeat(idSeat,row)}/>
                                </Box>

                            </Box>
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

