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
import Constants from 'expo-constants';
import moment from 'moment';
import { Card, Button } from 'react-native-elements';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await newsApi.get('', {
        params: {
          q: searchTerm,
          pageSize: 30,
        },
      });

      setResults(response.data.articles);
      //console.log(typeof response);
    } catch (err) {
      setErrorMessage('Something went wrong.');
      console.log(err);
    }
    setLoading(false);
  };

  console.log(term);

  useEffect(() => {
    searchApi('covid');
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.label}>Articles Count:</Text>
        <Text style={styles.info}>{results.length}</Text>
      </View>

      {errorMessage ? <Text>{errorMessage}</Text> : null}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' loading={loading} color='#0000ff' />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(result) => result.url.toString()}
          renderItem={({ item }) => {
            return (
              <Card>
                <Card.Title>{item.title}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: item.urlToImage }} />
                <Card.Divider />
                <View style={styles.row}>
                  <Text style={styles.label}>Source</Text>
                  <Text style={styles.info}>{item.source.name}</Text>
                </View>
                <Text style={{ marginBottom: 10 }}>{item.content}</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Published</Text>
                  <Text style={styles.info}>
                    {moment(item.publishedAt).format('LLL')}
                  </Text>
                </View>
                <Button title='Read more' backgroundColor='#03A9F4' />
              </Card>
            );
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop: Constants.statusBarHeight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: 'grey',
  },
});
