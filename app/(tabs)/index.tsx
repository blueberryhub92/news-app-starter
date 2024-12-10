import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'
import axios from 'axios'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&image=1&language=de&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
            
      if(response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log('Error Message index 1: ', error.message);
    }
  }

  const getNews = async (category: string = '') => {
    try {
      let categoryString = '';
      if(category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&image=1&language=de&removeduplicate=1&size=10&${categoryString}`;
      const response = await axios.get(URL);
            
      if(response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log('Error Message index 2: ', error.message);
    }
  }

  const onCatChanged = (category: string) => {
    console.log('Category: ', category);
    setNews([]);
    getNews(category);
  }
  
  return (
    <ScrollView style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar withHorizontalPadding={true} setSearchQuery={getNews} />
      {isLoading ? (
        // <Loading size={'large'} />
        <ActivityIndicator size={'large'} />
      ) : (
          <BreakingNews newsList={breakingNews} />
      )}
      <Categories onCategoryChanged={onCatChanged} />
      <NewsList newsList={news} />
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})