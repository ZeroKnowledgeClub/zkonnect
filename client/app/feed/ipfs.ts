import { ethers } from 'ethers';
import abi from '../../abi/abi.json'
import { useReadContract } from 'wagmi';
import { wagmiConfig } from '@/context/config';


export default async function getHashFromContract(): Promise<unknown | void> {
    try {
        const { data: hash } = useReadContract({
            ...wagmiConfig,
            functionName: "getPosts"
        });
        return hash;
    } catch (error) {
        console.error('Error fetching hash from contract:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getHashFromContract().then((hash) => {
        if (hash) {
            document.getElementById("btn")?.addEventListener('click', () => {
                window.location.href = "https://ipfs.io/ipfs/" + hash;
            });
        }
    });
});
