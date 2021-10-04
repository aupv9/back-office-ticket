import {Card, CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    useGetList,
} from 'react-admin';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


import inflection from 'inflection';


const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '15em',
            marginRight: '1em',
            overflow: 'initial',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));


const Aside = () => {
    const { data, ids } = useGetList(
        'locations',
            { page: 1, perPage: 100 },
            { field: 'name', order: 'ASC' },
            {}
    );
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <FilterLiveSearch />

                <FilterList
                    label="Location"
                    icon={<LocalOfferIcon />}
                >
                    {ids &&
                    data &&
                    ids.map((id) => (
                        <FilterListItem
                            label={data[id].name}
                            key={data[id].id}
                            value={{ location_id: data[id].id }}
                        />
                    ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
