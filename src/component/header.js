import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
// import {hasNotch} from 'react-native-device-info';
const hasNotch = false;

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceWidthNew: Dimensions.get('window').width,
      deviceHeightNew: Dimensions.get('window').height,
    };
  }
  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }
  getOrientation = () => {
    this.setState({
      deviceWidthNew: Dimensions.get('window').width,
      deviceHeightNew: Dimensions.get('window').height,
    });
  };
  render() {
    let {
      modalVisible,
      statusBarStyle,
      deviceWidthNew,
      deviceHeightNew,
    } = this.state;
    return deviceWidthNew < deviceHeightNew || deviceWidthNew > 900 ? (
      //   <View style={styles.container}>
      //     <View
      //       style={[
      //         styles.header,
      //         {
      //           height: hasNotch ? 23 : 23,
      //         },
      //       ]}></View>
      //     <View>
      //       <TouchableOpacity
      //         style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}
      //         onPress={this.props.onPress}>
      //         <Image
      //           source={require('../res/Images/left-arrow.png')}
      //           style={styles.profileImage}
      //         />
      //       </TouchableOpacity>
      //       <View style={styles.title}>
      //         <Text style={styles.titleText}>{this.props.name}</Text>
      //       </View>
      //     </View>
      //   </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 0,
          backgroundColor: 'gray',
          paddingTop: Platform.OS === 'ios' ? 40 : 23,
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}
          onPress={this.props.onPress}>
          <Image
            style={{marginLeft: 10, height: 20, width: 20}}
            source={require('../res/Images/left-arrow.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              // fontStyle: 'italic',
            }}>
            FD create
          </Text>
        </View>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          flex: 0,
          backgroundColor: 'gray',
          paddingTop: Platform.OS === 'ios' ? 10 : 10,
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}
          onPress={this.props.onPress}>
          <Image
            style={{marginLeft: 10, height: 20, width: 20}}
            source={require('../res/Images/left-arrow.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              // fontStyle: 'italic',
            }}>
            FD create
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'gray',
    paddingTop: 23,
  },
  header: {
    height: hasNotch ? 153 : 140,
    flex: 0,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
  },
  image: {
    width: 20,
    height: 20,

    top: hasNotch ? 20 : 5,
  },
  profileImage: {
    width: 20,
    height: 20,
    // borderColor: 'gray',
    // borderWidth: 2,
  },
  searchImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontStyle: 'italic',
  },
  backButton: {
    height: hasNotch ? 80 : 67,
    width: 40,
    top: hasNotch ? 20 : 5,
    padding: 10,
  },

  container1: {
    backgroundColor: 'gray',
  },
  header1: {
    flex: 0,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
  },
  image1: {
    width: 10,
    height: 10,
  },
  profileImage1: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    borderColor: 'gray',
    borderWidth: 1,
  },
  searchImage1: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title1: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText1: {
    color: 'white',
    fontSize: 24,
    fontStyle: 'italic',
  },
  backButton1: {
    height: 67,
    width: 40,
    top: 5,
    padding: 10,
  },
});
