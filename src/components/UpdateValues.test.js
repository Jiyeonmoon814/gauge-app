import { UpdateValues } from "./UpdateValues"
import { fireEvent, render, screen } from "@testing-library/react"

const initalValue = {
    max : 100,
    min : 10,
    value : 34
}

test('on change input if min is bigger than max, the confirm button becomes disabled(grey) and show you a warning message', async () => {
    render(<UpdateValues gaugeValues={initalValue} />)
    
    const min = screen.getByLabelText(/min/i)
    const max = screen.getByLabelText(/max/i)
    const warning = screen.findByText(/bigger/i)
    const button = screen.getByRole('button', {name : /confirm/i})

    fireEvent.change(max, {
        target : {
            valueAsNumber : 20
        }
    })

    fireEvent.change(min, {
        target : {
            valueAsNumber : 100
        }
    })

    expect(await max.valueAsNumber).toBe(20)
    expect(warning)

    //disabled grey
    expect(button).toHaveStyle('background : #66686C') 
    expect(button).toBeDisabled() 

    //active blue
    //expect(button).toHaveStyle('background : #1F609E')
})

test('on the first render, the confirm button is enabled', async() => {
    render(<UpdateValues gaugeValues={initalValue} />)

    expect(await screen.getByRole('button', {name : /confirm/i})).toBeEnabled()
})