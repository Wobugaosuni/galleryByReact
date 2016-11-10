require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

//获取图片相关数据
let imageDatas = require("../data/imageDatas.json");

//--------利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDataArr){
  for(var i=0; i<imageDataArr.length; i++){
    //为单个图片信息增加属性，为该属性附上地址信息
    imageDataArr[i].imageURL = require('../images/' + imageDataArr[i].fileName);
  }
  return imageDataArr;
})(imageDatas);
// console.log(imageDatas[0].imageURL)
// ---------endbuild

// ----------添加图片组件
class ImgFigure extends React.Component{
  render(){
    return(
      <figure className="img-figure">
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

//----------舞台结构
class GalleryByReactApp extends React.Component {
  render() {

    // 定义导航点数组
    let controllerUnits = [ ];
    // 定义图片数组，遍历图片信息，把图片信息增加到数组里
    let imgFigures = [ ];
    imageDatas.forEach(function(obj){
      //data: 定义ImgFigure的属性，可以随便定义：test\dat都行
      imgFigures.push(<ImgFigure data={obj}/>);
      console.log(obj);
    })

    return (
      <section className="stage">
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

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
