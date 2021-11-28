const ReactDom = {
  render,
}
function render(vnode, container) {
  if (vnode === undefined) return
  //如果vnode字符串
  if (typeof vnode === 'string') {
    //创建文本节点
    const textNode = document.createTextNode(vnode)
    return container.appendChild(textNode)
  }
  //或者是虚拟DOM对象
  const { tag, attrs } = vnode
  const dom = document.createElement(tag)
  if (attrs) {
    //有属性的话
    Object.keys(attrs).forEach((key) => {
      //取值，设置属性
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }
  // 递归 渲染子元素
  vnode.childrens.forEach((child) => render(child, dom))
  return container.appendChild(dom)
}
//设置属性
function setAttribute(dom, key, value) {
  //将属性名className转换成class
  if (key === 'className') {
    key = 'class'
  }
  //如果是事件  on开头，转为小写
  if (/on\w+/.test(key)) {
    console.log(key)
    key = key.toLowerCase()
    console.log(dom)
    dom[key] = value || ''
  } else if (key === 'style') {
    //如果是style属性，并且为字符串，则直接设置css值
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      //如果是对象，遍历，判断是否是数字
      for (let k in value) {
        if (typeof value[k] === 'number') {
          //是数字加上px
          dom.style[k] = value[k] + 'px'
        } else {
          dom.style[k] = value[k]
        }
      }
    }
  } else {
    //设置其他属性
    if (key in dom) {
      dom[key] = value || ''
    }
    //对值进行更新
    if (value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
}

export default ReactDom
