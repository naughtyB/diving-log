import React from 'react';
import _ from 'lodash';
import { message } from 'antd';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

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
            placeholder="Customized your placeholder"
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
          {props.logMarkers.map((marker, index) => (
            <Marker
              key={index}
              icon={{url: "http://localhost:8000/public/image/logPosition.png", size: {width: 35, height: 50}, scaledSize: {width: 35, height: 50}}}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
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
      logMarkers: [
        {
          lat: 23.061056232081317,
          lng: 113.39199542999268
        },
        {
          lat: 23.062300031910365,
          lng: 113.3893346786499
        },
        {
          lat: 23.061835858904512,
          lng: 113.38983664515172
        }
      ],
      bounds: null
    }
    this.onMarkMouseOver = this.onMarkMouseOver.bind(this);
    this.onChangeParentState = this.onChangeParentState.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onChangeParentState(state){
    this.setState(state)
  }
  componentWillMount() {
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
  }

  onMarkMouseOver(){
    message.info('asd')
  }

  onMapClick(a){
    console.log('lat:' + a.latLng.lat())
    console.log('lng:' + a.latLng.lng())
  }

  render(){
    return (
      <MyMapComponent
        onMarkMouseOver={this.onMarkMouseOver}
        center={this.state.center}
        onChangeParentState={this.onChangeParentState}
        onMapClick={this.onMapClick}
        logMarkers={this.state.logMarkers}
        bounds={this.state.bounds}
      />
    )
  }
}

export default AppContentLogWorld;