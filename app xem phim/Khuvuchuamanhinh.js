import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import manhinhdangki from './manhinh/manhinhdangki';
import manhinhdangnhap from './manhinh/manhinhdangnhap';
import manhinhchao from './manhinh/manhinhchao';
import trangchu from './manhinh/trangchu';
import manhinhchinh from './manhinh/manhinhchinh';
import themxoasua from './manhinh/themxoasua';
import thongtinchitiet from './manhinh/thongtinchitiet';
import chayvideophim from './manhinh/chayvideophim';
import thongbaonitification from './manhinh/thongbaonotification';






const Manhinh = createStackNavigator();
const Khuvucchuamanhinh = ({navigation}) =>(
    <Manhinh.Navigator headerMode='none'>
        <Manhinh.Screen name='mhchao' component={manhinhchao} />
        <Manhinh.Screen name='mhdangnhap' component={manhinhdangnhap} />
        <Manhinh.Screen name='mhdangki' component={manhtrinhdangki} />
        <Manhinh.Screen name='mhtrangchu' component={angchu}/>
        <Manhinh.Screen name='mhchinh' component={manhinhchinh} />
        <Manhinh.Screen name='mhthemxoasua' component={themxoasua} />
        <Manhinh.Screen name='mhthongtinchitiet' component={thongtinchitiet} />
        <Manhinh.Screen name='mhchayvideo' component={chayvideophim} />
        <Manhinh.Screen name='mhthongbaonotification' component={thongbaonitification} />


        


    </Manhinh.Navigator>
);
export default Khuvucchuamanhinh;
