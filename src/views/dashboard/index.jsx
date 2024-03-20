import React, { useEffect, useState } from 'react'
import Cards from 'shared/components/Card'
import { faChalkboardUser, faCircleCheck, faListCheck, faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import PageTitle from 'shared/components/PageTitle'
import { Col, Row } from 'react-bootstrap'
import DoughnutChart from 'shared/components/Dashchat'
import useMediaQuery from 'shared/hooks/useMediaQuery'



function Dashboard() {

  const width = useMediaQuery('(max-width: 800px)')
  const [DataPoints] = useState([
    { name: "Review Block", y: 12 },
    { name: "Allotted Block", y: 31 },
    { name: "Completed Block", y: 40 },
    { name: "In Progress Block", y: 17 }
  ])

  const [DataPoints2] = useState([
    { name: "Review Property", y: 8 },
    { name: "Allotted Property", y: 20 },
    { name: "Completed Property", y: 60 },
    { name: "In Progress Property", y: 12 }
  ])

  useEffect(() => {
    document.title = 'Dashboard | AMC Survey';
    const elementToRemove = document.querySelector('.canvasjs-chart-credit');
    elementToRemove?.remove();
  }, [width])


  return (
    <div>
      <PageTitle title={'Dashboard'} />
      <div className='DashGrid'>
        <Row className='dashboardCards' >
          <Col className='mb-3 '>
            <Cards cardtext={'30'} cardtitle={'Allotted Block'} cardIcon={faChalkboardUser} className='dashboard-card-1' />
          </Col>
          <Col className='mb-3 '>
            <Cards cardtext={'10'} cardtitle={'In Progress Block'} cardIcon={faListCheck} className='dashboard-card-2' />
          </Col>
        </Row>
        <Row className='dashboardCards' >
          <Col className='mb-3 '>
            <Cards cardtext={'10'} cardtitle={'Review Block'} cardIcon={faMagnifyingGlassLocation} className='dashboard-card-3' />
          </Col>
          <Col className='mb-3 '>
            <Cards cardtext={'50'} cardtitle={'Completed Block'} cardIcon={faCircleCheck} className='dashboard-card-4' />
          </Col>
        </Row>
      </div>
      {/* <div className='DashBoardChart'> */}
      {/* <DoughnutChart title={"My Block Progress"} subtitle={"40% Completed"} dataPoints={DataPoints} /> */}
      {/* </div> */}
      <Row lg={12}>
        <Col lg={6} md={12} sm={12} className='mt-3'><DoughnutChart title={"My Block Progress"} subtitle={"40% Completed"} dataPoints={DataPoints} /></Col>
        <Col lg={6} md={12} sm={12} className='mt-3'><DoughnutChart title={"My Property Progress"} subtitle={"60% Completed"} dataPoints={DataPoints2} /></Col>
      </Row>
    </div>
  )
}

export default Dashboard
