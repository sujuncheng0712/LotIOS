import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,Dimensions,Platform,BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
const {height,width} =  Dimensions.get('window');
// iPhoneX
const X_WIDTH = 414;
const X_HEIGHT =896;
let style='android'
const url = `https://iot2.dochen.cn/api`;
let time = 0;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginInfo: {},
      allowance: '',
      balance: '',
      commission: '',
      deposit: '',
      wallet: '',
      pledge: '',
      balance_at: '',
      list:[],
      data:[],
    };
  }

  // render创建之前
  componentWillMount() {
    let isInphoneX =  Platform.OS === 'ios' &&
    ((height === X_HEIGHT && width === X_WIDTH) ||
        (height === X_WIDTH && width === X_HEIGHT));
        if (isInphoneX) {
          style='iphoneX'
      } else if (Platform.OS === 'ios') {
          style='iphone'
      } else {
         style='android'
      }
    this._checkLoginState();
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    if (this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp();
      }
      this.lastBackPressed = Date.now();
      Toast.show('再按一次退出应用');
      return true;
    }
  }

  // 验证本地存储的资料是否有效
  _checkLoginState = async () => {
    let LoginInfo = await AsyncStorage.getItem('LoginInfo');
    LoginInfo = eval('(' + LoginInfo + ')');
    LoginInfo = LoginInfo[0];
    console.log(LoginInfo)
    if (LoginInfo !== null) {
      this.setState({LoginInfo});
      //获取信息
      let urlInfo = `${url}/userSignUpSubmit?mid=${LoginInfo.mid}&sale_type=${LoginInfo.sale_type}`;
      fetch(urlInfo).then(res => {
        res.json().then(info => {
          console.log(info)
          if (info.status) {
            this.setState({
              allowance: info.datas.allowance,
              balance: info.datas.balance,
              commission: info.datas.commission,
              deposit: info.datas.deposit,
              wallet: info.datas.wallet,
              pledge: info.datas.pledge,
              balance_at: info.datas.balance_at,
            })
          }
        })
      })

      //获取产品列表
      let urlInfo2=`${url}/merchantProduct?sale_type=${LoginInfo.sale_type}`;
      fetch(urlInfo2).then(res =>{
          res.json().then(info =>{
              console.log(info);
              let list = [];
              if(info.status && time ===0){
                  info.data.forEach((item) =>{
                      //children.push(<Picker.Item label={item.title+' : '+item.price} value={item.mpid}/>);
                      list.push({value:item.mpid,label:item.title+' : '+item.price})
                  })
                  time++;
                  console.log(list);
                  this.setState({list:list,data:info.data});
              }

          })
      })

    } else {
      this.props.navigation.navigate('Login');
    }
  };

  componentDidMount() {
    //wechat.registerApp('wxed79edc328ec284a');
  }
  withdraw = async () => {
    await AsyncStorage.clear();
    this.props.navigation.push('Login');
  };

  render() {
    const {allowance,LoginInfo,wallet,commission,balance_at,list,data} = this.state;
    //1品牌 2运营 3代理 4经销
    let isVerdor1 = LoginInfo.type===1 || LoginInfo.type===5 || LoginInfo.type===9 || LoginInfo.type===13 || LoginInfo.type===17 || LoginInfo.type===21;
    let isVerdor2 = LoginInfo.type===2 || LoginInfo.type===6 || LoginInfo.type===10 || LoginInfo.type===14 || LoginInfo.type===18 || LoginInfo.type===22;
    let isVerdor3 = LoginInfo.type===3 || LoginInfo.type===7 || LoginInfo.type===11 || LoginInfo.type===15 || LoginInfo.type===19 || LoginInfo.type===23;
    let isVerdor4 = LoginInfo.type===4 || LoginInfo.type===8 || LoginInfo.type===12 || LoginInfo.type===16 || LoginInfo.type===20 || LoginInfo.type===24;
    return (
      <ScrollView style={{flex:1,  backgroundColor:'#F0EEEF', }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.top}>
            <ImageBackground
              style={styles.ImageBackground }
              source={require('../../images/usr_info.jpg')}>
              <View>
               <Text style={{...styles.contact,marginTop:style ==='iphoneX' ? 25 : 0,}}>{LoginInfo.contact}</Text>
              </View>
             <View style={{position:'absolute',flexDirection:'row',top:style ==='iphoneX' ? 35 : 10,right:10}}>
              <TouchableOpacity
                  style={styles.home}
                  onPress={()=>{this.props.navigation.push('ChangePassword',{state:'group'})}}>
                  <Icon name="gear" size={25} color={'#fff'} />
                  <Text style={{color:'white',fontSize:10}}>修改密码</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.home}
                  onPress={this.withdraw}>
                    <Icon name="redo" size={25} color={'#fff'} />
                <Text style={{color:'white',fontSize:10}}>退出登录</Text>
                </TouchableOpacity>
             </View>

              

              <View style={{width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
              <Text style={{color:'#FF7701',backgroundColor:'#fff',borderRadius:5}}> {
                      isVerdor1 ? ' 品牌商 '
                    : isVerdor2 ? ' 运营商 '
                    : isVerdor3 ? ' 代理商 '
                    : isVerdor4 ? ' 经销商 ' : ''}
                </Text>
              </View>
              
              <View style={styles.topList}>
                <TouchableOpacity
                  style={{...styles.topItem,backgroundColor:''}}
                  onPress={()=>{this.props.navigation.push('Balance')}}>
                  <Image
                  style={styles.img}
                    source={require('../../images/group/groupTop01.png')}
                  />
                  <Text style={styles.topfont}>收支明细</Text>
                </TouchableOpacity>
                <View     style={{...styles.topItem,backgroundColor:''}}>
                  <Text style={styles.topfont}>￥{wallet}</Text>
                  <Text style={styles.topfont}>账户余额</Text>
                </View>
                <TouchableOpacity
                     style={{...styles.topItem,backgroundColor:''}}
                  onPress={()=>{this.props.navigation.push('GroupCash')}}>
                  <Image
                    style={styles.img}
                    source={require('../../images/group/groupTop02.png')}
                  />
                  <Text style={styles.topfont}>我要提现</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={{width:'100%',height:5,backgroundColor:'white'}}></View>
          <View style={styles.tool3}>
            <View style={{width:'100%',flexDirection:'row'}}>
              <View style={styles.tool3Item}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image
                    source={require('../../images/group/butie.png')}
                    style={styles.tool3Img}
                  />
                  <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>推广补贴</Text>
                </View>
                <Text style={styles.tool3Font}>￥{allowance}元/台</Text>
              </View>

              <View style={styles.tool3Item}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image
                    source={require('../../images/group/fanli.png')}
                    style={styles.tool3Img}
                  />
                  <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>滤芯返点</Text>
                </View>
                <Text style={styles.tool3Font}>订单*{commission}</Text>
              </View>

              <View style={styles.tool3Item}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image
                    source={require('../../images/group/weixiubutie.png')}
                    style={styles.tool3Img}
                  />
                  <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>维修补贴</Text>
                </View>
                <Text style={styles.tool3Font}>完善中</Text>
              </View>
            </View>
            {LoginInfo.deposit === true ? 
             <View style={{width:'100%',flexDirection:'row'}}>
                <View style={styles.tool3Item}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image
                    source={require('../../images/group/baozhengjin.png')}
                    style={styles.tool3Img}
                  />
                  <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>已交保证金</Text>
                </View>
                <Text style={styles.tool3Font}>保证金将会冻结</Text>
                <Text style={styles.tool3Font}>完善中</Text>
              </View>
            
              <View style={styles.tool3Item}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image
                    source={require('../../images/group/yajin.png')}
                    style={styles.tool3Img}
                  />
                  <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>已交押金</Text>
                </View>
                <Text style={styles.tool3Font}>用于循环提货</Text>
                <Text style={styles.tool3Font}>完善中</Text>
              </View>

              <View style={styles.tool3Item}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image
                    source={require('../../images/group/edu.png')}
                    style={styles.tool3Img}
                  />
                  <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>发货额度</Text>
                </View>
                <Text style={styles.tool3Font}>截止至{balance_at}</Text>
                <Text style={styles.tool3Font}>完善中</Text>
              </View> 
            </View>: null
          }
            
          </View>
          <View style={{width:'100%',height:5,backgroundColor:'white'}}></View>
          <View style={styles.tool}>
            <Text style={styles.mainTitle}>我的工具</Text>

            <View style={styles.topList}>
              <TouchableOpacity
                style={styles.topItem}
                onPress={()=>{this.props.navigation.push('Mall')}}>
                  <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                  // resizeMode="stretch"
                    source={require('../../images/group/jihuoma1.png')}
                    />
                </View>
                <Text>购买激活码</Text>
              </TouchableOpacity> 

              <TouchableOpacity
                style={styles.topItem}
                onPress={()=>{this.props.navigation.push('Codes')}}>
                  <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                  // resizeMode="stretch"
                    source={require('../../images/group/chakan.png')}
                    />
                </View>
                <Text>查看激活码</Text>
              </TouchableOpacity> 

              <TouchableOpacity
                style={styles.topItem}
                onPress={()=>{this.props.navigation.push('UserQuery')}}>
                  <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                  // resizeMode="stretch"
                    source={require('../../images/group/yonghu.png')}
                    />
                </View>
                <Text>查看用户</Text>
              </TouchableOpacity> 
            
              {isVerdor4  ? null :
                <TouchableOpacity
                  style={styles.topItem}
                  onPress={()=>{this.props.navigation.push('Addmerchant')}}>
                    <View style={styles.toolItem}>
                      <Image
                      style={styles.toolImg}
                    // resizeMode="stretch"
                      source={require('../../images/group/account.png')}
                      />
                  </View>
                  <Text>添加商家</Text>
                </TouchableOpacity> 
              }
              {isVerdor4 ? null :
               <TouchableOpacity  
                style={styles.topItem}
                onPress={()=>{this.props.navigation.push('MerchantList')}}>
                <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                    // resizeMode="stretch"
                    source={require('../../images/group/list.png')}
                    />
                  </View>
                <Text >商家列表</Text>
             </TouchableOpacity>
              }

              {LoginInfo.deposit === true ? 
                <TouchableOpacity  
                  style={styles.topItem}
                  onPress={()=>{ this.props.navigation.push('Pick',{list:list,data:data,LoginInfo:LoginInfo})}}>
                <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                    // resizeMode="stretch"
                    source={require('../../images/group/tihuo.png')}
                    />
                  </View>
                <Text >我要提货</Text>
             </TouchableOpacity> : null}

             {LoginInfo.deposit === true ? 
                <TouchableOpacity  
                  style={styles.topItem}
                   onPress={()=>{alert('完善中')}}>
                  {/* onPress={()=>{this.props.navigation.push('AfterSale')}}> */}
                <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                    // resizeMode="stretch"
                    source={require('../../images/group/tuihuo.png')}
                    />
                  </View>
                <Text >我要退货</Text>
             </TouchableOpacity> : null}

             <TouchableOpacity
                style={styles.topItem}
                onPress={()=>{this.props.navigation.push('Statement')}}>
                  <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                  // resizeMode="stretch"
                    source={require('../../images/group/duizhangdan.png')}
                    />
                </View>
                <Text >对账单</Text>
              </TouchableOpacity>
             <TouchableOpacity
                style={styles.topItem}
                onPress={()=>{this.props.navigation.push('Share')}}>
                  <View style={styles.toolItem}>
                    <Image
                    style={styles.toolImg}
                  // resizeMode="stretch"
                    source={require('../../images/group/daohang-tuiguanglianjie.png')}
                    />
                </View>
                <Text >分享链接</Text>
              </TouchableOpacity>
              </View>
          </View>
          <View style={{width:'100%',height:5,backgroundColor:'white'}}></View>
          <View style={styles.tool}>
            <Text style={styles.mainTitle}>使用指引</Text>

            <View style={styles.topList}>
                <TouchableOpacity
                  style={styles.topItem}
                  onPress={()=>{this.props.navigation.push('PhoneGuide')}}>
                  <Image
                  style={styles.img}
                    source={require('../../images/group/phone.png')}
                  />
                  <Text style={styles.toolTitle}>手机端</Text>
                  <Text>使用指引</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                  style={styles.topItem}
                  onPress={()=>{this.props.navigation.push('PCGuide')}}>
                <Image
                  style={styles.img}
                    source={require('../../images/group/computer.png')}
                  />
                  <Text style={styles.toolTitle}>电脑端</Text>
                  <Text>使用指引</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.topItem}
                  onPress={()=>{alert('完善中')}}>
                 <Image
                  style={styles.img}
                    source={require('../../images/group/product.png')}
                  />
                  <Text style={styles.toolTitle}>产品</Text>
                  <Text>故障排除</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
        <View>
            <Text style={styles.buttomTitle}>广东顺德迪吉凯电子商务有限公司</Text>
          </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  top:{
    width: '100%',
  },
  ImageBackground:{
    flex:1,
    width:'100%',
    height:'100%',
  //  paddingBottom:10,
  },
  contact:{
    textAlign:'center',
    width:'100%',
    color:'#fff',
    padding:10,
    fontSize:width/20,
  },
  home:{
    alignItems:'center',
    justifyContent:'center',
    marginLeft:5,
  },
  topList:{ 
    flexDirection:'row',
    width:'100%',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    flexWrap:'wrap',
    marginBottom:10,
    marginTop:5,
  },
  topItem:{
    alignItems:'center',
    justifyContent:'center',
    width:'33%',
   paddingBottom:10,
    backgroundColor:'white',
    backgroundColor:'#F0EEEF',
  },
  toolItem:{
    backgroundColor:'#FF7701',
    borderRadius:50,
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:5,
  },
  toolImg:{
    height:25,
    width:25,
  },
  img:{
    height:30,
    width:30,
  },
  topfont:{
    color:'#fff',
    marginTop:10,
  },
  tool:{
    width:'100%',
    backgroundColor:'#F0EEEF',
   //marginTop:5,
  },
  toolTitle:{
    fontWeight:'bold',
  },
  tool3:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F0EEEF',
    flexWrap:'wrap',
    //marginTop:5,
  },
  tool3Item:{
    //padding:5,
    width:'33%',
    borderColor:'grey',
    borderWidth:0.2,
    alignItems:'center',
    justifyContent:'center',
    height:65,
  },
  tool3Img:{
    width:17,
    height:17,
  },
  tool3Font:{
    color:'grey',
    fontSize:10,
  },
  mainTitle:{
    paddingLeft:20,
    marginTop:15
  },
  buttomTitle:{
    width:'100%',
    textAlign:'center',
    paddingTop:50,
    color:'#666666',
  }
})