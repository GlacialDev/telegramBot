// то же самое, что в таймере, но вручную по команде /give_ero
bot.onText(/\/give_ero/, (msg) => {
    let array = null;
    let item = null;
    let string = null;
  
    // открываем файл-буфер со ссылками
    fs.readFile("./list/images.txt", "utf8", function(error,data){
      if(error) throw error; // если возникла ошибка
      // разбиваем содержимое файла на массив и достаем оттуда одну ссылку
      array = data.split(' ');
      item = array.shift();
      // если ссылки кончились говорим что всё хана заправляйте новыми
      if (item == '') item = 'Картинки кончились :('
      bot.sendMessage(msg.chat.id, item)
      // массив без элемента который мы достали pop()-ом преобразуем в строку
      string = array.join(' ')
      // и грузим обратно в файл-буффер
      fs.writeFile("./list/images.txt", string, function(error){
        if(error) throw error; // если возникла ошибка)
      });
    });
  
    if (writeWhoAskFlag) writeWhoAsk(msg);
});

// на сервере есть файл note.txt куда по этой команде бот записывает текст
bot.onText(/\/write (.+)/, (msg, match) => {
  let text = match[1];
  fs.writeFile("note.txt", text, function(error){
    if(error) throw error; // если возникла ошибка
    let data = fs.readFileSync("note.txt", "utf8");
    bot.sendMessage(msg.chat.id, "Записано: "+data)
  });
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// а по этой читает текст в note.txt
bot.onText(/\/read/, (msg) => {
  fs.readFile("note.txt", "utf8", function(error,data){
    if(error) throw error; // если возникла ошибка
    bot.sendMessage(msg.chat.id,"Содержимое файла: "+data)
  });
  if (writeWhoAskFlag) writeWhoAsk(msg);
});

// а по этой скидывает документом note.txt в конфу
bot.onText(/\/note/, (msg) => {
  const note = './note.txt';
  bot.sendDocument(msg.chat.id, note);
  if (writeWhoAskFlag) writeWhoAsk(msg);
});




function search(requestMes) {
  // Replace the subscriptionKey string value with your valid subscription key.
  let subscriptionKey = azureKey();

  // Verify the endpoint URI.  At this writing, only one endpoint is used for Bing
  // search APIs.  In the future, regional endpoints may be available.  If you
  // encounter unexpected authorization errors, double-check this host against
  // the endpoint for your Bing Search instance in your Azure dashboard.
  let host = 'api.cognitive.microsoft.com';
  let path = '/bing/v7.0/images/search';

  let term = requestMes;

  let response_handler = function (response) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        console.log('\nRelevant Headers:\n');
        for (var header in response.headers)
            // header keys are lower-cased by Node.js
            if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                console.log(header + ": " + response.headers[header]);
        let jsonAnswer = JSON.parse(body);
        console.log(jsonAnswer.value)
        // body = JSON.stringify(JSON.parse(body), null, '  ');
        // console.log('\nJSON Response:\n');
        // console.log(body);
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
  };

  let bing_image_search = function (search) {
    console.log('Searching images for: ' + term);
    let request_params = {
          method : 'GET',
          hostname : host,
          path : path + '?q=' + encodeURIComponent(search),
          headers : {
              'Ocp-Apim-Subscription-Key' : subscriptionKey,
          }
      };

      let req = https.request(request_params, response_handler);
      req.end();
  }

  if (subscriptionKey.length === 32) {
      bing_image_search(term);
  } else {
      console.log('Invalid Bing Search API subscription key!');
      console.log('Please paste yours into the source code.');
  }
}