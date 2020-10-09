import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import newsApi from '../src/api/newsApi';
import SearchBar from '../src/components/SearchBar';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      const response = await newsApi.get('', {
        params: {
          q: searchTerm,
        },
      });

      setResults(response.data.articles);
      console.log(results);
    } catch (err) {
      setErrorMessage('Something went wrong.');
      console.log(err);
    }
    setLoading(false);
  };

  console.log(term);

  useEffect(() => {
    searchApi('covid');
  }, [loading]);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size='large' loading={loading} color='#0000ff' />
    </View>
  ) : (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      <Text>Home Screen</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <FlatList
        data={results}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
