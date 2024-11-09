import './Overlay.css'
const Clickable=(props)=> {
    return (
        <div className='keywords-buttons'>
        <p>Most popular topics: </p>
        {props.kw ? props.kw.map((kw) => {
            
            return (
                <div onClick={() => {
                    props.toggle(kw)
                }} className={props.most.includes(kw) ? 'keyword-button keyword-button-active' : 'keyword-button'}>
                    <p>{kw}</p>
                </div>
            )
        }) : null}
    </div>
    )
}

export default Clickable