const cinemaIdSFC = '4380'
const cinemaIdMeiQi = '44334'
const cinemaArr = [cinemaIdSFC, cinemaIdMeiQi]
const cinameNameArr = ['SFC上海影城', '上海美琪大戏院']
const showId = '1277962'
const showName = '小偷家族'
const scheduleId = ['533147790', '533147348']

const appKey = '12574478'
const scheduleIdArr = ['533147790', '533147348']
const getscheduleseatUrl =
  'https://acs.m.taopiaopiao.com/h5/mtop.film.mtopseatapi.getscheduleseat/7.5/'
const lockSeatUrl =
  'https://acs.m.taopiaopiao.com/h5/mtop.film.mtopseatapi.asylockseat/5.0/'

const userSimpleUrl =
  'https://acs.m.taopiaopiao.com/h5/mtop.user.getusersimple/1.0/'

const payCheckUrl =
  'https://acs.m.taopiaopiao.com/h5/mtop.film.mtopmarketingapi.cacpaymentsolution/7.2/'

const orderUrl =
  'https://acs.m.taopiaopiao.com/h5/mtop.film.mtoporderapi.ordering/5.0/'

const stringify = JSON.stringify

function calcToken(e) {
  function t(e, t) {
    return (e << t) | (e >>> (32 - t))
  }
  function n(e, t) {
    var n, i, o, r, a
    return (
      (o = 2147483648 & e),
      (r = 2147483648 & t),
      (n = 1073741824 & e),
      (i = 1073741824 & t),
      (a = (1073741823 & e) + (1073741823 & t)),
      n & i
        ? 2147483648 ^ a ^ o ^ r
        : n | i
          ? 1073741824 & a ? 3221225472 ^ a ^ o ^ r : 1073741824 ^ a ^ o ^ r
          : a ^ o ^ r
    )
  }
  function i(e, t, n) {
    return (e & t) | (~e & n)
  }
  function o(e, t, n) {
    return (e & n) | (t & ~n)
  }
  function r(e, t, n) {
    return e ^ t ^ n
  }
  function a(e, t, n) {
    return t ^ (e | ~n)
  }
  function s(e, o, r, a, s, c, l) {
    return (e = n(e, n(n(i(o, r, a), s), l))), n(t(e, c), o)
  }
  function c(e, i, r, a, s, c, l) {
    return (e = n(e, n(n(o(i, r, a), s), l))), n(t(e, c), i)
  }
  function l(e, i, o, a, s, c, l) {
    return (e = n(e, n(n(r(i, o, a), s), l))), n(t(e, c), i)
  }
  function u(e, i, o, r, s, c, l) {
    return (e = n(e, n(n(a(i, o, r), s), l))), n(t(e, c), i)
  }
  function d(e) {
    for (
      var t,
        n = e.length,
        i = n + 8,
        o = (i - i % 64) / 64,
        r = 16 * (o + 1),
        a = new Array(r - 1),
        s = 0,
        c = 0;
      n > c;

    )
      (t = (c - c % 4) / 4),
        (s = (c % 4) * 8),
        (a[t] = a[t] | (e.charCodeAt(c) << s)),
        c++
    return (
      (t = (c - c % 4) / 4),
      (s = (c % 4) * 8),
      (a[t] = a[t] | (128 << s)),
      (a[r - 2] = n << 3),
      (a[r - 1] = n >>> 29),
      a
    )
  }
  function p(e) {
    var t,
      n,
      i = '',
      o = ''
    for (n = 0; 3 >= n; n++)
      (t = (e >>> (8 * n)) & 255),
        (o = '0' + t.toString(16)),
        (i += o.substr(o.length - 2, 2))
    return i
  }
  function f(e) {
    e = e.replace(/\r\n/g, '\n')
    for (var t = '', n = 0; n < e.length; n++) {
      var i = e.charCodeAt(n)
      128 > i
        ? (t += String.fromCharCode(i))
        : i > 127 && 2048 > i
          ? ((t += String.fromCharCode((i >> 6) | 192)),
            (t += String.fromCharCode((63 & i) | 128)))
          : ((t += String.fromCharCode((i >> 12) | 224)),
            (t += String.fromCharCode(((i >> 6) & 63) | 128)),
            (t += String.fromCharCode((63 & i) | 128)))
    }
    return t
  }
  var h,
    m,
    g,
    v,
    y,
    b,
    w,
    x,
    k,
    E = [],
    S = 7,
    T = 12,
    _ = 17,
    A = 22,
    O = 5,
    C = 9,
    I = 14,
    R = 20,
    N = 4,
    M = 11,
    L = 16,
    P = 23,
    W = 6,
    j = 10,
    D = 15,
    B = 21
  for (
    e = f(e),
      E = d(e),
      b = 1732584193,
      w = 4023233417,
      x = 2562383102,
      k = 271733878,
      h = 0;
    h < E.length;
    h += 16
  )
    (m = b),
      (g = w),
      (v = x),
      (y = k),
      (b = s(b, w, x, k, E[h + 0], S, 3614090360)),
      (k = s(k, b, w, x, E[h + 1], T, 3905402710)),
      (x = s(x, k, b, w, E[h + 2], _, 606105819)),
      (w = s(w, x, k, b, E[h + 3], A, 3250441966)),
      (b = s(b, w, x, k, E[h + 4], S, 4118548399)),
      (k = s(k, b, w, x, E[h + 5], T, 1200080426)),
      (x = s(x, k, b, w, E[h + 6], _, 2821735955)),
      (w = s(w, x, k, b, E[h + 7], A, 4249261313)),
      (b = s(b, w, x, k, E[h + 8], S, 1770035416)),
      (k = s(k, b, w, x, E[h + 9], T, 2336552879)),
      (x = s(x, k, b, w, E[h + 10], _, 4294925233)),
      (w = s(w, x, k, b, E[h + 11], A, 2304563134)),
      (b = s(b, w, x, k, E[h + 12], S, 1804603682)),
      (k = s(k, b, w, x, E[h + 13], T, 4254626195)),
      (x = s(x, k, b, w, E[h + 14], _, 2792965006)),
      (w = s(w, x, k, b, E[h + 15], A, 1236535329)),
      (b = c(b, w, x, k, E[h + 1], O, 4129170786)),
      (k = c(k, b, w, x, E[h + 6], C, 3225465664)),
      (x = c(x, k, b, w, E[h + 11], I, 643717713)),
      (w = c(w, x, k, b, E[h + 0], R, 3921069994)),
      (b = c(b, w, x, k, E[h + 5], O, 3593408605)),
      (k = c(k, b, w, x, E[h + 10], C, 38016083)),
      (x = c(x, k, b, w, E[h + 15], I, 3634488961)),
      (w = c(w, x, k, b, E[h + 4], R, 3889429448)),
      (b = c(b, w, x, k, E[h + 9], O, 568446438)),
      (k = c(k, b, w, x, E[h + 14], C, 3275163606)),
      (x = c(x, k, b, w, E[h + 3], I, 4107603335)),
      (w = c(w, x, k, b, E[h + 8], R, 1163531501)),
      (b = c(b, w, x, k, E[h + 13], O, 2850285829)),
      (k = c(k, b, w, x, E[h + 2], C, 4243563512)),
      (x = c(x, k, b, w, E[h + 7], I, 1735328473)),
      (w = c(w, x, k, b, E[h + 12], R, 2368359562)),
      (b = l(b, w, x, k, E[h + 5], N, 4294588738)),
      (k = l(k, b, w, x, E[h + 8], M, 2272392833)),
      (x = l(x, k, b, w, E[h + 11], L, 1839030562)),
      (w = l(w, x, k, b, E[h + 14], P, 4259657740)),
      (b = l(b, w, x, k, E[h + 1], N, 2763975236)),
      (k = l(k, b, w, x, E[h + 4], M, 1272893353)),
      (x = l(x, k, b, w, E[h + 7], L, 4139469664)),
      (w = l(w, x, k, b, E[h + 10], P, 3200236656)),
      (b = l(b, w, x, k, E[h + 13], N, 681279174)),
      (k = l(k, b, w, x, E[h + 0], M, 3936430074)),
      (x = l(x, k, b, w, E[h + 3], L, 3572445317)),
      (w = l(w, x, k, b, E[h + 6], P, 76029189)),
      (b = l(b, w, x, k, E[h + 9], N, 3654602809)),
      (k = l(k, b, w, x, E[h + 12], M, 3873151461)),
      (x = l(x, k, b, w, E[h + 15], L, 530742520)),
      (w = l(w, x, k, b, E[h + 2], P, 3299628645)),
      (b = u(b, w, x, k, E[h + 0], W, 4096336452)),
      (k = u(k, b, w, x, E[h + 7], j, 1126891415)),
      (x = u(x, k, b, w, E[h + 14], D, 2878612391)),
      (w = u(w, x, k, b, E[h + 5], B, 4237533241)),
      (b = u(b, w, x, k, E[h + 12], W, 1700485571)),
      (k = u(k, b, w, x, E[h + 3], j, 2399980690)),
      (x = u(x, k, b, w, E[h + 10], D, 4293915773)),
      (w = u(w, x, k, b, E[h + 1], B, 2240044497)),
      (b = u(b, w, x, k, E[h + 8], W, 1873313359)),
      (k = u(k, b, w, x, E[h + 15], j, 4264355552)),
      (x = u(x, k, b, w, E[h + 6], D, 2734768916)),
      (w = u(w, x, k, b, E[h + 13], B, 1309151649)),
      (b = u(b, w, x, k, E[h + 4], W, 4149444226)),
      (k = u(k, b, w, x, E[h + 11], j, 3174756917)),
      (x = u(x, k, b, w, E[h + 2], D, 718787259)),
      (w = u(w, x, k, b, E[h + 9], B, 3951481745)),
      (b = n(b, m)),
      (w = n(w, g)),
      (x = n(x, v)),
      (k = n(k, y))
  var U = p(b) + p(w) + p(x) + p(k)
  return U.toLowerCase()
}
function sign(data, ts) {
  // data: JSON string

  return calcToken(getToken() + '&' + ts + '&' + appKey + '&' + data)
}

