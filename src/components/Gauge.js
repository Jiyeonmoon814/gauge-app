import axios from 'axios'
import { useEffect, useState } from 'react'
import GaugeStyles from '../styles/Gauge.module.css'

export const Gauge = () => {
    const [gaugeValues, setGaugeValues] = useState([])
    const [percentage, setPercentage] = useState('')
    const [rotate, setRotate] = useState('')

    useEffect(() => {
        getDefaultValues()
    },[])

    // get the default sample values for the gauge 
    const getDefaultValues = async () => {
        try {
            const res = await axios.get('https://widgister.herokuapp.com/challenge/frontend?fixed=1')

            setGaugeValues(res.data)
            calculateValues(res.data)
        }catch(err){
            console.log(err)
        }
    }

    // get randome values for the gauge
    const getRandomValues = async () => {
        try {
            const res = await axios.get('https://widgister.herokuapp.com/challenge/frontend')
            const data = res.data 
    
            setGaugeValues(data.unit == undefined ? {...data, unit : 'GBP'} : data)
            calculateValues(data)
        }catch(err) {
            console.log(err)
        }
    }

    // calculate percentage and rotate for the display  
    const calculateValues = (data) => {
        setPercentage(((data.value / data.max) * 100).toFixed(2))
        setRotate(((data.value / data.max) / 2).toFixed(2))
    }

    return (
        <>
        <div className={GaugeStyles.container}>
        <button type="button" onClick={()=>getRandomValues()}>Get Random Values</button>
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
