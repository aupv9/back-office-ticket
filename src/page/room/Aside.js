import * as React from 'react';
import { Card as MuiCard, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import MailIcon from '@material-ui/icons/MailOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import {FilterList, FilterListItem, FilterLiveSearch, useGetList} from 'react-admin';
import {
    endOfYesterday,
    startOfWeek,
    subWeeks,
    startOfMonth,
    subMonths,
} from 'date-fns';


const Card = withStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            order: -1,
            width: '15em',
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))(MuiCard);

const Aside = () => {
    const { data, ids } = useGetList(
        'theaters',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' },
        {}
    );
   return (
       <Card>
        <CardContent>
            <FilterLiveSearch />
            <FilterList
                label="Theater"
                icon={<LocalOfferIcon />}
            >
                {ids &&
                data &&
                ids.map((id) => (
                    <FilterListItem
                        label={data[id].name}
                        key={data[id].id}
                        value={{ theater_id: data[id].id }}
                    />
                ))}
            </FilterList>

        </CardContent>
    </Card>
    );
}

export default Aside;
