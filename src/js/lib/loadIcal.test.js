/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { updateEventsCache, setHoursSpread } from './loadIcal.js'

import icalFile from '../../../__mocks__/mock.js'

import ICAL from 'ical.js'


//import fetch from 'node-fetch'

beforeEach(() => {
  jest.useFakeTimers('modern')
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})






describe('Loads iCal and Stores it in Cache', () => {
  it('Fetches an iCal and Parses it', async (d) => {
    jest.setSystemTime(new Date('2021-01-22T10:05:00.000-08:00'))
    var url = "https://outlook.office365.com/owa/calendar/356451449e8740c3ad7180fab8674930@mscrmsolutions.com/8fef9fcd7fd645c48d9663eda5607d2e4251526848318334437/calendar.ics"
    
    const https = require('https')
//const url = "https://jsonmock.hackerrank.com/api/movies";
https.get(url, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    //data = JSON.parse(data);
    //console.log(data);
    //ICAL.parse(data);
    var jcalData = ICAL.parse(data);
    const vcalendar = new ICAL.Component(jcalData);
    const icalEvents = vcalendar.getAllSubcomponents('vevent');
    console.log(icalEvents.length)
    expect(1==1)
    d();
    
  })
}).on('error', err => {
  console.log(err.message);
})
    
   //setHoursSpread(2)
  
  })
  
  it('Updates Events Cache with 4 events in a 2 hour spread', async () => {
    jest.setSystemTime(new Date('2021-01-22T10:05:00.000-08:00'))

    setHoursSpread(2)
    expect(await updateEventsCache(icalFile)).toEqual([
      {
        uid: '040000002739A30012D2G1938J12E0080000000070AF5CBF28EBD601000000000000000010000000009D8CF03B326B46ADE2A3D7C7F38E52',
        summary: '180 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        start: new Date('2021-01-22T17:10:00.000Z'),
        end: new Date('2021-01-22T19:00:00.000Z')
      },
      {
        uid: '040000002739A30012D2G1938J12E00800000000501B90E024EFD6010000000000000000100000001C4CAA0A5917274ABEECEE657275FF87',
        summary: '182 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        start: new Date('2021-01-22T18:00:00.000Z'),
        end: new Date('2021-01-22T18:30:00.000Z')
      },
      {
        uid: '040000002739A30012D2G1938J12E00800000000B0C43114AEF0D601000000000000000010000000216D53E4AA9F404BA41BE7AE53B67DB8',
        summary: '183 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        start: new Date('2021-01-22T19:00:00.000Z'),
        end: new Date('2021-01-22T19:10:00.000Z')
      },
      {
        uid: '040000002739A30012D2G1938J12E00800000000309C08D065EAD60100000000000000001000000084C4E067C5F32B498EC8E177897A0A59',
        summary: '184 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        start: new Date('2021-01-22T19:05:00.000Z'),
        end: new Date('2021-01-22T19:30:00.000Z')
      }
    ])
  })


  it('Updates Events Cache with 1 events in a 1 hour spread', async () => {
    jest.setSystemTime(new Date('2021-01-22T10:00:00.000-08:00'))

    setHoursSpread(1)
    expect(await updateEventsCache(icalFile)).toEqual([
      {
        uid: '040000002739A30012D2G1938J12E00800000000501B90E024EFD6010000000000000000100000001C4CAA0A5917274ABEECEE657275FF87',
        summary: '182 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        start: new Date('2021-01-22T18:00:00.000Z'),
        end: new Date('2021-01-22T18:30:00.000Z')
      }
    ])
  })

  it('Updates Events Cache with 0 events in a 1 hour spread', async () => {
    jest.setSystemTime(new Date('2021-01-22T05:00:00.000-08:00'))

    setHoursSpread(1)
    expect(await updateEventsCache(icalFile)).toEqual([])
  })
})
