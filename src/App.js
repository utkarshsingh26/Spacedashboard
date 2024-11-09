


// React import
import React from 'react';
import { useEffect, useState } from 'react';


// CSS imports
import './styling/App.css'
import 'leaflet/dist/leaflet.css';


// In-house functions
import OverlayWidget from './widgets/Overlay/Overlay';
import LeafletMapContainer from './containers/LeafletMapContainer/LeafletMapContainer';
import ErrorWidget from './widgets/Error/ErrorWidget';
import getMarkerData from './lib/middlemen/middlemen';

function getDifference(weeks) {
  let d = new Date();
  d.setDate(d.getDate() - 7 * weeks);             // remove 7 days
  //return d
  return d.toISOString().slice(0,10)
}
// Main Function
function App() {
  const [error, setError] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [filterOptions, setFilterOptions] = useState([])
  const [filterText, setFilterText] = useState('')
  
  const [endDate, setEndDate] = useState((new Date()).toISOString().slice(0,10))
  const [startDate, setStartDate] = useState(getDifference(16))

  const [markerData, setMarkerData] = useState([])

  const [most, setMost] = useState([])

    const [clickedOn, setClickedOn] = useState('')
     // In-house function to load markers
    async function changeStartDate  (startDate) {
      let updatedData = await getUpdatedData(markerData, startDate, endDate)
      setMarkerData(updatedData) 
      setStartDate(startDate)
    }

    async function changeEndDate (endDate)  {
      let updatedData = await getUpdatedData(markerData, startDate, endDate)
      setMarkerData(updatedData) 
      setEndDate(endDate)
    }

    async function change() {
      let updatedData = await getUpdatedData(markerData, startDate, endDate)
      setMarkerData(updatedData) 
    
    }
    useEffect(() => {
      change()
    }, [clickedOn])


    // Function that updates data based on dates
    async function getUpdatedData(data, startDate, endDate) {
      let fetched = data
      console.log(data)
      for(let i = 0; i<fetched.length;i++) {
        //console.log(fetched[i])
        const date = new Date(fetched[i].date)
        if(date <= (new Date(endDate)) && date >= (new Date(startDate))) {
          
         fetched[i].hidden=false;
        } else {
          fetched[i].hidden = true;
        }
      }
      return fetched
    }

    const mostFrequent = (arr = [], num = 10) => {
      const map = {};
      let keys = [];
      for (let i = 0; i < arr.length; i++) {
         if (map[arr[i]]) {
            map[arr[i]]++;
         } else {
            map[arr[i]] = 1;
         }
      }
      for (let i in map) {
         keys.push(i);
      }
      keys = keys.sort((a, b) => {
   
         if (map[a] === map[b]) {
   
            if (a > b) {
               return 1;
            } else {
               return -1;
            }
         }
         else {
            return map[b] - map[a];
         }
      })
      .slice(0, num);
      return keys;
   };

   function capitalizeWords(arr) {
    return arr.map((word) => {
      if(word == 'nasa') {return 'NASA'}
      const capitalizedFirst = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return capitalizedFirst + rest;
    });
  }

    async function getTenMostRecurrentKeywords(listOfData) {
      let final = []
      for(let entry in listOfData) {
        
        let kwlist = listOfData[entry].keywords.replace('"','').split(',')
        final = [...final, ...kwlist]
      }
      let mostFrequentTen = mostFrequent(final, 10)
      let arr = capitalizeWords(mostFrequentTen)
      return arr
    }

    async function run() { 
      // Gets all article data
      const FETCHED = await getMarkerData()
      let updatedData = await getUpdatedData(FETCHED, startDate, endDate)
      setMost(await getTenMostRecurrentKeywords(updatedData))
      setMarkerData(updatedData) 
    }
  
    // Hook that runs on website load
    useEffect(() => {
      // Load markers
      run()
    }, [])  

  return (
    <div className="App">
      <ErrorWidget error={error} setError={setError} />
      <OverlayWidget most={most} setOpen={setSettingsOpen} setFilterText={setFilterText} setFilterOptions={setFilterOptions} markerData={markerData} startDate={startDate} endDate={endDate} setStartDate={changeStartDate} setEndDate={changeEndDate} clickedOn={clickedOn} setClickedOn={setClickedOn}  />
      {/* <SettingsWidget open={settingsOpen} setOpen={setSettingsOpen} /> */}
      <LeafletMapContainer clickedOn={clickedOn} markerData={markerData} startDate={startDate} endDate={endDate} filterText={filterText} filterOptions={filterOptions} />
    </div>
  );
}

export default App;
