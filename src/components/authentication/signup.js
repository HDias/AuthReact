// Aula 55
import React, {
  Component,
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';

import Button from '../common/button';

class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign Up</Text>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="usuario"/>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="senha"/>
        </View>
        <View style={styles.buttonContainer}>
          <Button text={'Salvar'}/>
        </View>
        <View style={styles.error}>
          <Text style={styles.textError}></Text>
        </View>
      </View>
    );
  }

  onPress() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    color: '#2d42cd'
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC',
    width: 200
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
    marginTop: 20
  },
  error: {
    marginTop: 20
  },
  textError: {
    color: '#ec3b3b'
  }
});

module.exports = SignUp;
