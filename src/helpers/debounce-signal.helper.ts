import { WritableSignal, effect, signal } from '@angular/core';

export const debouncedSignal = <T>(
  sourceSignal: WritableSignal<T>,
  debounceTimeInMs = 0
): WritableSignal<T> => {
  const debounceSignal = signal(sourceSignal());
  effect(
    (onCleanup) => {
      const value = sourceSignal();
      const timeout = setTimeout(
        () => debounceSignal.set(value),
        debounceTimeInMs
      );

      onCleanup(() => clearTimeout(timeout));
    },
    { allowSignalWrites: true }
  );
  return debounceSignal;
};
