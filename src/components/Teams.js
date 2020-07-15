import * as React from 'react'
import { useRouteMatch, Link, Switch, Route, useParams } from 'react-router-dom'

import useTeamNames from '../hooks/useTeamNames'
import useTeam from '../hooks/useTeam'
import TeamLogo from './TeamLogo'
import Loading from './Loading'
import Sidebar from './Sidebar'

export default function Teams () {
  const { response: teams, loading } = useTeamNames()
  const { path } = useRouteMatch()

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container two-column'>
      <Sidebar
        title='Teams'
        list={teams}
      />
      <Switch>
        <Route path={`${path}/:teamId`}>
          <Team/>
        </Route>
        <Route to='*'>
        <div className='sidebar-instruction'>
            Select a Team
          </div>
        </Route>
      </Switch>
    </div>
  )
}

function Team () {
  const { teamId } = useParams()
  const { response, loading } = useTeam(teamId)

  if (loading) {
    return <Loading />
  }

  const { 
    name,
    established,
    manager,
    coach
   } = response

  return (
    <div className='panel'>
      <div style={{ width: '100%' }}>
        <TeamLogo className='center' id={teamId}/>
        <h1 className='medium-header'>{name}</h1>
        <ul className='info-list row'>
          <li>Est.<div>{established}</div></li>
          <li>Manager<div>{manager}</div></li>
          <li>Coach<div>{coach}</div></li>
        </ul>
        <Link className='center btn-main' to={`/${teamId}`}>
          {name} Team Page
        </Link>
      </div>
    </div>
  )
}