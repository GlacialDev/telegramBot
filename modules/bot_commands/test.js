import variables from '../variables/variables'
import authCheck from '../functions/authCheck'

let bot = variables.bot

export default function test() {
    bot.onText(/\/test/, (msg, match) => {
        if (authCheck(msg) != true) return


        bot.sendMediaGroup(variables.creator, [
            {
              type: "photo",
              media:
                "https://memepedia.ru/wp-content/uploads/2017/04/450px-Sad_fox.jpg"
            },
            {
              type: "photo",
              media:
                "https://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg"
            },
            {
              type: "photo",
              media:
                "https://img3.goodfon.ru/wallpaper/big/b/cf/kartinka-3d-raznocvetnyy-grib.jpg"
            }
          ]);
    });
} 