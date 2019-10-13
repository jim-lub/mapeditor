export const memorySizeOf = (obj, unit) => {
  let bytes = 0;

  const sizeOf = (obj) => {
    if (obj !== null && obj !== undefined) {
      switch(typeof obj) {
        case 'number':
          return bytes += 8;
        case 'string':
          return bytes += obj.length * 2;
        case 'boolean':
          return bytes += 4;
        case 'object':
          let objClass = Object.prototype.toString.call(obj).slice(8, -1);

          if (objClass === 'Object' || objClass === 'Array') {
            for (let key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else {
            bytes += obj.toString().length * 2;
          }
          break;
        default:
          return;
      }
    }
  }

  const bytesToKiB = (bytes) => (bytes / 1024);
  const bytesToMiB = (bytes) => (bytes / 1048576);
  const bytesToGiB = (bytes) => (bytes / 1073741824);

  const formatByteSize = (bytes) => {
    if (bytes < 1024) return { value: bytes, suffix: "bytes"}
    if (bytes < 1048576) return { value: (bytes / 1024), suffix: "KiB"}
    if (bytes < 1073741824) return { value: (bytes / 1048576), suffix: "MiB"}
    return { value: (bytes / 1073741824), suffix: "GiB"}
  }

  if (unit === 'byte') {
    return sizeOf(obj);
  }

  if (unit === 'KiB') {
    return bytesToKiB( sizeOf(obj) );
  }

  if (unit === 'MiB') {
    return bytesToMiB( sizeOf(obj) );
  }

  if (unit === 'GiB') {
    return bytesToGiB( sizeOf(obj) );
  }

  return formatByteSize( sizeOf(obj) );
}
