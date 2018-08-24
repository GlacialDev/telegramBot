import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot

// var questions = [
//     {
//       title:'Чему равно 0 || "" || 2 || true ?',
//       buttons: [
//           [{ text: '0', callback_data: '2_1' }],
//           [{ text: '""', callback_data: '2_2' }],
//           [{ text: '2', callback_data: '2_3' }],
//           [{ text: 'true', callback_data: '2_4' }]
//         ],
//       right_answer: 3
//     },
//   ];

//   function getRandomQuestion(){
//     return questions[Math.floor(Math.random()*questions.length)];
//   }

//   function newQuestion(msg){
//     var arr = getRandomQuestion();
//     var text = arr.title;
//     var options = {
//       reply_markup: JSON.stringify({
//         inline_keyboard: arr.buttons,
//         parse_mode: 'Markdown'
//       })
//     };
//     chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
//     bot.sendMessage(chat, text, options);
//   }

//   bot.onText(/\/start_test/, function (msg, match) {
//     newQuestion(msg);
//   });

//   bot.on('callback_query', function (msg) {
//     var answer = msg.data.split('_');
//     var index = answer[0];
//     var button = answer[1];

//     if (questions[index].right_answer==button) {
//       bot.sendMessage(msg.from.id, 'Ответ верный ✅');
//     } else {
//       bot.sendMessage(msg.from.id, 'Ответ неверный ❌');
//     }

//     bot.answerCallbackQuery(msg.id, 'Вы выбрали: '+ msg.data, true);
//     newQuestion(msg);
//   });

export default function make_poll() {
    bot.onText(/\/make_poll (.+) answers (.+)/, (msg, match) => {
        if (authCheck(msg) != true) return

        let chat = msg.chat.id
        let pollMsgId = msg.id+1
        let question = match[1]
        let answers = match[2].split('/')
        let poll = {
            title: question,
            buttons: [],
            votes: []
        }
        for (let i = 0; i < answers.length; i++) {
            poll.votes[i] = 0
            let objectBlanc = {
                text : `${answers[i]} - ${poll.votes[i]}`,
                callback_data : i
            }
            poll.buttons[i] = [objectBlanc]
        }
        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: poll.buttons,
                parse_mode: 'Markdown'
            })
        };

        bot.sendMessage(chat, poll.title, options)

        bot.on('callback_query', function (msg) {
            let i = msg.data
            
            console.log(poll.votes[i]+' do')
            poll.votes[i] = poll.votes[i]+1
            console.log(poll.votes[i]+' posle')

            console.log(poll)

            for (let i = 0; i < answers.length; i++) {
                let objectBlanc = {
                    text : `${answers[i]} - ${poll.votes[i]}`,
                    callback_data : i
                }
                poll.buttons[i] = [objectBlanc]
            }
            let options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: poll.buttons,
                    parse_mode: 'Markdown'
                })
            };

            bot.editMessageReplyMarkup(pollMsgId, options.reply_markup)
          });
    })
}