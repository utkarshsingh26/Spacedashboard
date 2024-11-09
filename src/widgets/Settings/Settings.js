import './Settings.css'
// MUI imports
import {Slider} from '@mui/material';

const SettingsWidget = (props) => {
    if(props.open) {
        return (
            <div className="settings-container">
              <div className="settings-container__header">
                <h1>
                  Settings
                </h1>
                <h1 className="settings-container__cancel" onClick={() => {
                  props.setOpen(false)
                }}>✖</h1>
              </div>
              <div className="settings-container__sections"> 
                <div>
                <h2>Styling</h2>
                <div>
                  <h3>Marker Color</h3>
                  <div className="settings-container__boxes">
                    <div className='box red'></div>
                    <div className='box green'></div>
                    <div className='box blue'></div>
                  </div>
                </div>
                <div>
                  <h3>Font Size</h3>
                  <Slider  defaultValue={14}  aria-label="Default"  valueLabelDisplay="auto"  marks={true}
                  step={2} min={10} max={48} />
                </div>
                </div>
      
          
                <div>
                    <h2>Data</h2>
                </div>
              </div>
            </div>
        )
    } else {
        return <></>
    }

}

export default SettingsWidget