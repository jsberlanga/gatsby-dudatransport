import React, { Component } from "react"
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"

const mapStyles = {
  width: "80%",
  height: "100%",
  borderRadius: "1rem",
  boxShadow: "1px 1px 8px -3px silver",
}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
          lat: 50.241581,
          lng: 20.051724,
        }}
      >
        <Marker onClick={this.onMarkerClick} name={"Duda Transport"} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h5>{this.state.selectedPlace.name}</h5>
            <p>Milocice 136, Slomniki, Poland, 32-090</p>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCDpcMt-TsKQfhChrpuAxitNamIw_zE3e0",
})(MapContainer)
