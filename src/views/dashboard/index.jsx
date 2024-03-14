import React, { useEffect } from 'react'
import Cards from 'shared/components/Card'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import PageTitle from 'shared/components/PageTitle'
import { Col, Row } from 'react-bootstrap'
import DoughnutChart from 'shared/components/Dashchat'


function Dashboard() {

  useEffect(() => {
    document.title = 'Dashboard | AMC Survey'
  }, [])

  return (
    <div>
      <PageTitle title={'Dashboard'} />
      <div className='DashGrid'>
        <Row className='dashboardCards' >
          <Col className='mb-3 '>
            <Cards cardtext={'0'} cardtitle={'My Block'} cardIcon={faHouse} className='dashboard-card-1' />
          </Col>
          <Col className='mb-3 '>
            <Cards cardtext={'0'} cardtitle={'Block'} cardIcon={faHouse} className='dashboard-card-2' />
          </Col>
        </Row>
        <Row className='dashboardCards' >
          <Col className='mb-3 '>
            <Cards cardtext={'0'} cardtitle={'Remaining'} cardIcon={faHouse} className='dashboard-card-3' />
          </Col>
          <Col className='mb-3 '>
            <Cards cardtext={'0'} cardtitle={'Review'} cardIcon={faHouse} className='dashboard-card-4' />
          </Col>
        </Row>
      </div>
      <div >
        <DoughnutChart />
      </div>
    </div>
  )
}

export default Dashboard
