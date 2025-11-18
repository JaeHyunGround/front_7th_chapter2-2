import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";

export function renderElement(vNode, container) {
  // vNode를 정규화 한 다음에
  const normalized = normalizeVNode(vNode);

  // 처음 렌더링인지 확인
  const isFirstRender = !container._eventListenersSetup;

  // container 초기화
  container.innerHTML = "";

  // createElement로 노드를 만들고
  const element = createElement(normalized);

  // container에 삽입하고
  container.appendChild(element);

  // 이벤트를 등록합니다. (처음 렌더링 시에만)
  if (isFirstRender) {
    setupEventListeners(container);
    container._eventListenersSetup = true;
  }
}
