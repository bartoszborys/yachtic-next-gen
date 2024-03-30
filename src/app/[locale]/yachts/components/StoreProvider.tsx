'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store/store'
import { initializeSearchSlice } from '../store/FilterSlice'

interface StoreProviderProps {
  children: React.ReactNode,
  searchParams: string[],
}

export default function StoreProvider({ children, searchParams }: StoreProviderProps) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeSearchSlice(searchParams));
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}