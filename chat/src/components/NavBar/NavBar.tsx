import {AppBar, Toolbar, Typography} from "@mui/material";

const NavBar = () => {
    return (
        <>

                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">
                            Anonymous chat
                        </Typography>
                    </Toolbar>
                </AppBar>
        </>
    );
};

export default NavBar;