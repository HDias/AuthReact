import React, {
  Component,
  StyleSheet,
  Navigator
} from 'react-native';

import SignIn from './components/authentication/signin';
import SignUp from './components/authentication/signup';
import Tweets from './components/tweets/tweets';

const ROUTES = {
  // Rota : Component
  signin: SignIn,
  signup: SignUp,
  tweets: Tweets
}

class Main extends Component {
  // initialRoute - Determina qual componente será iniciado
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
    );
  }

  // Em acordo com o nome da rota retornará o Component
  renderScene(route, navigator) {
    var MyComponent = ROUTES[route.name]; // ROUTES['signin'] => SignIn
    return <MyComponent route={route} navigator={navigator} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = Main;
