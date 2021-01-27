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
import ModalDropdown from 'react-native-modal-dropdown-with-flatlist';
import {INCREMENT, DECREMENT} from '../redux/action/actionTypes';
import {increaseCount, decreaseCount} from '../redux/action/listAction';
//   import ButtonNew from './button'
const deviceWidth = Dimensions.get('window').width;
const accountData = {
  GetAllAccountsRes: {
    ResHdr: {
      ConsumerContext: {
        RequesterID: 'AHB',
      },
      ServiceContext: {
        ServiceName: 'CustomerManagement',
        ReqRefNum: 'U0000001',
        ReqRefTimeStamp: '2020-11-18T16:12:26',
        ServiceVersionNo: '1.0',
      },
      ServiceResponse: {
        EsbResTimeStamp: '2020-11-18 16:12:50.251915',
        EsbResStatus: '0',
      },
    },
    ResBody: {
      AccountTypeList: [
        {
          accountType: 'FD',
          AccountDetails: [
            {
              AccountNumber: '000181300000447 ',
              Balance: '111111111109069',
              AccountCustomerRelationship: 'SOW',
              AccountStatus: 8,
              BranchCode: 1,
              ProductCode: 813,
              BookBalance: '-2042',
              AccountTitle: 'NCDEX SETT FUND A/C',
            },
            {
              AccountNumber: '000183200000042 ',
              Balance: '2206999858675.4',
              AccountCustomerRelationship: 'SOW',
              AccountStatus: 8,
              BranchCode: 1,
              ProductCode: 832,
              BookBalance: '-142798660.69',
              AccountTitle: 'NCDEX SETT FUND A/C',
            },
          ],
        },
      ],
    },
  },
};

