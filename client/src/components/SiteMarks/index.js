import React , { useState } from 'react'
import { PropTypes } from 'prop-types'
import { isEmpty, chain, find } from 'lodash'

import EmptySitemark from './EmptySitemark'
import MarksToolbar from './MarksToolbar'
import SiteMarkList from './SiteMarkList'
import DeleteSiteMark from './DeleteSiteMark'
import AddSitemarkDialog from '../AddSiteMark/AddSiteMarkDialog'
import { filterMarksByText, exactMatch } from './filterMarks'
import { deleteSite, updateSite } from '../../services/api/sites'

const SiteMarks = props => {
  const [ category, setCategory ] = useState('_')
  const [ categoryGroup, setCategoryGroup ] = useState(false)
  const [ openNewTab, setOpenNewTab ] = useState(true)
  const [ filterSearch, setFilterSearch ] = useState('')
  const [ isEditMode, setEditmode ] = useState(false)
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)
  const [ selectedMark, setSelectedMark ] = useState(null)
  const [ selectedEditMark, setSelectedEditMark ] = useState(false)
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

  const showEditModal = id => () => {
    const site = find(props.sites, { id })
    setSelectedEditMark(site)
  }
  const closeEditModal = () => setSelectedEditMark(false)
  const updateSiteMark = async values => {
    try {
      await updateSite(values)
    } catch(err) {
      props.showError({
        open: true,
        message: `Could not Update the site ${values.name}.`
      })
    }
    closeEditModal()
  }
  const isEditModalOpen = () => selectedEditMark !== false

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
        logOut={props.logOut}
      />
      <SiteMarkList
        sites={sites.value()}
        newTab={openNewTab}
        categories={props.categories}
        isEditMode={isEditMode}
        showDeleteModal={showDeleteModal}
        showEditModal={showEditModal}
      />
      <DeleteSiteMark markId={selectedMark} open={isDeleteModalOpen} close={closeDeleteModal} confirmDelete={deleteMark}/>
      { selectedEditMark &&
        <AddSitemarkDialog close={closeEditModal} submitSite={updateSiteMark} open={isEditModalOpen()} categories={props.categories} formValues={selectedEditMark || undefined} />
      }
    </div>
  )
}

SiteMarks.propTypes = {
  categories: PropTypes.array,
  sites: PropTypes.array,
  showError: PropTypes.func,
  logOut: PropTypes.func,
}

export default SiteMarks
