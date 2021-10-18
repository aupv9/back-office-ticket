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
    NumberInput,AutocompleteInput
} from "react-admin";
import * as React from "react";
import {InputAdornment} from "@material-ui/core";



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
        maxWidth: '40em',
        display: 'block',
    },
});

const OrdersCreate = (props) =>{
    const classes = useStyles();
    const { identity, loading: identityLoading } = useGetIdentity();
    const OptionRenderer = choice => (
        <span>
            <img src={choice["thumbnail"]} alt=""/>
            {choice["name"]}
        </span>
    );
    const inputText = choice => `${choice.name}`;
    return(
        <Create {...props} >
            <TabbedForm >
                <FormTab
                    label="summary"
                    contentClassName={classes.tab}
                >
                    <NullableBooleanInput label="Non Profile" source="nonProfile"/>
                    {/*<NumberInput*/}
                    {/*    source="price"*/}
                    {/*    className={classes.price}*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="start">*/}
                    {/*                vnd*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*    validate={requiredValidate}*/}
                    {/*/>*/}

                </FormTab>
                <FormTab
                    label="detail"
                    path="detail"
                    contentClassName={classes.tab}
                >
                    {/*<TextInput source="name" validate={requiredValidate} />*/}
                    {/*<TextInput source="code" validate={requiredValidate} />*/}
                    <ReferenceInput
                        source="movieId"
                        reference="movies"
                        validate={requiredValidate}
                    >
                        <AutocompleteInput isRequired
                                           optionText={(choice) => choice.id ?  `${choice.name}` : ''
                                           }
                        />
                    </ReferenceInput>



                    {/*<TextInput source="address" validate={requiredValidate} />*/}
                    {/*<GMapField*/}
                    {/*    source=""*/}
                    {/*    googleKey=""*/}
                    {/*    searchable={true}*/}
                    {/*/>*/}

                    {/*<GMapInput*/}
                    {/*    source="longitude"*/}
                    {/*    multipleMarkers*/}
                    {/*    googleKey="<YOUR_GOOGLE_APP_KEY>"*/}
                    {/*/>*/}
                </FormTab>

            </TabbedForm>
        </Create>
    )
};
const requiredValidate = [required()];

export default OrdersCreate;

