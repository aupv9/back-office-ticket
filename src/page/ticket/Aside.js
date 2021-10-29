import * as React from 'react';
import PropTypes from 'prop-types';
import {
    NumberField,
    TextField,
    DateField,
    useTranslate,
    useGetList,
    Record,
    RecordMap,
    Identifier,
    ReferenceField,
    useLocale,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Link,
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { makeStyles } from '@material-ui/core/styles';

const useAsideStyles = makeStyles(theme => ({
    root: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));


const Aside = ({ record, basePath }) => {
    const classes = useAsideStyles();
    return (
        <div className={classes.root}>
            {record && <EventList record={record} basePath={basePath} />}
        </div>
    );
};


const useEventStyles = makeStyles({
    stepper: {
        background: 'none',
        border: 'none',
        marginLeft: '0.3em',
    },
});

// const EventList = ({ record, basePath }) => {
//     const translate = useTranslate();
//     const classes = useEventStyles();
//     const locale = useLocale();
//     const { data: orders, ids: orderIds } = useGetList(
//         'commands',
//             { page: 1, perPage: 100 },
//             { field: 'date', order: 'DESC' },
//             { customer_id: record && record.id }
//     );
//     const { data: reviews, ids: reviewIds } = useGetList<ReviewRecord>(
//         'reviews',
//             { page: 1, perPage: 100 },
//             { field: 'date', order: 'DESC' },
//             { customer_id: record && record.id }
//     );
//     const events = mixOrdersAndReviews(orders, orderIds, reviews, reviewIds);
//
//     return (
//         <>
//             <Box m="0 0 1em 1em">
//                 <Card>
//                     <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                             {translate(
//                                 'resources.customers.fieldGroups.history'
//                             )}
//                         </Typography>
//                         <Box display="flex">
//                             <Box flexGrow={1}>
//                                 <Box display="flex" mb="1em">
//                                     <Box mr="1em">
//                                         <AccessTimeIcon
//                                             fontSize="small"
//                                             color="disabled"
//                                         />
//                                     </Box>
//                                     <Box flexGrow={1}>
//                                         <Typography>
//                                             {translate(
//                                                 'resources.customers.fields.first_seen'
//                                             )}
//                                         </Typography>
//                                         <DateField
//                                             record={record}
//                                             source="first_seen"
//                                         />
//                                     </Box>
//                                 </Box>
//                                 {orderIds && orderIds.length > 0 && (
//                                     <Box display="flex">
//                                         <Box mr="1em">
//                                             <order.icon
//                                                 fontSize="small"
//                                                 color="disabled"
//                                             />
//                                         </Box>
//                                         <Box flexGrow={1}>
//                                             <Typography>
//                                                 {translate(
//                                                     'resources.commands.amount',
//                                                     {
//                                                         smart_count:
//                                                         orderIds.length,
//                                                     }
//                                                 )}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 )}
//                             </Box>
//                             <Box flexGrow={1}>
//                                 <Box display="flex" mb="1em">
//                                     <Box mr="1em">
//                                         <AccessTimeIcon
//                                             fontSize="small"
//                                             color="disabled"
//                                         />
//                                     </Box>
//                                     <Box flexGrow={1}>
//                                         <Typography>
//                                             {translate(
//                                                 'resources.customers.fields.last_seen'
//                                             )}
//                                         </Typography>
//                                         <DateField
//                                             record={record}
//                                             source="last_seen"
//                                         />
//                                     </Box>
//                                 </Box>
//                                 {reviewIds && reviewIds.length > 0 && (
//                                     <Box display="flex">
//                                         <Box mr="1em">
//                                             <review.icon
//                                                 fontSize="small"
//                                                 color="disabled"
//                                             />
//                                         </Box>
//                                         <Box flexGrow={1}>
//                                             <Typography>
//                                                 {translate(
//                                                     'resources.reviews.amount',
//                                                     {
//                                                         smart_count:
//                                                         reviewIds.length,
//                                                     }
//                                                 )}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 )}
//                             </Box>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Box>
//             <Stepper orientation="vertical" classes={{ root: classes.stepper }}>
//                 {events.map(event => (
//                     <Step
//                         key={`${event.type}-${event.data.id}`}
//                         expanded
//                         active
//                         completed
//                     >
//                         <StepLabel
//                             StepIconComponent={() => {
//                                 const Component =
//                                     event.type === 'order'
//                                         ? order.icon
//                                         : review.icon;
//                                 return (
//                                     <Component
//                                         fontSize="small"
//                                         color="disabled"
//                                         style={{ paddingLeft: 3 }}
//                                     />
//                                 );
//                             }}
//                         >
//                             {new Date(event.date).toLocaleString(locale, {
//                                 weekday: 'long',
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 hour: 'numeric',
//                                 minute: 'numeric',
//                             })}
//                         </StepLabel>
//                         <StepContent>
//                             {event.type === 'order' ? (
//                                 <Order
//                                     record={event.data as OrderRecord}
//                                     key={`event_${event.data.id}`}
//                                     basePath={basePath}
//                                 />
//                             ) : (
//                                 <Review
//                                     record={event.data as ReviewRecord}
//                                     key={`review_${event.data.id}`}
//                                     basePath={basePath}
//                                 />
//                             )}
//                         </StepContent>
//                     </Step>
//                 ))}
//             </Stepper>
//         </>
//     );
// };
// Aside.propTypes = {
//     record: PropTypes.any,
//     basePath: PropTypes.string,
// };






export default Aside;
