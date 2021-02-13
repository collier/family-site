import { Magic } from '@magic-sdk/admin';

const magic = new Magic(process.env.MAGIC_API_KEY_PRIVATE);

export default magic;
