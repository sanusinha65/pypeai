import swell from 'swell-js'
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID as string, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY as string);
export default swell;