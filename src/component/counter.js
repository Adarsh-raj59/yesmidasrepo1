import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
    INCREMENT,
    DECREMENT
  } from '../redux/action/actionTypes';

class CounterApp extends Component {

    render() {
        return (
            <View style={styles.container}>
       
                <View style={styles.mainView}>
                    <TouchableOpacity style={styles.button}onPress={() => this.props.increaseCounter()}>
                        <Text style={styles.text}>Increase</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>{this.props.counterReducer.counter}</Text>
                    <TouchableOpacity style={styles.button}onPress={() => this.props.decreaseCounter()}>
                        <Text style={styles.text}>Decrease</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {
  return {
    counterReducer: state.counterReducer,
   
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch({type: INCREMENT}),
    decreaseCounter: () => dispatch({type: DECREMENT }),
 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView:{ flex:1, justifyContent: 'space-around',marginTop:50,margin:10,alignItems:'center',justifyContent:'center',padding:20 },
  button:{backgroundColor:'gray',justifyContent:"center",alignItems:"center"},
  text:{ fontSize: 20,color:'white',padding:10 }
});