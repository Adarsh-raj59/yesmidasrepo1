import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import CreateFD from './src/component/createFD';
import configureStore from './src/redux/store/configureStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: '',
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={configureStore}>
          <CreateFD />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
});

export default App;
