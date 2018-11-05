import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import venue from './venue'
import organizer from './organizer'
import event from './event'
import menuItem from './menuItem'
import article from './article'
import partner from './partner'
import frontPage from "./frontPage"

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
      blockContent,
      venue,
      organizer,
      event,
      menuItem,
      article,
      partner,
      frontPage
  ])
})
