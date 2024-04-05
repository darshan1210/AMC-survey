import React, { useEffect, useState } from 'react'
import Cards from 'shared/components/Card'
import { faChalkboardUser, faCircleCheck, faListCheck, faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import PageTitle from 'shared/components/PageTitle'
import { Col, Row, Spinner } from 'react-bootstrap'
import DoughnutChart from 'shared/components/Dashchat'
import useMediaQuery from 'shared/hooks/useMediaQuery'
import { dashborad } from 'query/profile/profile.query'
import { useQuery } from 'react-query'



function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const width = useMediaQuery('(max-width: 767px)')
  const [DataPoints, setDataPoints] = useState([
    { name: "Review Block", y: 12 },
    { name: "Allotted Block", y: 31 },
    { name: "Completed Block", y: 40 },
    { name: "In Progress Block", y: 17 }
  ])
  // const { isLoading, isFetching } = 

  function convertToPercentage(data) {
    const total = Object.values(data).reduce((acc, curr) => acc + curr, 0);
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = `${((value / total) * 100).toFixed(2)}`;
    }
    return result;
  }
  const { isLoading, isFetching } = useQuery('getDashborad', dashborad, {
    select: (data) => data?.data?.data,
    onSuccess: (data) => {
      setDashboardData(data)
    }
  })

  useEffect(() => {
    if (dashboardData) {
      const Data = convertToPercentage(dashboardData);
      console.log('Data', Data)
      setDataPoints([
        { name: "Review Block", y: Number(Data?.review_block) },
        { name: "Allotted Block", y: Number(Data?.allocated_block) },
        { name: "Completed Block", y: Number(Data?.completed_block) },
        { name: "In Progress Block", y: Number(Data?.inprogress_block) }
      ])
    }
  }, [dashboardData])


  // console.log('dashboardData', DataPoints)


  // const [DataPoints2] = useState([
  //   { name: "Review Property", y: 8 },
  //   { name: "Allotted Property", y: 20 },
  //   { name: "Completed Property", y: 60 },
  //   { name: "In Progress Property", y: 12 }
  // ])

  useEffect(() => {
    document.title = 'Dashboard | AMC Survey';
    const elementToRemove = document.querySelector('.canvasjs-chart-credit');
    elementToRemove?.remove();
  }, [width])


  return (
    <div>
      <PageTitle title={'Dashboard'} />
      {isLoading || isFetching ?
        <Row className='d-flex justify-content-center'><Spinner /></Row>
        : <><div className='DashGrid'>
          <Row className='dashboardCards' >
            <Col className='mb-3 '>
              <Cards cardtext={dashboardData?.allocated_block || "0"} cardtitle={'Allotted Block'} cardIcon={faChalkboardUser} className='dashboard-card-1' />
            </Col>
            <Col className='mb-3 '>
              <Cards cardtext={dashboardData?.inprogress_block || "0"} cardtitle={'In Progress Block'} cardIcon={faListCheck} className='dashboard-card-2' />
            </Col>
          </Row>
          <Row className='dashboardCards' >
            <Col className='mb-3 '>
              <Cards cardtext={dashboardData?.review_block || "0"} cardtitle={'Review Block'} cardIcon={faMagnifyingGlassLocation} className='dashboard-card-3' />
            </Col>
            <Col className='mb-3 '>
              <Cards cardtext={dashboardData?.completed_block || "0"} cardtitle={'Completed Block'} cardIcon={faCircleCheck} className='dashboard-card-4' />
            </Col>
          </Row>
        </div>
          {/* <div className='DashBoardChart'> */}
          {/* <DoughnutChart title={"My Block Progress"} subtitle={"40% Completed"} dataPoints={DataPoints} /> */}
          {/* </div> */}
          <Row lg={12} className='d-flex justify-content-center'>
            <Col lg={6} md={12} sm={12} className='mt-3'><DoughnutChart title={"My Block Progress"} subtitle={`${DataPoints[2]?.y || '0'}% Completed`} dataPoints={DataPoints} /></Col>
            {/* <Col lg={6} md={12} sm={12} className='mt-3'><DoughnutChart title={"My Property Progress"} subtitle={"60% Completed"} dataPoints={DataPoints2} /></Col> */}
          </Row>
        </>}
    </div>
  )
}

export default Dashboard
