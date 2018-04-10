import React from 'react';
import _ from 'lodash';
import { Button } from 'antd';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { connect } from 'react-redux';
import { doChangeCenter, doChangeMarker, doChangeStep } from '../../../../redux/action/releaseLog'
import './index.css';

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
              bounds: refs.map.getBounds()
            })
            this.props.onChangeCenter(refs.map.getCenter())
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
          this.props.onChangeMarker(nextMarkers)
          this.props.onChangeCenter(nextCenter);
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
        defaultZoom={15}
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
        {props.marker ? <Marker
          icon={{url: "http://localhost:8000/public/image/logPosition.png", size: {width: 35, height: 50}, scaledSize: {width: 35, height: 50}}}
          position={{ lat: props.marker.lat, lng: props.marker.lng }}
        /> : ''}
      </GoogleMap>
    )
  )
})

export class AppContentReleaseLogFirstStep extends React.Component{
  constructor(props){
    super(props);
    this.state={
      bounds: null
    }
    this.onChangeParentState = this.onChangeParentState.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  onChangeParentState(state){
    this.setState(state)
  }

  componentWillMount() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.onChangeCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        this.props.onChangeMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  }

  onMapClick(position){
    this.props.onChangeMarker({
      lat: position.latLng.lat(),
      lng: position.latLng.lng()
    })
  }
  
  handleNext(){
    this.props.onChangeStep(1)
  }

  render(){
    return (
      <div className="app-content-releaseLog-firstStep-content">
        <MyMapComponent
          center={this.props.center}
          onChangeParentState={this.onChangeParentState}
          onMapClick={this.onMapClick}
          bounds={this.state.bounds}
          onChangeCenter={this.props.onChangeCenter}
          onChangeMarker={this.props.onChangeMarker}
          marker={this.props.marker}
        />
        <div className="app-content-releaseLog-firstStep-content-action" style={{textAlign: 'right'}}>
          <Button type="primary" onClick={this.handleNext}>下一步</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    marker: state.releaseLog.marker,
    center: state.releaseLog.center
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeMarker: (marker) => dispatch(doChangeMarker(marker)),
    onChangeCenter: (center) => dispatch(doChangeCenter(center)),
    onChangeStep: (step) => dispatch(doChangeStep(step))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentReleaseLogFirstStep);