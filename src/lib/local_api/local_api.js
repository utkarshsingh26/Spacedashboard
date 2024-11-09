import axios from "axios";

async function fetchIDSfromAPI() {
  while(true) {
    try {
     const response = await axios.get("https://isggi9c3o8.execute-api.us-east-1.amazonaws.com/dev/fetchids")
      return response.data
    } catch (error) {
      console.error(error) 
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

async function fetchIDSFromAPIBasedOnDate(startDate, endDate) {
  while(true) {
    try {
     const response = await axios.post("https://isggi9c3o8.execute-api.us-east-1.amazonaws.com/dev/fetchids", {startDate: startDate, endDate: endDate})
      return response.data
    } catch (error) {
      console.error(error) 
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

async function fetchIDSFromAPIBasedOnDateAndQuery(startDate, endDate,query) {
  while(true) {
    try {
     const response = await axios.post("https://isggi9c3o8.execute-api.us-east-1.amazonaws.com/dev/fetcharticles", {startDate: startDate, endDate: endDate,query:query})
      return response.data
    } catch (error) {
      console.error(error) 
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

async function fetchArticleFromAPI(id) {
  while(true) {
    try {
     const response = await axios.post("https://isggi9c3o8.execute-api.us-east-1.amazonaws.com/dev/fetcharticle", {id: id})
      return response.data
    } catch (error) {
      console.error(error) 
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Function that returns article data from API
async function fetchDataFromAPI() {
  // var strStart = startDate.toISOString().slice(0, 10);
  // var strEnd = endDate.toISOString().slice(0, 10);
 // var strStart= startDate;
  //var strEnd= endDate
    while(true) {
      try {
        
       const response = await axios.get("https://isggi9c3o8.execute-api.us-east-1.amazonaws.com/dev/fetch")
        return response.data
      } catch (error) {
        console.error(error) 
      }
await new Promise(resolve => setTimeout(resolve, 2000));
    }  
  }


export {fetchDataFromAPI, fetchIDSfromAPI, fetchArticleFromAPI, fetchIDSFromAPIBasedOnDate,fetchIDSFromAPIBasedOnDateAndQuery}