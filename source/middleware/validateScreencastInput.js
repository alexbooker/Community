// @flow

import youtubeUrl from 'youtube-url'
import statusCodes from '../util/statusCodes';

export default function(req: any, res: any, next: any) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(statusCodes.reqBodyMiss)
    return
  }
  if (!youtubeUrl.valid(req.body.url)) {
    res.status(400).send(statusCodes.urlInv)
    return
  }
  if (!req.body.tags) {
    res.status(400).send(statusCodes.tagsMiss)
    return
  }
  next()
}
