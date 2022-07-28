import { useEffect, useState } from 'react'
import UpdateStyles from '../styles/UpdateValues.module.css'

export const UpdateValues = ({ gaugeValues, setGaugeValues, setShowUpdatePopUp }) => {
    const [updateVal, setUpdateVal] = useState(gaugeValues)


    return (
        <div className={UpdateStyles.wrapper}>
           <div className={UpdateStyles.container}>
                <h3>Update Gauge Value</h3>
                
                <div className={UpdateStyles.buttons}>
                    <button type="button" onClick={()=>setShowUpdatePopUp(false)}>Close</button>
                    <button type="button">Confirm</button>
                </div>
            </div>
        </div>
    )
}