function getToken() {
  var e = '_m_h5_tk'
  var t = new RegExp('(?:^|;\\s*)' + e + '\\=([^;]+)(?:;\\s*|$)').exec(
    document.cookie
  )
  return t ? t[1].split('_')[0] : void 0
}
var qPayload = {
  scheduleId: '533486997',
  mobile: '13408522119',
  seatIDs: '03011113|03011114|03011112',
  seatNames: '11排11座|11排12座|11排10座',
  platform: '8',
  activityIds: 0
}
function seats(sid) {
  var ts = new Date().getTime()
  var dPayload = stringify({
    scheduleId: '' + sid,
    preSaleCode: '',
    platform: '8'
  })
  return serialize({
    jsv: '2.4.11',
    appKey,
    t: ts,
    sign: sign(dPayload, ts),
    api: 'mtop.film.MtopSeatAPI.getScheduleSeat',
    v: '7.5',
    ecode: 1,
    isSec: 1,
    timeout: 10000,
    forceAntiCreep: true,
    AntiCreep: true,
    type: 'get',
    dataType: 'json',
    // callback: "mtopjsonp1",
    data: dPayload
  })
}
function lockSeat(obj) {
  var ts = new Date().getTime()
  var data = stringify(obj)
  var payload = {
    jsv: '2.4.11',
    appKey,
    t: ts,
    sign: sign(data, ts),
    api: 'mtop.film.MtopSeatAPI.asyLockSeat',
    v: '5.0',
    ecode: 1,
    timeout: 10000,
    forceAntiCreep: true,
    AntiCreep: true,
    type: 'get',
    dataType: 'json',
    // callback: "mtopjsonp1",
    data
  }
  return serialize(payload)
}

