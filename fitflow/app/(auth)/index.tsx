import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const AuthScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.text}>{'Authorization'}</Text>
        <Text style={styles.text}>{'Authorization'}</Text>
        <Text style={styles.text}>{'Authorization'}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    flex: 1,
  },
});

export default AuthScreen;
