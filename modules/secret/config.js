let config = {
  "token" : "YOUR_TELEGRAM_BOT_TOKEN",
  // write keys/tokens as string instead of null if you want to activate responsible part of code 
  "dialogFlowClientAccessToken" : null,
  "cloudConvertApiKey" : null,
  "yandexSpeechKitKey" : null,
  "authorizedUsers" : [
      // here should be id's of persons which you want to allow use this bot;
      // if you want to find out the id of a person to add him, ask this person to write a command /id to bot
      111111111,
      111111111,
      111111111,
      222222222
  ],
  "adminUsers" : [
      // set your id here to get administrator rights
      // IMPORTANT - admin should be added in "authorizedUsers" list too
      222222222
  ],
      // here is id of channel to send pictures here
  "canadianEroId": -1000000000000
}

export default config;
