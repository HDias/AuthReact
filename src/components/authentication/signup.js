// Aula 55
import React, {
  AsyncStorage,
  Component,
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';

import Button from '../common/button';
import Config from './config';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation : '',
      errorMessage: '',
    }

    this.myFirebaseRef = new Firebase(Config.firebaseUrl);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign Up</Text>
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
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Repita a senha"
            value={this.state.passwordConfirmation}
            onChangeText={(text) => this.setState({passwordConfirmation: text})}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button color={'#48afdb'} text={'Confirmar'} onPress={this.onPress.bind(this)}/>
          <Button color={'#9c9c9c'} text={'Sign In'} onPress={this.onSignInPress .bind(this)}/>
        </View>
        <View style={styles.error}>
          <Text style={styles.textError}>{this.state.errorMessage}</Text>
        </View>
      </View>
    );
  }

  onPress() {
    this.setState({
      loginError: ''
    });

    if(this.state.password !== this.state.passwordConfirmation) {
      return this.setState({errorMessage: 'As senhas não são identicas!'})
    }

    this.myFirebaseRef.createUser({
      email: this.state.username,
      password: this.state.password
    }, (error, userData) => {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            this.setState({
              errorMessage: 'Este Email já está em uso.'
            });
            break;
          case "INVALID_EMAIL":
            this.setState({
              errorMessage: 'Digite um email válido.'
            });
            break;
          default:
            this.setState({
              errorMessage: 'Erro ao criar Usuário: ' + error.message
            });
        }
      } else {
        // Salva somente o uid
        AsyncStorage.setItem('user', JSON.stringify(userData));

        this.props.navigator.immediatelyResetRouteStack([{ name: 'tweets' }]);
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  }

  onSignInPress() {
    this.props.navigator.pop(); // Remove da pilha
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

module.exports = SignUp;
