// 事件触发函数
export function triggerEvent(el: Element | Window, type: string) {
  if ('createEvent' in document) {
    // modern browsers, IE9+
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, false, true);
    el.dispatchEvent(e);
  }
}

export function stripComment(source: string): string {
  const reg = /((?<!:)\/\/.*)|(\/\*[\s\S]*?\*\/)/g;
  return source == null ? '' : source.replace(reg, '');
}
