import type { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { derived, writable, Writable } from 'svelte/store';

interface IStore {
	provider?: any;
	account?: string;
	chainId?: number;
}

export const getWeb3Provider = async () => {
	const injected = (window as any).ethereum;
	const provider = new ethers.providers.Web3Provider(injected, 'any');
	return { injected, provider };
};

export const useEth = () => {
	const store = writable<IStore>({}, (set) => {
		const f = async () => {
			const { injected, provider } = await getWeb3Provider();
			const { chainId } = await provider.getNetwork();
			const accounts = await provider.send('eth_requestAccounts', []);
			const account = accounts[0] ? accounts[0] : undefined;
			store.set({ provider, account, chainId });
			// subscribe to change
			injected.on('accountsChanged', (accounts: string[]) => {
				store.update((state) => ({ ...state, account: accounts[0] }));
			});

			injected.on('chainChanged', (chainId: string) => {
				store.update((state) => ({ ...state, chainId: Number(chainId) }));
			});
		};
		f();

		return () => console.log('no eth subscribers');
	});
	const provider = derived<Writable<IStore>, Web3Provider>(store, (store) => store.provider);
	const chainId = derived<Writable<IStore>, number>(store, (store) => store.chainId);
	const account = derived<Writable<IStore>, string>(store, (store) => store.account);
	return { store, provider, chainId, account };
};
