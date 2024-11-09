import {fetchDataFromAPI,fetchIDSfromAPI} from "../local_api/local_api"

async function getMarkerData() {
   try{
    const articleData = await fetchDataFromAPI()
    return articleData
   } catch(error){
    return error
   }
}

async function getIDData() {
   try{
      const articleData = await fetchIDSfromAPI()
      return articleData
     } catch(error){
      return error
     }
}

export default getMarkerData