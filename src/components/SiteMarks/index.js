import React , { useState } from 'react'
import { isEmpty, chain } from 'lodash'

import EmptySitemark from './EmptySitemark'
import MarksToolbar from './MarksToolbar'
import SiteMarkList from './SiteMarkList'
import DeleteSiteMark from './DeleteSiteMark'
import { filterMarksByText, exactMatch } from './filterMarks'
import { deleteSite } from '../../services/api/sites'

const SiteMarks = props => {
  const [ category, setCategory ] = useState('_')
  const [ categoryGroup, setCategoryGroup ] = useState(false)
  const [ openNewTab, setOpenNewTab ] = useState(true)
  const [ filterSearch, setFilterSearch ] = useState('')
  const [ isEditMode, setEditmode ] = useState(false)
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)
  const [ selectedMark, setSelectedMark ] = useState(null)
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
  const toggleEditMode = () => setEditmode(!isEditMode)
  const showDeleteModal = markId => () => {
    setSelectedMark(markId)
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false)
  const deleteMark = markId => async () => {
    try {
      await deleteSite(markId)
    } catch (e) {
      props.showError({
        open: true,
        message: 'There was an error deleting the site'
      })
    }
    closeDeleteModal();
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
        toggleEditMode={toggleEditMode}
      />
      <SiteMarkList
        sites={sites.value()}
        newTab={openNewTab}
        categories={props.categories}
        isEditMode={isEditMode}
        showDeleteModal={showDeleteModal}
      />
      <DeleteSiteMark markId={selectedMark} open={isDeleteModalOpen} close={closeDeleteModal} confirmDelete={deleteMark}/>
    </div>
  )
}

export default SiteMarks
