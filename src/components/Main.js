require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './imgPos';
import ControllerUnits from './controllerUnits';
import { getRangeRandom, get30DegRandom } from './function';

//获取图片相关数据
let imageDatas = require('../data/imageDatas.json');

//--------方法1，遍历数组，将图片名信息转成图片URL路径信息
imageDatas = imageDatas.map((item) => {
  item.imageURL = 'images/' + item.fileName;
  return item;
})
// console.log('imageDatas', imageDatas); // Array[10]

//--------方法2，利用自执行函数，将图片名信息转成图片URL路径信息
// imageDatas = (function genImageURL(imageDataArr){
//   for(let i=0; i<imageDataArr.length; i++){
//     //为单个图片信息增加属性，为该属性附上地址信息
//     imageDataArr[i].imageURL = '../images/' + imageDataArr[i].fileName;
//   }
//   return imageDataArr;
// })(imageDatas);
// ---------endbuild


//----------舞台结构
class GalleryByReactApp extends React.Component {
  // 存储图片排布的可取值范围，设置为常量
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
        top: 0
      },
      hPosRange: {   // 左右两部分的取值范围
        leftSecX: [0,0],
        rightSecX: [0,0],
        y: [0,0]
      },
      vPosRange: {   // 上部分的取值范围
        x: [0,0],
        topY: [0,0]
      }
    };

    // 初始化state，图片的left\top位置
    this.state = {
      imgsArrangeArr: [
        // {
        //   pos:{
        //     left: 0,
        //     top: 0
        //   },
        //   rotate: 0,   // 图片的旋转角度
        //   isInverse: false   // 设置图片是否翻转的状态
        //   isCenter: false   // 默认图片不居中
        // }
      ]
    }
  }

  /*
   * 翻转居中的图片函数
   * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
   * @return {function} 这是一个闭包函数，其中return一个真正待被执行的函数
   */
  inverse (index) {
    return function () {
      let imgsArrangeArr = this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;  // 翻转取反

      this.setState({
        imgsArrangeArr: imgsArrangeArr  // 触发视图的重新渲染
      });

    }.bind(this);
  }

  /*
   * 当非居中的图片被点击时，利用rearrange函数，居中对应index的图片
   * @param index，需要被居中的图片信息数组中的index值
   * @return {function} (return一个闭包函数)
   */
  center (index) {
    return function () {
      this.rearrange(index)
    }
  }

  // 封装函数，图片在取值范围内的排布，指定居中排布哪个图片
  rearrange (centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
/* * 图片的取值范围
   */
        // 中间图片的位置
        centerPos = Constant.centerPos,

        // 左右两边图片的取值范围
        hPosRange = Constant.hPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,

        // 上边图片的取值范围
        vPosRange = Constant.vPosRange,
        vPosRangeX = vPosRange.x,
        vPosRangeTopY = vPosRange.topY;
/* * endbuild
   */

/* * 中间图片的布局
 */
    // 取出要布局中央的图片的位置信息
    let imgsArrangeCenterArr = [];
    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);  // 拿到中间图片后把中间图片的状态信息从数组里删除

    // 居中centerIndex的图片的位置，不需要旋转
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }
/* * endbuild
 */

/* * 上边图片的布局
   */
    let imgsArrangeTopArr = [];  // 存储放在上边区域的图片状态信息
    let topImgNum = Math.floor( Math.random() *2 ); //取0张或一张

    // 取出要布局上侧图片的位置信息
    let topImgSpliceIndex = 0; //从哪个index开始取图片
    topImgSpliceIndex = Math.floor( Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片的位置
    imgsArrangeTopArr.forEach(function(value,index){
      imgsArrangeTopArr[index] = {
        pos: {
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]), // 调用上面的在区间内取随机数的函数
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    })
 /* * endbuild
   */

/* * 左右图片的布局
   */
    // 上面已经剔除了中间、上面图片的位置信息，所以这里不用做剔除了
    for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++){

      // 前半部分布局左边，右半部分布局右边
      let hPosRangeLOrRX = null;
      if(i < k){
        hPosRangeLOrRX = hPosRangeLeftSecX;
      }else{
        hPosRangeLOrRX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos: {
          left: getRangeRandom(hPosRangeLOrRX[0], hPosRangeLOrRX[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    }
/* * endbuild
   */

/* * 图片的重新渲染
   */
    // 把取出来的上边的图片位置信息放回去
    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    // 把取出来的中央的图片位置信息放回去
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    // 触发component的重新渲染
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
/* * endbuild
   */

  }

  // react component加载后的回调函数：componentDidMount
  // 组件加载以后，为每张图片计算其位置的范围(初始化constant)
  componentDidMount() {

    // 首先拿到舞台的大小
    // this: 指GalleryByReactApp这个组件
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage); // 取得舞台这个元素
    let stageW = stageDOM.scrollWidth;
    let stageH = stageDOM.scrollHeight;
    let halfStageW = Math.floor(stageW / 2);
    let halfStageH = Math.floor(stageH / 2);
    // console.log(stageW)

    // 拿到一张图片的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.floor(imgW / 2),
        halfImgH = Math.floor(imgH / 2);

    // 中央图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    //左右两部分的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //上部分的取值范围
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    // console.log(this)
    this.rearrange(0);
  }

  render() {

    // 定义导航点数组
    let controllerUnits = [];
    // 定义图片数组，遍历图片信息，把图片信息增加到数组里
    let imgFigures = [];

    imageDatas.forEach(function(item,index){
      // 图片的初始位置
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      //data: 定义ImgFigure的属性，可以随便定义：test\dat都行
      //把函数内部的this指向函数外部的this(component对象实例)
      imgFigures.push(
        <ImgFigure
          key={index}
          data={item}
          ref={'imgFigure' + index}
          key={index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index)}
          center={this.center(index).bind(this)}
        />
      );
      // console.log(imgFigures);

      controllerUnits.push(
        <ControllerUnits
          key={index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index)}
          center={this.center(index).bind(this)}
        />
      )
    }.bind(this))

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}
//----------endbuild

// GalleryByReactApp.defaultProps = {
// };

export default GalleryByReactApp;

// import dog from './dogClass';
// import {run, eat} from './dogClass';

// import {run: dog.run, eat: dog.eat} from './dogClass';
// import {run, eat} from './dogClass';


// import cube from './imgPos';
// console.log('hhhhhh');
