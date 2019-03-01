import React , { useState } from 'react'
import { isEmpty } from 'lodash'

import EmptySitemark from './EmptySitemark'
import MarksToolbar from './MarksToolbar'
import SiteMarkList from './SiteMarkList'

const SiteMarks = props => {
  const [ category, setCategory ] = useState('_')
  const [ categoryGroup, setCategoryGroup ] = useState(false)
  if (isEmpty(props.sites)) {
    return <EmptySitemark />
  }

  return (
    <div>
      <MarksToolbar
        categories={props.categories}
        value={category}
        setCategory={setCategory}
        groupSelected={categoryGroup}
        setGroupCategory={setCategoryGroup}
      />
      <SiteMarkList sites={props.sites}/>
    </div>
  )
}

export default SiteMarks
