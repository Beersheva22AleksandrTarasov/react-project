import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom'
export type RouteType = {
  order: any;
    to: string, label: string
}
const Navigator: React.FC<{ routes: RouteType[] }> = ({routes}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);
    useEffect(() => {
        let index = routes.findIndex(r=>r.to === location.pathname)
        if (index < 0 ) {
            index = 0;
        }
        navigate(routes[index].to);
        setValue(index);
    }, [routes])
    function onChangeFn(event:any, newValue:number) {
        setValue(newValue);
    }
    function getTabs(): ReactNode {
        return routes.map(r=><Tab component={NavLink} to={r.to} label={r.label} key={r.label} />)
    }

    
    return <Box mt={10}>
        <AppBar >
            <Tabs value={value <routes.length ? value : 0} onChange={onChangeFn} style={{backgroundColor:'#f5f5dc', }}>
                {getTabs()}       
            </Tabs>
        </AppBar>
        <Box display="flex" flexDirection="row" justifyContent="center" alignContent="center" marginBottom='3vh'>
        <Box width='25vw' >
            <img src="/images/shoplogo.png" alt="" width="125%" />
        </Box>
        <Typography variant='h2' color='black' alignContent='center'></Typography>
        </Box>
        <Outlet></Outlet>
        
    </Box>
}
export default Navigator;