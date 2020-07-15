import * as React from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom'

import useTeamsArticles from '../hooks/useTeamsArticles'
import useTeam from '../hooks/useTeam'
import TeamLogo from './TeamLogo'
import Loading from './Loading'
import { convertDate } from '../helpers'
import useTeamNames from '../hooks/useTeamNames'

export default function TeamPage () {
  const { url } = useRouteMatch()
  const { teamId } = useParams()
  const { response: team, loading: loadingTeam } = useTeam(teamId)
  const { response: teamNames, loading: teamsLoading } = useTeamNames()
  const { response: articles, loading: loadingArticle } = useTeamsArticles(teamId)

  const loading = loadingTeam || loadingArticle || teamsLoading

  if (loading) {
    return <Loading />
  }

  if (!teamNames.includes(teamId)) {
    return <h1 className='text-center'>The {teamId} is not a valid team.</h1>
  }

  const sortedArticles = !articles
    ? []
    : articles.sort((a, b) => new Date(b.date) - new Date(a.date))

  const {
    name,
    championships,
    established,
    manager,
    coach,
    wins,
    losses
  } = team

  return (
    <div className='panel'>
      <TeamLogo id={teamId} />
      <h1 className='medium-header'>{name}</h1>
      <h4 style={{ margin: '5px' }}>
        <Link to={`/players?teamId=${teamId}`}>View Roster</Link>
      </h4>
      <h4>Championships</h4>
      <ul className='championships'>
        {championships.map(championship => (
          <li key={championship}>{championship}</li>
        ))}
      </ul>
      <ul className='info-list row' style={{ width: '100%' }}>
        <li>Est<div>{established}</div></li>
        <li>Manager<div>{manager}</div></li>
        <li>Coach<div>{coach}</div></li>
        <li>Record<div>{wins}-{losses}</div></li>
      </ul>
      <h2 className='header'>Articles</h2>
      <ul className='articles'>
        {sortedArticles.map(({ id, title, date }) => (
          <li key={id}>
            <Link to={`${url}/articles/${id.toLowerCase()}`}>
              <h4 className='article-title'>{title}</h4>
              <div className='article-date'>{convertDate(date)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}