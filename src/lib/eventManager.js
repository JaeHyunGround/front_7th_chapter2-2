const registeredEvent = new Map();

export function setupEventListeners(root) {
  const eventTypes = Array.from(registeredEvent.keys());

  eventTypes.forEach((type) => {
    root.addEventListener(type, (e) => {
      const eventList = registeredEvent.get(type);
      eventList.forEach(({ element, handler }) => {
        if (e.target === element) handler(e);
      });
    });
  });
}

export function addEvent(element, eventType, handler) {
  //   if (!registeredEvent.has(eventType)) {
  //     registeredEvent.set(eventType, [
  //       {
  //         element,
  //         handler,
  //       },
  //     ]);
  //   } else {
  //     registeredEvent.set(eventType, [
  //       ...registeredEvent.get(eventType),
  //       {
  //         element,
  //         handler,
  //       },
  //     ]);
  //   }

  if (!registeredEvent.has(eventType)) {
    registeredEvent.set(eventType, []);
  }

  // Map에 저장된 배열은 참조이기 때문에, 배열을 직접 수정해도 Map에 반영됨
  registeredEvent.get(eventType).push({
    element,
    handler,
  });
}

export function removeEvent(element, eventType, handler) {
  if (!registeredEvent.has(eventType)) return;

  const events = registeredEvent.get(eventType);
  const filteredEvents = events.filter(
    (e) => e.element !== element || e.handler !== handler,
  );

  if (filteredEvents.length === 0) {
    registeredEvent.delete(eventType);
  } else {
    registeredEvent.set(eventType, filteredEvents);
  }
}
