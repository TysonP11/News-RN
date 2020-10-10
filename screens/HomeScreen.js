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
import moment from 'moment';
import { Card, Button } from 'react-native-elements';
import { Linking } from 'react-native';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  const [term, setTerm] = useState('covid');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageNumber, setPageNumber] = useState(5);
  const [lastPageReached, setLastPageReached] = useState(false);

  const searchApi = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await newsApi.get('', {
        params: {
          q: searchTerm,
          pageSize: pageNumber,
        },
      });

      console.log(response.data.totalResults);
      if (results.length >= response.data.totalResults) {
        setLastPageReached(true);
      }

      setResults(response.data.articles);
      //console.log(typeof response);
    } catch (err) {
      setErrorMessage('Something went wrong.');
      console.log(errorMessage);
      console.log(err);
    }
    setLoading(false);
  };

  const handleReached = () => {
    setPageNumber(pageNumber + 5);
  };

  const handleSubmit = () => {
    setPageNumber(5);
  };

  const onPress = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  useEffect(() => {
    searchApi(term);
  }, [pageNumber]);

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => handleSubmit()}
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

      <View style={styles.articlesContainer}>
        <FlatList
          data={results}
          ListFooterComponent={
            lastPageReached ? (
              <Text>No more articles</Text>
            ) : (
              <ActivityIndicator
                style={{ marginTop: 10 }}
                size='large'
                loading={loading}
                color='#0000ff'
              />
            )
          }
          onEndReached={handleReached}
          onEndReachedThreshold={1}
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
                <Button
                  title='Read more'
                  backgroundColor='#03A9F4'
                  onPress={() => onPress(item.url)}
                />
              </Card>
            );
          }}
        />
      </View>
      {/* {!loading ? null : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' loading={loading} color='#0000ff' />
        </View>
      )} */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articlesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  loadingContainer: {
    backgroundColor: '#fff',
    // alignItems: 'stretch',
    // justifyContent: 'flex-start',
    // marginBottom: 10,
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
    left: 44 + '%',
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
