import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import axios from 'axios'

import { Title } from './shared'
import { LIBRE_BOLD } from '../utils/font'

const GraphWrapper = s.div`
  margin: 4rem 10rem;
  color: #707070;

  @media (max-width: 768px) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
`

const GraphTitle = s.text`
  color: #283033;
`

const GraphSubtitle = s.text`
  color: #D12D4A;
  vertical-align: middle;
  margin-top: 4rem;
  margin-left: 0;
  font-weight: 800;

  @media (max-width: 768px) {
    display: block;
  }
`

const GraphNumber = s(Title)`
  padding: 0;
  font-size: 50px;
`

const ButtonWrapper = s.div`
  .graph-button {
    :hover {
      border-color: ${({ color }) => color};
      background-color: ${({ color }) => color};
    }
  }
`

const GraphNumberBubble = s.div`
  ${LIBRE_BOLD}
  color: #D12D4A;
`

const Tracker = () => {
  useEffect(async () => {
    await axios.get('/api/fetch?url=https://recommender.thedp.com/covid').then(resp => {
      const { data: { results } } = resp
      const [ { Tests_Done_Cumulative, Positive_Cases_Cumulative }, _ ] = results
      setCumulativeCases(Positive_Cases_Cumulative[Positive_Cases_Cumulative.length - 1])
      setCumulativeTests(Tests_Done_Cumulative[Tests_Done_Cumulative.length - 1])
      setCaseData({
        labels: results[0]["Dates"].map(date => `${new Date(date).getMonth()+1}/${new Date(date).getDate()}`),
        datasets: [
          {
            label: 'Daily Count',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#D12D4A',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#D12D4A',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#D12D4A',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: results[0]["Positive_Cases"]
          }
        ]
      })
    })

    await axios.get('/api/fetch?url=https://recommender.thedp.com/covidtotal').then(resp => {
      const { data } = resp
      setTotalCases(data["confirmed"][data["confirmed"].length - 1])
      setTotalCasesDate(data['timestamp'][data['timestamp'].length - 1])
      setCumulativeData({
        labels: data["timestamp"].map(date => `${new Date(date + 'T00:00:00').getMonth()+1}/${new Date(date+ 'T00:00:00').getDate()}`),
        datasets: [
          {
            label: 'Cumulative',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: data["confirmed"]
          }
        ]
      })
    })
  }, [])

  const [graphState, setGraphState] = useState('DAILY')

  const [caseData, setCaseData] = useState({})
  const [cumulativeCases, setCumulativeCases] = useState(null)
  const [cumulativeTests, setCumulativeTests] = useState(null)

  const [cumulativeData, setCumulativeData] = useState({})
  const [totalCases, setTotalCases] = useState(null)
  const [totalCasesDate, setTotalCasesDate] = useState(null)

  return (
    <GraphWrapper>
      <div className="row">
        <div className="col-md-8" style= {{ textAlign: "center" }}>
          <GraphTitle>{graphState == 'DAILY' ? 'Positive COVID-19 Cases at Penn': 'Confirmed/Probable COVID-19 Cases Among Penn Students'}</GraphTitle>
          <Line
            data={graphState == 'DAILY' ? caseData: cumulativeData}
            options={{ legend: { display: false } }}
          />
          <div className="row justify-content-center" style={{ marginTop: '1rem' }}>
            <ButtonWrapper color="#D12D4A">
              <button
                type="button"
                className="btn btn-outline-secondary graph-button"
                onClick = {() => setGraphState('DAILY')}
                style={{ marginRight: '1rem' }}
              >
                Weekly Cases
              </button>
            </ButtonWrapper>
            <ButtonWrapper color="rgba(75,192,192,1)">
              <button
                type="button"
                className="btn btn-outline-secondary graph-button"
                onClick = {() => setGraphState('CUMULATIVE')}>Cumulative Cases
              </button>
            </ButtonWrapper>
          </div>
        </div>
        <div className="col-md">
          <GraphSubtitle>CUMULATIVE CASE COUNT</GraphSubtitle>
          <div class="row">
            <div class="col-auto">
              <GraphNumber noBorder> {cumulativeCases} Cases </GraphNumber>
              <GraphNumberBubble>
                <p>({Math.round(10000 * cumulativeCases / cumulativeTests) / 100}% positivity rate with <br /> {String(cumulativeTests).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tests administered)</p>
              </GraphNumberBubble>
            </div>
          </div>
          Reported at Houston Hall
          <div style={{ marginTop: '3rem' }}>
            <GraphNumber noBorder> {totalCases} Cases </GraphNumber>
            Reported by domestic and international students as of {moment(totalCasesDate, 'YYYY-MM-DD').format('MMMM D, YYYY')}
          </div>
        </div>
      </div>
    </GraphWrapper>
  )
}

export default Tracker