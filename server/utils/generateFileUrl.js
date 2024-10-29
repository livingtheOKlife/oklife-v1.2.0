const generateFileUrl = (filename) => {
  return process.env.BASE_URL + `/uploads/${filename}`
}

export default generateFileUrl
