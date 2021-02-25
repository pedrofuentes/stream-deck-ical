# Stream Deck iCal Plugin

![Plugin Example](https://github.com/pedrofuentes/stream-deck-ical/blob/main/assets/plugin.gif)

iCal Plugin for [elgato Stream Deck](https://www.elgato.com/en/gaming/stream-deck) that displays information from your calendar using an iCal URL. Visual cues and a countdown will help you end meetings on time and be ready for the next one.

This plugin is available on the Stream Deck store, you can also download [the last release](https://github.com/pedrofuentes/stream-deck-ical/releases) or build it yourself using the code on this repo.

## Features ##
* Checks for updates every 10 minutes
* When a new URL is saved a new update is triggered
* "Force &#128472;" can be used if you want to force an update
* Stores events up to 18 hours in the future

### Time Left ###
* Shows time left until the meeting ends
* Changes icon color to orange when 5 minutes are left on the meeting
* Changes icon color to red when 30 seconds are left on the meeting and goes up to 5 minutes after the meeting
* When the meeting ends the counter will keep going and stay red for 5 minutes, if the user pushes the button it will show the next meeting if one is available
* Supports multiple concurrent meetings, to switch between meeting just push the button

### Next Meeting ###
* Shows time left until next meeting starts
* If the button is pushed it will show the title of the next meeting
  * If the button is pushed while the text is showing it will go back to show the time left until the next meeting
  * At the end of the title animation, the button will go back to show the time left until the next meeting
* Changes icon color to orange when there are 5 minutes left for the next meeting to start
* Changes icon color to red when there are 30 seconds left for the next meeting to start
