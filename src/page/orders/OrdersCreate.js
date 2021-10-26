import {makeStyles} from "@material-ui/core/styles";
import {
    FormTab,
    ReferenceInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    Create,
    useGetIdentity,
    NullableBooleanInput,
    NumberInput,
    AutocompleteInput,
    List,
    Datagrid,
    ReferenceField,
    TextField,
    useGetList,
    Loading,
    NumberField,
    ChipField,
    BooleanField,
    Pagination,
    ImageField,
    DateField,
    ShowButton,
    EditButton,
    ListToolbar,
    FilterContext,
    FilterForm, SaveButton, Toolbar, useRedirect, Button,DateInput,SingleFieldList
} from "react-admin";
import * as React from "react";
import {Typography} from "@material-ui/core";
import {Fragment, useCallback, useState} from "react";
import keyBy from "lodash/keyBy";
import {DateKeyInput} from "../../datepicker/Picker";



const TheaterTitle = ({ record }) =>
    record ? <span>Theater #{record.name}</span> : null;

const useStyles = makeStyles({
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    tab: {
        maxWidth: '100%',
        display: 'block',
    },
});

const OrdersCreateToolbar = props =>{
    console.log(props);
    const redirect = useRedirect();
    return (
        <Toolbar {...props} >
            <SaveButton
                label="post.action.save_and_show"
                // redirect="show"
                submitOnEnter={true}
                handleSubmit={event => console.log(event)}
                disabled={props.pristine}
            />
        </Toolbar>
    );
}



const OrdersCreate = (props) =>{
    const classes = useStyles();
    const { identity, loading: identityLoading } = useGetIdentity();
    const [movie,setMovie] = useState(0);
    const [showTime,setShowTime] = useState(0);
    const [time,setTime] = useState();

    const handleChangeMovie = value =>{
        setMovie(value);
    };

    const handleChangeShowTimes = value =>{
        setShowTime(value);
    }

    const handleChangeTimeStart = value =>{
         setTime(value.target.value)
    };

    // const [theater,setTheater] = useState();
    // const handleChangeTheater = (event) =>{
    //     setTheater(event);
    //     localStorage.setItem("theaterId",theater);
    // }

    return(
        <Create {...props} >
            <TabbedForm
                // toolbar={<OrdersCreateToolbar />}
            >
                <FormTab
                    label="movie"
                    path=""
                    contentClassName={classes.tab}
                >
                    <ReferenceInput reference={"movies"} source={"movieId"} onChange={handleChangeMovie}  isRequired={requiredValidate}>
                        <AutocompleteInput
                            optionText={choice => choice.id ? choice.name : ``}
                        />
                    </ReferenceInput>
                    <DateInput source="timeStart" label="Date" onChange={handleChangeTimeStart} />
                    {
                        !!movie && movie > 0 &&
                            <ReferenceInput reference={"showTimesDetails"} source={"showTimeDetailId"} label={"Time Start Show Time"}
                                    onChange={handleChangeShowTimes} filter={{movie_id:movie,date_start:time}} isRequired={requiredValidate}>
                                <AutocompleteInput
                                    optionText={choice => choice.id ? (
                                        new Date(choice.timeStart).toLocaleTimeString()
                                    )  : ``}
                                />
                            </ReferenceInput>

                    }

                    {/*{*/}
                    {/*    !!movie && movie > 0 &&*/}
                    {/*    <ReferenceInput reference={"showTimesDetails"} source={"showTimeDetailId"} label={"Time Start Show Time"}*/}
                    {/*                    onChange={handleChangeShowTimes} filter={{movie_id:movie,date_start:time}} isRequired={requiredValidate}*/}

                    {/*    >*/}
                    {/*        <SingleFieldList>*/}
                    {/*            <ChipField source="timeStart" onClick={event => console.log(event)}/>*/}
                    {/*        </SingleFieldList>*/}
                    {/*    </ReferenceInput>*/}

                    {/*}*/}

                    {
                        !!movie && movie > 0 &&
                        <ReferenceInput reference={"showTimesDetails"} source={"showTimeDetailId"} label={"Time Start Show Time"}
                                        onChange={handleChangeShowTimes} filter={{movie_id:movie,date_start:time}} isRequired={requiredValidate}>
                            <ReferenceInput reference={"rooms"} source={"roomId"}
                                            // onChange={handleChangeMovie}
                                            isRequired={requiredValidate}>
                                <AutocompleteInput
                                    optionText={choice => choice.id ? (
                                        choice.name
                                    )  : ``}
                                />
                            </ReferenceInput>
                        </ReferenceInput>

                    }

                </FormTab>
                <FormTab
                    label="summary"
                    path="summary"
                    contentClassName={classes.tab}
                >
                    <NullableBooleanInput label="Non Profile" source="nonProfile"/>
                </FormTab>
            </TabbedForm>
        </Create>
    )
};

const showTimeFilters = [
    <TextInput label="Search" source="q" alwaysOn />
];

const ShowTimeContent = (props) =>{
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [sort, setSort] = useState({ field: 'id', order: 'ASC' });
    const { data, total, loading, error ,ids} = useGetList(
        'showTimesDetails',
        { page: 1, perPage: 10 },
        { field: 'published_at', order: 'DESC' },
        {}
    );
    if (loading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>ERROR: {error}</p>
    }
    return (
        <Fragment>
            {
                ids.length > 0 ?
                    <Fragment>
                        <Datagrid
                            data={keyBy(data, 'id')}
                            ids={ids}
                            currentSort={sort}
                            setSort={(field, order) => setSort({ field, order })}
                        >

                            <ReferenceField label="Movie Name" source="movieId" reference="movies">
                                <TextField source="name" />
                            </ReferenceField>
                            <ReferenceField label="Movie Thumbnail" source="movieId" reference="movies">
                                <ImageField source="thumbnail" />
                            </ReferenceField>

                            <DateField source="timeStart"  locales="VN" showTime options={{ weekday: 'long',day: 'numeric', month: 'long', year: 'numeric',hour:'numeric',minute:'numeric'}}
                                       label={"Day Show Times"}/>
                            {/*<TextField source="timeStart" />*/}
                            <ReferenceField label="Room" source="roomId" reference="rooms">
                                <TextField source="name" />
                            </ReferenceField>
                            <ReferenceField label="Theater" source="roomId" reference="rooms" sortable={false} >
                                <ReferenceField reference="theaters" source="theaterId" link={(record, reference) => `/${reference}/${record.theaterId}`}>
                                    <TextField source="name" />
                                </ReferenceField>
                            </ReferenceField>
                            <ReferenceField label="Location" source="roomId" reference="rooms" sortable={false} >
                                <ReferenceField reference="theaters" source="theaterId" >
                                    <ReferenceField reference="locations" source="locationId" link={(record, reference) => `/${reference}/${record.locationId}`}>
                                        <TextField source="name" />
                                    </ReferenceField>
                                </ReferenceField>
                            </ReferenceField>
                            {/*<ShowButton />*/}
                            {/*<EditButton />*/}
                        </Datagrid>
                        <Pagination
                            page={page}
                            setPage={setPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            total={total}
                        />
                    </Fragment>

                    :<Typography> No results found </Typography>
            }


        </Fragment>
    )
}

const requiredValidate = [required()];

export default OrdersCreate;

