import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class TextView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          fontSize: 15,
          color: '#ffffff',
        }}>
        {this.props.name}{' '}
      </Text>
    );
  }
}
const styles = StyleSheet.create({});
export default TextView;
