import variables from '../variables/variables'

let ffmpeg = variables.ffmpeg

export default function ffMpegAudioProcess(inputFileName, outputFileName) {
  return new Promise((resolve, reject) => {
    let command = ffmpeg()
      .input(`./data/download/voice/${inputFileName}`)
      .saveToFile(`./data/download/voice/${outputFileName}`)
      .on('end', () => {
        console.log(inputFileName+' processed to '+outputFileName)
        resolve()
      })
  })
}