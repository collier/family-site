import camelCase from 'lodash/camelCase';
import isPlainObject from 'lodash/isPlainObject';

// https://stackoverflow.com/questions/12931828/convert-returned-json-object-properties-to-lower-first-camelcase
// Slightly modified to use the isPlainObject method from underscore instead
export default function camelizeKeys(obj: any) {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
}
