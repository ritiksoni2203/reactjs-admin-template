import '../../assets/scss/custom.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'

import { useSkin } from '@hooks/useSkin'

// SCSS
import '../../assets/scss/custom.scss'
import ProgressChart from './ProgressChart'

const Home = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { skin } = useSkin(),
  labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
  gridLineColor = 'rgba(200, 200, 200, 0.2)',
  lineChartDanger = '#ff4961'

  return (
    <div>
      <h1>Weekly Progress Chart</h1>
      <ProgressChart success={lineChartDanger} labelColor={labelColor} gridLineColor={gridLineColor} />
    </div>
  )
}

export default Home
