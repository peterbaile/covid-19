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