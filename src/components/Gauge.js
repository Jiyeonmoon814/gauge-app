import axios from 'axios'
import { useEffect, useState } from 'react'
import GaugeStyles from '../styles/Gauge.module.css'

export const Gauge = () => {
    const [gaugeValue, setGaugeValue] = useState([])

    useEffect(() => {
        getDefaultValue()
    },[])

    // get the default sample payload 
    const getDefaultValue = async () => {
        try {
            const res = await axios.get('https://widgister.herokuapp.com/challenge/frontend?fixed=1')

            setGaugeValue(res.data)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <div className={GaugeStyles.container}>
            <div className={GaugeStyles.body}>
                <div className={GaugeStyles.fill}>
                    
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
