// Aula 55
import React, {
  Component,
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';

import Button from '../common/button';
import Firebase from 'firebase';
import Config from './config';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginError: '',
    }

    this.myFirebaseRef = new Firebase(Config.firebaseUrl);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign In</Text>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            value={this.state.username}
            onChangeText={(text) => this.setState({username: text})}/>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Senha"
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button color={'#48afdb'} text={'Entrar'} onPress={this.onPress.bind(this)}/>
          <Button color={'#9c9c9c'} text={'Cadastrar'} onPress={this.onSignUpPress .bind(this)}/>
        </View>
        <View style={styles.error}>
          <Text style={styles.textError}>{this.state.loginError}</Text>
        </View>
      </View>
    );
  }

  onSignUpPress() {
    this.props.navigator.push({name: 'signup'});
  }

  onPress() {
    this.setState({
      loginError: ''
    })

    this.myFirebaseRef.authWithPassword({
      email    : this.state.username,
      password : this.state.password
    },(error, authData) => {
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
            this.setState({
              loginError: 'The specified user account email is invalid.'
            });
            break;
          case "INVALID_PASSWORD":
            this.setState({
              loginError: 'The specified user account password is incorrect.'
            });
            break;
          case "INVALID_USER":
            this.setState({
              loginError: 'The specified user account does not exist.'
            });
            break;
          default:
            this.setState({
              loginError: 'Error logging user in:" + error.message'
            });
        }
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    });

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
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  error: {
    marginTop: 20
  },
  textError: {
    color: '#ec3b3b'
  }
});

module.exports = SignIn;
