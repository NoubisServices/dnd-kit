import {isScrollable} from './isScrollable';

export function getScrollableAncestors(element: Node | null): Element[] {
  // console.log('element', element);
  const scrollParents: Element[] = [];

  function findScrollableAncestors(node: Node | null): Element[] {
    // console.log('finding scrollable ancestors');
    if (!node) {
      // console.log('not node', node);
      return scrollParents;
    }

    if (node instanceof Document && node.scrollingElement != null) {
      // console.log('found node, adding', node);
      scrollParents.push(node.scrollingElement);

      return scrollParents;
    }

    if (!(node instanceof HTMLElement) || node instanceof SVGElement) {
      // console.log('not node #2', node);
      return scrollParents;
    }

    if (isScrollable(node)) {
      // console.log('found isScrollable, adding', node);
      scrollParents.push(node);
      // console.log(scrollParents);
    }

    // console.log('calling parent recursevly');
    return findScrollableAncestors(node.parentNode);
  }

  // console.log('returning');
  // console.log(scrollParents);
  return element ? findScrollableAncestors(element.parentNode) : scrollParents;
}
