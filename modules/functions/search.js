import config from '../../secret/config'
import { fs, https } from '../variables/variables'

// функция поиска изображений через api поисковика Bing
// все как в тамошней документации кроме пары вещей где комментарии

export default function search(requestMes) {
    let subscriptionKey = config.azureKey;
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
        // в этом месте парсю тело запроса и вытаскиваю массив со свойствами (одно из них мне нужно чтобы скинуть картинку в чат)
        let jsonAnswer = JSON.parse(body);
        let valueArray = jsonAnswer.value;
        // вытаскиваю ссылку на картинку в буфер
        valueArray.forEach(function (item, i, valueArray) {
          fs.appendFileSync("./list/search.txt", item.contentUrl + ' ', function (error) {
            if (error) throw error; // если возникла ошибка)
          });
        });
      });
      response.on('error', function (e) {
        console.log('Error: ' + e.message);
      });
    };
  
    let bing_image_search = function (search) {
      console.log('Searching images for: ' + term);
      let request_params = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(search),
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
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