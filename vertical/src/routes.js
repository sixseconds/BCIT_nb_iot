import Dashboard from './containers/MainContent/dashboard/dashboard';
import LocationsComponent from './components/Layout/LocationComponent';
import Parameters from './components/Parameters';
import Devices from './components/Devices';

const routes = [
    { path: '/iot_parameters', component: Parameters, ispublic: true },
    { path: '/iot_devices', component: Devices, ispublic: true },
    { path: '/iot_locations', component: LocationsComponent },
    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Dashboard },
];

export default routes;