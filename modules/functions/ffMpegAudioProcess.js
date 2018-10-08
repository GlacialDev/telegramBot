import variables from '../variables/variables'

let ffmpeg = variables.ffmpeg

export default function ffMpegAudioProcess(inputFileName, outputFileName) {
  return Promise((resolve, reject) => {  
    let command = ffmpeg()
      .input(`./data/download/voice/${inputFileName}`)
      .saveToFile(`./data/download/voice/${outputFileName}`)

    resolve()
  })
}