import { useEffect, useState } from 'react'
import UpdateStyles from '../styles/UpdateValues.module.css'

export const UpdateValues = ({ gaugeValues, setGaugeValues, setShowUpdatePopUp }) => {
    const [updateVal, setUpdateVal] = useState(gaugeValues)
    const [activeButton, setActiveButton] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState(false)

    useEffect(() => {
        // when min or value is bigger than max, inactive the confirm button
        if(updateVal.min > updateVal.value || updateVal.value > updateVal.max || updateVal.min > updateVal.max){
            setActiveButton(false)
            setShowErrorMsg(true)
        }else{
            setActiveButton(true)
            setShowErrorMsg(false)
        }
    },[updateVal])

    const styles = {
        button : { // make confirm button blue when the state is true 
            background : activeButton ? '#1F609E' : '#66686C'
        }
    }

    const numberRegExp = (val) => {
        return +val.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').substr(0,3)
    }

    const updateGaugeValues = () => {
        setGaugeValues(updateVal)
        setShowUpdatePopUp(false)
    }

    return (
        <div className={UpdateStyles.wrapper}>
           <div className={UpdateStyles.container}>
                <h3>Update Gauge Values</h3>
                {showErrorMsg && <p>Min or Value can not be bigger than Max</p>}
                <div className={UpdateStyles.main}>
                    <label htmlFor="min">Min</label>
                    <input type="number" id="min" value={updateVal.min} 
                        onInput={(e)=>e.target.value = numberRegExp(e.target.value)} 
                        onChange={(e)=>setUpdateVal({...updateVal, min : +e.target.value})} />
                    <label htmlFor="value">Value</label>
                    <input type="number" id="value" value={updateVal.value} 
                        onInput={(e)=>e.target.value = numberRegExp(e.target.value)}
                        onChange={(e)=>setUpdateVal({...updateVal, value : +e.target.value})} />
                    <label htmlFor='max'>Max</label>
                    <input type="number" id="max" value={updateVal.max} 
                        onInput={(e)=>e.target.value = numberRegExp(e.target.value)}
                        onChange={(e)=>setUpdateVal({...updateVal, max : +e.target.value})} />
                </div>
                <div className={UpdateStyles.buttons}>
                    <button type="button" onClick={()=>setShowUpdatePopUp(false)}>Close</button>
                    <button type="button" style={styles.button} 
                        disabled={activeButton ? false : true} onClick={()=>updateGaugeValues()}>Confirm</button>
                </div>
            </div>
        </div>
    )
}
