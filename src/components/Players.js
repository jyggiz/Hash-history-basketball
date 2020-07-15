import * as React from 'react'
import { 
  useRouteMatch, 
  Link, 
  Route, 
  useParams, 
  useLocation,
  Switch
} from 'react-router-dom'
import { parse } from 'query-string'
import slug from 'slug'
import { TransitionGroup, CSSTransition } from 'react-transition-group'


import usePlayers from '../hooks/usePlayers'
import { toCapitalize } from '../helpers'
import Loading from './Loading'
import Sidebar from './Sidebar'

export default function Players () {
  const location = useLocation()
  const { path } = useRouteMatch()

  const teamId = location.search
    ? parse(location.search).teamId
    : null

  const { response: players, loading } = usePlayers(teamId)

  if (loading) {
    return <Loading />
  }

  console.log('location', location.key)

  return (
    <div className='container two-column'>
      <Sidebar
        title='Players'
        list={players.map(p => p.name)}  
      />
        
        <TransitionGroup component={null}>
          <CSSTransition
            timeout={500}
            classNames='fade'
            key={location.key}
          >
            <Switch location={location}>
              <Route path={`${path}/:playerName`}>
                <Player players={players}/>
              </Route>
              <Route path="*">
                <div className='sidebar-instruction'>
                  Select a Player
                </div>
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
  )
}

const Player = ({ players }) => {
  const { playerName } = useParams()

  const player = players
  .find(({ name }) => slug(name) === playerName)

  const { 
    avatar, 
    name, 
    number,
    teamId,
    position,
    ppg,
    apg,
    spg,
    rpg 
  } = player


  return (
    <div className='panel fade-enter-done'>
      <img className='avatar' src={avatar} alt={`Avatar of ${name}`}/>
      <h1 className='medium-header'>{name}</h1>
      <h3 className='header'>#{number}</h3>
      <div className='row'>
        <ul className='info-list' style={{ marginRight: '80px' }}>
          <li>
            Team
            <div>
              <Link to={`/${teamId}`}>
                {toCapitalize(teamId)}
              </Link>
            </div>
          </li>
          <li>Position<div>{position}</div></li>
          <li>PPG<div>{ppg}</div></li>
        </ul>
        <ul className='info-list'>
          <li>APG<div>{apg}</div></li>
          <li>SPG<div>{spg}</div></li>
          <li>RPG<div>{rpg}</div></li>
        </ul>
      </div>
    </div>
  )
}