function paymentSolution(obj) {
  const dataObj = {
    useCouponFlag: 0,
    preSaleProcedure: 0,
    lockSeatApplyKey:
      '388001568_532838450_[0000000000000001-10-10, 0000000000000001-10-12]',
    scheduleId: '532838450',
    seatIDs: '0000000000000001-10-10|0000000000000001-10-12',
    useActivityFlag: 1,
    preSaleCodes: '',
    useMCardFlag: 1,
    actionType: '1',
    platform: '8'
  }
  const payload = {
    jsv: '2.4.11',
    appKey,
    t: ts,
    sign: sign(data, ts),
    api: 'mtop.film.mtopmarketingapi.cacpaymentsolution',
    v: '7.2',
    ecode: 1,
    timeout: 10000,
    forceAntiCreep: true,
    AntiCreep: true,
    type: 'get',
    dataType: 'json',
    data
  }
  return serialize(payload)
}

function order() {
  const payloadData = {
    scheduleId: '532838450',
    lockSeatApplyKey:
      '388001568_532838450_[0000000000000001-10-10, 0000000000000001-10-12]',
    seatIDs: '0000000000000001-10-10|0000000000000001-10-12',
    seatNames: '10排10座|10排12座',
    activityIds: '69719',
    totalPrice: '10380',
    useActivityFlag: '4',
    useMcardFlag: '1',
    orderExtInfo: 'sqm=a1z2r.7661912.1.1',
    mobile: '13408522119',
    platform: '8'
  }
  const payload = {
    jsv: '2.4.11',
    appKey,
    t: ts,
    sign: sign(data, ts),
    api: 'mtop.film.MtopOrderAPI.ordering',
    v: '5.0',
    ecode: 1,
    timeout: 10000,
    forceAntiCreep: true,
    AntiCreep: true,
    type: 'get',
    dataType: 'json',
    data
  }
}

