# sticky
a mob page javascript component

#sticky CSS attr

1.	纵向滚动时，只有设定top值之后才生效，left值不影响效果
* sticky元素不影响生效后的文档流
* sticky元素top值是距离窗口顶部的值，与父元素定位无关
* sticky元素的margin对定位效果没有影响，但会影响文档流
* left和top不影响文档流，所以和position:relative;还是有区别的
* 但是脱离文档流之后，left和right值会按方向生效
* 同一父元素下，sticky元素会有先后顺序，有层级的概

# 备注

* getcomputedstyle方法在各个浏览器取值不一样，在chrome和Firefox中取得元素(position:static;)的top值为设置值，而不是auto，但在Safari中取到为auto
* 在IOS中表现正常
* 在安卓中表现如IOS
* sticky_top、sticky_left仅支持px单位
