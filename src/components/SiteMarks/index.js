import React , { useState } from 'react'
import { isEmpty, chain } from 'lodash'

import EmptySitemark from './EmptySitemark'
import MarksToolbar from './MarksToolbar'
import SiteMarkList from './SiteMarkList'

const SiteMarks = props => {
  const [ category, setCategory ] = useState('_')
  const [ categoryGroup, setCategoryGroup ] = useState(false)
  if (isEmpty(props.sites)) {
    return <EmptySitemark />
  }

  let sites = chain(props.sites)
  if (categoryGroup){
    sites = sites.groupBy('category')
  }
  if (category !== '_') {
    if (categoryGroup) sites = sites.get(category)
    else sites = sites.filter({category})
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
      <SiteMarkList sites={sites.value()} categories={props.categories}/>
    </div>
  )
}

export default SiteMarks
