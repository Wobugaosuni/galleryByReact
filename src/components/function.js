// -----------在区间内取随机值，参数是最小值和最大值
export function getRangeRandom (low,high){
  return Math.floor(Math.random() * (high - low) + low);
}
// -----------endbuild

// -----------在[-30. 30]之间取随机值
export function get30DegRandom () {
  return (Math.random() > 0.5 ? '' : '-' + Math.floor( Math.random () * 30 ));
}
// -----------endbuild
