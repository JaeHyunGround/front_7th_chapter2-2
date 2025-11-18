import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

export function renderElement(vNode, container) {
  // vNode를 정규화 한 다음에
  const normalized = normalizeVNode(vNode);

  // 처음 렌더링인지 확인
  const isFirstRender = !container._vNode;

  if (isFirstRender) {
    // 첫 렌더링: container 초기화하고 전체 생성
    container.innerHTML = "";
    const element = createElement(normalized);
    container.appendChild(element);
    setupEventListeners(container);
  } else {
    // 재렌더링: updateElement로 diff 적용
    updateElement(container, normalized, container._vNode, 0);
  }

  // 다음 렌더링을 위해 vNode 저장
  container._vNode = normalized;
}
