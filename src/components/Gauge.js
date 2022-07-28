import axios from 'axios'
import { useEffect, useState } from 'react'
import GaugeStyles from '../styles/Gauge.module.css'
import { UpdateValues } from './UpdateValues'

export const Gauge = () => {
    const [gaugeValues, setGaugeValues] = useState([])
    const [percentage, setPercentage] = useState('')
    const [rotate, setRotate] = useState('')
    const [showUpdatePopUp, setShowUpdatePopUp] = useState(false)

    useEffect(() => {
        getDefaultValues()
    },[])

    useEffect(() => {
        calculateValues()
    },[gaugeValues]) // call a function everytime gaugeValues changes 

    // get the default sample values for the gauge 
    const getDefaultValues = async () => {
        try {
            const res = await axios.get('https://widgister.herokuapp.com/challenge/frontend?fixed=1')

            setGaugeValues(res.data)
            //calculateValues(res.data)
        }catch(err){
            console.log(err)
        }
    }

    // get randome values for the gauge
    const getRandomValues = async () => {
        try {
            const res = await axios.get('https://widgister.herokuapp.com/challenge/frontend')
            const data = res.data 

            if(data.min > data.max || data.min > data.value){
                alert('Inaccurate data \nPlease click the button again')
                return false
            }else{
                setGaugeValues(data.unit == undefined ? {...data, unit : 'GBP'} : data)
                //calculateValues(data)
            }
    
        }catch(err) {
            console.log(err)
        }
    }

    // calculate percentage and rotate for the display  
    const calculateValues = () => {
        const range = gaugeValues.max - gaugeValues.min
        const target = gaugeValues.value - gaugeValues.min

        if(range < 0 || target < 0){ // when random values are inaccurate e.g min is bigger than max 
            return false 
        }else{
            setPercentage(((target / range) * 100).toFixed(2))
            setRotate(((target / range) / 2).toFixed(2))
        }
    }

    return (
        <>
        {showUpdatePopUp && <UpdateValues gaugeValues={gaugeValues} 
            setGaugeValues={setGaugeValues} setShowUpdatePopUp={setShowUpdatePopUp} /> }
        <div className={GaugeStyles.container}>
        <button type="button" onClick={()=>getRandomValues()}>Get Random Values</button>
        <button type="button" onClick={()=>setShowUpdatePopUp(true)}>Update Values</button>
            <div className={GaugeStyles.body}>
                <div className={GaugeStyles.fill} 
                    style={{transform:`rotate(${rotate}turn)`}}>
                    <span style={{transform:`rotate(${rotate * -1}turn)`}}>
                        {percentage}%
                    </span>
                </div>
                <div className={GaugeStyles.cover}>{gaugeValues.unit} {gaugeValues.value}
                </div>
            </div>
            <div className={GaugeStyles.numbers}>
                <p>{gaugeValues.unit} {gaugeValues.min}</p>
                <p>{gaugeValues.unit} {gaugeValues.max}</p>
            </div>
        </div>
        </>
    )
}
