import { useState, useEffect } from 'react';
import newsApi from '../api/newsApi';

export default () => {
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

  useEffect(() => {
    searchApi('covid');
  }, [pageNumber]);

  return [
    searchApi,
    results,
    errorMessage,
    pageNumber,
    handleReached,
    handleSubmit,
    loading,
    lastPageReached,
    term,
    setTerm,
  ];
};
