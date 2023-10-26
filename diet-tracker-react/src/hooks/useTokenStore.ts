import { create } from 'zustand';
interface TokenState {
    accessToken: string | null;
    setAccessToken: (token: string) => void,
    clearAccessToken: () => void
  }
const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}));

export default useTokenStore;