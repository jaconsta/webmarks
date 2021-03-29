import _ from 'lodash'

export const filterMarksByText = filterText => mark => {
  if (_.isEmpty(filterText)) return mark

  return _.chain(mark)
    .pick(['name', 'url'])
    .values()
    .map(_.lowerCase)
    .map(markAttribute => _.includes(markAttribute, filterText))
    .some()
    .value()
  }

export const exactMatch = filterText => mark => {
  return _.chain(mark)
    .pick(['name', 'url'])
    .values()
    .map(_.lowerCase)
    .map(markAttribute => _.isEqual(markAttribute, filterText))
    .some()
    .value()
}
