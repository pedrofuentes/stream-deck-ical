/* eslint no-useless-escape: "off" */

const icalFile = `
BEGIN:VCALENDAR
METHOD:PUBLISH
PRODID:Microsoft Exchange Server 2010
VERSION:2.0
X-WR-CALNAME:Calendar
BEGIN:VTIMEZONE
TZID:Greenwich Standard Time
BEGIN:STANDARD
DTSTART:16010101T000000
TZOFFSETFROM:+0000
TZOFFSETTO:+0000
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010101T000000
TZOFFSETFROM:+0000
TZOFFSETTO:+0000
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VTIMEZONE
TZID:Pacific Standard Time
BEGIN:STANDARD
DTSTART:16010101T020000
TZOFFSETFROM:-0700
TZOFFSETTO:-0800
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=1SU;BYMONTH=11
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010101T020000
TZOFFSETFROM:-0800
TZOFFSETTO:-0700
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=2SU;BYMONTH=3
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VTIMEZONE
TZID:Central Standard Time
BEGIN:STANDARD
DTSTART:16010101T020000
TZOFFSETFROM:-0500
TZOFFSETTO:-0600
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=1SU;BYMONTH=11
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010101T020000
TZOFFSETFROM:-0600
TZOFFSETTO:-0500
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=2SU;BYMONTH=3
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VTIMEZONE
TZID:Eastern Standard Time
BEGIN:STANDARD
DTSTART:16010101T020000
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=1SU;BYMONTH=11
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010101T020000
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=2SU;BYMONTH=3
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
DESCRIPTION:0 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000AA9000EC49C7D601000000000000000
 010000000293B7AC71E0B074AA04DFBDC68854B03
SUMMARY:0 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Greenwich Standard Time:20201130T180000
DTEND;TZID=Greenwich Standard Time:20210103T180000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:OOF
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:1 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002030E68E36C7D601000000000000000
 010000000A91773FB3FD64742A925B111EB228106
SUMMARY:1 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20201211
DTEND;VALUE=DATE:20210101
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:2 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002034686356CAD601000000000000000
 01000000066F35CD86C7F8F4981B70EACDB6E186A
SUMMARY:2 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20201221
DTEND;VALUE=DATE:20210104
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:3 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080D8C4978BBED601000000000000000
 010000000BD1F66BAD693524E97AEC1856595BF9F
SUMMARY:3 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20201223
DTEND;VALUE=DATE:20210102
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000E01AF4A9EFC1D601000000000000000
 010000000D07EA3D63676C54BBF2A703B7A5B43FD
SUMMARY:4 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20201224
DTEND;VALUE=DATE:20201225
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:4 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=MONTHLY;UNTIL=20210624T231000Z;INTERVAL=1;BYDAY=4TH
EXDATE;TZID=Pacific Standard Time:20210128T161000
UID:040000002739A30012D2G1938J12E00800000000D043A1ACF534D601000000000000000
 010000000A925C94A5DE7BD469C1875AFC91C756A
SUMMARY:5 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20201224T161000
DTEND;TZID=Pacific Standard Time:20201224T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:23
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:23
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000A09CEEA9EFC1D601000000000000000
 010000000CA3E61D94406304C92F2A4828C2A4259
SUMMARY:6 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20201225
DTEND;VALUE=DATE:20201226
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:5 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000006DAAAB81ABC5D501000000000000000
 010000000D746C74E8872C247BD6ABD39B205DD6B
RECURRENCE-ID;TZID=Pacific Standard Time:20201228T081000
SUMMARY:7 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20201228T081000
DTEND;TZID=Pacific Standard Time:20201228T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:31
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:31
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:6 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T151000Z;INTERVAL=1;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E008000000006DAAAB81ABC5D501000000000000000
 010000000D746C74E8872C247BD6ABD39B205DD6B
SUMMARY:8 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20201228T081000
DTEND;TZID=Pacific Standard Time:20201228T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:31
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:31
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000080A348AAEFC1D601000000000000000
 01000000043CEEF9864E80C42B855813D648E5E5A
SUMMARY:9 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20201231
DTEND;VALUE=DATE:20210101
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000B03644AAEFC1D601000000000000000
 010000000E0AB100B4183254FAF29BFB0E47CAFF5
SUMMARY:10 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210101
DTEND;VALUE=DATE:20210102
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:7 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210722T150000Z;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;WK
 ST=SU
EXDATE;TZID=Pacific Standard Time:20210108T080000,20210115T080000,20210118T
 080000,20210125T080000,20210128T080000,20210215T080000,20210324T080000,202
 10325T080000
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
SUMMARY:11 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T080000
DTEND;TZID=Pacific Standard Time:20210104T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:8 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000006DAAAB81ABC5D501000000000000000
 010000000D746C74E8872C247BD6ABD39B205DD6B
RECURRENCE-ID;TZID=Pacific Standard Time:20210104T081000
SUMMARY:12 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T081000
DTEND;TZID=Pacific Standard Time:20210104T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:31
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:31
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:9 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000060CCE000A9DED601000000000000000
 01000000011B83C0C1E2E884CBC3BEF975B9BF154
SUMMARY:13 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T093500
DTEND;TZID=Pacific Standard Time:20210104T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:10 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000509F2549A9DED601000000000000000
 0100000006E62F103690F81468F9DF9A2037EAF3C
SUMMARY:14 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T100000
DTEND;TZID=Pacific Standard Time:20210104T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:11 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T173500Z;INTERVAL=1;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000C012193331D2D601000000000000000
 010000000CEB6C3C6F7E30340B7260EA27B79AA49
SUMMARY:15 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T103500
DTEND;TZID=Pacific Standard Time:20210104T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:12 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070A66352A9DED601000000000000000
 01000000038219AD58D948D4E878DA5B3F5570B25
SUMMARY:16 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T110000
DTEND;TZID=Pacific Standard Time:20210104T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:13 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0550F8281E2D601000000000000000
 010000000E6D58B79B489B74F84B66377F4D58216
SUMMARY:17 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T113500
DTEND;TZID=Pacific Standard Time:20210104T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:14 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210722T190000Z;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;WK
 ST=SU
EXDATE;TZID=Pacific Standard Time:20210108T120000,20210118T120000,20210126T
 120000,20210128T120000,20210215T120000
UID:040000002739A30012D2G1938J12E0080000000010085B33D1D2D601000000000000000
 01000000083BA9B03CA8D1D4FBA5BF9894889545F
SUMMARY:18 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T120000
DTEND;TZID=Pacific Standard Time:20210104T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:15 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000000017A64241C3D601000000000000000
 010000000ECF3BFF81743524C9412D6C5886FBCDB
SUMMARY:19 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T141000
DTEND;TZID=Pacific Standard Time:20210104T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:16 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070559B6880E2D601000000000000000
 01000000008876ADA80B5AC4E8359D52B5964E408
SUMMARY:20 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T160000
DTEND;TZID=Pacific Standard Time:20210104T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:17 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002001968580E2D601000000000000000
 010000000944B281DAD0A834A9FB5ABB67EE6015E
SUMMARY:21 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210104T163500
DTEND;TZID=Pacific Standard Time:20210104T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:18 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000000055747187E2D601000000000000000
 010000000C16D86F26F302D40B8E51720A512DCCE
SUMMARY:22 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T090500
DTEND;TZID=Pacific Standard Time:20210105T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:19 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D03121F194E2D601000000000000000
 010000000D288CDA442A5724093338139A18AD2DF
SUMMARY:23 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T093500
DTEND;TZID=Pacific Standard Time:20210105T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:20 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002040D60595E2D601000000000000000
 010000000DAB1AECB4F634049A581724F82A844FA
SUMMARY:24 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T100000
DTEND;TZID=Pacific Standard Time:20210105T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:21 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E01BD9210ED2D601000000000000000
 0100000008B44F8CC992045469FA47D75D3DB0B13
SUMMARY:25 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T104000
DTEND;TZID=Pacific Standard Time:20210105T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:22 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010085B33D1D2D601000000000000000
 01000000083BA9B03CA8D1D4FBA5BF9894889545F
RECURRENCE-ID;TZID=Pacific Standard Time:20210105T120000
SUMMARY:26 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T123000
DTEND;TZID=Pacific Standard Time:20210105T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:23 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040D322C5D1D2D601000000000000000
 010000000E8FEE8309A1B30468C1BF91D1A7CFBD5
SUMMARY:27 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T130500
DTEND;TZID=Pacific Standard Time:20210105T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:24 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000090A9B5FCD1D2D601000000000000000
 010000000BC4632AED726274BB3084D9905AC5DC2
SUMMARY:28 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T133000
DTEND;TZID=Pacific Standard Time:20210105T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:25 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F01DF6C1B74FD601000000000000000
 010000000DB6982D34B0E8F43926EAAFEF9B811B9
RECURRENCE-ID;TZID=Pacific Standard Time:20210105T143000
SUMMARY:29 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T143000
DTEND;TZID=Pacific Standard Time:20210105T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:128
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:128
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:26 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210622T213000Z;INTERVAL=2;BYDAY=TU;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000F01DF6C1B74FD601000000000000000
 010000000DB6982D34B0E8F43926EAAFEF9B811B9
SUMMARY:30 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T143000
DTEND;TZID=Pacific Standard Time:20210105T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:127
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:127
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:27 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E0CC7030E0CBD601000000000000000
 01000000056802741D96A334B8EEC951016CB991F
SUMMARY:31 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T143500
DTEND;TZID=Pacific Standard Time:20210105T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:28 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000309F4A878295D601000000000000000
 010000000F675BCC7D2252A49A52E9E66D5B20847
RECURRENCE-ID;TZID=Pacific Standard Time:20210105T151000
SUMMARY:32 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T150500
DTEND;TZID=Pacific Standard Time:20210105T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:37
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:37
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:29 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210330T221000Z;INTERVAL=1;BYDAY=TU;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210112T151000,20210119T151000,20210126T
 151000
UID:040000002739A30012D2G1938J12E00800000000309F4A878295D601000000000000000
 010000000F675BCC7D2252A49A52E9E66D5B20847
SUMMARY:33 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T151000
DTEND;TZID=Pacific Standard Time:20210105T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:32
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:32
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:30 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D083341371D4D601000000000000000
 010000000B69DEA2ECF459B4BB2B5BDE7972048E3
SUMMARY:34 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T153500
DTEND;TZID=Pacific Standard Time:20210105T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:31 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210720T230500Z;INTERVAL=2;BYDAY=TU;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210119T160500
UID:040000002739A30012D2G1938J12E00800000000409D7FC387DED601000000000000000
 01000000042FE12D794D6AC4292713CAF8A3B7065
SUMMARY:35 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T160500
DTEND;TZID=Pacific Standard Time:20210105T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:32 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210720T233500Z;INTERVAL=2;BYDAY=TU;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000030067E7885DED601000000000000000
 010000000B0054BBCB6882844B975818A700166EB
SUMMARY:36 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210105T163500
DTEND;TZID=Pacific Standard Time:20210105T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:33 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
RECURRENCE-ID;TZID=Pacific Standard Time:20210106T080000
SUMMARY:37 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T080000
DTEND;TZID=Pacific Standard Time:20210106T084000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:34 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050925FDE63DFD601000000000000000
 010000000D73F18F548FD4C43BCFF7C4462EF0206
SUMMARY:38 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T084000
DTEND;TZID=Pacific Standard Time:20210106T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:35 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000601E3420D2D2D601000000000000000
 01000000031F8FCABC54D3E4AA3DDA39978B23AA8
SUMMARY:39 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T093500
DTEND;TZID=Pacific Standard Time:20210106T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:36 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C02A88AF86E2D601000000000000000
 010000000CC45B416EF417C4DA37FBD7D6C3099C0
SUMMARY:40 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T100000
DTEND;TZID=Pacific Standard Time:20210106T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:37 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=MONTHLY;UNTIL=20210707T170000Z;INTERVAL=1;BYDAY=1WE
UID:040000002739A30012D2G1938J12E0080000000000E90960B065D601000000000000000
 010000000F29F38EA89193041A5F5526A3963DE5A
SUMMARY:41 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T100000
DTEND;TZID=Pacific Standard Time:20210106T123000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:55
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:55
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:38 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000107312198CD3D601000000000000000
 0100000009909A410658F544CAE4D998882A0E309
SUMMARY:42 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T103500
DTEND;TZID=Pacific Standard Time:20210106T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:39 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040504E00A2E2D601000000000000000
 0100000005E57EE71A5D2F04592C85402DA3C5A0D
SUMMARY:43 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T110500
DTEND;TZID=Pacific Standard Time:20210106T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:40 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010085B33D1D2D601000000000000000
 01000000083BA9B03CA8D1D4FBA5BF9894889545F
RECURRENCE-ID;TZID=Pacific Standard Time:20210106T120000
SUMMARY:44 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T113000
DTEND;TZID=Pacific Standard Time:20210106T123000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:41 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210721T183500Z;INTERVAL=2;BYDAY=WE;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210203T113500
UID:040000002739A30012D2G1938J12E0080000000070AEDA06D3C7D601000000000000000
 0100000005565CA8D7D2B124F9F36CD8DD8A08259
SUMMARY:45 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T113500
DTEND;TZID=Pacific Standard Time:20210106T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:42 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030936E7588D4D601000000000000000
 010000000626FC60BC05C7942A2FBE2E52F71603F
SUMMARY:46 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T123000
DTEND;TZID=Pacific Standard Time:20210106T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:43 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0BD255A50E3D601000000000000000
 01000000092E23BD4BDC0B249900760ABCC61F08E
SUMMARY:47 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T143000
DTEND;TZID=Pacific Standard Time:20210106T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:44 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000347D991559E4D601000000000000000
 010000000D0C85A8F2A0E7941B10648800226461A
SUMMARY:48 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210106T160000
DTEND;TZID=Pacific Standard Time:20210106T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:45 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
RECURRENCE-ID;TZID=Pacific Standard Time:20210107T080000
SUMMARY:49 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T080000
DTEND;TZID=Pacific Standard Time:20210107T084000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:46 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050F85ECE8EC8D601000000000000000
 010000000F44E84120A2F664ABC23ADCB32F13D7D
SUMMARY:50 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T084000
DTEND;TZID=Pacific Standard Time:20210107T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:47 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000000C6D4FD2D2D601000000000000000
 0100000004AF6BE30D70D1547BC603E465D272206
SUMMARY:51 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T093500
DTEND;TZID=Pacific Standard Time:20210107T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:48 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F03FE69688E2D601000000000000000
 010000000EA42A8D3A85ED043B47A3EA813B27BEA
SUMMARY:52 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T100500
DTEND;TZID=Pacific Standard Time:20210107T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:49 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0629BBD7EE3D601000000000000000
 0100000008BB946C8F037B24E88BF76D012EF796A
SUMMARY:53 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T103000
DTEND;TZID=Pacific Standard Time:20210107T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:50 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040787EDF98C8D601000000000000000
 010000000B56B6BA26472A845AD0C3015D84AE6DE
SUMMARY:54 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T113000
DTEND;TZID=Pacific Standard Time:20210107T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:51 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000906D86EC50E3D601000000000000000
 010000000F795AB50A971F741BC27AB1A9915F627
SUMMARY:55 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T130500
DTEND;TZID=Pacific Standard Time:20210107T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:52 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210624T203500Z;INTERVAL=2;BYDAY=TH;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210121T133500
UID:040000002739A30012D2G1938J12E00800000000D0BD26A23FCDD601000000000000000
 01000000068C8C925BCEEF341901AA4FDDBBE72C4
SUMMARY:56 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T133500
DTEND;TZID=Pacific Standard Time:20210107T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000070E0E97ED2D2D601000000000000000
 010000000DC69B51F77F2474594B95C9B48CC3993
SUMMARY:57 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T140000
DTEND;TZID=Pacific Standard Time:20210107T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:53 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E0BA5672D2D2D601000000000000000
 010000000CF1469EC43BE5D43B4FA66CE892B60B1
SUMMARY:58 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T143500
DTEND;TZID=Pacific Standard Time:20210107T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:54 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0456684AADED601000000000000000
 010000000BCBB2AF91F51CD4CAB838CA4394FCE26
SUMMARY:59 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T150000
DTEND;TZID=Pacific Standard Time:20210107T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:55 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0A988C6AADED601000000000000000
 010000000F863002F12FAC2479DEBE647434AAE0E
SUMMARY:60 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T153500
DTEND;TZID=Pacific Standard Time:20210107T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:56 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080E2370082D3D601000000000000000
 0100000005BFF37AC31EF7F409F8EA7E501B716B2
SUMMARY:61 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210107T161000
DTEND;TZID=Pacific Standard Time:20210107T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:57 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000020A52F9B17E4D601000000000000000
 010000000593F8C7C1D37C34299AE1CD059ACC927
SUMMARY:62 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210108
DTEND;VALUE=DATE:20210109
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:58 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000004028ABB57AD4D601000000000000000
 0100000005EA8474417C85B459E9B545BA559E949
SUMMARY:63 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T081000
DTEND;TZID=Pacific Standard Time:20210108T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:59 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000009000A73E88E2D601000000000000000
 0100000002A99FD4BB8F0C94D84121FCAFF4D3F94
SUMMARY:64 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T090000
DTEND;TZID=Pacific Standard Time:20210108T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:60 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070E59A4389E2D601000000000000000
 0100000001748A868AD042748B63F178B5E00AF96
SUMMARY:65 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T093500
DTEND;TZID=Pacific Standard Time:20210108T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:61 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070A9A71C7FE3D601000000000000000
 010000000E4235B6A317A744E848B4C123A6B1467
SUMMARY:66 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T100500
DTEND;TZID=Pacific Standard Time:20210108T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:62 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0F987EAA6E5D601000000000000000
 01000000028DE888603BFC345A4FE904995F71AE1
SUMMARY:67 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T103000
DTEND;TZID=Pacific Standard Time:20210108T110500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:63 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D04EE3850ED2D601000000000000000
 010000000588ABC0E99D2AA459F5F6BE97C8D3064
SUMMARY:68 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T111000
DTEND;TZID=Pacific Standard Time:20210108T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000080A17ED8BDC8D601000000000000000
 010000000652CACE20CD18542859B9F0F76F24C1A
SUMMARY:69 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T113000
DTEND;TZID=Pacific Standard Time:20210108T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:64 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070AEDA06D3C7D601000000000000000
 0100000005565CA8D7D2B124F9F36CD8DD8A08259
RECURRENCE-ID;TZID=Pacific Standard Time:20210106T113500
SUMMARY:70 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T120500
DTEND;TZID=Pacific Standard Time:20210108T125000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000000E997DEBDC8D601000000000000000
 0100000002A2EE62E438AD54F9D1B9D2CB4B70344
SUMMARY:71 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T130000
DTEND;TZID=Pacific Standard Time:20210108T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:65 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000409D4B716ABED601000000000000000
 010000000CE0CFC0A5634864389D5A96CB5BFCEB9
SUMMARY:72 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T134000
DTEND;TZID=Pacific Standard Time:20210108T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:66 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000009047FF4EC1E5D601000000000000000
 01000000027E099990FCA414286A71139DE07557D
SUMMARY:73 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T150500
DTEND;TZID=Pacific Standard Time:20210108T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:67 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C080D6CD11E5D601000000000000000
 01000000072E4B23ADE7F3B468BFB03EEC11555E6
SUMMARY:74 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T151000
DTEND;TZID=Pacific Standard Time:20210108T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:68 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002A6233E2CEE2D601000000000000000
 010000000E97C59D870D4C24BAFC8052EFF07A437
SUMMARY:75 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T153000
DTEND;TZID=Pacific Standard Time:20210108T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:69 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000003005B6AE93CDD601000000000000000
 0100000000C3AAD8601131841AAABCAADAC1DB783
SUMMARY:76 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210108T153000
DTEND;TZID=Pacific Standard Time:20210108T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:70 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000006DAAAB81ABC5D501000000000000000
 010000000D746C74E8872C247BD6ABD39B205DD6B
RECURRENCE-ID;TZID=Pacific Standard Time:20210111T081000
SUMMARY:77 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210111T081000
DTEND;TZID=Pacific Standard Time:20210111T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:31
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:31
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:71 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0777F7812E5D601000000000000000
 0100000008FCDCBFA53CB0B47A1DD3906EAFB84A7
SUMMARY:78 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210111T090500
DTEND;TZID=Pacific Standard Time:20210111T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:72 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000000FB4C1D00C7D601000000000000000
 010000000334D31C347A8C04E82B1AAFFA3B7FB11
SUMMARY:79 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210111T093500
DTEND;TZID=Pacific Standard Time:20210111T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:73 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080AF91D10AE4D601000000000000000
 0100000007D9BF2BAF40D7E4480050014673F74BD
SUMMARY:80 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210111T100000
DTEND;TZID=Pacific Standard Time:20210111T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:74 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070CBB03586E3D601000000000000000
 0100000006930AA3B699A4C4CA9C4B109EE2BF056
SUMMARY:81 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210111T111000
DTEND;TZID=Pacific Standard Time:20210111T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:75 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T211000Z;INTERVAL=1;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000D0AD26B7C4DED601000000000000000
 010000000743DA1EBCD995049B5164B1D21A738B5
SUMMARY:82 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210111T141000
DTEND;TZID=Pacific Standard Time:20210111T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:76 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T220000Z;INTERVAL=1;BYDAY=MO;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210118T150000,20210125T150000,20210215T
 150000,20210322T150000
UID:040000002739A30012D2G1938J12E0080000000060AEE12C68E3D601000000000000000
 0100000003A29487D185FF54AA3E3711844257A88
SUMMARY:83 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210111T150000
DTEND;TZID=Pacific Standard Time:20210111T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:77 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
RECURRENCE-ID;TZID=Pacific Standard Time:20210112T090500
SUMMARY:84 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T090500
DTEND;TZID=Pacific Standard Time:20210112T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:12
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:12
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:78 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210720T160500Z;INTERVAL=1;BYDAY=TU;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
SUMMARY:85 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T090500
DTEND;TZID=Pacific Standard Time:20210112T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:12
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:12
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:79 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010C7D392778BD601000000000000000
 010000000D9D8EF7A9B193B45A20A420AED9E939B
RECURRENCE-ID;TZID=Pacific Standard Time:20210112T094000
SUMMARY:86 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T094000
DTEND;TZID=Pacific Standard Time:20210112T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:29
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:29
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:80 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210720T164000Z;INTERVAL=1;BYDAY=TU;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210119T094000,20210126T094000
UID:040000002739A30012D2G1938J12E0080000000010C7D392778BD601000000000000000
 010000000D9D8EF7A9B193B45A20A420AED9E939B
SUMMARY:87 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T094000
DTEND;TZID=Pacific Standard Time:20210112T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:29
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:29
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:81 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D09D6414D8C7D601000000000000000
 0100000004E093970C2C3B145A08F598B409D827F
SUMMARY:88 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T103500
DTEND;TZID=Pacific Standard Time:20210112T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:82 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F040E3F113E5D601000000000000000
 010000000383D7A93BEDE2549A2FAB3A6B5611063
SUMMARY:89 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T110000
DTEND;TZID=Pacific Standard Time:20210112T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:83 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040FCCEB7D9E4D601000000000000000
 010000000FAD815C59953334ABDB9AE2A1DAB642E
SUMMARY:90 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T131000
DTEND;TZID=Pacific Standard Time:20210112T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:84 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000020066D7F72D4D601000000000000000
 0100000004D9DC256341AF1498BFC5A70AD40F77B
SUMMARY:91 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T141000
DTEND;TZID=Pacific Standard Time:20210112T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:85 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000008FAF4768E3D601000000000000000
 01000000020726728757BBE4381DAAEDB931EF137
SUMMARY:92 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T152000
DTEND;TZID=Pacific Standard Time:20210112T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:86 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0981627B2E5D601000000000000000
 0100000008A279AA94722064984B019AE381F5E3B
SUMMARY:93 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T160500
DTEND;TZID=Pacific Standard Time:20210112T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:87 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000309522B711E5D601000000000000000
 010000000F4FBBA88420F9343855641A89D54C622
SUMMARY:94 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210112T163000
DTEND;TZID=Pacific Standard Time:20210112T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:88 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
RECURRENCE-ID;TZID=Pacific Standard Time:20210113T080000
SUMMARY:95 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T080000
DTEND;TZID=Pacific Standard Time:20210113T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:89 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A047F3ECD2D2D601000000000000000
 010000000157F6E11C4544646A7E9B7222F9DE085
SUMMARY:96 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T100500
DTEND;TZID=Pacific Standard Time:20210113T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:90 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000060E3A1E289E9D601000000000000000
 010000000F3571478D20EF8459EAB54E82B9C59C6
SUMMARY:97 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T110500
DTEND;TZID=Pacific Standard Time:20210113T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:91 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210721T180500Z;INTERVAL=1;BYDAY=WE;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000208372C04FE3D601000000000000000
 010000000FD0E257D0B79A341A0351A66182870D7
SUMMARY:98 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T110500
DTEND;TZID=Pacific Standard Time:20210113T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:92 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000208372C04FE3D601000000000000000
 010000000FD0E257D0B79A341A0351A66182870D7
RECURRENCE-ID;TZID=Pacific Standard Time:20210113T110500
SUMMARY:99 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T113500
DTEND;TZID=Pacific Standard Time:20210113T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:7
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:7
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:93 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000104C6947EBE8D601000000000000000
 01000000033D36FE896F3A64BBEB6B3EF0B83B2EA
SUMMARY:100 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T130000
DTEND;TZID=Pacific Standard Time:20210113T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:94 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210721T200500Z;INTERVAL=1;BYDAY=WE;WKST=SU
UID:040000002739A30012D2G1938J12E008000000005004E8CD4DE3D601000000000000000
 01000000057050902B9E80248A00C6E060B9582BE
SUMMARY:101 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T130500
DTEND;TZID=Pacific Standard Time:20210113T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:95 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000005004E8CD4DE3D601000000000000000
 01000000057050902B9E80248A00C6E060B9582BE
RECURRENCE-ID;TZID=Pacific Standard Time:20210113T130500
SUMMARY:102 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T140500
DTEND;TZID=Pacific Standard Time:20210113T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:9
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:9
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:96 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080188E79D9E4D601000000000000000
 01000000040CA55E1A7A6E84F870FE3219CD2EE44
RECURRENCE-ID;TZID=Pacific Standard Time:20210114T111000
SUMMARY:103 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T160500
DTEND;TZID=Pacific Standard Time:20210113T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:97 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080B03E8701E9D601000000000000000
 010000000085E2D0297B8EF4BA729D211D582DA1D
SUMMARY:104 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210113T163000
DTEND;TZID=Pacific Standard Time:20210113T171500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:98 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000719833B1E1E6D601000000000000000
 0100000004B961EA169759C4999B8FD862293C515
SUMMARY:105 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Central Standard Time:20210113T192000
DTEND;TZID=Central Standard Time:20210113T195000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:99 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B0575986D2C7D601000000000000000
 010000000E79B1A243F766C44BAB115A0B5CF1CF8
SUMMARY:106 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T091000
DTEND;TZID=Pacific Standard Time:20210114T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:100 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B0027944F5E4D601000000000000000
 010000000BD7B3D3825E2C949A6A48708067C5E0D
SUMMARY:107 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T103000
DTEND;TZID=Pacific Standard Time:20210114T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:101 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E0A48B0CE8E5D601000000000000000
 010000000A7FBAAC7BB235F4D8DF1182A3AE4C080
SUMMARY:108 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T110500
DTEND;TZID=Pacific Standard Time:20210114T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:102 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210722T181000Z;INTERVAL=1;BYDAY=TH;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000080188E79D9E4D601000000000000000
 01000000040CA55E1A7A6E84F870FE3219CD2EE44
SUMMARY:109 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T111000
DTEND;TZID=Pacific Standard Time:20210114T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:103 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0CE2FC128E8D601000000000000000
 010000000774DA3461D05B646BCBBD701ED2ADC39
SUMMARY:110 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T113500
DTEND;TZID=Pacific Standard Time:20210114T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:104 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000409FE61C06E9D601000000000000000
 010000000B2B17C0225E2E944A3EDC26B970807A8
SUMMARY:111 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T130000
DTEND;TZID=Pacific Standard Time:20210114T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:105 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0282474A78DD601000000000000000
 0100000009DCE4B2BE483C34ABCA0DC5AEDE51762
RECURRENCE-ID;TZID=Pacific Standard Time:20210114T131000
SUMMARY:112 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T131000
DTEND;TZID=Pacific Standard Time:20210114T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:47
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:47
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:106 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=MONTHLY;UNTIL=20210708T201000Z;INTERVAL=1;BYDAY=2TH
UID:040000002739A30012D2G1938J12E00800000000F0282474A78DD601000000000000000
 0100000009DCE4B2BE483C34ABCA0DC5AEDE51762
SUMMARY:113 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T131000
DTEND;TZID=Pacific Standard Time:20210114T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:46
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:46
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:107 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B055D502F7E8D601000000000000000
 010000000AF9E54FC08A30540A86D53F786FCC727
SUMMARY:114 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T140000
DTEND;TZID=Pacific Standard Time:20210114T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:108 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050A0AB45E7E5D601000000000000000
 010000000C68C47F1C311E9448E54ACC84CA79603
SUMMARY:115 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T143500
DTEND;TZID=Pacific Standard Time:20210114T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:109 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040955B660AE5D601000000000000000
 010000000399B14836AB780479C3DC954E12D7361
SUMMARY:116 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T150000
DTEND;TZID=Pacific Standard Time:20210114T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:110 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000007009A4A1D2C7D601000000000000000
 01000000048C7A1761B84AE4997B0EA58BB9FC38C
SUMMARY:117 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210114T161000
DTEND;TZID=Pacific Standard Time:20210114T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:111 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C001D39617E4D601000000000000000
 0100000002EF6B3D43F6B4F4080D3CAC2430FB867
SUMMARY:118 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210115
DTEND;VALUE=DATE:20210116
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:112 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000090B1FBBAFFE8D601000000000000000
 0100000007227EA8B03CD6741B759AA88A38A9C8F
SUMMARY:119 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T081000
DTEND;TZID=Pacific Standard Time:20210115T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:113 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000804A11B1F1E4D601000000000000000
 010000000E54971B6BDA7A1488C266409CC91CB87
SUMMARY:120 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T100500
DTEND;TZID=Pacific Standard Time:20210115T102500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:114 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070B88A5C14E5D601000000000000000
 010000000B617FF94B19A7141A1290EF242973438
SUMMARY:121 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T103000
DTEND;TZID=Pacific Standard Time:20210115T110500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:115 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210716T181000Z;INTERVAL=2;BYDAY=FR;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000E05C566E1688D601000000000000000
 010000000DE60E8FB926AE7488485D3C1EB238B36
SUMMARY:122 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T111000
DTEND;TZID=Pacific Standard Time:20210115T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:27
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:27
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:116 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E05C566E1688D601000000000000000
 010000000DE60E8FB926AE7488485D3C1EB238B36
RECURRENCE-ID;TZID=Pacific Standard Time:20210115T111000
SUMMARY:123 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T111000
DTEND;TZID=Pacific Standard Time:20210115T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:29
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:29
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:117 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A07B6930D3E4D601000000000000000
 010000000F3D4EB1D24151D4685E118B8BCE3FB12
SUMMARY:124 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T120000
DTEND;TZID=Pacific Standard Time:20210115T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:118 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000409530CF71EAD601000000000000000
 01000000099D38A7E4577454592682DA49BF7CC25
SUMMARY:125 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T130000
DTEND;TZID=Pacific Standard Time:20210115T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:119 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F089876EB6E2D601000000000000000
 0100000001918B064B0D40F45BDDFA0F8A1A5024D
SUMMARY:126 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Eastern Standard Time:20210115T163000
DTEND;TZID=Eastern Standard Time:20210115T165500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:120 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000009032C8369FE9D601000000000000000
 01000000083510FDC3F21B74D836F556A6B3E47B1
SUMMARY:127 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T140000
DTEND;TZID=Pacific Standard Time:20210115T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:121 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000000F1E1C24088D601000000000000000
 010000000BEA1A9FA92DB0B48B088313501A86556
SUMMARY:128 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210115T150000
DTEND;TZID=Pacific Standard Time:20210115T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000007231AAEFC1D601000000000000000
 010000000D4FBFF858BED95429AF5D44A23298273
SUMMARY:129 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210118
DTEND;VALUE=DATE:20210119
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:122 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A03A8DEC8ADED601000000000000000
 010000000B01B8D633491F942B099CFDFBB34CC5E
SUMMARY:130 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210118
DTEND;VALUE=DATE:20210119
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:OOF
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:123 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002CB11BF1EBEDD601000000000000000
 0100000007C329A99D7BFE2428286A6493ECFDB12
SUMMARY:131 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210118T131500
DTEND;TZID=Pacific Standard Time:20210118T141500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:124 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000081EAD7FEEBEDD601000000000000000
 01000000008F129B56C022A44B0E5416DE2ACD9FC
SUMMARY:132 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210118T143000
DTEND;TZID=Pacific Standard Time:20210118T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:125 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000034C876F5EBEDD601000000000000000
 0100000006A1E1F3E3C5A9049BD0A1C645DAC02F0
SUMMARY:133 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210118T180000
DTEND;TZID=Pacific Standard Time:20210118T190000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:126 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000006DAAAB81ABC5D501000000000000000
 010000000D746C74E8872C247BD6ABD39B205DD6B
RECURRENCE-ID;TZID=Pacific Standard Time:20210118T081000
SUMMARY:134 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T081000
DTEND;TZID=Pacific Standard Time:20210119T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:31
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:31
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:127 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
RECURRENCE-ID;TZID=Pacific Standard Time:20210119T090500
SUMMARY:135 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T090500
DTEND;TZID=Pacific Standard Time:20210119T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:12
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:12
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:128 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050F10DEA23E8D601000000000000000
 010000000317EA62FC96A4B418EA84F64A7581D2F
SUMMARY:136 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T093000
DTEND;TZID=Pacific Standard Time:20210119T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:129 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080F0F01D0DEBD601000000000000000
 010000000273A6A218CB4E444A517180F6384AAC9
SUMMARY:137 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T103500
DTEND;TZID=Pacific Standard Time:20210119T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:130 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D0AD26B7C4DED601000000000000000
 010000000743DA1EBCD995049B5164B1D21A738B5
RECURRENCE-ID;TZID=Pacific Standard Time:20210118T141000
SUMMARY:138 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T111000
DTEND;TZID=Pacific Standard Time:20210119T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:131 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010085B33D1D2D601000000000000000
 01000000083BA9B03CA8D1D4FBA5BF9894889545F
RECURRENCE-ID;TZID=Pacific Standard Time:20210119T120000
SUMMARY:139 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T120000
DTEND;TZID=Pacific Standard Time:20210119T123000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:132 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D0F6949F78CCD601000000000000000
 01000000028A66D3EFBD1884ABBE139FC804BDAE8
SUMMARY:140 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T123000
DTEND;TZID=Pacific Standard Time:20210119T130500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:133 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000304E7AACD2D2D601000000000000000
 01000000084120FE151D9004EA417CB3F37E9FDB1
SUMMARY:141 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T130500
DTEND;TZID=Pacific Standard Time:20210119T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:134 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0D6CBA068EAD601000000000000000
 0100000008E9932CB98375A4EA8FA36A798020B04
SUMMARY:142 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T133500
DTEND;TZID=Pacific Standard Time:20210119T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:135 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C012193331D2D601000000000000000
 010000000CEB6C3C6F7E30340B7260EA27B79AA49
RECURRENCE-ID;TZID=Pacific Standard Time:20210118T103500
SUMMARY:143 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T140500
DTEND;TZID=Pacific Standard Time:20210119T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:136 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F01DF6C1B74FD601000000000000000
 010000000DB6982D34B0E8F43926EAAFEF9B811B9
RECURRENCE-ID;TZID=Pacific Standard Time:20210119T143000
SUMMARY:144 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T143000
DTEND;TZID=Pacific Standard Time:20210119T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:127
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:127
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:137 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002012272E28EBD601000000000000000
 010000000CF134BD1AB60094D8D648CAE118A458B
SUMMARY:145 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T151000
DTEND;TZID=Pacific Standard Time:20210119T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:138 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000090781CFFDEED601000000000000000
 01000000092D272089121664F910A56C4E4836EDD
SUMMARY:146 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210119T230000
DTEND;TZID=Pacific Standard Time:20210120T000000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:139 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030668EFFA2E2D601000000000000000
 01000000071590B733FF3BD40AE423C127C390B75
SUMMARY:147 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Eastern Standard Time:20210120T113500
DTEND;TZID=Eastern Standard Time:20210120T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:140 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000402F4FC3CBE8D601000000000000000
 010000000EC3F3C9BFB804E44B4EF3912EFF895F4
SUMMARY:148 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T090500
DTEND;TZID=Pacific Standard Time:20210120T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:141 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000100B74C5D2D2D601000000000000000
 010000000EFF60408CB542F4FA579CEF9B1F4AF93
SUMMARY:149 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T093500
DTEND;TZID=Pacific Standard Time:20210120T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:142 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A07D72D12FEBD601000000000000000
 0100000008AB05B57CE04F349AF386A00FA84F2FA
SUMMARY:150 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T101000
DTEND;TZID=Pacific Standard Time:20210120T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:143 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000208372C04FE3D601000000000000000
 010000000FD0E257D0B79A341A0351A66182870D7
RECURRENCE-ID;TZID=Pacific Standard Time:20210120T110500
SUMMARY:151 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T110500
DTEND;TZID=Pacific Standard Time:20210120T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:9
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:9
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:144 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010085B33D1D2D601000000000000000
 01000000083BA9B03CA8D1D4FBA5BF9894889545F
RECURRENCE-ID;TZID=Pacific Standard Time:20210120T120000
SUMMARY:152 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T120000
DTEND;TZID=Pacific Standard Time:20210120T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:145 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0096F848CD3D601000000000000000
 0100000002D814073537B4C408EEB1359804A1ADE
SUMMARY:153 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T130500
DTEND;TZID=Pacific Standard Time:20210120T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:146 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070AEDA06D3C7D601000000000000000
 0100000005565CA8D7D2B124F9F36CD8DD8A08259
RECURRENCE-ID;TZID=Pacific Standard Time:20210120T113500
SUMMARY:154 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T133500
DTEND;TZID=Pacific Standard Time:20210120T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:147 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050DBFB8517EFD601000000000000000
 010000000711502071FC82241863397845064FBF0
SUMMARY:155 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T140500
DTEND;TZID=Pacific Standard Time:20210120T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:148 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000005004E8CD4DE3D601000000000000000
 01000000057050902B9E80248A00C6E060B9582BE
RECURRENCE-ID;TZID=Pacific Standard Time:20210120T130500
SUMMARY:156 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T143500
DTEND;TZID=Pacific Standard Time:20210120T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:7
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:7
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:149 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000000E90960B065D601000000000000000
 010000000F29F38EA89193041A5F5526A3963DE5A
RECURRENCE-ID;TZID=Pacific Standard Time:20210106T100000
SUMMARY:157 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T150000
DTEND;TZID=Pacific Standard Time:20210120T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:57
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:57
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:150 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070A8B0D733EED601000000000000000
 01000000074E7CA963FD1CA4F94B74E3086FF5110
SUMMARY:158 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T190000
DTEND;TZID=Pacific Standard Time:20210120T193000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:151 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0390F63BDEFD601000000000000000
 010000000A68BFA29CCF5EA4BA97E295CC95E5755
SUMMARY:159 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T213000
DTEND;TZID=Pacific Standard Time:20210120T222500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:152 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000003CC636A4BDEFD601000000000000000
 01000000074E4D3D3D467AB4FB4E75461DCC6339D
SUMMARY:160 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T222500
DTEND;TZID=Pacific Standard Time:20210120T232500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:153 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F28EC6A5C8EFD601000000000000000
 010000000AF021414A83DE54BA87BF046B590D47D
SUMMARY:161 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210120T231500
DTEND;TZID=Pacific Standard Time:20210121T001500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:154 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000600D9FC0CC97D601000000000000000
 0100000002F3284252C7D4440AA8BDD72D28552E8
SUMMARY:162 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210121
DTEND;VALUE=DATE:20210122
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:155 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
RECURRENCE-ID;TZID=Pacific Standard Time:20210121T080000
SUMMARY:163 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T080000
DTEND;TZID=Pacific Standard Time:20210121T083000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:156 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B0D821DDE6E5D601000000000000000
 010000000D5F2DF29EF85D940A5FFF7939116049F
SUMMARY:164 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T083500
DTEND;TZID=Pacific Standard Time:20210121T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:8
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:8
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:157 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080188E79D9E4D601000000000000000
 01000000040CA55E1A7A6E84F870FE3219CD2EE44
RECURRENCE-ID;TZID=Pacific Standard Time:20210121T111000
SUMMARY:165 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T090500
DTEND;TZID=Pacific Standard Time:20210121T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:158 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C07C439E47EED601000000000000000
 0100000004D8FBAA3C417F94599D137BF298AF83B
SUMMARY:166 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T093000
DTEND;TZID=Pacific Standard Time:20210121T094000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:159 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000000C243CEBCD2D601000000000000000
 01000000015DB94DB415D114CA685723810AAE6C0
SUMMARY:167 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T094500
DTEND;TZID=Pacific Standard Time:20210121T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:160 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000305FFA2E2FEFD601000000000000000
 01000000066A89785CD7ABA449AF08419DF4219F1
SUMMARY:168 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T103000
DTEND;TZID=Pacific Standard Time:20210121T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:161 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0EE607283D3D601000000000000000
 01000000003598BFD5C294A498C2B2C2AD8AAD1DE
SUMMARY:169 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T121000
DTEND;TZID=Pacific Standard Time:20210121T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:11
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:11
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:162 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000004057FDF2A595D601000000000000000
 0100000005F65AC3E5F6C724CBCB4C4AE00D8C1B4
RECURRENCE-ID;TZID=Pacific Standard Time:20210121T131000
SUMMARY:170 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T131000
DTEND;TZID=Pacific Standard Time:20210121T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:163 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=MONTHLY;UNTIL=20210715T201000Z;INTERVAL=1;BYDAY=3TH
UID:040000002739A30012D2G1938J12E008000000004057FDF2A595D601000000000000000
 0100000005F65AC3E5F6C724CBCB4C4AE00D8C1B4
SUMMARY:171 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T131000
DTEND;TZID=Pacific Standard Time:20210121T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:164 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210722T213500Z;INTERVAL=1;BYDAY=TH;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000C0E8C85EAADED601000000000000000
 010000000E3ECC5234706FA4783D08803E3CACC17
SUMMARY:172 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T143500
DTEND;TZID=Pacific Standard Time:20210121T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:165 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C075CA5D85E9D601000000000000000
 010000000EF014619D99DBD4A90392EDE95B73246
SUMMARY:173 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T153000
DTEND;TZID=Pacific Standard Time:20210121T162000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:166 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0E8C85EAADED601000000000000000
 010000000E3ECC5234706FA4783D08803E3CACC17
RECURRENCE-ID;TZID=Pacific Standard Time:20210121T143500
SUMMARY:174 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T163500
DTEND;TZID=Pacific Standard Time:20210121T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:167 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000008CA665E26CF0D601000000000000000
 010000000B05153135E2C054CB1C2F39420A145A7
SUMMARY:175 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T201500
DTEND;TZID=Pacific Standard Time:20210121T210000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:168 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000020533FD46CF0D601000000000000000
 0100000001D00BFC4A84E5F4F98BFBB224989003C
SUMMARY:176 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T211500
DTEND;TZID=Pacific Standard Time:20210121T213000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:169 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A70C10BD83F0D601000000000000000
 0100000000CCDD87AA573D04DB54D18C15F3E9FCD
SUMMARY:177 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210121T213000
DTEND;TZID=Pacific Standard Time:20210121T223000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:170 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
RECURRENCE-ID;TZID=Pacific Standard Time:20210122T080000
SUMMARY:178 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T080000
DTEND;TZID=Pacific Standard Time:20210122T083000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:171 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000203920224BEBD601000000000000000
 01000000093AD6717EAA0A241800D5A273E188E6C
RECURRENCE-ID;TZID=Pacific Standard Time:20210122T100000
SUMMARY:179 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T083500
DTEND;TZID=Pacific Standard Time:20210122T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:172 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070AF5CBF28EBD601000000000000000
 010000000009D8CF03B326B46ADE2A3D7C7F38E52
SUMMARY:180 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T091000
DTEND;TZID=Pacific Standard Time:20210122T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:173 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210716T170000Z;INTERVAL=1;BYDAY=FR;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000203920224BEBD601000000000000000
 01000000093AD6717EAA0A241800D5A273E188E6C
SUMMARY:181 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T100000
DTEND;TZID=Pacific Standard Time:20210122T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:174 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000501B90E024EFD601000000000000000
 0100000001C4CAA0A5917274ABEECEE657275FF87
SUMMARY:182 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Eastern Standard Time:20210122T130000
DTEND;TZID=Eastern Standard Time:20210122T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:175 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B0C43114AEF0D601000000000000000
 010000000216D53E4AA9F404BA41BE7AE53B67DB8
SUMMARY:183 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T110000
DTEND;TZID=Pacific Standard Time:20210122T111000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:176 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000309C08D065EAD601000000000000000
 01000000084C4E067C5F32B498EC8E177897A0A59
SUMMARY:184 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T110500
DTEND;TZID=Pacific Standard Time:20210122T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:177 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010085B33D1D2D601000000000000000
 01000000083BA9B03CA8D1D4FBA5BF9894889545F
RECURRENCE-ID;TZID=Pacific Standard Time:20210122T120000
SUMMARY:185 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T113000
DTEND;TZID=Pacific Standard Time:20210122T123000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:178 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0C9BE457BEDD601000000000000000
 01000000045858BB355ED2C40A6A38E019F8DBFD2
SUMMARY:186 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T121000
DTEND;TZID=Pacific Standard Time:20210122T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:179 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080177E2160EAD601000000000000000
 0100000001610D4796B66FB44A3F3124344085131
SUMMARY:187 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T131000
DTEND;TZID=Pacific Standard Time:20210122T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:180 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030CB5BEEC4EFD601000000000000000
 010000000CEC082A8E4B41E4BAD5A01DB92603948
SUMMARY:188 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T140000
DTEND;TZID=Pacific Standard Time:20210122T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:181 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D0FE5AF1DCE8D601000000000000000
 010000000C92E78F38DD9624C9A47A6A33AE7627F
SUMMARY:189 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T143500
DTEND;TZID=Pacific Standard Time:20210122T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:182 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F05C5362BCEAD601000000000000000
 0100000000065D2B76DCD25448D4BB62045CF4A72
SUMMARY:190 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T150000
DTEND;TZID=Pacific Standard Time:20210122T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:183 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E0942A9346EAD601000000000000000
 010000000FFB284D09EF19949AB54CAAEAED272E4
SUMMARY:191 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T151000
DTEND;TZID=Pacific Standard Time:20210122T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:184 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000008D1B27D49BEED601000000000000000
 01000000097879A64F21C3F4F841A81E376BAAAF2
SUMMARY:192 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210122T160500
DTEND;TZID=Pacific Standard Time:20210122T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:185 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000006DAAAB81ABC5D501000000000000000
 010000000D746C74E8872C247BD6ABD39B205DD6B
RECURRENCE-ID;TZID=Pacific Standard Time:20210125T081000
SUMMARY:193 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T081000
DTEND;TZID=Pacific Standard Time:20210125T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:32
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:32
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:186 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E09EBE5389EED601000000000000000
 010000000965CB81CDEE7DA43961CB85862B711A5
SUMMARY:194 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T083000
DTEND;TZID=Pacific Standard Time:20210125T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:187 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T160500Z;INTERVAL=1;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000902EFFE468DFD601000000000000000
 0100000006C067A786C29CD4BB50ED0B774866DB7
SUMMARY:195 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T090500
DTEND;TZID=Pacific Standard Time:20210125T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:188 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050E701792AEBD601000000000000000
 010000000049C018EDBCA0E428825B396BD2E9349
SUMMARY:196 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T093500
DTEND;TZID=Pacific Standard Time:20210125T095500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:189 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210712T170500Z;INTERVAL=2;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000030A3FABB5EEED601000000000000000
 010000000810476C55AFB6345B6AB0EEA4F6C09FF
SUMMARY:197 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T100500
DTEND;TZID=Pacific Standard Time:20210125T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:190 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D0AD26B7C4DED601000000000000000
 010000000743DA1EBCD995049B5164B1D21A738B5
RECURRENCE-ID;TZID=Pacific Standard Time:20210125T141000
SUMMARY:198 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T110500
DTEND;TZID=Pacific Standard Time:20210125T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:191 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000605E1C2458EED601000000000000000
 010000000264079D5EA8981409F2D3C42DCABE348
SUMMARY:199 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T113500
DTEND;TZID=Pacific Standard Time:20210125T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:192 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T201000Z;INTERVAL=1;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000702ADBE9C0DED601000000000000000
 010000000C4C373C596337C4F89EDD36371DA1482
SUMMARY:200 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T131000
DTEND;TZID=Pacific Standard Time:20210125T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:8
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:8
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:193 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000004023411326EFD601000000000000000
 0100000006E1A09088E131149956E34E0372EF6EC
SUMMARY:201 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T140500
DTEND;TZID=Pacific Standard Time:20210125T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:194 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030067E7885DED601000000000000000
 010000000B0054BBCB6882844B975818A700166EB
RECURRENCE-ID;TZID=Pacific Standard Time:20210119T163500
SUMMARY:202 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T143500
DTEND;TZID=Pacific Standard Time:20210125T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:195 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D0DE8577BDE5D601000000000000000
 010000000A0E3A0D11343F740849469E95963746D
SUMMARY:203 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T150000
DTEND;TZID=Pacific Standard Time:20210125T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:196 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210712T233500Z;INTERVAL=2;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000A040D7F8FBE8D601000000000000000
 01000000063193DE6D573B4438F15DD6919A76678
SUMMARY:204 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210125T163500
DTEND;TZID=Pacific Standard Time:20210125T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:197 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B0A11FEE80E2D601000000000000000
 010000000D26DA0F530BF6347A5B68DB81FC33288
SUMMARY:205 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T090000
DTEND;TZID=Pacific Standard Time:20210126T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:198 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
RECURRENCE-ID;TZID=Pacific Standard Time:20210126T090500
SUMMARY:206 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T090500
DTEND;TZID=Pacific Standard Time:20210126T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:12
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:12
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:199 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E045AD0C8DD3D601000000000000000
 010000000BE3A59A0A6BBA54483849E8145CD4866
SUMMARY:207 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T130500
DTEND;TZID=Pacific Standard Time:20210126T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:200 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210720T203500Z;INTERVAL=1;BYDAY=TU;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000040B33644D9E4D601000000000000000
 01000000016FE0509210F234E822715AC9F8589E2
SUMMARY:208 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T133500
DTEND;TZID=Pacific Standard Time:20210126T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:201 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002047198965EAD601000000000000000
 010000000D461CAF0FDE5E24EA897E6D67C5CEB46
SUMMARY:209 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T140000
DTEND;TZID=Pacific Standard Time:20210126T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:202 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080C1B6468DD3D601000000000000000
 010000000D1503D731980494C83D92888FCC08A64
SUMMARY:210 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T143500
DTEND;TZID=Pacific Standard Time:20210126T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:203 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070CA091353EBD601000000000000000
 01000000028487E9816215C418B2D6CD82C784DC7
SUMMARY:211 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T151000
DTEND;TZID=Pacific Standard Time:20210126T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:204 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000405C84BE17EFD601000000000000000
 010000000077492516BF4DE47939EE5FB36773CDA
SUMMARY:212 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T160500
DTEND;TZID=Pacific Standard Time:20210126T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:205 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000090D65CB536EBD601000000000000000
 0100000001280216B2EA40A46BA10074C688B5599
SUMMARY:213 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T163000
DTEND;TZID=Pacific Standard Time:20210126T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:206 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080D189A85AEED601000000000000000
 0100000001EC0C256BDEF524AAAD0DB1CDBF5DD01
SUMMARY:214 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210126T210000
DTEND;TZID=Pacific Standard Time:20210126T212500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:207 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010156B1579EAD601000000000000000
 0100000009E14ABC02B715842A65DFB64B10C0F77
SUMMARY:215 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T090000
DTEND;TZID=Pacific Standard Time:20210127T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:208 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000203920224BEBD601000000000000000
 01000000093AD6717EAA0A241800D5A273E188E6C
RECURRENCE-ID;TZID=Pacific Standard Time:20210129T100000
SUMMARY:216 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T093500
DTEND;TZID=Pacific Standard Time:20210127T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:209 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000005004E8CD4DE3D601000000000000000
 01000000057050902B9E80248A00C6E060B9582BE
RECURRENCE-ID;TZID=Pacific Standard Time:20210127T130500
SUMMARY:217 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T100500
DTEND;TZID=Pacific Standard Time:20210127T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:8
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:8
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:210 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F03E27F0D1D2D601000000000000000
 0100000004569367BD79337428CF3F80A6B6887A7
SUMMARY:218 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T103500
DTEND;TZID=Pacific Standard Time:20210127T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:211 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210714T183500Z;INTERVAL=2;BYDAY=WE;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000E08E6583E9E5D601000000000000000
 0100000001A871DCCC0D16640B0B1FE48B5DAE532
SUMMARY:219 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T113500
DTEND;TZID=Pacific Standard Time:20210127T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:212 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E0ABDB0A30E4D601000000000000000
 010000000E86E928A2E0B9A4B996440D8BB3C620F
SUMMARY:220 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T131000
DTEND;TZID=Pacific Standard Time:20210127T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:213 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010F79A9A69C2D601000000000000000
 0100000005DC2EF4CE8DEF849BABB60663EE7181F
SUMMARY:221 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T131000
DTEND;TZID=Pacific Standard Time:20210127T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:214 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000004011F14479EAD601000000000000000
 0100000003577327C2B07CC468C5BBFACFA4E6013
SUMMARY:222 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T143000
DTEND;TZID=Pacific Standard Time:20210127T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:215 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050A9C73D29EBD601000000000000000
 010000000B132119034EFA64790B25634477D464E
SUMMARY:223 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T151000
DTEND;TZID=Pacific Standard Time:20210127T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:216 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0DE9C8F64EAD601000000000000000
 01000000080D143A7CB1CE34E8DA9426716301D17
RECURRENCE-ID;TZID=Pacific Standard Time:20210127T151000
SUMMARY:224 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T151000
DTEND;TZID=Pacific Standard Time:20210127T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:217 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210714T221000Z;INTERVAL=2;BYDAY=WE;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000A0DE9C8F64EAD601000000000000000
 01000000080D143A7CB1CE34E8DA9426716301D17
SUMMARY:225 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T151000
DTEND;TZID=Pacific Standard Time:20210127T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:218 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040651373F9E8D601000000000000000
 01000000028E06856EDF2AB40BED9E90FDFA61A3A
RECURRENCE-ID;TZID=Pacific Standard Time:20210127T160000
SUMMARY:226 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T160000
DTEND;TZID=Pacific Standard Time:20210127T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:219 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210630T230000Z;INTERVAL=1;BYDAY=WE;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000040651373F9E8D601000000000000000
 01000000028E06856EDF2AB40BED9E90FDFA61A3A
SUMMARY:227 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210127T160000
DTEND;TZID=Pacific Standard Time:20210127T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:220 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000403D21CC2DE4D601000000000000000
 010000000DF31A44575E5F148AD72503C7D65F8C2
SUMMARY:228 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T081000
DTEND;TZID=Pacific Standard Time:20210128T090000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:221 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0F7ED5B7FC9D601000000000000000
 010000000BD0B8205A5A56140B0FF9D0541687B00
SUMMARY:229 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T091000
DTEND;TZID=Pacific Standard Time:20210128T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:9
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:9
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:222 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000005067BFCD27E8D601000000000000000
 010000000A9AF2D96CD2D9E4C81DA918A71C336A8
SUMMARY:230 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T100000
DTEND;TZID=Pacific Standard Time:20210128T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:223 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210722T173500Z;INTERVAL=1;BYDAY=TH;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000080D58822E6E5D601000000000000000
 0100000006A888134BBF4D044BC3353826AFA9673
SUMMARY:231 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T103500
DTEND;TZID=Pacific Standard Time:20210128T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:224 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000500FEA4985C8D601000000000000000
 0100000002D80B63634BE164EA42FDC6F36B3AD21
RECURRENCE-ID;TZID=Pacific Standard Time:20210128T141000
SUMMARY:232 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T131000
DTEND;TZID=Pacific Standard Time:20210128T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:16
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:16
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:225 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D09872F501F0D601000000000000000
 010000000A28159C7A5EF7E40887366B9587E102B
SUMMARY:233 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T140000
DTEND;TZID=Pacific Standard Time:20210128T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:226 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=MONTHLY;UNTIL=20210722T211000Z;INTERVAL=1;BYDAY=4TH
UID:040000002739A30012D2G1938J12E00800000000500FEA4985C8D601000000000000000
 0100000002D80B63634BE164EA42FDC6F36B3AD21
SUMMARY:234 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T141000
DTEND;TZID=Pacific Standard Time:20210128T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:10
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:10
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:227 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000407D65C0E0E5D601000000000000000
 0100000005D82E69A4F0F654CACB57FF5CBD10D44
SUMMARY:235 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T141000
DTEND;TZID=Pacific Standard Time:20210128T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:228 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E0C08F5D7FC9D601000000000000000
 01000000033D9A553CF1DF84491481FF7ECB09128
SUMMARY:236 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210128T161000
DTEND;TZID=Pacific Standard Time:20210128T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:7
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:7
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:229 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000020E3E99D17E4D601000000000000000
 010000000C47AAA131F1CB24CB433046B6246372A
SUMMARY:237 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210129
DTEND;VALUE=DATE:20210130
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:230 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000060A626AB89B6D601000000000000000
 0100000005C85B53AB054F34A90445FA4D93425A1
SUMMARY:238 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210129
DTEND;VALUE=DATE:20210130
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:231 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
RECURRENCE-ID;TZID=Pacific Standard Time:20210129T080000
SUMMARY:239 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T080000
DTEND;TZID=Pacific Standard Time:20210129T083000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:232 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000050107BB976EED601000000000000000
 010000000C1DD49F2782F0C4B9B7C1B67177E703C
SUMMARY:240 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T083500
DTEND;TZID=Pacific Standard Time:20210129T090500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:233 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000020E4E27E53EBD601000000000000000
 01000000074B5A737E2017347B8DF15956C493392
SUMMARY:241 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T091000
DTEND;TZID=Pacific Standard Time:20210129T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:234 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080188E79D9E4D601000000000000000
 01000000040CA55E1A7A6E84F870FE3219CD2EE44
RECURRENCE-ID;TZID=Pacific Standard Time:20210128T111000
SUMMARY:242 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T103500
DTEND;TZID=Pacific Standard Time:20210129T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:235 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E05C566E1688D601000000000000000
 010000000DE60E8FB926AE7488485D3C1EB238B36
RECURRENCE-ID;TZID=Pacific Standard Time:20210129T111000
SUMMARY:243 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T111000
DTEND;TZID=Pacific Standard Time:20210129T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:34
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:34
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:236 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080D58822E6E5D601000000000000000
 0100000006A888134BBF4D044BC3353826AFA9673
RECURRENCE-ID;TZID=Pacific Standard Time:20210128T103500
SUMMARY:244 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T130500
DTEND;TZID=Pacific Standard Time:20210129T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:237 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000408CFEE758EED601000000000000000
 0100000001F3E75EBDC296C49BCB2CBE4C5F97173
SUMMARY:245 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T133500
DTEND;TZID=Pacific Standard Time:20210129T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:238 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210212T221000Z;INTERVAL=2;BYDAY=FR;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000070D6E2D80AE8D601000000000000000
 010000000124F56C01CC5334FA1E41FA77853057F
SUMMARY:246 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T141000
DTEND;TZID=Pacific Standard Time:20210129T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:239 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0E8C85EAADED601000000000000000
 010000000E3ECC5234706FA4783D08803E3CACC17
RECURRENCE-ID;TZID=Pacific Standard Time:20210128T143500
SUMMARY:247 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T150500
DTEND;TZID=Pacific Standard Time:20210129T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:240 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C091BDAA36EBD601000000000000000
 010000000F6187F3D7E018E49B2FB876BBDB29E36
SUMMARY:248 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210129T153000
DTEND;TZID=Pacific Standard Time:20210129T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:241 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T163500Z;INTERVAL=1;BYDAY=MO;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000701B23DCE8E5D601000000000000000
 010000000F76E113C3C6A3440A7A1934D253289C6
SUMMARY:249 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210201T093500
DTEND;TZID=Pacific Standard Time:20210201T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:242 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000301A998075EED601000000000000000
 0100000009844978F5E339C44A0092D3DEFF70564
SUMMARY:250 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210201T100000
DTEND;TZID=Pacific Standard Time:20210201T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:243 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210719T180000Z;INTERVAL=1;BYDAY=MO;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210208T110000,20210215T110000
UID:040000002739A30012D2G1938J12E00800000000200DB53667E3D601000000000000000
 010000000F0C54C3149A37548B2248C04A7E6A78E
SUMMARY:251 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210201T110000
DTEND;TZID=Pacific Standard Time:20210201T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:244 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F00CE44650EBD601000000000000000
 010000000381010BE8F99864BACD0C1AA03B0D3B7
SUMMARY:252 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210201T110500
DTEND;TZID=Pacific Standard Time:20210201T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:245 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000200DB53667E3D601000000000000000
 010000000F0C54C3149A37548B2248C04A7E6A78E
RECURRENCE-ID;TZID=Pacific Standard Time:20210201T110000
SUMMARY:253 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210201T113000
DTEND;TZID=Pacific Standard Time:20210201T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:246 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D07C695F6BEDD501000000000000000
 0100000001FC43B94D4AB2A4BA0E7DB1F030E2CD9
RECURRENCE-ID;TZID=Pacific Standard Time:20210128T130000
SUMMARY:254 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210201T124000
DTEND;TZID=Pacific Standard Time:20210201T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:8
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:8
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:247 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002086165F59EED601000000000000000
 010000000848794BCA950764594CD041F74FC5623
SUMMARY:255 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210201T153500
DTEND;TZID=Pacific Standard Time:20210201T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000060F219AAEFC1D601000000000000000
 01000000013A48020569DBB4795480C5C07E34E13
SUMMARY:256 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210202
DTEND;VALUE=DATE:20210203
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:248 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=MONTHLY;UNTIL=20210706T160000Z;INTERVAL=1;BYDAY=1TU
UID:040000002739A30012D2G1938J12E0080000000080A98A82C2A6D601000000000000000
 0100000006FE85A395F72D94C9011ECF48EF0EE8F
SUMMARY:257 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210202T090000
DTEND;TZID=Pacific Standard Time:20210202T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:38
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:38
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000080A98A82C2A6D601000000000000000
 0100000006FE85A395F72D94C9011ECF48EF0EE8F
RECURRENCE-ID;TZID=Pacific Standard Time:20210202T090000
SUMMARY:258 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210202T090000
DTEND;TZID=Pacific Standard Time:20210202T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:39
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:39
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:249 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000002F63C559EED601000000000000000
 010000000A6D8D4070720444384278A594FA8F85A
SUMMARY:259 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210202T113500
DTEND;TZID=Pacific Standard Time:20210202T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:250 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010C7D392778BD601000000000000000
 010000000D9D8EF7A9B193B45A20A420AED9E939B
RECURRENCE-ID;TZID=Pacific Standard Time:20210202T094000
SUMMARY:260 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210202T131000
DTEND;TZID=Pacific Standard Time:20210202T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:32
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:32
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:251 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040B33644D9E4D601000000000000000
 01000000016FE0509210F234E822715AC9F8589E2
RECURRENCE-ID;TZID=Pacific Standard Time:20210202T133500
SUMMARY:261 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210202T140500
DTEND;TZID=Pacific Standard Time:20210202T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:252 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030067E7885DED601000000000000000
 010000000B0054BBCB6882844B975818A700166EB
RECURRENCE-ID;TZID=Pacific Standard Time:20210202T163500
SUMMARY:262 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210202T160500
DTEND;TZID=Pacific Standard Time:20210202T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:253 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000409D7FC387DED601000000000000000
 01000000042FE12D794D6AC4292713CAF8A3B7065
RECURRENCE-ID;TZID=Pacific Standard Time:20210202T160500
SUMMARY:263 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210202T163500
DTEND;TZID=Pacific Standard Time:20210202T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:254 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0A10E6AD1D2D601000000000000000
 0100000004D195857FED03E4C96153D2A15278ED1
RECURRENCE-ID;TZID=Pacific Standard Time:20210203T080000
SUMMARY:264 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T080000
DTEND;TZID=Pacific Standard Time:20210203T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:255 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
RECURRENCE-ID;TZID=Pacific Standard Time:20210202T090500
SUMMARY:265 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T093000
DTEND;TZID=Pacific Standard Time:20210203T095500
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:25
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:25
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:256 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010085B33D1D2D601000000000000000
 01000000083BA9B03CA8D1D4FBA5BF9894889545F
RECURRENCE-ID;TZID=Pacific Standard Time:20210203T120000
SUMMARY:266 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T123000
DTEND;TZID=Pacific Standard Time:20210203T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:257 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210721T210000Z;INTERVAL=2;BYDAY=WE;WKST=SU
UID:040000002739A30012D2G1938J12E00800000000C0DA9DBCDFEDD601000000000000000
 0100000006E283934A18CB245AB63DCB56EEFC6EB
SUMMARY:267 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T140000
DTEND;TZID=Pacific Standard Time:20210203T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:258 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000208372C04FE3D601000000000000000
 010000000FD0E257D0B79A341A0351A66182870D7
RECURRENCE-ID;TZID=Pacific Standard Time:20210203T110500
SUMMARY:268 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T140500
DTEND;TZID=Pacific Standard Time:20210203T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:8
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:8
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:259 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210721T213000Z;INTERVAL=1;BYDAY=WE;WKST=SU
UID:040000002739A30012D2G1938J12E008000000005060DE6364DFD601000000000000000
 010000000FDED535829FE4D4DB3A2BEC716F105EB
SUMMARY:269 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T143000
DTEND;TZID=Pacific Standard Time:20210203T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:260 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030E654195AEED601000000000000000
 010000000385CB371A405B8478D6B020986F5144A
SUMMARY:270 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T150500
DTEND;TZID=Pacific Standard Time:20210203T153000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:261 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000EB69109D91EED601000000000000000
 010000000BCE28C8C5EE2B44F9DBBAE7FA863B916
SUMMARY:271 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T153000
DTEND;TZID=Pacific Standard Time:20210203T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:262 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040651373F9E8D601000000000000000
 01000000028E06856EDF2AB40BED9E90FDFA61A3A
RECURRENCE-ID;TZID=Pacific Standard Time:20210203T160000
SUMMARY:272 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210203T160000
DTEND;TZID=Pacific Standard Time:20210203T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:263 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000007045E85424CAD601000000000000000
 010000000BDE9C5ED3588864C9109792D4C7A73DC
SUMMARY:273 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210204T091000
DTEND;TZID=Pacific Standard Time:20210204T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:264 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000090B58D715DEED601000000000000000
 010000000A6DC94548842C149A1DCCD76E4FE26DB
SUMMARY:274 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210204T100500
DTEND;TZID=Pacific Standard Time:20210204T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:265 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000090552D665BEED601000000000000000
 010000000FCBC38E38BB87149800A87060C6F936B
SUMMARY:275 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210204T130500
DTEND;TZID=Pacific Standard Time:20210204T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:266 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0BA4E9B1FEBD601000000000000000
 010000000A17334010F299B46B789986003AA966A
SUMMARY:276 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210204T161000
DTEND;TZID=Pacific Standard Time:20210204T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:267 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000008018EC9D48EED601000000000000000
 010000000BBA5818F0A96D84AA3BF57199E30815D
SUMMARY:277 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210205
DTEND;VALUE=DATE:20210206
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:268 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210716T161000Z;INTERVAL=1;BYDAY=FR;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000080736E97427DD601000000000000000
 0100000006F89B738B64283439A4F41E70497B102
SUMMARY:278 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210205T091000
DTEND;TZID=Pacific Standard Time:20210205T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:26
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:26
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:269 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000801DBA845CEED601000000000000000
 01000000010A724A14FFEBB4CBEF3FFF9758F336B
SUMMARY:279 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210205T110500
DTEND;TZID=Pacific Standard Time:20210205T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:270 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210709T183500Z;INTERVAL=2;BYDAY=FR;WKST=SU
EXDATE;TZID=Pacific Standard Time:20210219T113500
UID:040000002739A30012D2G1938J12E008000000007006E8F48DF0D601000000000000000
 010000000816BE3C43437524296D468560833CF06
SUMMARY:280 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210205T113500
DTEND;TZID=Pacific Standard Time:20210205T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:271 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010D5281E5DEED601000000000000000
 010000000F381D57418338D49B428CC0520642FD7
SUMMARY:281 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210205T130500
DTEND;TZID=Pacific Standard Time:20210205T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000D0BD26A23FCDD601000000000000000
 01000000068C8C925BCEEF341901AA4FDDBBE72C4
RECURRENCE-ID;TZID=Pacific Standard Time:20210204T133500
SUMMARY:282 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210205T140500
DTEND;TZID=Pacific Standard Time:20210205T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:272 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B07E80FB3EE8D601000000000000000
 010000000A8A4B777B816D24CACC644A29AB4B9F3
SUMMARY:283 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210205T153000
DTEND;TZID=Pacific Standard Time:20210205T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:273 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002F528DF83EE8D601000000000000000
 010000000E9EEDA32AD7423499638BE8B679688F1
SUMMARY:284 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210205T160000
DTEND;TZID=Pacific Standard Time:20210205T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:274 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000060AEE12C68E3D601000000000000000
 0100000003A29487D185FF54AA3E3711844257A88
RECURRENCE-ID;TZID=Pacific Standard Time:20210208T150000
SUMMARY:285 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210208T150000
DTEND;TZID=Pacific Standard Time:20210208T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:275 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C012193331D2D601000000000000000
 010000000CEB6C3C6F7E30340B7260EA27B79AA49
RECURRENCE-ID;TZID=Pacific Standard Time:20210208T103500
SUMMARY:286 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210208T160500
DTEND;TZID=Pacific Standard Time:20210208T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:276 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000090E454ECF9EFD601000000000000000
 010000000651C4C167336604B88C8A451493CBAEB
SUMMARY:287 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210209T143500
DTEND;TZID=Pacific Standard Time:20210209T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:277 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000309F4A878295D601000000000000000
 010000000F675BCC7D2252A49A52E9E66D5B20847
RECURRENCE-ID;TZID=Pacific Standard Time:20210209T151000
SUMMARY:288 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210209T151000
DTEND;TZID=Pacific Standard Time:20210209T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:34
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:34
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:278 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E02A8F5E71CCD601000000000000000
 010000000E8BDD42D71CA5F4D9B096C6CA7F89D78
SUMMARY:289 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210210T091000
DTEND;TZID=Pacific Standard Time:20210210T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:279 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010324C71B2E8D601000000000000000
 0100000003128421524303B4AA5072C34C29D76CA
SUMMARY:290 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210211
DTEND;VALUE=DATE:20210213
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:280 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010AD6B23FAEFD601000000000000000
 0100000000CDE65CED114024F97A49683FB5C3BA8
SUMMARY:291 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210211T093500
DTEND;TZID=Pacific Standard Time:20210211T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:281 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000007035896571CCD601000000000000000
 010000000E73AEA6B4046024F8CD31EC042F2AF89
SUMMARY:292 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210211T161000
DTEND;TZID=Pacific Standard Time:20210211T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:282 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E05C566E1688D601000000000000000
 010000000DE60E8FB926AE7488485D3C1EB238B36
RECURRENCE-ID;TZID=Pacific Standard Time:20210212T111000
SUMMARY:293 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210212T111000
DTEND;TZID=Pacific Standard Time:20210212T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:33
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:33
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000800D61AAEFC1D601000000000000000
 0100000008412A07A8133694AA33C274BF37C6CFF
SUMMARY:294 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210214
DTEND;VALUE=DATE:20210215
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:283 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000705A833A89B6D601000000000000000
 010000000547A357AC5A2D849B7EBDAA74EA4B022
SUMMARY:295 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210215
DTEND;VALUE=DATE:20210220
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:284 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000007028A8818BDED601000000000000000
 010000000787204BBA1465141907F794A8BE6873C
SUMMARY:296 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210215
DTEND;VALUE=DATE:20210216
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:OOF
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000030D273AAEFC1D601000000000000000
 0100000003A1053DAD4F2DC4BB3D6ED7D680812B6
SUMMARY:297 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210215
DTEND;VALUE=DATE:20210216
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:285 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
RECURRENCE-ID;TZID=Pacific Standard Time:20210216T090500
SUMMARY:298 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210216T090500
DTEND;TZID=Pacific Standard Time:20210216T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:12
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:12
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:286 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C012193331D2D601000000000000000
 010000000CEB6C3C6F7E30340B7260EA27B79AA49
RECURRENCE-ID;TZID=Pacific Standard Time:20210215T103500
SUMMARY:299 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210216T100500
DTEND;TZID=Pacific Standard Time:20210216T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:287 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000205460ACAFD3D601000000000000000
 010000000C01DE361DE800841A47A9065C002F79C
SUMMARY:300 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210216T104000
DTEND;TZID=Pacific Standard Time:20210216T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:288 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000701B23DCE8E5D601000000000000000
 010000000F76E113C3C6A3440A7A1934D253289C6
RECURRENCE-ID;TZID=Pacific Standard Time:20210215T093500
SUMMARY:301 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210216T130500
DTEND;TZID=Pacific Standard Time:20210216T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:289 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000005061E29DB2E8D601000000000000000
 0100000008712C042BA214E408C386DA34F75A86A
SUMMARY:302 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210217
DTEND;VALUE=DATE:20210218
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:290 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000902EFFE468DFD601000000000000000
 0100000006C067A786C29CD4BB50ED0B774866DB7
RECURRENCE-ID;TZID=Pacific Standard Time:20210215T090500
SUMMARY:303 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210217T090500
DTEND;TZID=Pacific Standard Time:20210217T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:291 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D0CF1DEA23E8D601000000000000000
 01000000067BCBEA10337AF448A82C8281CBC365B
SUMMARY:304 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210217T093000
DTEND;TZID=Pacific Standard Time:20210217T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:292 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000040EAD89571CCD601000000000000000
 0100000008DE0435708C43040A85864D7F0E71083
SUMMARY:305 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210218T161000
DTEND;TZID=Pacific Standard Time:20210218T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:293 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0B7AD443CEFD601000000000000000
 0100000009A3B71BA60B6D242B0CC426B5062623F
SUMMARY:306 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210222T111000
DTEND;TZID=Pacific Standard Time:20210222T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:294 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D07C695F6BEDD501000000000000000
 0100000001FC43B94D4AB2A4BA0E7DB1F030E2CD9
RECURRENCE-ID;TZID=Pacific Standard Time:20210225T130000
SUMMARY:307 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210223T141000
DTEND;TZID=Pacific Standard Time:20210223T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:11
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:11
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:295 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030A82E67C4E5D601000000000000000
 01000000048030D6AD7019F4E909B587D53C731E9
SUMMARY:308 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210224T090000
DTEND;TZID=Pacific Standard Time:20210224T113000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:296 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000208372C04FE3D601000000000000000
 010000000FD0E257D0B79A341A0351A66182870D7
RECURRENCE-ID;TZID=Pacific Standard Time:20210224T110500
SUMMARY:309 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210224T113500
DTEND;TZID=Pacific Standard Time:20210224T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:297 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0E8C85EAADED601000000000000000
 010000000E3ECC5234706FA4783D08803E3CACC17
RECURRENCE-ID;TZID=Pacific Standard Time:20210225T143500
SUMMARY:310 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210225T130500
DTEND;TZID=Pacific Standard Time:20210225T133000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:298 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070990BE0CBE8D601000000000000000
 01000000068D91ED846596648BDCB593AAFE780D7
SUMMARY:311 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210226
DTEND;VALUE=DATE:20210308
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:299 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A080045E7DCCD601000000000000000
 01000000041789BAC46507C4E8BD93C65B86A262B
SUMMARY:312 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210304T091000
DTEND;TZID=Pacific Standard Time:20210304T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:4
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:4
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:300 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210702T160000Z;INTERVAL=1;BYDAY=FR;WKST=SU
UID:040000002739A30012D2G1938J12E0080000000060C3173F91E9D601000000000000000
 01000000035F71799E6C82246BED872BEF1400DF7
SUMMARY:313 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210305T090000
DTEND;TZID=Pacific Standard Time:20210305T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:301 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210709T181000Z;INTERVAL=2;BYDAY=FR;WKST=SU
UID:040000002739A30012D2G1938J12E008000000000092B012A5F0D601000000000000000
 010000000592266A5538B5C40832B81AC231ED36A
SUMMARY:314 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210305T111000
DTEND;TZID=Pacific Standard Time:20210305T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:302 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B094546EB0D3D601000000000000000
 010000000F41302007DF64444A74A92D76BAAF7D0
SUMMARY:315 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210308T091000
DTEND;TZID=Pacific Standard Time:20210308T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:303 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000309F4A878295D601000000000000000
 010000000F675BCC7D2252A49A52E9E66D5B20847
RECURRENCE-ID;TZID=Pacific Standard Time:20210309T151000
SUMMARY:316 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210309T151000
DTEND;TZID=Pacific Standard Time:20210309T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:33
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:33
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:304 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E02EF9E0B0D3D601000000000000000
 010000000F41302007DF64444A74A92D76BAAF7D0
SUMMARY:317 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210310T091000
DTEND;TZID=Pacific Standard Time:20210310T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:305 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000030A250F27CCCD601000000000000000
 0100000003126DDB2AFA8B943A524CE7E476C37BE
SUMMARY:318 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210311T091000
DTEND;TZID=Pacific Standard Time:20210311T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:306 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000107DFA92B1D3D601000000000000000
 010000000653DD5382C829D419F6156AD9A675656
SUMMARY:319 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210311T140500
DTEND;TZID=Pacific Standard Time:20210311T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:307 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B08E52ED7CCCD601000000000000000
 0100000006001461210390B4A8B09ACAC15F53265
SUMMARY:320 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210311T161000
DTEND;TZID=Pacific Standard Time:20210311T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:308 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000607DB8FB37EFD601000000000000000
 010000000F8E80EB47D062746B3747BD18DF979F5
SUMMARY:321 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210312T141000
DTEND;TZID=Pacific Standard Time:20210312T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000D0484EAAEFC1D601000000000000000
 0100000009842016DF6CD624A95E0E45A8757C3B8
SUMMARY:322 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210317
DTEND;VALUE=DATE:20210318
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:309 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000305F2A82B3D3D601000000000000000
 0100000006631F39596F9EB4982B3E739B32EF528
SUMMARY:323 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210317T091000
DTEND;TZID=Pacific Standard Time:20210317T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:310 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0DB3632D194D601000000000000000
 0100000004E488498A76EB545867B059690E03F10
RECURRENCE-ID;TZID=Pacific Standard Time:20210304T131000
SUMMARY:324 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210317T131000
DTEND;TZID=Pacific Standard Time:20210317T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:18
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:18
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:311 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A09D63D1CBE8D601000000000000000
 010000000E2AD1EA9537E624887903370921A7710
SUMMARY:325 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210318
DTEND;VALUE=DATE:20210319
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:312 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000004057FDF2A595D601000000000000000
 0100000005F65AC3E5F6C724CBCB4C4AE00D8C1B4
RECURRENCE-ID;TZID=Pacific Standard Time:20210318T131000
SUMMARY:326 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210318T131000
DTEND;TZID=Pacific Standard Time:20210318T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:313 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0B207657DCCD601000000000000000
 0100000002A4D5C29C8F5D34AA9B05F25B6C32764
SUMMARY:327 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210318T161000
DTEND;TZID=Pacific Standard Time:20210318T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:314 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0C5EE21C6E5D601000000000000000
 010000000961BBBBAC0FD304B8695EA86746ECB0F
SUMMARY:328 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210322T150000
DTEND;TZID=Pacific Standard Time:20210322T163000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:315 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:4996885F9E6DC09DE10000000AA9CA33
SUMMARY:329 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210323T080000
DTEND;TZID=Pacific Standard Time:20210323T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:316 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000008D8E66E2FDCDD601000000000000000
 0100000006D52925441AC3741B1957557441544F8
SUMMARY:330 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210323T120000
DTEND;TZID=Pacific Standard Time:20210323T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:317 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:4A96885F9E6DC09DE10000000AA9CA33
SUMMARY:331 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210324T080000
DTEND;TZID=Pacific Standard Time:20210324T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:318 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000036AC32DBFDCDD601000000000000000
 010000000B593E0B9A576334780AC0168C9F2D9B8
SUMMARY:332 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210324T110000
DTEND;TZID=Pacific Standard Time:20210324T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:319 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000208372C04FE3D601000000000000000
 010000000FD0E257D0B79A341A0351A66182870D7
RECURRENCE-ID;TZID=Pacific Standard Time:20210324T110500
SUMMARY:333 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210324T140500
DTEND;TZID=Pacific Standard Time:20210324T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:5
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:5
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:320 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:4D96885F9E6DC09DE10000000AA9CA33
SUMMARY:334 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210325T080000
DTEND;TZID=Pacific Standard Time:20210325T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:321 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E02B2AEA23E8D601000000000000000
 010000000F17C6CF4F0FAD243A0A147FD77E6D15A
SUMMARY:335 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210325T100000
DTEND;TZID=Pacific Standard Time:20210325T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:322 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B86ED4D7FDCDD601000000000000000
 010000000441ABC4C1451DE4A8B38AFF014DBE569
SUMMARY:336 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210325T110000
DTEND;TZID=Pacific Standard Time:20210325T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:323 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000080BF3B087DCCD601000000000000000
 010000000264C5CE3F85EC24E83DABD1FFEBED70A
SUMMARY:337 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210401T091000
DTEND;TZID=Pacific Standard Time:20210401T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000C0E304AAEFC1D601000000000000000
 0100000003453CEDEA47B6041B41153C025336964
SUMMARY:338 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210404
DTEND;VALUE=DATE:20210405
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:324 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F03B03D5B2E8D601000000000000000
 01000000025E98453B1573E49B1A3D7D256326CF4
SUMMARY:339 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210405
DTEND;VALUE=DATE:20210410
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:325 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
RECURRENCE-ID;TZID=Pacific Standard Time:20210406T090500
SUMMARY:340 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210406T090500
DTEND;TZID=Pacific Standard Time:20210406T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:12
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:12
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:326 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010C7D392778BD601000000000000000
 010000000D9D8EF7A9B193B45A20A420AED9E939B
RECURRENCE-ID;TZID=Pacific Standard Time:20210406T094000
SUMMARY:341 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210406T094000
DTEND;TZID=Pacific Standard Time:20210406T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:33
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:33
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:327 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000001002DC46F3D1D601000000000000000
 0100000003B0518A1E26C084B95A337E7B4507351
RECURRENCE-ID;TZID=Pacific Standard Time:20210406T151000
SUMMARY:342 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210406T141000
DTEND;TZID=Pacific Standard Time:20210406T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:328 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
RRULE:FREQ=WEEKLY;UNTIL=20210720T221000Z;INTERVAL=1;BYDAY=TU;WKST=SU
UID:040000002739A30012D2G1938J12E008000000001002DC46F3D1D601000000000000000
 0100000003B0518A1E26C084B95A337E7B4507351
SUMMARY:343 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210406T151000
DTEND;TZID=Pacific Standard Time:20210406T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:329 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000070E92BFE7CCCD601000000000000000
 010000000DF7A82F8A7D49E428853E812711DFC54
SUMMARY:344 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210408T091000
DTEND;TZID=Pacific Standard Time:20210408T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:330 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000002059C6027DCCD601000000000000000
 010000000D05C8BE0193D3D46AE7DAFAD69E68397
SUMMARY:345 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210408T161000
DTEND;TZID=Pacific Standard Time:20210408T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000090FF54AAEFC1D601000000000000000
 010000000843D37769547F949A70C58DB30F69047
SUMMARY:346 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210415
DTEND;VALUE=DATE:20210416
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:331 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000008010430F7DCCD601000000000000000
 01000000026E96076304BAC4A97460CEF3856ED88
SUMMARY:347 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210415T161000
DTEND;TZID=Pacific Standard Time:20210415T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:332 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000303BDE59C6E5D601000000000000000
 0100000000E2101F49F55D441BF42DC47F86D1C82
SUMMARY:348 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210419T090000
DTEND;TZID=Pacific Standard Time:20210419T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:333 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C012193331D2D601000000000000000
 010000000CEB6C3C6F7E30340B7260EA27B79AA49
RECURRENCE-ID;TZID=Pacific Standard Time:20210419T103500
SUMMARY:349 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210419T113500
DTEND;TZID=Pacific Standard Time:20210419T120000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000060F46CAAEFC1D601000000000000000
 010000000B16DD73D98144C4FB879DA88E09065D3
SUMMARY:350 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210421
DTEND;VALUE=DATE:20210422
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:334 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000900E38EA23E8D601000000000000000
 0100000005BA4A8A63F0F864E8A1AF996DA2182DE
SUMMARY:351 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210421T100000
DTEND;TZID=Pacific Standard Time:20210421T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:335 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F097D631758BD601000000000000000
 01000000039BDA03B4F52084B9CB93392C1B70722
RECURRENCE-ID;TZID=Pacific Standard Time:20210504T090500
SUMMARY:352 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210504T090500
DTEND;TZID=Pacific Standard Time:20210504T093000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:12
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:12
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:336 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010C7D392778BD601000000000000000
 010000000D9D8EF7A9B193B45A20A420AED9E939B
RECURRENCE-ID;TZID=Pacific Standard Time:20210504T094000
SUMMARY:353 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210504T094000
DTEND;TZID=Pacific Standard Time:20210504T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:34
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:34
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:337 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000B0ABF4287DCCD601000000000000000
 01000000008943367D73FDC4B9D02A976EBF0D9DC
SUMMARY:354 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210506T091000
DTEND;TZID=Pacific Standard Time:20210506T101000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000C07B3FAAEFC1D601000000000000000
 0100000004F112216F268BA48A8EEDBF09D0A54D9
SUMMARY:355 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210509
DTEND;VALUE=DATE:20210510
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:338 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000001002DC46F3D1D601000000000000000
 0100000003B0518A1E26C084B95A337E7B4507351
RECURRENCE-ID;TZID=Pacific Standard Time:20210511T151000
SUMMARY:356 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210511T151000
DTEND;TZID=Pacific Standard Time:20210511T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:339 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010EB7F50ACF0D601000000000000000
 0100000003B1DFD063C8160419F73C86D614153AF
SUMMARY:357 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210513
DTEND;VALUE=DATE:20210514
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:340 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000010AFB31A7DCCD601000000000000000
 0100000006F418B376DEA2C4AA335BF5877A0F2CF
SUMMARY:358 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210513T091000
DTEND;TZID=Pacific Standard Time:20210513T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:341 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0B9CC1E7DCCD601000000000000000
 010000000EA79C9E4162C7E45B0D07A26B7FB8F61
SUMMARY:359 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210513T161000
DTEND;TZID=Pacific Standard Time:20210513T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000D06F86AAEFC1D601000000000000000
 0100000003406F36A89810A4A9C407905AF6C023B
SUMMARY:360 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210515
DTEND;VALUE=DATE:20210516
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:342 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000020A345EA23E8D601000000000000000
 0100000001101BF4432FDC4439534ACF83BE9C8CF
SUMMARY:361 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210519T100000
DTEND;TZID=Pacific Standard Time:20210519T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:343 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000A0FAAB237DCCD601000000000000000
 010000000FB47F1F88735E244BAF97594608F11B6
SUMMARY:362 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210520T161000
DTEND;TZID=Pacific Standard Time:20210520T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:344 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000C0465C03C7E5D601000000000000000
 0100000008F62EAF8E0D5A84897DF491D87E32B0C
SUMMARY:363 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210525T160000
DTEND;TZID=Pacific Standard Time:20210525T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:345 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000020C2537C8CDED601000000000000000
 01000000023CFC78EECC2B24381880F3962E19E11
SUMMARY:364 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210531
DTEND;VALUE=DATE:20210601
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:OOF
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E0080000000000C538AAEFC1D601000000000000000
 01000000094EBE6EDC944CC4CA09DAFACCCB9E8B9
SUMMARY:365 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210531
DTEND;VALUE=DATE:20210601
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:346 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000209EEB2E7DCCD601000000000000000
 010000000788629D5A5A7B444AE006AB28B2D81CF
SUMMARY:366 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210603T091000
DTEND;TZID=Pacific Standard Time:20210603T100000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:347 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000001002DC46F3D1D601000000000000000
 0100000003B0518A1E26C084B95A337E7B4507351
RECURRENCE-ID;TZID=Pacific Standard Time:20210608T151000
SUMMARY:367 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210608T151000
DTEND;TZID=Pacific Standard Time:20210608T160000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:3
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:3
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:348 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000D0C50E347DCCD601000000000000000
 01000000023CB1843706BD14EB246016D793B1781
SUMMARY:368 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210610T091000
DTEND;TZID=Pacific Standard Time:20210610T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:349 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000E0A7BD387DCCD601000000000000000
 010000000104CA3A92FDB6044B27C909D945E41F9
SUMMARY:369 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210610T161000
DTEND;TZID=Pacific Standard Time:20210610T173000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:350 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000009061223D7DCCD601000000000000000
 0100000007DB3685EBCB9DD4B916E0DF5E2741443
SUMMARY:370 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210617T161000
DTEND;TZID=Pacific Standard Time:20210617T170000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:2
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:2
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000C02A8BAAEFC1D601000000000000000
 01000000055EA4CF265CA664791446370649ACB6F
SUMMARY:371 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210619
DTEND;VALUE=DATE:20210620
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000002614AAEFC1D601000000000000000
 010000000543D263E64400748ACE35212BF6C5B67
SUMMARY:372 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210620
DTEND;VALUE=DATE:20210621
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:351 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000F0EB2A57CFE5D601000000000000000
 010000000829FD5A75605464F9C78D943B3C8EEC1
SUMMARY:373 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210623T090000
DTEND;TZID=Pacific Standard Time:20210623T103000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:352 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000204954EA23E8D601000000000000000
 010000000BE23F3F78C04DA40A6044CD0A23813B4
SUMMARY:374 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210623T100000
DTEND;TZID=Pacific Standard Time:20210623T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000508F23AAEFC1D601000000000000000
 010000000FDAC19FEBA84E74BB056F1BDDC442512
SUMMARY:375 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210704
DTEND;VALUE=DATE:20210705
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:353 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E0080000000060687AA08DDED601000000000000000
 0100000001C8C19B26FF2274BB40A73757E0EC2D8
SUMMARY:376 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210705
DTEND;VALUE=DATE:20210706
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:OOF
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
UID:040000002739A30012D2G1938J12E00800000000500279AAEFC1D601000000000000000
 01000000034C54EDA5510354FAADA4C3AC060A532
SUMMARY:377 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;VALUE=DATE:20210705
DTEND;VALUE=DATE:20210706
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:TRANSPARENT
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:FREE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:354 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E008000000004057FDF2A595D601000000000000000
 0100000005F65AC3E5F6C724CBCB4C4AE00D8C1B4
RECURRENCE-ID;TZID=Pacific Standard Time:20210715T131000
SUMMARY:378 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210715T131000
DTEND;TZID=Pacific Standard Time:20210715T143000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:6
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:6
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:3
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
BEGIN:VEVENT
DESCRIPTION:355 Lorem ipsum dolor sit amet\, consectetur adipiscing elit. Don
 finibus blandit eros\, at pulvinar ante tincidunt sit amet. Sed eget porta
 ligula. In pellentesque nec ligula eu sagittis. Aenean scelerisque aliquam
 justo\, consectetur luctus diam interdum non. Donec sodales urna eget nequ
 e suscipit dapibus. Fusce pretium eros ut neque interdum interdum. Aenean e
 get dignissim mi\, et imperdiet risus. Sed vestibulum elit massa\, vitae ia
 culis orci facilisis ac. Donec erat lacus\, tincidunt egestas ipsum vita
 e\, ullamcorper laoreet lacus. Donec ultricies tempus hendrerit. Orci variu
 s natoque penatibus et magnis dis parturient montes\, nascetur ridiculus mu
 s. Morbi condimentum metus ut cursus lacinia. Proin ut luctus lacus\, sit a
 met convallis leo. Quisque urna elit\, laoreet eu commodo sed\, vulputate a
 c dolor. Nulla convallis sed purus eu ullamcorper. Donec id lorem sagittis 
 volutpat sapien eget\, viverra massa. Vivamus felis mi\, faucibus in elit u
 t\, pulvinar viverra orci.
UID:040000002739A30012D2G1938J12E00800000000704161EA23E8D601000000000000000
 010000000077E4546FD1D714E8F18A01D0750BE75
SUMMARY:379 Lorem ipsum dolor sit amet\, consectetur adipiscing elit.
DTSTART;TZID=Pacific Standard Time:20210721T100000
DTEND;TZID=Pacific Standard Time:20210721T110000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20210122T222533Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:Alicubi
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT
END:VCALENDAR
`
export default icalFile
