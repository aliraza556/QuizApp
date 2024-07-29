
import { View, Text,SafeAreaView,TouchableOpacity,StyleSheet,Image,TextInput,ScrollView, Alert } from 'react-native'
import React, { useState } from "react";
import { COLORS } from '../../constants/theme';
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import {SignInAuthUserWithEmailAndPassword} from "../../Firebase/firebase";
import tw from 'twrnc'

export default function LoginScreen() {
  const navigation = useNavigation();
 const [emailValidError, setEmailValidError] = useState(null);
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");

const [error, setError] = useState({
         email: '',
         pass: ''
  });

const handleValidEmail = (val) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (val.length === 0) {
    setEmailValidError(null);
  } else if (reg.test(val) === false) {
    setEmailValidError(false);
  } else if (reg.test(val) === true) {
    setEmailValidError(true);
  }
};
const login = () => {
  SignInAuthUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      navigation.navigate("HomeScreen");
    })
    .catch((error) => {
      const errorMessage = error.message;
    });
};


const handleLogin = () => {

    if (email === "") {
      setError({ email: "Please Enter Your Email" });
      return;
    } 
    if (!emailValidError) {
      setError({email: "Please Enter a Valid Email"});
      return;
    }

    if (pass === ""){
        setError({pass:"Please Enter Your Password"});
    }
   else{
    login();
    // navigation.navigate("HomeScreen");
   }
    
  };


  return (
    <View style={tw.style("flex-1 bg-white", { backgroundColor: COLORS.bg })}>
      <SafeAreaView style={tw`flex`}>
        <View style={tw`flex-row justify-start`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2`}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require("../../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>

      <View
        style={tw.style("flex-1 bg-white px-8 pt-8", {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        })}
      >
        <ScrollView>
          <View style={tw`form space-y-2`}>
            <Text style={tw`text-gray-700 ml-4`}>Email Address</Text>
            <TextInput
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
              value={email}
              placeholder="Enter Email"
              onChangeText={(value) => {
                setEmail(value);
                handleValidEmail(value);
              }}
            />
            <Text style={tw`text-red-800`}>
              {email === "" ? error.email : ""}
            </Text>
            {emailValidError === false && (
              <Text style={tw`text-red-800`}>
                Please enter a valid email address
              </Text>
            )}
            <Text style={tw`text-gray-700 ml-4`}>Password</Text>
            <TextInput
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl`}
              secureTextEntry
              value={pass}
              placeholder="Enter Password"
              onChangeText={(text) => setPass(text)}
            />
            <Text style={tw`text-red-800`}>
              {pass === "" ? error.pass : ""}
            </Text>
            <TouchableOpacity className="flex items-end">
              <Text style={tw`text-gray-700 mb-5`}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`py-3 bg-yellow-400 rounded-xl`}
              onPress={handleLogin}
            >
              <Text style={tw`text-xl font-bold text-center text-gray-700`}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row justify-center mt-7`}>
            <Text style={tw`text-gray-500 font-semibold`}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text style={tw`font-semibold text-yellow-500`}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}


