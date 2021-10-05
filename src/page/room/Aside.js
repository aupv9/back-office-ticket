import * as React from 'react';
import { Card as MuiCard, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import {FilterList, FilterListItem, FilterLiveSearch, useGetList} from 'react-admin';
import {
    startOfWeek,
    subWeeks,
    startOfMonth,
    subMonths, startOfToday
    ,endOfToday, endOfWeek,endOfMonth
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
            {/*<FilterList*/}
            {/*    label="booking by show times"*/}
            {/*    icon={<AccessTimeIcon />}*/}
            {/*>*/}
            {/*    <FilterListItem*/}
            {/*        label="Today"*/}
            {/*        value={{*/}
            {/*            start: startOfToday().toISOString(),*/}
            {/*            end: endOfToday().toISOString(),*/}
            {/*            isToday:true*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <FilterListItem*/}
            {/*        label="This week"*/}
            {/*        value={{*/}
            {/*            start: startOfWeek(new Date()).toISOString(),*/}
            {/*            end: endOfWeek(new Date()).toISOString(),*/}
            {/*            isToday:undefined*/}

            {/*        }}*/}
            {/*    />*/}
            {/*    <FilterListItem*/}
            {/*        label="Last week"*/}
            {/*        value={{*/}
            {/*            start: subWeeks(*/}
            {/*                startOfWeek(new Date()),*/}
            {/*                1*/}
            {/*            ).toISOString(),*/}
            {/*            end: startOfWeek(new Date()).toISOString(),*/}
            {/*            isToday:undefined*/}


            {/*        }}*/}
            {/*    />*/}
            {/*    <FilterListItem*/}
            {/*        label="This month"*/}
            {/*        value={{*/}
            {/*            start: startOfMonth(new Date()).toISOString(),*/}
            {/*            end: endOfMonth(new Date()).toISOString(),*/}
            {/*            isToday:undefined*/}


            {/*        }}*/}
            {/*    />*/}
            {/*    <FilterListItem*/}
            {/*        label="Last month"*/}
            {/*        value={{*/}
            {/*            start: subMonths(*/}
            {/*                startOfMonth(new Date()),*/}
            {/*                1*/}
            {/*            ).toISOString(),*/}
            {/*            end: startOfMonth(new Date()).toISOString(),*/}
            {/*            isToday:undefined*/}


            {/*        }}*/}
            {/*    />*/}
            {/*    <FilterListItem*/}
            {/*        label="Earlier"*/}
            {/*        value={{*/}
            {/*            start: subMonths(*/}
            {/*                endOfMonth(new Date()),*/}
            {/*                1*/}
            {/*            ).toISOString(),*/}
            {/*            end: subMonths(*/}
            {/*                startOfMonth(new Date()),*/}
            {/*                1*/}
            {/*            ).toISOString(),*/}
            {/*            isToday:undefined*/}

            {/*        }}*/}
            {/*    />*/}
            {/*</FilterList>*/}
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
