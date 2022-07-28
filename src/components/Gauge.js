import axios from 'axios'
import { useEffect, useState } from 'react'
import GaugeStyles from '../styles/Gauge.module.css'

export const Gauge = () => {
    const [gaugeValue, setGaugeValue] = useState([])
    const [percentage, setPercentage] = useState('')
    const [rotate, setRotate] = useState('')

    useEffect(() => {
        getDefaultValue()
    },[])

    // get the default sample payload 
    const getDefaultValue = async () => {
        try {
            const res = await axios.get('https://widgister.herokuapp.com/challenge/frontend?fixed=1')

            setGaugeValue(res.data)
            calculateValues(res.data)
        }catch(err){
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
            <div className={GaugeStyles.body}>
                <div className={GaugeStyles.fill} 
                    style={{transform:`rotate(${rotate}turn)`}}>
                    <span style={{transform:`rotate(${rotate * -1}turn)`}}>
                        {percentage}%
                    </span>
                </div>
                <div className={GaugeStyles.cover}>{gaugeValue.unit} {gaugeValue.value}
                </div>
            </div>
            <div className={GaugeStyles.numbers}>
                <p>{gaugeValue.unit} {gaugeValue.min}</p>
                <p>{gaugeValue.unit} {gaugeValue.max}</p>
            </div>
        </div>
        </>
    )
}
