import propTypes from "prop-types";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingScreen({ isLoading }) {
    return (
        <Backdrop
            open={isLoading}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

LoadingScreen.propTypes = {
    isLoading: propTypes.bool.isRequired,
};

export default LoadingScreen;
