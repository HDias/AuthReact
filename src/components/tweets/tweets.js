import React, {
  Component,
  View,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native';

class Tweets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({user: JSON.parse(user)});
    });
  }

  render() {
    if(!this.state.user) {
      return (
        <View style={styles.container}>
          <Text>loading...</Text>
        </View>
      );
    }

    var username = this.state.user.password.email;

    return (
      <View style={styles.container}>
        <Text>Seja Bem vindo! { username }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Tweets;
