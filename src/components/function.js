// -----------在区间内取随机值，参数是最小值和最大值
function getRangeRandom(low,high){
  return Math.floor(Math.random() * (high - low) + low);
}
// -----------endbuild

export default getRangeRandom;
