import { useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import './Overlay.css'
import { matchSorter } from 'match-sorter';

import logo from '../../assets/logo.png';

import { Autocomplete } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import dayjs from 'dayjs';

import {Modal, Box} from '@mui/material';
import { fetchIDSFromAPIBasedOnDateAndQuery } from '../../lib/local_api/local_api';
import axios from 'axios';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const OverlayWidget = (props) => {
    // Declare variables and states for the Overrlay Widget which includes all the articles data, the filter text and filter options required for the search feature of the Application
    const [articles, setArticles] = useState([])
    const [filterText, setFilterText] = useState(null)
    const [filterOptions, setFilterOptions] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bug, setBug] = useState('')
    let [clickedOn,setClickedOn] = useState('')
    // useEffect hook by React that loads the articles and their markers into the Widget upon mounting the component
    // useEffect(() => {

    //     let articles = props.markerData;
    //     setArticles(articles)
    // }, [props.markerData]);



    async function submit(name, email, bug) {
        const data= {
            name:name,
            email:email,
            bug:bug
        }
        
            try {
             const response = await axios.post("https://isggi9c3o8.execute-api.us-east-1.amazonaws.com/dev/report-bug", data)
             if(response.data.success) {
                toast.success('Bug reported successfully.')
             } else {
                toast.error('Error reporting bug. Try again later.')
             }
             setOpen(false)
             return true
            } catch (error) {
              return error
            }
      
          
        }

    

    // Functions to call to update filter when the input text of the Autocomplete changes
    const updateFilter = async (event, value) => {
        // const filtered = matchSorter(articles, value, { keys: ['locations', 'keywords', 'source']})
        // let filterOptions = filtered.map((article, index) => {
        //     return { label: JSON.stringify(article), id: index, locations: article.locations, keywords: article.keywords }
        // })
        setLoading(true)
        const filterOptions =  await fetchIDSFromAPIBasedOnDateAndQuery(props.startDate, props.endDate, value)
        setLoading(false)
        console.log(filterOptions)
        setFilterOptions(filterOptions)
        setFilterText(value)

       props.setFilterText(value)
       props.setFilterOptions(filterOptions)
    }
    const toggle = (keyword) => {
        let arr = clickedOn.split(',')
        if(arr.includes(keyword)) {
            arr = arr.filter(e => e !== keyword) // will return ['A', 'C']
        } else {
            arr.push(keyword)
        }
        props.setClickedOn(arr.join(','))
        setClickedOn(arr.join(','))

    }

    // Return of the parent overlay widget that includes the ASU branding, the Search Bar and the Settings Widget
    return (
       
        <div className="overlay">
             <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Report a bug</h1>
          <div>
            <form>
                <div>
                <label>Name</label>
                <input onChange={(event) => setName(event.target.value)} className='InputBox' type="name"></input>
                </div>
                <div>
                <label>Email Address</label>
                <input onChange={(event) => setEmail(event.target.value)} className='InputBox' type='email'></input>
                </div>
                <div>
                <label>Bug description</label>
                <textarea onChange={(event) => setBug(event.target.value)} className='InputBox' />
                </div>
                <a onClick={() =>submit(name, email, bug)} className='SubmitButton'>Submit</a>
              
           </form>
          </div>
       
        </Box>
      </Modal>
            <div style={{ position: 'absolute', zIndex: '10', bottom: '10px', left: '1' }}>
                <div style={{ display: 'flex', alignItems: 'CENTER' }}>
                    <img src={logo} style={{ width: '200px' }}></img>
                </div>
                <div style={{ margin: 10 }}>
                    {/* <p>Articles loaded: {articles.length}</p> */}
                    <p>All article credits are attributed to their respective sources.</p>
                </div>
            </div>

            <div style={{ position: 'absolute', zIndex: '10', bottom: '10px', right: '10px',  }}>
                <span onClick={() => setOpen(true)} style={{color:'#8C1D40', cursor:'pointer'}}>Report Bug</span>
            </div>
            <div className="controls-container">
                <div className="controls-container__mid">
                    <Autocomplete
                        disablePortal
                        id="search-bar"
                        loading={loading}
                        loadingText='Loading…'
                        options={filterOptions}
                        onInputChange={updateFilter}
                        freeSolo
                        sx={{ 
                            marginBottom: '8px',
                            fontWeight: 'bold',
    
                        }}
                        renderOption={(option) => {
                            let articleObject = JSON.parse(option.key)
                            console.log(articleObject)
                           // if(articleObject.hidden == false) {
                                return (
                                    <div key={"autocomplete-" + Math.random()} onClick={() => window.open(articleObject.url)} style={{
                                        cursor: 'pointer',
                                        padding: 8,
                                        display: 'flex'
                                    }}>
                                        <div style={{}}>
                                            <img style={{aspectRatio: '9/16', height: '100px', width: '150px'}} src={articleObject.media}>
                                            </img>
                                        </div>
                                        <div style={{marginLeft: '8px'}}>
                                            <div style={{fontWeight: 'bold', fontSize:'1.1rem'}}>
                                                Article: {articleObject.title}
                                            </div>
                                            <div style={{}}>
                                                {articleObject.summary}
                                            </div>
                                            <div style={{fontWeight: 'bold'}}>
                                                Date Published: {articleObject.date}
                                            </div>
                                            <div style={{ fontWeight: 'bold' }}> Source: {articleObject.source} </div>
                                        </div>
                                     
                                    </div>
                                );
                           // }

                        }}
                        renderInput={(params) => <TextField {...params} sx={{width: '20vw', background: "#ffffff", color: "black", borderRadius: '50px'}}  label="Search the ASU Heatmap" />}
                    />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="datepickerscontainer" style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', width:'50%', gap: '1rem' }} sx={{display: 'flex', width: '100%' }} >
                            <DatePicker sx={{background: "#ffffff", color: "black", borderRadius: '50px', width: '30%', marginRight: '1rem'}} className="datepicker" label= "Pick a start date" onChange={(value) => {
                                const newStartDateValue = value.toISOString().slice(0,10)
                                props.setStartDate(newStartDateValue)
                            }}  />
                            <DatePicker  sx={{background: "#ffffff", color: "black", borderRadius: '50px', width:'30%'}} className="datepicker"  label = "Pick an end date" onChange={(value) => {
                                const newEndDateValue = value.toISOString().slice(0,10)
                                props.setEndDate(newEndDateValue)
                            }} />
                            </div>

                        </LocalizationProvider>
                        <div className='keywords-buttons'>
                            {props.most ? props.most.map((kw) => {
                                let arr = clickedOn.split(',')
                                return (
                                    <div onClick={() => {

                                        toggle(kw)
                                    }} className={arr.includes(kw) ? 'keyword-button keyword-button-active' : 'keyword-button'}>
                                        <p>{kw}</p>
                                    </div>
                                )
                            }) : null}
                        </div>

                </div>
            </div>
        </div>
    )
}

export default OverlayWidget