import React from 'react'

import SiteMarkList from '../SiteMarks/SiteMarkList'
import { DemoSitemarks } from './styled'


const sites = [{
  id: 1,
  url: 'https://www.youtube.com',
  name: 'Youtube',
  stars: 2,
}, {
  id: 2,
  url: 'https://jaconsta.com/',
  name: 'Jaconsta projects',
  stars: 4,
}, {
  id: 3,
  url: 'https://reddit.com/',
  name: 'Reddit',
  stars: 3,
}]

const LoadDemoSitemarks = () => (
  <DemoSitemarks>
    <SiteMarkList
      sites={sites}
      newTab={true}
      categories={[]}
      isEditMode={false}
      showDeleteModal={() => () => {}}
      showEditModal={() => () => {}}
    />
  </DemoSitemarks>
)

export default LoadDemoSitemarks
