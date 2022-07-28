import { Gauge } from "./components/Gauge"
import { Header } from "./components/Header"
import AppStyles from './styles/App.module.css'

const App = () => {
  return (
    <div className={AppStyles.container}>
      <Header />
      <Gauge />
    </div>
  )
}

export default App