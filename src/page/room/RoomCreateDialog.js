import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    required,
    useRedirect,
    useDataProvider,
} from 'react-admin';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export const RoomCreateDialog = ({ open } ) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();

    const handleClose = () => {
        redirect('/deals');
    };

    const onSuccess = ({ data: deal } ) => {
        redirect('/deals');
        // increase the index of all deals in the same stage as the new deal
        dataProvider
            .getList('deals', {
                pagination: { page: 1, perPage: 50 },
                sort: { field: 'id', order: 'ASC' },
                filter: { stage: deal.stage },
            })
            .then(({ data: deals }) =>
                Promise.all(
                    deals
                        .filter(oldDeal => oldDeal.id !== deal.id)
                        .map(oldDeal =>
                            dataProvider.update('deals', {
                                id: oldDeal.id,
                                data: { index: oldDeal.index + 1 },
                                previousData: oldDeal,
                            })
                        )
                )
            );
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Create
                resource="rooms"
                basePath="/rooms"
                className={classes.root}
                onSuccess={handleClose}
            >
                <SimpleForm initialValues={{ index: 0 }}>
                    <TextInput
                        source="name"
                        label="Deal name"
                        fullWidth
                        validate={[required()]}
                    />
                    <TextInput
                        source="description"
                        multiline
                        rows={3}
                        fullWidth
                    />
                    <ReferenceInput
                        source="company_id"
                        reference="companies"
                        fullWidth
                        validate={[required()]}
                    >
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    {/*<SelectInput*/}
                    {/*    source="stage"*/}
                    {/*    choices={stageChoices}*/}
                    {/*    fullWidth*/}
                    {/*    validate={[required()]}*/}
                    {/*    defaultValue="opportunity"*/}
                    {/*/>*/}
                    {/*<SelectInput*/}
                    {/*    source="type"*/}
                    {/*    choices={typeChoices}*/}
                    {/*    fullWidth*/}
                    {/*/>*/}
                    <NumberInput source="amount" fullWidth defaultValue={0} />
                </SimpleForm>
            </Create>
        </Dialog>
    );
};
