import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';

import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const PeopleSearch = ({navigation}) => {
  const [search, setSearch] = useState('');
  return (
    <ImageBackground
      source={assets.background}
      resizeMode="cover"
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.chevronLeft}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Pressable>
            <Text style={styles.headerTitle}>People</Text>
            <View style={{width: 32}} />
          </View>
          <View style={styles.searchBar}>
            <View style={styles.searchBarInner}>
              <Image
                source={assets.search}
                style={{
                  height: 24,
                  width: 24,
                }}
                resizeMode="cover"
              />
              <TextInput
                style={styles.serachInput}
                placeholder="Search"
                placeholderTextColor={'#6E6E7E'}
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <Image
                  source={assets.close}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        </View>
        <ImageBackground
          source={assets.containerBox}
          resizeMode="cover"
          style={styles.body}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Recent search</Text>
            <Pressable
              //   onPress={() => handleProfileClick(testUser)}
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                marginVertical: 16,
              }}>
              <View style={{...styles.row}}>
                <View>
                  <Image
                    source={assets.user}
                    style={{
                      height: 48,
                      width: 48,
                      marginRight: 16,
                      borderRadius: 48 / 2,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text style={styles.userName}>waseem ahmad</Text>
                  <Text
                    style={{
                      ...theme.TYPOGRAPHY.body1,
                      color: theme.COLORS.blue,
                      fontWeight: '600',
                      lineHeight: 24,
                    }}>
                    +923024471460
                  </Text>
                </View>
              </View>
            </Pressable>
            <Text style={styles.title}>Suggested</Text>
          </ScrollView>
        </ImageBackground>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PeopleSearch;

const styles = StyleSheet.create({
  header: {
    paddingTop: isIos ? 31 : 31 + StatusBar.currentHeight,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  body: {
    flexGrow: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    zIndex: 2,
    elevation: 4,
    padding: 24,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 35,
    opacity: 0.25,
    zIndex: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    lineHeight: 32,
    fontWeight: '700',
    color: theme.COLORS.darkBlue,
  },
  searchBar: {
    backgroundColor: '#ffffff66',
    borderWidth: 1,
    borderColor: theme.COLORS.white,
    height: 44,
    justifyContent: 'center',
    borderRadius: 32,
    paddingHorizontal: 18,
  },
  searchBarInner: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  serachInput: {
    flexGrow: 1,
    ...theme.TYPOGRAPHY.subtitle1,
    fontWeight: '400',
    fontFamily: 'Inter',
    height: '100%',
    color: '#1D1D35',
    marginHorizontal: 16,
    lineHeight: 20,
  },
  title: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 24,
    color: theme.COLORS.grey500,
    fontWeight: '600',
    marginBoottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    ...theme.TYPOGRAPHY.body1,
    color: theme.COLORS.grey900,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 2,
    lineHeight: 22,
  },
});
