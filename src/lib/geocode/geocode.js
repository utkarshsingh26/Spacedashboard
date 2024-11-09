import axios from 'axios'

// Function to get latitude and longitude coordinates for certain lcoation
async function getCoordinates(location) {
    try{
      const response  = await axios.get("https://geocode.maps.co/search?q=" + location + "&api_key=65a18def52753235285798top7580a2" )
      if(response.data.length>0) {
        const entry1 = response.data[0]
        if(entry1.lat && entry1.lon) {
          return [entry1.lat,entry1.lon]
        }
        return []
      }
    } catch (error) {
      return error
    }
  }

export default getCoordinates