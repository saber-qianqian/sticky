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

# 使用条件
1.	在引用的时候，在js里面增加top、left值（限制单位是px）
* 在目标DOM上增加style值（限制单位是px）

