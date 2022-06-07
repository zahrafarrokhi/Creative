import axios from './axios';


export const persianToEnglishDigits = (digit) => String(digit)
.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

export const deconstruct = (obj, max_depth = 10) => {
  let ret = [];
  if (obj) {
    if (typeof obj === 'string') { return [obj]; }
    for (const k in obj) {
      const v = obj[k];
      console.log(k, v, ret);
      if (typeof v === 'string') {
        console.log('string');
        ret.push(v);
      } else
        if (Array.isArray(v)) {
          console.log('Array');
          ret = ret.concat(v);
          console.log('Arr: ', ret, v);
        } else {
          console.log('object');
          ret += v;
          ret += deconstruct(v, max_depth - 1);
        }
    }
  }
  console.log(ret);
  return ret;
}