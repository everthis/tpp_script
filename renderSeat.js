const mapConfig = {
  floorDistance: 48,
  legendHeight: 34,
  margin: {
    bottom: 8,
    left: 28,
    right: 28,
    top: 8
  },
  maxSize: 4096,
  radarSeatHeight: 4,
  radarSeatMargin: 2,
  radarSeatWidth: 4,
  screenHeight: 37,
  seatHeight: 40,
  seatMargin: 8,
  seatWidth: 40
}
const renderSeat = function(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    n = this.getSeatImg(e)
  if (n) {
    var r = S['default'].isLeftLoverSeat(e),
      a = S['default'].isRightLoverSeat(e)
    return (
      i &&
        (r
          ? t.clearRect(
              e.x,
              e.y,
              2 * mapConfig.seatWidth + mapConfig.seatMargin,
              mapConfig.seatHeight
            )
          : a
            ? t.clearRect(
                e.x - mapConfig.seatWidth - mapConfig.seatMargin,
                e.y,
                2 * mapConfig.seatWidth + mapConfig.seatMargin,
                mapConfig.seatHeight
              )
            : t.clearRect(e.x, e.y, mapConfig.seatWidth, mapConfig.seatHeight)),
      r
        ? void t.drawImage(
            n.img,
            n.x,
            n.y,
            n.w,
            n.h,
            e.x,
            e.y,
            2 * mapConfig.seatWidth + mapConfig.seatMargin,
            mapConfig.seatHeight
          )
        : a
          ? void t.drawImage(
              n.img,
              n.x,
              n.y,
              n.w,
              n.h,
              e.x - mapConfig.seatWidth - mapConfig.seatMargin,
              e.y,
              2 * mapConfig.seatWidth + mapConfig.seatMargin,
              mapConfig.seatHeight
            )
          : void t.drawImage(
              n.img,
              n.x,
              n.y,
              n.w,
              n.h,
              e.x,
              e.y,
              mapConfig.seatWidth,
              mapConfig.seatHeight
            )
    )
  }
}

const getSeatImg = function() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    e = (t.flag || '').toString(),
    i = (t.status || '').toString(),
    n = '1' === i,
    r = this.repository.isSelected(t)
  return '0' === e
    ? r
      ? this.seatImgs.customSelected
        ? {
            img: this.seatImgs.customSelected,
            x: 0,
            y: 0,
            w: 120,
            h: 120
          }
        : {
            img: this.seatImgs.Sprite,
            x: 0,
            y: 80,
            w: 80,
            h: 80
          }
      : n
        ? this.supportAreaPrice
          ? a(
              {
                img: this.seatImgs.Sprite
              },
              S['default'].getAreaImgInfo(t)
            )
          : this.seatImgs.customNormal
            ? {
                img: this.seatImgs.customNormal,
                x: 0,
                y: 0,
                w: 80,
                h: 80
              }
            : {
                img: this.seatImgs.Sprite,
                x: 0,
                y: 0,
                w: 80,
                h: 80
              }
        : this.seatImgs.customSoldLength
          ? this.getCustomSoldImg(e)
          : {
              img: this.seatImgs.Sprite,
              x: 0,
              y: 160,
              w: 80,
              h: 80
            }
    : '1' === e || '2' === e
      ? r
        ? this.seatImgs.customLoverSelected
          ? {
              img: this.seatImgs.customLoverSelected,
              x: 0,
              y: 0,
              w: 264,
              h: 120
            }
          : {
              img: this.seatImgs.Sprite,
              x: 80,
              y: 80,
              w: 176,
              h: 80
            }
        : n
          ? this.supportAreaPrice
            ? a(
                {
                  img: this.seatImgs.Sprite
                },
                S['default'].getAreaImgInfo(t)
              )
            : this.seatImgs.customLoverNormal
              ? {
                  img: this.seatImgs.customLoverNormal,
                  x: 0,
                  y: 0,
                  w: 264,
                  h: 120
                }
              : {
                  img: this.seatImgs.Sprite,
                  x: 80,
                  y: 0,
                  w: 176,
                  h: 80
                }
          : this.seatImgs.customLoverSoldLength
            ? this.getCustomSoldImg(e)
            : {
                img: this.seatImgs.Sprite,
                x: 80,
                y: 160,
                w: 176,
                h: 80
              }
      : null
}
