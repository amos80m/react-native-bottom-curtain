import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Dimensions, Easing, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
const BODY_BORDER_WIDTH = 5;

class Curtain extends Component {

  constructor() {
    super()
    this.BottomCurtain = new Animated.Value(0);
    this.state = {
      headerInitHeight: 0,
      bodyInitHeight: 0,
      isOpen: false
    }

  }
  componentDidMount() {
    setTimeout(() => {
      this.measureCurtainSizes()
    }, 100);
  }

  measureCurtainSizes = () => {
    let _this = this,
      _height = height;
    this.refs.header.measure((a, b, width, height, px, py) => {
      _this.setState({ headerInitHeight: _height - py, headerHeight: height })
    });
    this.refs.body._component.measure((a, b, width, height, px, py) => {
      _this.setState({ bodyInitHeight: _height - (py + height - this.state.headerHeight) })
    });
  }
  
  _doAnimateCurtain = () => {
    let anim = this.state.isOpen ? 0 : 1;
    Animated.timing(
      this.BottomCurtain,
      {
        toValue: anim,
        duration: 260,
        easing: Easing.linear
      }
    ).start(() => this.setState({ isOpen: !this.state.isOpen }))
  };

  getActionIcon = () => {
    if (this.props.iconActionNameUp) {
      return <Icon name={this.state.isOpen ? this.props.iconActionNameDown : this.props.iconActionNameUp} size={this.props.iconSize} color={this.props.iconColor} style={[styles.icone]} />
    }
  }

  _getAnimObj = () => {
    return {
      transform: [
        {
          translateY: this.BottomCurtain.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.headerInitHeight - BODY_BORDER_WIDTH, this.state.bodyInitHeight]
          })
        }
      ]
    };
  }

  _getHeaderText = () => this.props.headerText ? this.props.headerText : "Curtain header text";

  _renderCurtainHeader = () => {
    return <View onLayout={(event) => { this.setState({ headerInitHeight: event.nativeEvent.layout.height })}}>
      <TouchableOpacity ref="header" onPress={() => this._doAnimateCurtain()} style={[styles.header, this.props.headerStyle, { backgroundColor: this.props.teamColor }]}>
        {this.props.iconName ? <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} style={[styles.icone]} /> : null}
        <Text style={[styles.textStyle, this.props.textStyle]}>{this._getHeaderText()}</Text>
        {this.getActionIcon()}
      </TouchableOpacity>
    </View>
  }

  _renderCurtainBody = () => {
    return <View style={[styles.bodyStyle, { borderColor: this.props.teamColor },this.props.bodyStyle]}>
      {this.props.children}
    </View>
  }

  render() {
    const scrollCurtain = this._getAnimObj()
    return <Animated.View style={[styles.wrap, scrollCurtain]} ref="body">
      {this._renderCurtainHeader()}
      {this._renderCurtainBody()}
    </Animated.View>
  }
}

const styles = {
  wrap: {
    position: 'absolute',
    width,
  },
  header: {
    flexDirection: 'row-reverse',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-around',
    maxWidth: width - 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  textStyle: {
    color: '#fff'
  },
  bodyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderTopWidth: BODY_BORDER_WIDTH,
    borderColor: 'red',
    padding: 15
  },
  icone: {
    marginLeft: 10,
    marginRight: 10
  }
}

export default Curtain;     