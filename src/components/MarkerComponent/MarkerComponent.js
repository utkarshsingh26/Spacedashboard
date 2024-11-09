import { Popup, Marker } from "react-leaflet"
import { Card, CardMedia, ThemeProvider, CardContent, Typography, CardActions, Button} from "@mui/material"
import { createTheme } from "@mui/material"
import { useState } from "react"

import { fetchArticleFromAPI } from "../../lib/local_api/local_api"

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
  
const MarkerComponent = (props) => {
    const [article, setArticle] = useState(null)
    const [blur, setBlur] = useState('20px')
    return (
        <Marker eventHandlers={{
            click: async (e) => {
              const data = await fetchArticleFromAPI(props.marker.article.id)
              setArticle(data[0])
                setBlur('0px')
            },
          }} position={props.marker.coordinates} >
            <Popup className="article-popup" autoClose={false}>
              <ThemeProvider theme={theme}>
                <Card sx={{ maxWidth: 248 }} variant='outlined' >
                  {/* <CardMedia onError={()=>console.log('error')}
                sx={{ height: 140 }}
                image={props.marker.article.media}
                title={props.marker.article.title}
              /> */}
                  {/*<img width={248} src={props.marker.article.media} onError={(e) => e.target.style.display = 'none'} />*/}
                  {/* <Image></Image> */}
                  <CardContent style={{ padding: 20 }}>
                    <Typography style={{   color: 'transparent',
   textShadow: '0 0 ' + blur +  ' rgba(0,0,0,0.5)'}}gutterBottom variant="h6" component="div">
                      {article ? article.title : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    </Typography>
                    <Typography style={{   color: 'transparent',
   textShadow: '0 0 ' + blur +  ' rgba(0,0,0,0.5)'}} variant='body2' color="text.secondary">
                      {article ? article.summary : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    </Typography>
                    <Typography  style={{   color: 'transparent',
   textShadow: '0 0 ' + blur +  ' rgba(0,0,0,0.5)'}} variant='body2' color='text.secondary'>
                      Publication Date: {article ? article.date : "2022-10-24T00:00:00.000Z"}
                    </Typography>
                    <Typography style={{   color: 'transparent',
   textShadow: '0 0 ' + blur +  ' rgba(0,0,0,0.5)'}} variant='body2' color='text.secondary'>
                      Source: {article ? article.source : "Source"}
                    </Typography>
                    <CardActions >
                      <Button href={article ? article.url: ''} target="_blank" style={{ color: 'white' }} size="small" variant="contained" sx={{ boxShadow: 'none', fontFamily: 'Helvetica', borderRadius: 0, color: 'white' }}>See original article</Button>
                    </CardActions>
                  </CardContent>

                </Card>
              </ThemeProvider>
            </Popup>
          </Marker>
    )
}

export default MarkerComponent