import type {Coordinates, ClientRect, LayoutRect, ViewRect} from '../../types';
import {getScrollableAncestors, getScrollOffsets} from '../scroll';
import {defaultCoordinates} from '../coordinates';

function getEdgeOffset(
  node: HTMLElement | null,
  parent: (Node & ParentNode) | null,
  offset = defaultCoordinates
): Coordinates {
  // console.log(node);
  // console.log(parent);
  // console.log(offset);
  if (!node || !(node instanceof HTMLElement)) {
    // console.log('returning just offset');
    return offset;
  }

  const nodeOffset = {
    x: offset.x + node.offsetLeft,
    y: offset.y + node.offsetTop,
  };

  if (node.offsetParent === parent) {
    // console.log('returning offestParent');
    // console.log(nodeOffset);
    return nodeOffset;
  }

  // console.log('calling recursevly');
  return getEdgeOffset(node.offsetParent as HTMLElement, parent, nodeOffset);
}

export function getElementLayout(element: HTMLElement): LayoutRect {
  const {offsetWidth: width, offsetHeight: height} = element;
  const {x: offsetLeft, y: offsetTop} = getEdgeOffset(element, null);
  // const {x: offsetLeft, y: offsetTop} = element.getBoundingClientRect();

  // console.log(element);

  return {
    width,
    height,
    offsetTop,
    offsetLeft,
  };
}

export function getBoundingClientRect(
  element: HTMLElement | Window
): ClientRect {
  if (element instanceof Window) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height,
      offsetTop: 0,
      offsetLeft: 0,
    };
  }

  const {offsetTop, offsetLeft} = getElementLayout(element);
  const {
    width,
    height,
    top,
    bottom,
    left,
    right,
  } = element.getBoundingClientRect();

  return {
    width,
    height,
    top,
    bottom,
    right,
    left,
    offsetTop,
    offsetLeft,
  };
}

export function getViewRect(element: HTMLElement): ViewRect {
  // console.log(element);
  const {width, height, offsetTop, offsetLeft} = getElementLayout(element);
  const scrollableAncestors = getScrollableAncestors(element);
  // console.log('returned', scrollableAncestors);
  // console.log(scrollableAncestors);
  const scrollOffsets = getScrollOffsets(scrollableAncestors);
  // console.log(scrollOffsets);

  const top = offsetTop - scrollOffsets.y;
  const left = offsetLeft - scrollOffsets.x;

  return {
    width,
    height,
    top,
    bottom: top + height,
    right: left + width,
    left,
    offsetTop,
    offsetLeft,
  };
}
