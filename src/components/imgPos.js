import React from 'react';
import ReactDOM from 'react-dom';

// ----------添加图片组件，搭建图片结构
class ImgFigure extends React.Component{
  /*
   * figure的点击处理函数
   */

  figureClick () {
    // 调用父组件的函数
    this.props.inverse();
  }
  render(){

    let styleObj = {};
    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    // 如果图片的旋转角度有值并且不为0，添加旋转角度。
    // 兼容各种浏览器，浏览器前缀react写法参考：http://www.andismith.com/blog/2012/02/modernizr-prefixed/
    // 旋转的CSS写法
    // .rotate {
    //   transform: rotate(30deg)
    // }
    if (this.props.arrange.rotate) {
      ['MozTransform', 'msTransform', 'WebkitTransform', 'OTransform', 'transform'].map((item) => {
        styleObj[item] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      })
    }
    // 方法二
    // if(this.props.arrange.rotate) {
    //   (['MozTransform', 'msTransform', 'WebkitTransform', 'OTransform', 'transform']).forEach (function (arrayItem) {
    //     styleObj[arrayItem] = 'rotate(' + this.props.arrange.rotate + 'deg)';
    //   }.bind(this))
    // }

    // 用类名控制图片的翻转
    let ImgFigureClassName = 'img-figure';
    ImgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';  // 两个类名之间要有空格分隔，is-inverse前面注意有个空格

    return(
      <figure className={ImgFigureClassName} style={styleObj} onClick={this.figureClick.bind(this)}>
        <img src={this.props.data.imageURL}
              alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
// ----------endbuild

export default ImgFigure;

// export function cube(x) {
//   return x * x;
// }
