import { create } from 'zustand';

interface TokenState {
  accessToken: string | null;
  expiresIn: number;
  email: string;
  tokenType : string;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  setExpiresIn: (expiresIn : number ) => void;
  clearExpiresIn: () => void;
  setEmail: (email : string) => void;
  clearEmail: () => void;
  setTokenType: (tokenType : string) => void;
  clearTokenType: () => void;
  setToken: (token: string | null, expires_in : number, email : string, tokenType : string) => void;
  clearToken: () => void;
}
  const useTokenStore = create<TokenState>((set) => ({
    accessToken: null,
    expiresIn: 0,
    email: "",
    tokenType : "Bearer",
    setAccessToken: (token) => set({ accessToken: token }),
    clearAccessToken: () => set({ accessToken: null }),
    setExpiresIn: (expiresIn) => set({expiresIn: expiresIn}),
    clearExpiresIn: () =>  set({expiresIn: 0}),
    setEmail: (email : string) =>  set({email: email}),
    clearEmail: () =>  set({email: ""}),
    setTokenType: (tokenType : string) => set({tokenType: tokenType}),
    clearTokenType: () =>  set({tokenType: "Bearer"}),
    setToken: (token, expiresIn, email, tokenType) => {
    set({ accessToken: token });
    set({ expiresIn });
    set({ email });
    set({ tokenType });
  },
  clearToken: () => {
    set({accessToken: null}),
    set({ expiresIn : 0 });
    set({ email  : ""});
    set({ tokenType : "Bearer"});
  }
}));

export default useTokenStore;