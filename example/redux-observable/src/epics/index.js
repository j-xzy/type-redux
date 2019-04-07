import fetchNewest from './fetchNewest'
import { combineEpics } from 'redux-observable'

export default combineEpics(
  fetchNewest
)
