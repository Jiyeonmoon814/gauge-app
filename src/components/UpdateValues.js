import { useEffect, useState } from 'react'
import UpdateStyles from '../styles/UpdateValues.module.css'

export const UpdateValues = ({ gaugeValues, setGaugeValues, setShowUpdatePopUp }) => {
    const [updateVal, setUpdateVal] = useState(gaugeValues)


    return (
        <div className={UpdateStyles.wrapper}>
           <div className={UpdateStyles.container}>
                <h3>Update Gauge Value</h3>
                <div className={UpdateStyles.main}>
                    <label htmlFor="min">Min</label>
                    <input type="number" placeholder="min" id="min" value={updateVal.min} 
                        onChange={(e)=>setUpdateVal({...updateVal, min : +e.target.value})} />
                    <label htmlFor="value">Value</label>
                    <input type="number" id="value" value={updateVal.value} 
                        onChange={(e)=>setUpdateVal({...updateVal, value : +e.target.value})} />
                    <label htmlFor='max'>Max</label>
                    <input type="number" id="max" value={updateVal.max} 
                        onChange={(e)=>setUpdateVal({...updateVal, max : +e.target.value})} />
                </div>
                <div className={UpdateStyles.buttons}>
                    <button type="button" onClick={()=>setShowUpdatePopUp(false)}>Close</button>
                    <button type="button">Confirm</button>
                </div>
            </div>
        </div>
    )
}
