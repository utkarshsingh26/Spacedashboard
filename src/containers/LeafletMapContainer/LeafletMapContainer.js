



// Article Popup Styling
import { useEffect } from 'react';
import * as React from 'react';
import { useState } from 'react';

import { createTheme } from '@mui/material';

// React Leaflet Imports
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import MarkerClusterGroup from 'react-leaflet-cluster'
import './LeafletMapContainer.css'

// Library imports
import { hideAll, filter } from '../../lib/functions/functions';
import getCoordinates from '../../lib/geocode/geocode';
import { fetchIDSfromAPI, fetchIDSFromAPIBasedOnDate } from '../../lib/local_api/local_api';

// React Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MarkerComponent from '../../components/MarkerComponent/MarkerComponent';


const theme = createTheme({
  palette: {
    primary: {
      main: "#8C1D40",
    },
  },
  typography: {
    fontFamily: [
      'Arial', 'Helvetica', 'Nimbus Sans L', 'Liberation Sans', 'FreeSans', 'sans-serif'
    ]
  }
});

const LeafletMapContainer = (props) => {
  const [markers, setMarkers] = useState([])

  async function loadMarkers(startDate, endDate) {
    const articles = await fetchIDSFromAPIBasedOnDate(startDate, endDate)
    toast.success(articles.length + " articles to show!")
    console.log(articles)
    for (let i = 0; i < articles.length; i++) {
      const locations = articles[i].locations
      const locationsList = locations.split(",")
      for (let j = 0; j < locationsList.length; j++) {
        if (locationsList[j]) {
          getCoordinates(locationsList[j]).then((coordinates) => {
            console.log(coordinates)
            if (coordinates[0] && coordinates[1]) {
              setMarkers(markers => [...markers, { coordinates: [coordinates[0], coordinates[1], "10"], article: { id: articles[i].id, keywords: articles[i].keywords }, hidden: false, textHidden: false }])
            }
          }).catch((error) => {
            //console.log(error)
          })
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  //Parsing data after text change to reset markers with hidden: true
  useEffect(() => {
    if (props.filterText != '' || props.clickedOn.length >= 0) {
      hideAll(markers, setMarkers, props)
      filter(markers, setMarkers, props)
    }
  }, [props.filterText, markers.length, props.clickedOn])

  useEffect(() => {
    setMarkers([]) 
    console.log("Loading markers from start date and end date")
    loadMarkers(props.startDate, props.endDate)
  }, [props.startDate, props.endDate])

  // useEffect(() => {
  //   console.log("Loading markers from start date and end date")
  //   loadMarkers(props.startDate, props.endDate)
  // }, [])
  return (
    <div className="map-container">
      <MapContainer center={[39.828175, -98.5795]} zoom={5} zoomControl={false} scrollWheelZoom={true} id="main" closePopupOnClick={false}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="topright" />

        <HeatmapLayer
          points={markers.map((marker) => {
            if (marker.textHidden == false) {
              return marker.coordinates
            }
          })}
          longitudeExtractor={m => m ? m[1] : null}
          latitudeExtractor={m => m ? m[0] : null}
          intensityExtractor={m => m ? parseFloat(m[2]) : null} />
        <MarkerClusterGroup animate zoomToBoundsOnClick={true}>
          {
            markers.map((marker, index) => {
              if (marker.coordinates && marker.textHidden == false) {
                return (
                  <MarkerComponent marker={marker} />
                )
              }

            })

          }
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  )
}

export default LeafletMapContainer