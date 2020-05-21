import moment from 'moment'

export const IMAGE_URL = (attachment_uuid, extension) =>
  `https://snworksceo.imgix.net/dpn/${attachment_uuid}.sized-1000x1000.${extension}?w=1000`

export const STREET_IMAGE_URL = (attachment_uuid, extension) =>
`https://snworksceo.imgix.net/dpn-34s/${attachment_uuid}.sized-1000x1000.${extension}?w=1000`

export const extractOpinionHeadline = headline => {
  if (headline.includes("|")) {
    const contentLs = headline.split("|")
    const tag = contentLs[0].replace("by", "|")
    const title = contentLs[1]
    return { tag, title }
  }

  return {}
}

export const parseAuthors = authorsArray => {
  let authorString = ''
  authorsArray.map(author => authorString += `${author.name} `)
  return authorString
}

export const parseMultimediaString = s => {
  const idx = s.indexOf('|')
  return s.substring(idx + 1)
}

export const formatTimestamp = timestamp => {
  const timeString = timestamp.replace(' on', '').replace('Updated at ', '').replace('.', '')
  return moment(timeString, 'h:m a MMM D').format('MMMM D, YYYY (h:mmA)').toUpperCase()
}

export const getDuration = (timestamp, parseString) => {
  const now = moment().subtract(16, 'hours')
  timestamp = timestamp.replace(' on', '').replace('Updated at ', '').replace('.', '')
  return moment(timestamp, parseString).fromNow()
}