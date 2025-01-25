import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const handlePress = () => {
    alert("Welcome to the Home Page!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <Text style={styles.subtitle}>This is the basic home page of your app.</Text>
      <Button title="Click Me" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
