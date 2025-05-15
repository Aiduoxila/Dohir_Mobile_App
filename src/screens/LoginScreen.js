import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import OdooService from '../services/OdooService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [url, setUrl] = useState(process.env.ODOO_BASE_URL);
  const [db, setDb] = useState(process.env.ODOO_DB);
  const [username, setUsername] = useState(process.env.ODOO_USERNAME);
  const [password, setPassword] = useState(process.env.ODOO_PASSWORD);

  const handleLogin = async () => {
    try {
      const odoo = new OdooService(url, db, username, password);
      const authenticated = await odoo.authenticate();
      
      if (authenticated) {
        await AsyncStorage.setItem('sessionId', odoo.sessionId);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Odoo URL"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Database"
        value={db}
        onChangeText={setDb}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}