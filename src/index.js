const mime = require('mime')

const selectVideos = document.createElement('select');
selectVideos.innerHTML = `<option>Select a video!</option>`

async function main () {
  const searchParams = new URLSearchParams(window.location.search)
  const link = searchParams.get('link')
  const archive = new DatArchive(link)

  const list = await archive.readdir('/')

  const videos = list.filter((e) => mime.lookup(e).startsWith('video'))

  if (videos.length === 0) {
    document.getElementById('title').innerHTML = 'No video'
    return
  }

  videos.forEach((e) => {
    const option = document.createElement('option')
    option.value = e
    option.innerText = e
    selectVideos.appendChild(option)
  })

  selectVideos.onchange = async function(e) {
    const target = selectVideos.options[selectVideos.selectedIndex]

    if (!target.value) { return }

    const video = target.value

    const videoElement = document.createElement('video')
    videoElement.setAttribute('controls', true)
    videoElement.setAttribute('src', `dat://${link.replace('dat://', '')}${encodeURIComponent(video)}`)

    document.getElementById('title').innerHTML = video

    document.getElementById('container').appendChild(videoElement)
  }

  document.body.appendChild(selectVideos)
}

main()
