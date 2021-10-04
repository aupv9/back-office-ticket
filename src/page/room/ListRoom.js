import {Datagrid, EditButton, List, TextField, TextInput, ReferenceField, SearchInput} from "react-admin";
import TheaterNameField from "./TheaterNameField";
import {makeStyles} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import Aside from "./Aside";
import MobileGrid from "./MobileGrid";



const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const visitorFilters = [
    <SearchInput source="q" alwaysOn />,
    // <DateInput source="last_seen_gte" />,
    // <NullableBooleanInput source="has_ordered" />,
    // <NullableBooleanInput source="has_newsletter" defaultValue />,
    // <SegmentInput />,
];


export const ListRoom = (props) =>{
    const classes = useStyles();
    const isXsmall = useMediaQuery(theme =>
            theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: 'id', order: 'ACS' }}
            perPage={25}
            aside={<Aside />}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized rowClick="edit">
                    <TextField source={"name"}/>
                    <TextField source={"code"}/>
                    <ReferenceField reference={"theaters"} source={"theaterId"}>
                        <TheaterNameField />
                    </ReferenceField>
                    <TextField source={"type"}/>

                    {/*<DateField source="last_seen" />*/}
                    {/*<NumberField*/}
                    {/*    source="nb_commands"*/}
                    {/*    label="resources.customers.fields.commands"*/}
                    {/*    className={classes.nb_commands}*/}
                    {/*/>*/}
                    {/*<ColoredNumberField*/}
                    {/*    source="total_spent"*/}
                    {/*    options={{ style: 'currency', currency: 'USD' }}*/}
                    {/*/>*/}
                    {/*<DateField source="latest_purchase" showTime />*/}
                    {/*<BooleanField source="has_newsletter" label="News." />*/}
                    {/*<SegmentsField*/}
                    {/*    cellClassName={classes.hiddenOnSmallScreens}*/}
                    {/*    headerClassName={classes.hiddenOnSmallScreens}*/}
                    {/*/>*/}
                </Datagrid>
            )}
        </List>
    );
}
