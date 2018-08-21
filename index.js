import echo from './modules/bot_commands/echo'
echo()
import id from './modules/bot_commands/id'
id()
import remind_me from './modules/bot_commands/remind_me'
remind_me()
import roll from './modules/bot_commands/roll'
roll()
import talk_with_bot from './modules/bot_commands/talk_with_bot'
talk_with_bot()
import set_ero_timer from './modules/bot_commands/set_ero_timer'
set_ero_timer()
import stop_ero_timer from './modules/bot_commands/stop_ero_timer'
stop_ero_timer()
import how_much_ero from './modules/bot_commands/how_much_ero'
how_much_ero()
import give_ero from './modules/bot_commands/give_ero'
give_ero()
import bot_settings from './modules/bot_commands/settings'
bot_settings()

import variables from './modules/variables/variables'
bot = variables.bot
bot.sendMessage(variables.creator)
import eroTimerObj from './modules/objects/eroTimer'
eroTimerObj.eroTimerInit()