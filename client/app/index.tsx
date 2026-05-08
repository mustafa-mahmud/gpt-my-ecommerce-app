import { useState } from 'react';
import * as Network from 'expo-network';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import axios from 'axios';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    setLoading(true);
    try {
      const ipAddress = await Network.getIpAddressAsync();
      console.log(ipAddress);

      // return;
      if (ipAddress) {
        const response = await axios.post(
          `http://${ipAddress}:3000/api/users/create-user`,
          {
            name,
            email,
            image,
          },
        );
        Alert.alert('Success', response.data.message);
        console.log(response.data);
      }

      setName('');
      setEmail('');
      setImage('');
    } catch (error: any) {
      console.log(error?.response?.data);

      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 15,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Create User</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
        }}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={{
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity
        onPress={createUser}
        style={{
          backgroundColor: 'black',
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          {loading ? 'Loading...' : 'Create User'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
