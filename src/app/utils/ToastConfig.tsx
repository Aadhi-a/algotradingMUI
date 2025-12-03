// toastConfig.ts
import Icon from '@components/global/Icon';
import { Colors, Fonts } from '@unistyles/constants';
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 14,
        color: 'gray',
      }}
    />
  ),

  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red', marginVertical: 100 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: 'red'
      }}
      text2Style={{
        fontSize: 13,
        color: Colors.secondary
      }}
      text2NumberOfLines={0}
    />
  ),

  customToast: ({ text1, text2, props }: any) => (
    <View style={{paddingVertical: 120, width: '90%', alignItems: 'center'}}>
        <View style={{
      height: 60,
      width: '90%',
      backgroundColor: '#f3f3f3',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
      
    }}>
        <Icon name='arrowCircleDown' size={30} color='red'/>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{text1}</Text>
      <Text style={{ color: 'lightgray', fontSize: 14 }}>{text2}</Text>
    </View>
    </View>
  ),
};
