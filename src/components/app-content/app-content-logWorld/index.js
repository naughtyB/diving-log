import React from 'react';
import _ from 'lodash';
import { message, Input, Select } from 'antd';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import fetch from 'isomorphic-fetch'
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
const Option = Select.Option;


let userId = Cookies.get("userId")

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCW9nrGGirQ6w0pTBbRKcWioe6-zXZOCYM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        markers: [],
        isChangingCenter: false,
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          if(!this.state.isChangingCenter){
            this.props.onChangeParentState({
              center: refs.map.getCenter(),
              bounds: refs.map.getBounds()
            })
          }
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.props.center);

          this.setState({
            markers: nextMarkers
          });
          this.props.onChangeParentState({
            center: nextCenter
          })
          // refs.map.fitBounds(bounds);
        },
        onDragStart: () => {
          this.setState({
            isChangingCenter: true
          })
        },
        onDragEnd: () => {
          this.setState({
            isChangingCenter: false
          })
        }
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>{
  return (
    (
      <GoogleMap
        onDragStart={props.onDragStart}
        onDragEnd={props.onDragEnd}
        ref={props.onMapMounted}
        defaultZoom={8}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
        onClick={props.onMapClick}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="输入您想查找的地方"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `30px`,
              marginTop: `11px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {props.markers.map((marker, index) =>
          <Marker key={index} onClick={(a)=>console.log(a)} position={marker.position} />
        )}
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {props.logMarkers.length > 0 && props.logMarkers.filter((item, index) => {
            if(props.check === 'all'){
              return true;
            }
            else if(props.check === 'other'){
              return item.user._id !== userId;
            }
            else if(props.check === 'own'){
              return item.user._id === userId;
            }
          }).map((logMarker, index) => (
            <Marker
              key={index}
              onMouseOver={(e)=>{
                props.onMarkMouseOver(index);
                console.log(e)
              }}
              onMouseOut={()=>props.onMarkMouseOut()}
              icon={{url: logMarker.user._id === userId ? "http://localhost:8000/public/image/yellowFlag.png" : "http://localhost:8000/public/image/flag.png", size: {width: 35, height: 50}, scaledSize: {width: 35, height: 50}}}
              position={{ lat: Number(logMarker.marker.lat), lng: Number(logMarker.marker.lng) }}
              onClick={()=>props.history.push({
                pathname: '/logDetail',
                hash: 'logId=' + logMarker._id
              })}
            >
              {
                props.visibleIndex === index && (
                  <InfoBox
                    visible={props.visibleIndex === index ? true : false}
                    options={{ closeBoxURL: ``, enableEventPropagation: true }}
                  >
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', padding: `12px`, borderRadius: '5px', minWidth: '200px'}}>
                      <div style={{ fontSize: `16px`, color: `white`}}>
                        主题：{logMarker.title}
                      </div>
                      <div style={{ fontSize: `16px`, color: `white`}}>
                        时间：{logMarker.date}
                      </div>
                      <div style={{ fontSize: `16px`, color: `white`}}>
                        地点：{logMarker.location}
                      </div>
                      <div style={{ fontSize: `16px`, color: `white`}}>
                        潜点：{logMarker.diveSite}
                      </div>
                      <div style={{ fontSize: `16px`, color: `white`}}>
                        潜水人：{logMarker.user.name}
                      </div>
                    </div>
                  </InfoBox>
                )
              }
            </Marker>
          ))}
        </MarkerClusterer>
      </GoogleMap>
    )
  )
})

export class AppContentLogWorld extends React.Component{
  constructor(props){
    super(props);
    this.state={
      center: {
        lat: 41.9, lng: -87.624
      },
      logMarkers: [],
      bounds: null,
      visibleIndex: -1,
      check: 'all'
    }
    this.onMarkMouseOver = this.onMarkMouseOver.bind(this);
    this.onChangeParentState = this.onChangeParentState.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkMouseOver = this.onMarkMouseOver.bind(this);
    this.onMarkMouseOut = this.onMarkMouseOut.bind(this);
  }
  onChangeParentState(state){
    this.setState(state)
  }

  componentWillUpdate(nextProps){
    if(this.props.loginState !== nextProps.loginState && !nextProps.loginState){
      this.setState({
        check: 'all'
      })
    }
  }

  componentWillMount() {
    console.log(2)
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }
    return fetch('/server/log/getAll', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then(res => {
      return res.json()
    }).then(res => {
      if(!res.err){
        this.setState(() => {
          return {
            logMarkers: res.logs
          }
        })
      }
    })
  }

  onMarkMouseOver(index){
    this.setState({
      visibleIndex: index
    })
  }

  onMarkMouseOut(){
    this.setState({
      visibleIndex: -1
    })
  }

  onMapClick(a){
    console.log('lat:' + a.latLng.lat())
    console.log('lng:' + a.latLng.lng())
  }

  render(){
    return (
      <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <MyMapComponent
          onMarkMouseOver={this.onMarkMouseOver}
          onMarkMouseOut={this.onMarkMouseOut}
          visibleIndex={this.state.visibleIndex}
          center={this.state.center}
          onChangeParentState={this.onChangeParentState}
          onMapClick={this.onMapClick}
          logMarkers={this.state.logMarkers}
          bounds={this.state.bounds}
          history={this.props.history}
          check={this.state.check}
        />
        <Select value={this.state.check} onChange={(value) => {
          if(!this.props.loginState){
            message.warning("检测到您未登录，筛选失败，请先登录")
          }
          else{
            this.setState({check: value})
          }
        }} style={{width: '300px', position: 'absolute', top: '11px', left: '370px'}}>
          <Option value="all">查看所有人的潜水日志</Option>
          <Option value="own">只看自己的潜水日志</Option>
          <Option value="other">只看其他人的潜水日志</Option>
        </Select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginState: state.user.loginState
  }
}

export default connect(mapStateToProps)(AppContentLogWorld)