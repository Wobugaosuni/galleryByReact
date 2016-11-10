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

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
