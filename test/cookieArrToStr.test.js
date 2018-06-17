const cookiesArrToStr = require('../util/cookiesArrToStr')

test('convert array of cookies to string', () => {
  const arr = [
    {
      name: 'a',
      value: 'av',
      domain: '.t.com',
      path: '/',
      expires: 1531810852.928218,
      size: 9,
      httpOnly: false,
      secure: false,
      session: false
    },
    {
      name: 'b',
      value: 'bv',
      domain: '.t.com',
      path: '/',
      expires: 1529823653.348713,
      size: 44,
      httpOnly: false,
      secure: false,
      session: false
    },
    {
      name: 'c',
      value: 'cv',
      domain: '.t.com',
      path: '/',
      expires: -1,
      size: 39,
      httpOnly: true,
      secure: false,
      session: true
    }
  ]
  expect(cookiesArrToStr(arr)).toBe('a=av;b=bv;c=cv')
})
