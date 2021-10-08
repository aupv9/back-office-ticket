import {Box} from "@material-ui/core";
import {FilterLiveSearch} from "react-admin";


export const LocationFilter = (props) =>{

    return (
        <Box width="15em" order="-1" marginRight="1em">
            <FilterLiveSearch />
        </Box>
            )
}
