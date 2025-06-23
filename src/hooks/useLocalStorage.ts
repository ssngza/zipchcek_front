import { useEffect, useState } from "react";

/**
 * 로컬 스토리지에 데이터를 저장하고 불러오는 커스텀 훅
 * @param key 로컬 스토리지에 저장할 키
 * @param initialValue 초기값
 * @returns [저장된 값, 값을 업데이트하는 함수]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 로컬 스토리지에서 값을 가져오는 함수
  const readValue = (): T => {
    // SSR 환경이나 로컬 스토리지에 접근할 수 없는 경우 초기값 반환
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // 로컬 스토리지에서 값을 가져옴
      const item = window.localStorage.getItem(key);
      // 값이 있으면 파싱하여 반환, 없으면 초기값 반환
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`로컬 스토리지에서 키 "${key}"를 읽는 중 오류 발생:`, error);
      return initialValue;
    }
  };

  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // 값을 업데이트하는 함수
  const setValue = (value: T) => {
    try {
      // 함수로 전달된 경우 함수를 실행하여 새 값을 계산
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // 상태 업데이트
      setStoredValue(valueToStore);

      // 로컬 스토리지에 저장
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(
        `로컬 스토리지에 키 "${key}"를 저장하는 중 오류 발생:`,
        error
      );
    }
  };

  // 다른 탭/창에서 로컬 스토리지 변경 시 동기화
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`로컬 스토리지 변경 이벤트 처리 중 오류 발생:`, error);
        }
      }
    };

    // 스토리지 이벤트 리스너 등록
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
    return undefined;
  }, [key]);

  return [storedValue, setValue];
}
