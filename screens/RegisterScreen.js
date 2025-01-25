import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import React, { useState } from "react";
  import { MaterialIcons, AntDesign } from "@expo/vector-icons";
  import axios from "axios";
  
  const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
  
    const handleRegister = () => {
      if (!email || !mobileNumber) {
        Alert.alert("Validation Error", "Please fill out all fields.");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        Alert.alert("Validation Error", "Please enter a valid email address.");
        return;
      }
      if (!/^\d{10}$/.test(mobileNumber)) {
        Alert.alert("Validation Error", "Please enter a valid 10-digit mobile number.");
        return;
      }
  
      const user = { email, mobileNumber };
  
      axios
        .post("http://192.168.x.x:8000/register", user)
        .then((response) => {
          const message = response.data.message || "";
          if (message.includes("already registered")) {
            Alert.alert("Welcome Back!", "You are already registered.");
          } else {
            Alert.alert("Registration Successful", "Please check your email or mobile for verification.");
          }
          setEmail("");
          setMobileNumber("");
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
          Alert.alert("Error", errorMessage);
        });
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View>
            
          </View>
          <KeyboardAvoidingView>
            <Text style={styles.title}>Register to Your Account</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Enter your Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <AntDesign style={styles.icon} name="phone" size={24} color="gray" />
              <TextInput
                value={mobileNumber}
                onChangeText={setMobileNumber}
                style={styles.input}
                placeholder="Enter your Mobile Number"
                keyboardType="phone-pad"
              />
            </View>
            <Pressable onPress={handleRegister} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white", alignItems: "center", marginTop: 50 },
    logo: { width: 150, height: 100 },
    title: { fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#D0D0D0",
      paddingVertical: 5,
      borderRadius: 5,
      marginTop: 30,
    },
    icon: { marginLeft: 8 },
    input: { color: "gray", marginVertical: 10, width: 300, fontSize: 16 },
    registerButton: {
      marginTop: 50,
      width: 200,
      backgroundColor: "#FEBE10",
      borderRadius: 6,
      padding: 15,
    },
    registerButtonText: {
      textAlign: "center",
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  
  export default RegisterScreen;
  