import React , { useState } from 'react'
import { isEmpty, chain } from 'lodash'

import EmptySitemark from './EmptySitemark'
import MarksToolbar from './MarksToolbar'
import SiteMarkList from './SiteMarkList'
import { filterMarksByText, exactMatch } from './filterMarks'

const SiteMarks = props => {
  const [ category, setCategory ] = useState('_')
  const [ categoryGroup, setCategoryGroup ] = useState(false)
  const [ openNewTab, setOpenNewTab ] = useState(true)
  const [ filterSearch, setFilterSearch ] = useState('')
  if (isEmpty(props.sites)) {
    return <EmptySitemark />
  }

  let sites = chain(props.sites).filter(filterMarksByText(filterSearch)).sortBy(exactMatch)
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
        openNewTabSelected={openNewTab}
        setOpenNewTab={setOpenNewTab}
        searchValue={filterSearch}
        handleSearchChange={setFilterSearch}
      />
      <SiteMarkList sites={sites.value()} newTab={openNewTab} categories={props.categories}/>
    </div>
  )
}

export default SiteMarks
