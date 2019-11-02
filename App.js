import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import White from './src/pages/White';
import GroupHome from './src/pages/GroupHome';
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
import HomePage from './src/pages/group/HomePage';
import Earnring from './src/pages/group/Earnring';
import ActivataDevice from './src/pages/group/ActivataDevice';
import SetDetail from './src/pages/group/SetDetail';
import Balance from './src/pages/group/Balance';
import GroupCash from './src/pages/group/GroupCash';
import WriteCard from './src/pages/group/WriteCard';
import CashPassword from './src/pages/group/CashPassword';
import GroupCashRecord from './src/pages/group/GroupCashRecord';
import Mall from './src/pages/group/Mall';
import Codes from './src/pages/group/Codes';
import UserQuery from './src/pages/group/UserQuery';
import Addmerchant from './src/pages/group/Addmerchant';
import MerchantList from './src/pages/group/MerchantList';
import Pick from './src/pages/group/Pick';
import Statement from './src/pages/group/Statement';
import PhoneGuide from './src/pages/group/PhoneGuide';
import PCGuide from './src/pages/group/PCGuide';
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
    HomePage:HomePage,
    GroupHome:GroupHome,
    Earnring:Earnring,
    ActivataDevice:ActivataDevice,
    SetDetail:SetDetail,
    Balance:Balance,
    GroupCash:GroupCash,
    WriteCard:WriteCard,
    CashPassword:CashPassword,
    GroupCashRecord:GroupCashRecord,
    Mall:Mall,
    Codes:Codes,
    UserQuery:UserQuery,
    Addmerchant:Addmerchant,
    MerchantList:MerchantList,
    Pick:Pick,
    Statement:Statement,
    PhoneGuide:PhoneGuide,
    PCGuide:PCGuide,
  },
  // {
  //   initialRouteName: 'Home',
  // },
);
export default createAppContainer(AppStack);
