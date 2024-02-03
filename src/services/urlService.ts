const isLocalNetwork = (hostname: string) => {
    return (
        hostname.startsWith('localhost') ||
        hostname.startsWith('127.0.0.1') ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.0.') ||
        hostname.endsWith('.local')
    )
} 

export const getAbsoluteUrl = () => {
    const host = window.location.host;
    const protocol = isLocalNetwork(host) ? 'http:' : 'https:';
    
    return `${protocol}//${host}`;
}