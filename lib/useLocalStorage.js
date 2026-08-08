"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // サーバー側では window が存在しないため、マウント後に
    // localStorage から読み込んでハイドレーション不整合を避ける。
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(saved));
      }
    } catch (error) {
      console.error(`${key} の読み込みに失敗しました`, error);
    } finally {
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, loaded]);

  return [value, setValue];
}
