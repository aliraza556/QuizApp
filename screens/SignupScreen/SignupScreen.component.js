import { View, Text, SafeAreaView, TouchableOpacity,Image,TextInput, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../../constants/theme'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { createAuthUserWithEmailAndPassword } from '../../Firebase/firebase'
import Toast from "react-native-toast-message"
import { showMessage } from "react-native-toast-message";
import tw from 'twrnc'

export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState(null);
  const [pass, setPass] = useState("");
  const [error, setError] = useState({
         name : '',
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

const signup = () => {
  createAuthUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      navigation.navigate("HomeScreen");
      showMessage({
        message: "Sign Up Successful",
        type: "success",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
}

  const handleSignUp = () => {
    if (name === "") {
      setError({name:"Please Enter Your Name"});
      return;
    }

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
    signup();
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
        <View style={tw`flex-row justify-center mb-3`}>
          <Image
            source={require("../../assets/images/signup.png")}
            style={{ width: 200, height: 130 }}
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
            <Text style={tw`text-gray-700 ml-4`}>Full Name</Text>
            <TextInput
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
              placeholder="Enter Name"
              keyboardType="email-address"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={tw`text-red-800`}>
              {name === "" ? error.name : ""}
            </Text>
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
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7`}
              secureTextEntry
              value={pass}
              placeholder="Enter Password"
              onChangeText={(text) => setPass(text)}
            />
            <Text style={tw`text-red-800`}>
              {pass === "" ? error.pass : ""}
            </Text>
            <TouchableOpacity
              style={tw`py-3 bg-yellow-400 rounded-xl`}
              onPress={handleSignUp}
            >
              <Text style={tw`font-xl font-bold text-center text-gray-700`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row justify-center mt-7`}>
            <Text style={tw`text-gray-500 font-semibold`}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={tw`font-semibold text-yellow-500`}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}