import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    ReferenceField,
    SearchInput,
    TopToolbar,
    FilterButton,
    SortButton,
    CreateButton,
    ExportButton,
    AutocompleteInput,
    ReferenceInput,
    DateField,
    ChipField,
    BooleanField, useListContext, NumberField, ShowButton, BulkDeleteButton, useDataProvider, useNotify
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Typography, useMediaQuery} from "@material-ui/core";
import * as React from "react";
import CustomizableDatagrid from 'ra-customizable-datagrid';
import {Fragment} from "react";
import {ImportButton} from "react-admin-import-csv";
import {SendOutlined, SendSharp} from "@material-ui/icons";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {useUnselectAll} from "ra-core";


const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const roomFilters = [
    <SearchInput source="q" alwaysOn />,
    // <ReferenceInput source="theater_id" reference="theaters">
    //     <AutocompleteInput
    //         optionText={(choice) =>
    //             choice.id
    //                 ? `${choice.name}`
    //                 : ''
    //         }
    //     />
    // </ReferenceInput>,

];

const ListActions = (props) => (
    <TopToolbar>
        <FilterButton/>
        <ExportButton/>
        <CreateButton />
    </TopToolbar>
);

const useStyles1 = makeStyles(
    theme => ({
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }),
    { name: 'RaBulkDeleteWithUndoButton' }
);

const OfferBulkActionButtons = props => {
    console.log(props)
    const {selectedIds} = props;
    const classes =useStyles1();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const unselectAll = useUnselectAll();

    const {
        className,
        basePath,
        total,
        resource,
        currentSort,
        filterValues,
        exporter,
    } = props;
    const sendSubscriber  = () =>{
        const  token  = JSON.parse(localStorage.getItem('token'));
        const request = new Request(`http://localhost:8080/api/v1/sendSub`, {
            method: 'POST',
            body: JSON.stringify({ offers:selectedIds }),
            headers: new Headers({ 'Content-Type': 'application/json','Authorization':token }),
        });
        fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {

                }
            })
            .then(res => {
                notify("Send Promotion Success");
                unselectAll(props.resource)
            })
            .catch(() => {
                notify("Send Promotion Failure");

            });
    }

    return (
        <Fragment>
            {/* default bulk delete action */}
            <BulkDeleteButton  {...props} />
            <Button classes={classes.deleteButton}
                    onClick={sendSubscriber}>
                <SendSharp />
                Send To Subscriber
            </Button>

        </Fragment>
    );
}


export const OfferList = (props) =>{

    const classes = useStyles();
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List
            bulkActionButtons={<OfferBulkActionButtons {...props}/>}
            {...props}
            filters={roomFilters}
            sort={{ field: 'id', order: 'ACS' }}
            perPage={25}
            // aside={<Aside />}
            actions={<ListActions/>}
            hasCreate={true}
        >
            <CustomDataGrid {...props}/>
        </List>
    );
}

const CustomDataGrid = (props) =>{

    return (
        <CustomizableDatagrid rowClick={"show"} {...props}>
            <DateField source={"creationDate"} showTime/>
            <TextField source={"name"}/>
            <ChipField source={"method"} label={"Mode"}/>
            <ChipField source={"type"}/>
            <ChipField source={"status"}/>
            <ChipField source={"maxTotalUsage"} label={"Count Usage Remain"}/>
            <NumberField
                source="discountAmount"
                options={{
                    style: 'currency',
                    currency: 'VND',
                }}
                label={"Amount"}
            />
            <TextField source={"percentage"} label={"%"}/>
            <ChipField source={"maxTotalUsage"} label={"Remain"}/>

            <EditButton />
        </CustomizableDatagrid>
    )
}

const UserDetail = ({record}) =>{

    return record.profile ? (
        <ReferenceField reference={"users"} source={"userId"}>
            <TextField source={"email"}/>
        </ReferenceField>
    ) :(
        <Typography>
            {""}
        </Typography>
    )
}

