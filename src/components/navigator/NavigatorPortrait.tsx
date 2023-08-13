import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, ListItem, Toolbar, Typography, Drawer, List, Box } from '@mui/material';
import { RouteType } from './Navigator';

const NavigatorPortrait: React.FC<{routes: RouteType[]}> = ({ routes }) => {

    const [flOpen, setOpen] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        let index = routes.findIndex(r => r.to === location.pathname);
        if (index < 0) {
            index = 0;
        }
        navigate(routes[index].to);

    }, [routes]);
    function getTitle(): string {
        const route = routes.find(r => r.to === location.pathname)
        return route ? route.label : '';
    }


    function toggleOpen() {
        setOpen(!flOpen);
    }
    function getListItems(): React.ReactNode {
        return routes.map(i => <ListItem onClick={toggleOpen} 
            component={Link} to={i.to} key={i.to}>{i.label}</ListItem>)
    }
    return <Box sx={{ marginTop: { xs: "15vh", sm: "20vh" }}}>
        <AppBar position="fixed">
            <Toolbar style={{backgroundColor:"#b15e3a"}} ><IconButton onClick={toggleOpen} sx={{ color: 'white', backgroundColor: '#b15e3a' }}>
                <Menu />
            </IconButton>
                <Typography sx={{ width: "100%", textAlign: "center", fontSize: "1.5em", backgroundColor: '#b15e3a'  }}>
                    {getTitle()}
                </Typography>
                <Drawer open={flOpen} onClose={toggleOpen} anchor="left" >
                    <List>
                        {getListItems()}
                    </List>
                </Drawer></Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="row" justifyContent="center" alignContent="center" marginBottom='3vh'>
        <Box  sx={{width: {xs:"50vw", sm:"10vw"}}}   >
            <img src="/images/shoplogo.png" alt="" width="100%" />
        </Box>
        <Typography sx={{fontSize: {xs:"200%", sm:"200%"}}}  color='gray' alignContent='center'></Typography>
        </Box>
        <Outlet></Outlet>
    </Box>
}
export default NavigatorPortrait