const productCodesData = {
  GetFDRDProductCodesRes: {
    ResHdr: {
      ConsumerContext: {
        RequesterID: 'WRK',
      },
      ServiceContext: {
        ServiceName: 'AccountManagement',
        ReqRefNum: '4807474625038174653',
        ReqRefTimeStamp: '2021-01-12T16:24:51',
        ServiceVersionNo: '1.0',
      },
      ServiceResponse: {
        EsbResTimeStamp: '2021-01-12 16:24:50.901429',
        EsbResStatus: '0',
      },
    },
    ResBody: {
      ProductDetails: [
        {
          ProductCode: '402',
          ProductName: 'FD - PAYOUT STAFF',
          ProductType: 'TD',
        },
        {
          ProductCode: '405',
          ProductName: 'FD - REINVESTMENT STAFF',
          ProductType: 'TD',
        },
        {
          ProductCode: '439',
          ProductName: 'FD-5 YRS TAX EFFICIENT PAYOUT RES',
          ProductType: 'TD',
        },
        {
          ProductCode: '440',
          ProductName: 'FD-5 YRS TAX EFFICIENT REINVT RES',
          ProductType: 'TD',
        },
        {
          ProductCode: '441',
          ProductName: 'FD 5 YRS TAX EFF PAYOUT SNR CTZN',
          ProductType: 'TD',
        },
        {
          ProductCode: '442',
          ProductName: 'FD-5 YRS TAX EFF REINVT SNR CITIZEN',
          ProductType: 'TD',
        },
        {
          ProductCode: '443',
          ProductName: 'FD-5 YRS TAX EFFICIENT PAYOUT NR',
          ProductType: 'TD',
        },
        {
          ProductCode: '444',
          ProductName: 'FD-5 YRS TAX EFFICIENT REINVT NR',
          ProductType: 'TD',
        },
        {
          ProductCode: '473',
          ProductName: 'FD - PAYOUT MONTHLY STAFF',
          ProductType: 'TD',
        },
      ],
    },
  },
  isSuccessful: true,
  statusCode: 200,
  statusReason: 'OK',
  responseHeaders: {
    'Transfer-Encoding': 'chunked',
    'Access-Control-Expose-Headers':
      'APIm-Debug-Trans-Id, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-Global-Transaction-ID',
    Server: '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'X-Backside-Transport': 'OK OK',
    Connection: 'Keep-Alive',
    'X-Global-Transaction-ID': '2256368f5ffd7ffb2e2ddc42',
    Date: 'Tue, 12 Jan 2021 10:54:50 GMT',
    'Content-Type': 'application/json; charset=utf-8',
  },
  responseTime: 2029,
  totalTime: 2031,
  guid: '9ef36adb-ade0-4608-be86-939712894f9c',
};

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
    drawerWidthNew: Dimensions.get('window').width,
    accountNumber: [],
    depositProduct: [],
    isLoading: false,
    data: null,
    accountBalance: null,
  };

  componentDidMount() {
    // fetch('https://e55667d0e46a.ngrok.io/investment/api/getAllAccount', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     CustomerId: '26530',
    //     GetSavingsAcc: 'false',
    //     GetCurAcc: 'true',
    //     GetFDAcc: 'false',
    //     GetRDAcc: 'false',
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log('response=========json=========', JSON.stringify(json));
    //     this.setState({data: json});
    //   })
    //   .catch((error) => console.error('error=======================', error))
    //   .finally(() => {
    //     this.setState({isLoading: false});
    //   });
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
    setTimeout(() => {
      this.setState({fdScreen: true});
    }, 3000);
    let accountNumbers = [];
    let filterFDList = accountData.GetAllAccountsRes.ResBody.AccountTypeList.filter(
      function (el) {
        return el.accountType == 'FD';
      },
    );
    if (filterFDList.length > 0) {
      accountNumbers = filterFDList[0].AccountDetails.map(function (jedi) {
        return jedi.AccountNumber;
      });
    }
    this.setState({accountNumber: accountNumbers});
  }

  getOrientation = () => {
    if (this.refs.rootView) {
      this.setState({
        drawerWidthNew: Dimensions.get('window').width,
      });
    }
  };
  productSelect = (idx, value) => {
    let productCodes = [];
    let {
      GetFDRDProductCodesRes: {
        ResBody: {ProductDetails},
      },
    } = productCodesData;
    console.log(productCodesData.GetFDRDProductCodesRes.ResBody);
    if (ProductDetails.length > 0) {
      productCodes = ProductDetails.map(function (productCode) {
        return productCode.ProductName;
      });
    }
    this.setState({depositProduct: productCodes});
  };
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
    console.log('data================', this.state.drawerWidthNew);
    return (
      <View ref="rootView" style={styles.container}>
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
                  <ScrollView>
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
                      <Text
                        style={{
                          flex: 0,
                          marginTop: 30,
                        }}>
                        Select Account
                      </Text>
                      <ModalDropdown
                        style={styles.select_account}
                        textStyle={styles.select_account_text}
                        dropdownStyle={[
                          styles.select_account_dropdown,
                          {width: this.state.drawerWidthNew * 0.8},
                        ]}
                        dropdownTextStyle={styles.select_account_dropdown_text}
                        options={this.state.accountNumber}
                        onSelect={(idx, val) => {
                          console.log('idx=================', idx);
                          console.log('val=================', val);

                          this.productSelect(idx, val);
                        }}></ModalDropdown>
                      <Text
                        style={{
                          flex: 0,
                          marginTop: 30,
                        }}>
                        Deposit Product
                      </Text>

                      <ModalDropdown
                        style={styles.select_account}
                        textStyle={styles.select_account_text}
                        dropdownStyle={[
                          styles.select_account_dropdown,
                          {width: this.state.drawerWidthNew * 0.8},
                        ]}
                        dropdownTextStyle={styles.select_account_dropdown_text}
                        showsVerticalScrollIndicator={false}
                        options={this.state.depositProduct}></ModalDropdown>
                    </View>
                    <Text style={styles.headerText}>
                      Select Deposit Product
                    </Text>

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
                    {this.state.value1 >= 20000000 &&
                    this.state.value1 != '' ? (
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
                  </ScrollView>
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
  select_account: {
    // alignSelf: 'flex-end',

    // width: 325,
    marginTop: 5,
    //right: 15,
    //borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 3,
    borderColor: '#c4c4cd',
    //backgroundColor: 'grey',
  },
  select_account_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 14,
    color: '#000000',
    //textAlign: 'center',
    textAlignVertical: 'center',
  },
  select_account_dropdown: {
    width: deviceWidth * 0.8,
    // height: 300,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 3,
  },
  select_account_dropdown_text: {
    color: '#000000',
    fontSize: 14,
    //textAlign: 'center',
  },
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
