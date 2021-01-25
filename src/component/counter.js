import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {INCREMENT, DECREMENT} from '../redux/action/actionTypes';
import {increaseCount, decreaseCount} from '../redux/action/listAction';
//   import ButtonNew from './button'
const deviceWidth = Dimensions.get('window').width;

class CounterApp extends Component {
  state = {
    fdScreen: false,
    counterScreen: false,
    allPlans: true,
    panValue: 'qqqq',
    ammount: -1,
    ammountInRupess: '',
    isFocus: true,
    value1: '',
    baseAmount: 40000,
    data: null,
  };

  componentDidMount() {
    fetch('https://e55667d0e46a.ngrok.io/investment/api/getAllAccount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CustomerId: '26530',
        GetSavingsAcc: 'false',
        GetCurAcc: 'true',
        GetFDAcc: 'false',
        GetRDAcc: 'false',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('response=========json=========', JSON.stringify(json));
        this.setState({data: json});
      })
      .catch((error) => console.error('error=======================', error))
      .finally(() => {
        this.setState({isLoading: false});
      });
    setTimeout(() => {
      this.setState({fdScreen: true});
    }, 3000);
  }

  price = () =>
    this.state.isFocus
      ? this.state.value1
      : // : this.state.value1.replace(/\B(?=(\d{3})+(?!\d))/g, ',');.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
        this.state.value1.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');

  handleBlur = (e) => this.setState({isFocus: false});
  handleFocus = (e) => this.setState({isFocus: true});
  handleChange = (e) =>
    this.setState({value: e.target.value.replace(/,/g, '')});

  render() {
    console.log('data================', this.state.data);
    return (
      <View style={styles.container}>
        {this.state.fdScreen ? (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{margin: 10, flex: 1}}>
                <View
                  style={[
                    this_styles.shadow,
                    {
                      flex: 1,
                      backgroundColor: 'white',
                      margin: 20,
                      elevation: 12,
                      borderColor: '#0f000000',
                      borderRadius: 5,
                      borderWidth: 0.5,
                    },
                  ]}>
                  <View style={{margin: 20}}>
                    <Image
                      source={require('../res/Images/fd.png')}
                      style={{height: 150, width: 150}}
                    />
                    <Text
                      style={{
                        // fontFamily: "Interstate-Bold", //font_comment
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 5,
                        color: '#333333',
                      }}>
                      Timely Notification
                    </Text>
                  </View>
                  <Text style={styles.headerText}>Select Deposit Product</Text>

                  <Text style={styles.headerText}>Enter Account</Text>
                  <TextInput
                    style={{
                      marginHorizontal: 20,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                    }}
                    keyboardType="numeric"
                    value={this.price()}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onChangeText={(e) => {
                      let _str = '0123456789.,₹';
                      let _str2 = _str.indexOf(e.substr(-1));
                      if (_str2 != -1) {
                        this.setState({value1: e.replace(/,/g, '')});
                      }
                    }}
                    // onChangeText={(text) => {
                    //   this.setState({ammount: text});

                    //   // let _str = '0123456789.,₹';
                    //   // let _str2 = _str.indexOf(text.substr(-1));
                    //   // if (_str2 != -1) {
                    //   //   this.setState({ammount: text});
                    //   // }
                    // }}
                  />
                  {this.state.value1 <= 10000 && this.state.value1 != -1 ? (
                    <Text style={[styles.headerText, {color: 'red'}]}>
                      Amount is less than 10000
                    </Text>
                  ) : null}
                  {this.state.value1 >= 20000000 && this.state.value1 != '' ? (
                    <Text style={[styles.headerText, {color: 'red'}]}>
                      Amount is greater than 2 Crore
                    </Text>
                  ) : null}
                  {this.state.value1 > this.state.baseAmount &&
                  this.state.value1 != '' ? (
                    <Text style={[styles.headerText, {color: 'red'}]}>
                      Amount should not be more than current ammount
                    </Text>
                  ) : null}
                  <Text style={styles.headerText}>Pan Number</Text>
                  <TextInput
                    style={{
                      marginHorizontal: 20,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                    }}
                    editable={false}
                    onChangeText={(text) => this.setState({value: text})}
                    value={this.state.panValue}
                  />
                  {this.state.value1 >= 50000 && this.state.panValue == '' ? (
                    <Text style={[styles.headerText, {color: 'red'}]}>
                      Please add your pan card
                    </Text>
                  ) : null}
                  <Text style={styles.headerText}>Choose Plan</Text>
                  <View
                    style={{
                      backgroundColor: 'gray',
                      flex: 0,
                      margin: 20,
                      borderRadius: 5,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        margin: 5,
                        backgroundColor: this.state.allPlans ? 'gray' : 'red',
                        flex: 0,
                        flex: 1,
                      }}>
                      <Button
                        color="white"
                        title="Best Plans"
                        onPress={() => {
                          this.setState({allPlans: false});
                          Alert.alert('Best Plans Button pressed');
                        }}
                      />
                    </View>
                    <View
                      style={{
                        margin: 5,
                        backgroundColor: this.state.allPlans ? 'red' : 'gray',
                        flex: 0,
                        flex: 1,
                      }}>
                      <Button
                        color="white"
                        title="All Plans"
                        onPress={() => {
                          this.setState({allPlans: true});
                          Alert.alert('All Plans Button pressed');
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                color: 'gray',
                flex: 0,
                margin: 30,
                borderRadius: 5,
              }}>
              <Button
                color="white"
                title="Apply Now"
                onPress={() => {
                  Alert.alert('Apply Now Button pressed');
                }}
              />
            </View>
          </View>
        ) : (
          <Image
            style={styles.image}
            source={require('../res/Images/fd.png')}
          />
        )}
        {this.state.counterScreen ? (
          <View style={styles.mainView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.increaseCounter()}>
              <Text style={styles.text}>Increase</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>
              {this.props.counterReducer.counter}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.decreaseCounter()}>
              <Text style={styles.text}>Decrease</Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
    increaseCounter: () =>
      dispatch({
        type: INCREMENT,
        value: 1,
      }),
    decreaseCounter: () =>
      dispatch({
        type: DECREMENT,
        value: 1,
      }),
    // increaseCounter: () => dispatch(increaseCount()),
    // decreaseCounter: () => dispatch(decreaseCount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 20, color: 'white', padding: 10},
  image: {flex: 1, height: '100%', width: '100%'},
  headerText: {marginHorizontal: 20, color: 'gray'},
});

const this_styles = StyleSheet.create({
  shadow: {
    flex: 1,
    // shadowOffset:{  width: 10,  height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,

    shadowColor: '#000',
    //   shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clear20: {
    height: 70,
  },
  tabbtn: {
    backgroundColor: '#ffe600',
    borderColor: '#c4c4cd',
    borderWidth: 1,
  },
  ChatBox: {
    width: 60,
    height: 60,
    marginTop: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
