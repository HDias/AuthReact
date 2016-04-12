import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, {backgroundColor: this.props.color}]}
        underlayColor={'#b8b8b8'}
        onPress={this.props.onPress}
        >
        <Text  style={styles.btnText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    flex: 2,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6
  }
});

module.exports = Button;
