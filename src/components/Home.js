import * as React from 'react'
import { Link } from 'react-router-dom'

import TeamLogo from './TeamLogo'
import useTeamNames from '../hooks/useTeamNames'
import Loading from './Loading'

const Home = () => {
  const { response: teamNames, loading } = useTeamNames()

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container'>
      <h1 className='large-header'>Hash History Basketball League</h1>
      <h3 className='header text-center'>Select a team</h3>
      <div className='home-grid'>
        {teamNames.map((team) => (
          <Link key={team} to={`/${team}`}>
            <TeamLogo id={team} width="125px"/>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home