import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.container}>
      <Feather name='search' style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder='Search'
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        autoCapitalize='none'
        autoCorrect={false}
        onEndEditing={() => onTermSubmit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    color: 'black',
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});

export default SearchBar;
