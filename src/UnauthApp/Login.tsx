// Login.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    // Example: send a POST request to your server with email and password
  };

  const handleSignUp = () => {
    // Navigate to the signup screen
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic or navigation here
  };

  const handleLoginWithGoogle = () => {
    // Implement login with Google logic here
  };

  const handleLoginWithFacebook = () => {
    // Implement login with Facebook logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.socialButtons}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleLoginWithGoogle}>
          <Text style={styles.socialButtonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleLoginWithFacebook}>
          <Text style={styles.socialButtonText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  loginButton: {
    backgroundColor: '#007AFF', // Blue color for Login button
    padding: 10,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    padding: 10,
    marginBottom: 10,
  },
  forgotPasswordButtonText: {
    color: '#007AFF', // Blue color for Forgot Password button
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    backgroundColor: '#ddd', // Gray color for social login buttons
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  socialButtonText: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: 300,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  signUpButton: {
    padding: 10,
  },
  signUpButtonText: {
    color: '#007AFF', // Blue color for Sign Up button
    fontWeight: 'bold',
  },
});

export default Login;
