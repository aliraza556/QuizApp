import { View, Text, Image, TouchableOpacity } from "react-native";
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants/theme';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ flex: 1, justifyContent: 'space-around', marginVertical: 4 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View style={{ marginTop: 4 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignupScreen")}
            style={{ paddingVertical: 10, backgroundColor: 'yellow', marginHorizontal: 7, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={{ fontWeight: 'bold', color: 'yellow' }}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
