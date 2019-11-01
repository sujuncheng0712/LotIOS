import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import White from './src/pages/White';
import Home from './src/pages/Home';
import Home33 from './src/pages/Home33';
import Settlement from './src/pages/Settlement';
import Login from './src/pages/users/Login';
import MyCenter33 from './src/pages/users/MyCenter33';
import Address from './src/pages/users/Address';
import Create from './src/pages/users/Create';
import Register from './src/pages/users/Register';
import AddDevice from './src/pages/device/AddDevice';
import ScanScreen from './src/pages/device/ScanScreen';
import Filter from './src/pages/device/Filter';
import Status from './src/pages/device/Status';
import Water from './src/pages/device/Water';
import Activation from './src/pages/device/Activation';
import DeviceIndex from './src/pages/device/DeviceIndex';
import CashRecord from './src/pages/returnService/CashRecord';
import Wallet from './src/pages/returnService/Wallet';
import Cash from './src/pages/returnService/Cash';
import ChangePassword from './src/pages/returnService/ChangePassword';
import Code from './src/pages/returnService/Code';
import Share from './src/pages/returnService/Share';
import Extend from './src/pages/returnService/Extend';
import Setup from './src/pages/returnService/Setup';
import AfterRecord from './src/pages/returnService/AfterRecord';
import Fix from './src/pages/returnService/Fix';
import Order from './src/pages/order/Order';
import Orders from './src/pages/order/Orders';
import MiandanRule from './src/pages/miandan/MiandanRule';
import RecommendRecord from './src/pages/miandan/RecommendRecord';
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

const AppStack = createStackNavigator(
  {  
    White:White,
    MyCenter33:MyCenter33,
    Login: Login,
    Home:Home,
    Home33:Home33,
    AddDevice:AddDevice,
    ScanScreen:ScanScreen,
    Settlement:Settlement,
    Address:Address,
    Create:Create,
    CashRecord:CashRecord,
    Wallet:Wallet,
    Cash:Cash,
    Order:Order,
    Orders:Orders,
    ChangePassword:ChangePassword,
    Code:Code,
    Share:Share,
    Extend:Extend,
    Setup:Setup,
    AfterRecord:AfterRecord,
    Fix:Fix,
    Register:Register,
    Status:Status,
    Filter:Filter,
    Water:Water,
    DeviceIndex:DeviceIndex,
    Activation:Activation,
    MiandanRule:MiandanRule,
    RecommendRecord:RecommendRecord,
  },
  // {
  //   initialRouteName: 'Home',
  // },
);
export default createAppContainer(AppStack);