function serialize(e) {
  var t = []
  for (var n in e)
    e[n] && t.push(encodeURIComponent(n) + '=' + encodeURIComponent(e[n]))
  return t.join('&')
}

function mtopjsonp1() {}

function lockSeatTest() {
  var apiUrl = lockSeatUrl + '?' + lockSeat(qPayload)
  fetch(apiUrl, {
    credentials: 'include'
  })
    .then(d => d.json())
    .then(d => console.log(d))
}

function querySeatsTest(sid) {
  const apiUrl = getscheduleseatUrl + '?' + seats(`${sid}`)
  fetch(apiUrl, {
    credentials: 'include'
  })
    .then(d => d.json())
    .then(chooseBestSeats)
}
function timeFormatter() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() +
    1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
function chooseBestSeats(res) {
  if (res.data && res.data.returnCode === '0' && res.data.returnValue) {
    const rv = res.data.returnValue
    const remaining = rv.hallSeatMap.seatCount - rv.hallSeatMap.soldCount
    if (remaining <= 0) {
      return
      console.log(
        `没有余票--${rv.schedule.cinemaName}--${
          rv.schedule.showName
        }--${timeFormatter()}`
      )
      return []
    } else {
      console.log(
        `剩余${remaining}张--${rv.schedule.cinemaName}--${
          rv.schedule.showName
        }--${timeFormatter()}`
      )
      return []
    }

    var recommendsArr = rv.hallSeatMap.sectionSeatMapList.map(item => {
      var subArr = []
      var el = item.recommendSeatMap
      for (var prop in el) {
        if (el.hasOwnProperty(prop) && el[prop]['status'] === '1') {
          subArr.push(el[prop])
        }
      }
      return subArr
    })
    if (recommendsArr.length) {
      var recommends = []
      recommendsArr.forEach(el => (recommends = recommends.concat(el)))
      console.log(recommends)
      return recommends
    } else {
      recommendsArr = rv.hallSeatMap.sectionSeatMapList.map(item => {
        return item.seats.filter(el => el.status === '1')
      })
      const availableSeats = []
      recommendsArr.forEach(el => (availableSeats = availableSeats.concat(el)))
      console.log(availableSeats)
      return availableSeats
    }
  }
}

let timer
function loop() {
  timer = setInterval(() => {
    querySeatsTest(scheduleIdArr[0])
    querySeatsTest(scheduleIdArr[1])
  }, 1000)
}
function clearTimer() {
  clearInterval(timer)
}

loop()
